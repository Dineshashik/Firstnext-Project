"use client";
import { Box, Grid, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { InvestorDashboardWrapper } from "./style";
import { TitleButtonBoxWrapper } from "@/components/common/ui";
import MessageRequestCard from "@/components/common/message-request-card";
import ProjectCard from "@/components/common/project-card";
import { InvestorProjectData, InvestorDashboardCardData } from "./data";
import DashboardCard from "@/components/common/dashboard-card";
import { INVESTOR } from "@/helpers/constants";
import { useRouter } from "next/navigation";
import { api } from "@/services/axiosInstance";
import {
  getInvestorDashboard,
  projectFindAll,
  getConnections,
  manageConnection,
  getThreads,
} from "@/services/apiDefinition";
import { toast } from "react-toastify";
import Skeleton from "@mui/material/Skeleton";
import { useAppSelector } from "@/lib/hooks";
import { user } from "@/lib/slices/userSlice";
import { projectData } from "@/helpers/projectData";
import { messagesData } from "@/helpers/messagesData";
import { connectionsData } from "@/helpers/connectionsData";

const InvestorDashboard = () => {
  const router = useRouter();
  const userDetails: any = useAppSelector(user);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invesotrDashboardData, setInvesotrDashboardData] = useState<any>([]);
  const [projectAllData, setProjectAllData] = useState<any>([]);
  const [connectionRequest, setConnectionRequest] = useState<any>([]);
  const [chatList, setChatList] = useState<any>([]);
  const fetchInvestorDashboardData = async () => {
    try {
      const response = await api.get<any>(getInvestorDashboard);
      if (response.success) {
        setInvesotrDashboardData(response.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchProjectData = async () => {
    try {
      setIsLoading(true);
      const response = await api.post<any>(
        projectFindAll,
        {
          page: 1,
          limit: 5,
        },
        "application/json"
      );
      if (response.success) {
        setIsLoading(false);
        setProjectAllData(response.data.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const fetchConnectionRequestData = async () => {
    try {
      setIsLoading(true);
      const response = await api.get<any>(getConnections, {
        page: 1,
        limit: 10,
        type: "requested",
      });
      if (response.success) {
        setIsLoading(false);
        setConnectionRequest(response.data.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const getChatList = async () => {
    try {
      const res: any = await api.get(getThreads);
      if (res.success) {
        setChatList(res.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchInvestorDashboardData();
  }, []);

  useEffect(() => {
    if (userDetails?.subPlan === "PREMIUM") {
      fetchProjectData();
      getChatList();
      fetchConnectionRequestData();
    }
  }, [userDetails?.subPlan]);

  const convertData = (data: any) => {
    return [
      {
        title: "Total Projects Bookmarked",
        number: data.bookmarkCount,
        iconUrl: "/asset/icon/dash-project-view.svg",
        redirect: "/investor/bookmark",
      },
      {
        title: "Total Connections",
        number: data.totalConnection,
        iconUrl: "/asset/icon/total-connection.svg",
        redirect: "/investor/founder",
      },
    ];
  };

  const tempData = convertData(invesotrDashboardData);

  const onAccept = async (id: string) => {
    if (userDetails?.subPlan === "PREMIUM") {
      const reqData = {
        connect_user_id: id,
        status: "APPROVED",
      };
      try {
        const res: any = await api.post(manageConnection, reqData);
        if (res.success) {
          toast.success(res.message || "Approved successfully");
          fetchConnectionRequestData();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  const onIgnore = async (id: string) => {
    if (userDetails?.subPlan === "PREMIUM") {
      const reqData = {
        connect_user_id: id,
        status: "REJECTED",
      };
      try {
        const res: any = await api.post(manageConnection, reqData);
        if (res.success) {
          toast.success(res.message || "Rejected successfully");
          fetchConnectionRequestData();
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
  };

  return (
    <InvestorDashboardWrapper>
      <Grid container spacing={3}>
        <Grid item lg={8} xs={12}>
          <Grid container spacing={3}>
            {tempData &&
              tempData?.map((item: any, index: any) => (
                <Grid item xs={12} md={6} key={index + 1}>
                  <DashboardCard data={item} />
                </Grid>
              ))}

            <Grid item xs={12} md={6}>
              <TitleButtonBoxWrapper
                title="Messages"
                buttonName="View All"
                onClick={() => router.push("/investor/chats")}
                showButton={true}
              >
                {userDetails?.subPlan === "PREMIUM" && (
                  <>
                    {chatList.length > 0 ? (
                      <MessageRequestCard
                        cardType="message"
                        height="450px"
                        data={chatList}
                        type={INVESTOR}
                        isBlurred={false}
                      />
                    ) : (
                      <Box
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        height="450px"
                      >
                        <Typography variant="h6" align="center">
                          No Message Found
                        </Typography>
                      </Box>
                    )}
                  </>
                )}
                {userDetails?.subPlan === "FREE" && (
                  <MessageRequestCard
                    cardType="message"
                    height="450px"
                    data={messagesData}
                    type={INVESTOR}
                    isBlurred={userDetails?.role == "INVESTOR" ? false :  true}
                  />
                )}
              </TitleButtonBoxWrapper>
            </Grid>
            <Grid item xs={12} md={6}>
              <TitleButtonBoxWrapper
                title="Connection Requests"
                buttonName="View All"
                onClick={() => router.push("/investor/founder")}
                showButton={true}
              >
                {/* {isLoading ? (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="450px"
                  >
                    <Typography
                      variant="h6"
                      align="center"
                      mt={4}
                    >
                      Loading...
                    </Typography>
                  </Box>
                ) : connectionRequest.length !== 0 ? (
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
                    height="450px"
                  >
                    <Typography
                      variant="h6"
                      align="center"
                    >
                      Data Not Found
                    </Typography>
                  </Box>
                )} */}
                {userDetails?.subPlan === "PREMIUM" && (
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
                        height="450px"
                      >
                        <Typography variant="h6" align="center">
                          No Connections Found
                        </Typography>
                      </Box>
                    )}
                  </>
                )}

                {userDetails?.subPlan === "FREE" && (
                  <MessageRequestCard
                    cardType="request"
                    height="450px"
                    data={connectionsData}
                    onAccept={onAccept}
                    onIgnore={onIgnore}
                    isBlurred={userDetails?.role == "INVESTOR" ? false : true}
                  />
                )}
              </TitleButtonBoxWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={4} xs={12}>
          <TitleButtonBoxWrapper
            title="Latest Projects"
            buttonName="View All"
            onClick={() => router.push("/investor/find-project")}
            showButton={true}
          >
            {userDetails?.subPlan === "PREMIUM" && (
              <>
                {projectAllData.length > 0 ? (
                  <Box
                    sx={{
                      maxHeight: { sm: "auto", lg: "685px" },
                      overflowY: "auto",
                    }}
                  >
                    <Stack
                      direction={{ xs: "column", md: "row", lg: "column" }}
                      spacing={2}
                    >
                      {!isLoading ? (
                        <>
                          {projectAllData?.map((item: any) => (
                            <ProjectCard
                              key={item._id}
                              type={INVESTOR}
                              data={item}
                              fetchProjectData={fetchProjectData}
                              // isBlurred={true}
                            />
                          ))}
                        </>
                      ) : (
                        <>
                          <Skeleton variant="rectangular" height={200} />
                          <Skeleton />
                          <Skeleton />
                          <Skeleton />
                        </>
                      )}
                    </Stack>
                  </Box>
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    height="685px"
                  >
                    <Typography variant="h6" align="center">
                      No Project Found
                    </Typography>
                  </Box>
                )}
              </>
            )}
            {userDetails?.subPlan === "FREE" && (
              <Box
                sx={{
                  maxHeight: { sm: "auto", lg: "685px" },
                  overflowY: "auto",
                }}
              >
                <Stack
                  direction={{ xs: "column", md: "row", lg: "column" }}
                  spacing={2}
                >
                  {!isLoading ? (
                    <>
                      {userDetails?.subPlan === "FREE" &&
                        projectData?.map((item: any) => (
                          <ProjectCard
                            key={item._id}
                            type={INVESTOR}
                            data={item}
                            fetchProjectData={fetchProjectData}
                            isBlurred={userDetails?.role == "INVESTOR" ? false :true}
                          />
                        ))}
                    </>
                  ) : (
                    <>
                      <Skeleton variant="rectangular" height={200} />
                      <Skeleton />
                      <Skeleton />
                      <Skeleton />
                    </>
                  )}
                </Stack>
              </Box>
            )}
          </TitleButtonBoxWrapper>
        </Grid>
      </Grid>
    </InvestorDashboardWrapper>
  );
};

export default InvestorDashboard;
