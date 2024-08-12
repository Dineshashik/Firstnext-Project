'use client';
import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import {
  CheckIconWrapper,
  LikedByInvestorsInput,
  LikedByInvestorsInputWrapper,
  LikedByInvestorsWrapper,
  ModalIconWrapper,
} from './style';
import { Box, Grid, Stack, Typography } from '@mui/material';
import DynamicTabs from '@/components/common/custom-tab';
import InvestorCard from '@/components/common/investor-card';
import { FOUNDER } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import {
  createConnectionRequest,
  getListOfBookmarkedProject,
} from '@/services/apiDefinition';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import CommonModal from '@/components/common/modal';
import { ModalBoxWrapper } from '../search-investors/style';
import { CustomButton } from '@/components/common/ui';

// const RequestedTabContent = () => (
//   <Grid
//     container
//     spacing={2}
//   >
//     {[...Array(8)].map((_, index) => (
//       <Grid
//         item
//         xs={12}
//         sm={6}
//         md={4}
//         lg={3}
//         key={index}
//       >
//         <InvestorCard
//           type={FOUNDER}
//           cardType="requested"
//           onIgnore={(e) => console.log('Ignore')}
//           onAccept={(e) => console.log('Accept')}
//         />
//       </Grid>
//     ))}
//   </Grid>
// );

// const ConnectedTabContent = () => (
//   <Grid
//     container
//     spacing={2}
//   >
//     {[...Array(8)].map((_, index) => (
//       <Grid
//         item
//         xs={12}
//         sm={6}
//         md={4}
//         lg={3}
//         key={index}
//       >
//         <InvestorCard
//           type={FOUNDER}
//           cardType="connected"
//           onStartChat={(e) => console.log('connected')}
//         />
//       </Grid>
//     ))}
//   </Grid>
// );

// const tabs = [
//   { name: 'Requested Investors', content: <RequestedTabContent /> },
//   { name: 'Connected Investors', content: <ConnectedTabContent /> },
// ];

const LikedByInvestorsPage = ({
  likedbyinvestorid,
}: {
  likedbyinvestorid: string;
}) => {
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [likeByInvestor, setLikeByInvestor] = useState<any[]>([]);
  const [connectLoading, setConnectLoading] = useState<any>(false);
  const [connectView, setConnectView] = useState(false);

  const fetchLikeInvestorData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<any>(
        `${getListOfBookmarkedProject}/${likedbyinvestorid}`
      );

      if (response.data) {
        setLikeByInvestor(response?.data?.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikeInvestorData();
  }, []);

  const onStartChat = (investorId: string) => {
    if (socket && userDetails) {
      socket.emit('user_online', userDetails._id);

      socket.emit('create_room', {
        sender: userDetails._id.toString(),
        receiver: investorId.toString(),
      });

      socket.on('chat_room_id', (roomId: any) => {
        router.push(`/founder/chats/${roomId}`);
      });
    }
  };

  const onConnect = async (userId: string) => {
    try {
      setConnectLoading((prevLoading: any) => ({
        ...prevLoading,
        [userId]: true,
      }));

      const res = await api.post(createConnectionRequest, {
        connect_user_id: userId,
      });

      if (res.success) {
        socket?.emit('send_invitation', {
          sender: userDetails._id.toString(),
          receiver: userId.toString(),
        });
        setConnectLoading((prevLoading: any) => ({
          ...prevLoading,
          [userId]: false,
        }));
        fetchLikeInvestorData();
        setConnectView(true);
      }
    } catch (error: any) {
      setConnectLoading((prevLoading: any) => ({
        ...prevLoading,
        [userId]: false,
      }));
      toast.error(error?.response.data.message || 'Request unsuccessful');
    }
  };
  return (
    <LikedByInvestorsWrapper>
      <Stack
        direction={{ sx: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h4"
          mb={{ xs: 1, md: 0 }}
        >
          Liked By Investors
        </Typography>
        <LikedByInvestorsInputWrapper
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <LikedByInvestorsInput
            type="text"
            id="search"
            name="search"
            placeholder="Search by name or email"
          />
          <Stack alignItems="center">
            <SearchIcon />
          </Stack>
        </LikedByInvestorsInputWrapper>
      </Stack>
      <Box>
        <Grid
          container
          spacing={2}
        >
          {likeByInvestor &&
            likeByInvestor?.map((item) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item?._id}
              >
                <InvestorCard
                  type={FOUNDER}
                  cardType="liked"
                  data={item}
                  onStartChat={onStartChat}
                  onConnect={onConnect}
                  isLoading={!!connectLoading[item._id]}
                  loadingText="Requesting..."
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <CommonModal
        open={connectView}
        onClose={() => setConnectView(false)}
      >
        <ModalBoxWrapper>
          <Stack
            alignItems="center"
            direction="column"
            minHeight="100%"
            justifyContent="space-between"
          >
            <ModalIconWrapper>
              <CheckIconWrapper />
            </ModalIconWrapper>
            <Typography
              variant="h3"
              textAlign="center"
              p={3}
            >
              Connection Request Sent Successfully{' '}
            </Typography>
            <CustomButton
              color="blue"
              onClick={() => setConnectView(false)}
            >
              Close
            </CustomButton>
          </Stack>
        </ModalBoxWrapper>
      </CommonModal>
    </LikedByInvestorsWrapper>
  );
};

export default LikedByInvestorsPage;
