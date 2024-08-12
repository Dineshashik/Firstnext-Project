'use client';
import React, { useEffect, useState } from 'react';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  FindProjectConnectButton,
  FindProjectDetailsWrapper,
  FindProjectViewProfileButton,
} from './style';
import ProjectDetailsCard from '@/components/project-management/project-details';
import ProjectTilesCard from '@/components/common/project-tiles-card';
// import { ProjectOverviewCardData } from "./data";
import Image from 'next/image';
import { CardWrapper } from '@/components/common/ui';
import { INVESTOR } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import {
  createConnectionRequest,
  projectFindById,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useSocket } from '@/context/SocketContext';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { projectData } from '@/helpers/projectData';

const status: any = {
  APPROVED: 'Start Chat',
  PENDING: 'Requested',
  NONE: 'Connect',
};

const FindProjectDetailsPage = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);

  const [projectByIdData, setProjectByIdData] = useState<any>();
  const [connectLoading, setConnectLoading] = useState<boolean>(false);

  const fetchProjectByIdData = async () => {
    try {
      const response = await api.get<any>(`${projectFindById}/${projectId}`);
      if (response.success) {
        setProjectByIdData(response.data);
      } else {
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleConnect = async () => {
    if (projectByIdData?.user_id?.connection_status === 'NONE') {
      try {
        setConnectLoading(true);
        const res = await api.post<any>(createConnectionRequest, {
          connect_user_id: projectByIdData?.user_id?._id,
        });

        if (res.success) {
          setConnectLoading(false);
          fetchProjectByIdData();
          if (socket && userDetails) {
            socket?.emit('send_invitation', {
              sender: userDetails._id.toString(),
              receiver: projectByIdData?.user_id?._id.toString(),
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
          receiver: projectByIdData?.user_id?._id.toString(),
        });

        socket.on('chat_room_id', (roomId: any) => {
          router.push(`/investor/chats/${roomId}`);
        });
      }
    }
  };

  useEffect(() => {
    if (userDetails?.subPlan === 'PREMIUM') {
      fetchProjectByIdData();
    }
  }, [userDetails?.subPlan]);

  const dynamicValues = {
    companyStage:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.funding_stage
        : projectData[0]?.funding_stage,
    stageOfDevelopment:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.stage_of_development
        : projectData[0]?.stage_of_development,
    fundingRequirements:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.funding_requirements
        : projectData[0]?.funding_requirements,
    marketOpportunity:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.market_opportunity
        : projectData[0]?.market_opportunity,
    performanceProjections:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.performance_projections
        : projectData[0]?.performance_projections,
    revenueModel:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.revenue_model
        : projectData[0]?.revenue_model,
    benefitsForInvestors:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.investor_benefits
        : projectData[0]?.investor_benefits,
    funding_scope:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.funding_scope
        : projectData[0]?.funding_scope,
    exitStrategy:
      userDetails?.subPlan === 'PREMIUM'
        ? projectByIdData?.exit_strategy
        : projectData[0]?.exit_strategy,
  };

  const ProjectOverviewCardData = [
    {
      id: 1,
      iconUrl: '/asset/icon/sector.svg',
      title: 'Company Stage',
      value: dynamicValues?.companyStage,
    },
    {
      id: 2,
      iconUrl: '/asset/icon/overview-develop.svg',
      title: 'Stage of Development',
      value: dynamicValues?.stageOfDevelopment,
    },
    {
      id: 3,
      iconUrl: '/asset/icon/overview-funding.svg',
      title: 'Funding Requirements',
      value: dynamicValues?.fundingRequirements,
    },
    {
      id: 4,
      iconUrl: '/asset/icon/overview-purpose.svg',
      title: 'Funding Purpose',
      value: dynamicValues?.funding_scope,
    },
    {
      id: 5,
      iconUrl: '/asset/icon/overview-opportunity.svg',
      title: 'Market Opportunity',
      value: dynamicValues?.marketOpportunity,
    },
    {
      id: 6,
      iconUrl: '/asset/icon/overview-projections.svg',
      title: 'Performance Projections',
      value: dynamicValues?.performanceProjections,
    },
    {
      id: 7,
      iconUrl: '/asset/icon/overview-revenue.svg',
      title: 'Revenue Model',
      value: dynamicValues?.revenueModel,
    },
    {
      id: 8,
      iconUrl: '/asset/icon/investors.svg',
      title: 'Benefits for Investors',
      value: dynamicValues?.benefitsForInvestors,
    },
    {
      id: 9,
      iconUrl: '/asset/icon/overview-strategy.svg',
      title: 'Exit Strategy',
      value: dynamicValues?.exitStrategy,
    },
  ];

  return (
    <FindProjectDetailsWrapper>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          xs={12}
          lg={8}
        >
          {userDetails?.subPlan === 'PREMIUM' && (
            <ProjectDetailsCard
              projectId={projectId}
              type={INVESTOR}
              projectByIdData={projectByIdData}
              isBlurred={true}
            />
          )}
          {userDetails?.subPlan === 'FREE' && (
            <ProjectDetailsCard
              projectId={projectId}
              type={INVESTOR}
              projectByIdData={projectData[0]}
              isBlurred={userDetails?.role == "INVESTOR" ? false : true}
            />
          )}
        </Grid>
        <Grid
          item
          xs={12}
          lg={4}
        >
          <CardWrapper mb={3}>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              alignItems="center"
              sx={{
                filter:userDetails?.role == "INVESTOR" ? "none" : userDetails?.subPlan === 'FREE' ? 'blur(6px)' : 'none',
              }}
            >
              <Image
                src={
                  projectByIdData?.user_id?.profile
                    ? projectByIdData?.user_id?.profile?.image_url
                    : '/asset/icon/avtar-profile.svg'
                }
                alt="avtar"
                width={100}
                height={100}
                style={{ borderRadius: '100px' }}
              />
              <Stack width="100%">
                <Typography
                  variant="h6"
                  sx={{
                    textAlign: { xs: 'center', md: 'left' },
                  }}
                >
                  {projectByIdData?.user_id?.first_name +
                    ' ' +
                    projectByIdData?.user_id?.last_name}
                </Typography>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent={{ xs: 'center', sm: 'left' }}
                  mb={1}
                >
                  <Image
                    src="/asset/icon/location.svg"
                    alt="location"
                    width={14}
                    height={16}
                  />
                  <Typography ml={1}>
                    {projectByIdData?.user_id?.country !== ''
                      ? projectByIdData?.user_id?.country
                      : 'Not found'}
                  </Typography>
                </Stack>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <FindProjectConnectButton
                    disabled={
                      connectLoading ||
                      projectByIdData?.user_id?.connection_status ===
                        'PENDING' ||
                      userDetails?.subPlan === 'FREE'
                    }
                    onClick={handleConnect}
                    color="primary"
                  >
                    {/* {!connectLoading ? status[reqStatus] : "Connect.."} */}
                    {projectByIdData?.user_id?.connection_status === 'NONE'
                      ? 'Connect'
                      : projectByIdData?.user_id?.connection_status ===
                        'REJECTED'
                      ? 'Connect'
                      : projectByIdData?.user_id?.connection_status ===
                        'PENDING'
                      ? 'Pending'
                      : projectByIdData?.user_id?.connection_status ===
                        'APPROVED'
                      ? 'Start Chat'
                      : 'Loading...'}
                  </FindProjectConnectButton>
                  <FindProjectViewProfileButton
                    disabled={userDetails?.subPlan === 'FREE'}
                    onClick={() =>
                      router.push(
                        `/investor/founder/${projectByIdData?.user_id?._id}`
                      )
                    }
                  >
                    View Profile
                  </FindProjectViewProfileButton>
                </Stack>
              </Stack>
            </Stack>
          </CardWrapper>
          <ProjectTilesCard
            title="Project Overview"
            data={ProjectOverviewCardData}
          />
        </Grid>
      </Grid>
    </FindProjectDetailsWrapper>
  );
};

export default FindProjectDetailsPage;
