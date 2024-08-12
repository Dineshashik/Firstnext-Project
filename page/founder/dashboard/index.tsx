'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { DashboardWrapper } from './style';
import { Box, Grid, Stack, Typography } from '@mui/material';
import ProjectCard from '@/components/common/project-card';
import { ProjectData } from './data';
import { TitleButtonBoxWrapper } from '@/components/common/ui';
import DashboardTextCard from '@/components/common/dashboard-text-card';
import StatisticsCard from '@/components/dashboard/statistics-card';
import TotalProjectCard from '@/components/dashboard/total-project-card';
import MessageRequestCard from '@/components/common/message-request-card';
import { FOUNDER } from '@/helpers/constants';
import { useRouter } from 'next/navigation';
import { api } from '@/services/axiosInstance';
import {
  getUserProjects,
  getConnections,
  manageConnection,
  getThreads,
  getDropdownListOfProject,
  founderDashboardProject,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';
import { pages } from 'next/dist/build/templates/app-page';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { messagesData } from '@/helpers/messagesData';
import { connectionsData } from '@/helpers/connectionsData';

const FounderDashboard = () => {
  const router = useRouter();
  const userDetails: any = useAppSelector(user);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [projectAllData, setProjectAllData] = useState<any>([]);
  const [connectionRequest, setConnectionRequest] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);
  const [projectListDashboardData, setProjectListDashboardData] = useState<any>(
    []
  );
  const [projectData, setProjectData] = useState<any>();
  const [project, setProject] = useState('');

  const fetchProjectData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<any>(getUserProjects, {
        closed: false,
        page: 1,
        limit: 15,
      });
      if (response.success) {
        setIsLoading(false);
        setProjectAllData(response.data.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const fetchConnectionRequestData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<any>(getConnections, {
        page: 1,
        limit: 15,
        type: 'requested',
      });
      if (response.success) {
        setIsLoading(false);
        setConnectionRequest(response.data.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const getChatList = async () => {
    try {
      const res: any = await api.get(getThreads);
      if (res.success) {
        setChatList(res.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const fetchInvestorDashboardData = async () => {
    try {
      const response = await api.get<any>(getDropdownListOfProject);
      if (response.success) {
        setProjectListDashboardData(response.data);
        setProject(response.data[0]?._id);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  const fetchFounderDashboardProjectData = useCallback(async () => {
    try {
      if (!project) return;
      const response = await api.get<any>(`${founderDashboardProject}`, {
        project_id: project.toString(),
      });
      if (response.success && response.data) {
        setProjectData(response.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }, [project]);

  useEffect(() => {
    fetchFounderDashboardProjectData();
  }, [project]);

  useEffect(() => {
    fetchInvestorDashboardData();
    fetchProjectData();
  }, []);

  useEffect(() => {
    fetchConnectionRequestData();
    getChatList();
  }, [userDetails?.subPlan]);

  const onAccept = async (id: string) => {
    if (userDetails?.subPlan === 'PREMIUM') {
      const reqData = {
        connect_user_id: id,
        status: 'APPROVED',
      };
      try {
        const res: any = await api.post(manageConnection, reqData);
        if (res.success) {
          toast.success(res.message || 'Approved successfully');
          fetchConnectionRequestData();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  const onIgnore = async (id: string) => {
    if (userDetails?.subPlan === 'PREMIUM') {
      const reqData = {
        connect_user_id: id,
        status: 'REJECTED',
      };
      try {
        const res: any = await api.post(manageConnection, reqData);
        if (res.success) {
          toast.success(res.message || 'Rejected successfully');
          fetchConnectionRequestData();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }
  };

  return (
    <DashboardWrapper>
      <Grid
        container
        spacing={3}
      >
        <Grid
          item
          lg={8}
          xs={12}
        >
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <StatisticsCard
                type={FOUNDER}
                project={project}
                setProject={setProject}
                adminDashboardData={{ projectListDashboardData, projectData }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              {/* <Grid
                container
                spacing={3}
              >
                <Grid
                  item
                  xs={12}
                > */}
                  <TotalProjectCard />
                {/* </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <DashboardTextCard />
                </Grid>
              </Grid> */}
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <TitleButtonBoxWrapper
                title="Messages"
                buttonName="View All"
                onClick={() => router.push('/founder/chats')}
                showButton={true}
              >
                {userDetails?.subPlan === 'PREMIUM' && (
                  <>
                    {chatList.length > 0 ? (
                      <MessageRequestCard
                        cardType="message"
                        height="450px"
                        data={chatList}
                        type={FOUNDER}
                        isBlurred={false}
                      />
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="220px"
                      >
                        <Typography
                          variant="h6"
                          align="center"
                        >
                          No Message Found
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                {userDetails?.subPlan === 'FREE' && (
                  <MessageRequestCard
                    cardType="message"
                    height="220px"
                    data={messagesData}
                    type={FOUNDER}
                    isBlurred={true}
                  />
                )}
              </TitleButtonBoxWrapper>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <TitleButtonBoxWrapper
                title="Connection Requests"
                buttonName="View All"
                onClick={() => router.push('/founder/investors')}
                showButton={true}
              >
                {userDetails?.subPlan === 'PREMIUM' && (
                  <>
                    {connectionRequest.length > 0 ? (
                      <MessageRequestCard
                        cardType="request"
                        height="450px"
                        data={connectionRequest}
                        onAccept={onAccept}
                        onIgnore={onIgnore}
                      />
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="220px"
                      >
                        <Typography
                          variant="h6"
                          align="center"
                        >
                          No Connections Found
                        </Typography>
                      </Box>
                    )}
                  </>
                )}

                {userDetails?.subPlan === 'FREE' && (
                  <MessageRequestCard
                    cardType="request"
                    height="220px"
                    data={connectionsData}
                    onAccept={onAccept}
                    onIgnore={onIgnore}
                    isBlurred={true}
                  />
                )}
              </TitleButtonBoxWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          lg={4}
          xs={12}
        >
          <TitleButtonBoxWrapper
            title="Your Projects"
            buttonName="View All"
            onClick={() => router.push('/founder/project-management')}
            showButton={true}
          >
            {projectAllData.length > 0 ? (
              <Box
                sx={{
                  maxHeight: { sm: 'auto', lg: 'calc(100vh - 80px)' },
                  overflowY: 'auto',
                }}
              >
                <Grid
                  container
                  spacing={2}
                >
                  {!isLoading ? (
                    projectAllData.map((item: any) => (
                      <Grid
                        item
                        key={item._id}
                        xs={12}
                        md={6}
                        lg={12}
                      >
                        <ProjectCard
                          type={FOUNDER}
                          data={item}
                        />
                      </Grid>
                    ))
                  ) : (
                    <>
                      <Skeleton
                        variant="rectangular"
                        height={200}
                      />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </>
                  )}
                </Grid>
                <Stack
                  direction={{ xs: 'column', md: 'row', lg: 'column' }}
                  spacing={2}
                ></Stack>
              </Box>
            ) : (
              <Typography
                variant="h6"
                align="center"
              >
                No result found. Please add the Project
              </Typography>
            )}
          </TitleButtonBoxWrapper>
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
};

export default FounderDashboard;
