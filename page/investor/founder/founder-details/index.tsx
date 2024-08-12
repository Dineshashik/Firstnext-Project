'use client';
import React, { useState, useEffect } from 'react';
import {
  FounderDetailsConnectButton,
  FounderDetailsPageWrapper,
} from './style';
import { Button, Grid, Stack, Typography } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CardWrapper } from '@/components/common/ui';
import InvestorDetailsCard from '@/components/investor-details';
import ProjectTilesCard from '@/components/common/project-tiles-card';
import { CompanyProfileData, FounderDetails } from './data';
import { INVESTOR } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import {
  getUserDetails,
  createConnectionRequest,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';

const FounderDetailsPage = ({ founderId }: { founderId: string }) => {
  const router = useRouter();
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);

  const [founderDetails, setFounderDetails] = useState<any>();
  const [connectLoading, setConnectLoading] = useState<boolean>(false);

  async function fetchInvestorDetails() {
    try {
      const res = await api.get(`${getUserDetails}/${founderId}`);
      if (res.success) {
        setFounderDetails(res?.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }

  const handleConnect = async () => {
    if (founderDetails[0]?.connection_status === 'NONE') {
      try {
        setConnectLoading(true);
        const res = await api.post<any>(createConnectionRequest, {
          connect_user_id: founderDetails[0]?._id,
        });

        if (res.success) {
          setConnectLoading(false);
          fetchInvestorDetails();
          if (socket && userDetails) {
            socket?.emit('send_invitation', {
              sender: userDetails._id.toString(),
              receiver: founderId,
            });
          }
          toast.success('Connection request sent successfully');
        }
      } catch (error: any) {
        setConnectLoading(false);
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    } else {
      if (socket && userDetails) {
        socket.emit('user_online', userDetails._id);
        socket.emit('create_room', {
          sender: userDetails._id.toString(),
          receiver: founderDetails[0]?._id.toString(),
        });
        socket.on('chat_room_id', (roomId: any) => {
          router.push(`/investor/chats/${roomId}`);
        });
      }
    }
  };

  useEffect(() => {
    fetchInvestorDetails();
  }, []);

  const titleToPropertyMap: any = {
    'Company Name': 'company_name',
    'Industry/Sector': 'industry',
    'Contact Function': 'contact_function',
    'No. of Employees': 'number_of_employees',
    Website: 'website',
  };
  const transformedArray = CompanyProfileData.map((profile) => {
    const property = titleToPropertyMap[profile?.title];
    return {
      id: profile.id,
      iconUrl: profile.iconUrl,
      title: profile.title,
      value:
        (founderDetails && founderDetails[0]?.company?.[property]) || 'N/A',
    };
  });

  return (
    <FounderDetailsPageWrapper>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={8}
        >
          <CardWrapper>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">Founder Details</Typography>
              <FounderDetailsConnectButton
                disabled={
                  connectLoading ||
                  (founderDetails &&
                    founderDetails[0]?.connection_status === 'PENDING')
                }
                onClick={handleConnect}
                variant="outlined"
              >
                {founderDetails &&
                founderDetails[0]?.connection_status === 'NONE'
                  ? 'Connect'
                  : founderDetails &&
                    founderDetails[0]?.connection_status === 'REJECTED'
                  ? 'Connect'
                  : founderDetails &&
                    founderDetails[0]?.connection_status === 'PENDING'
                  ? 'Pending'
                  : founderDetails &&
                    founderDetails[0]?.connection_status === 'APPROVED'
                  ? 'Start Chat'
                  : 'Loading...'}
              </FounderDetailsConnectButton>
            </Stack>
            {founderDetails?.map((item: any) => (
              <InvestorDetailsCard
                fetchInvestorDetails={fetchInvestorDetails}
                key={item._id}
                data={item}
                type={INVESTOR}
              />
            ))}
          </CardWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
        >
          <Stack spacing={2}>
            <ProjectTilesCard
              title="Company Profile"
              data={transformedArray}
            />
          </Stack>
        </Grid>
      </Grid>
    </FounderDetailsPageWrapper>
  );
};

export default FounderDetailsPage;
