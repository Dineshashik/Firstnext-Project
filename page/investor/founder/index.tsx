"use client";
import React, { useEffect, useState, useCallback } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { FounderInput, FounderInputWrapper, FounderWrapper } from "./style";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import DynamicTabs from "@/components/common/custom-tab";
import InvestorCard from "@/components/common/investor-card";
import { APPROVED, INVESTOR, REJECTED } from "@/helpers/constants";
import { api } from "@/services/axiosInstance";
import {
  createConnectionRequest,
  getConnections,
  manageConnectionRequest,
} from "@/services/apiDefinition";
import { toast } from "react-toastify";
import useDebouncedValue from "@/utils/useDebounced";
import { useSocket } from "@/context/SocketContext";
import { useAppSelector } from "@/lib/hooks";
import { user } from "@/lib/slices/userSlice";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { connectionsData } from "@/helpers/connectionsData";

const RequestedTabContent = ({ searchValue }: { searchValue: string }) => {
  const [requestedTabContent, setRequestedTabContent] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);
  const userDetails: any = useAppSelector(user);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const fetchRequestedTabData = useCallback(
    async (search = false) => {
      if (search) {
        setPage(1);
      }
      try {
        setIsLoading(true);
        const res: any = await api.get(getConnections, {
          page,
          limit: 8,
          type: "requested",
          search: debouncedSearchTerm,
        });
        if (res.success && res.data) {
          setIsLoading(false);
          setRequestedTabContent(res?.data.data);
          setTotalPage(res.data.pagination.totalPages);
          setCount(res.data.pagination.totalCount);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
    [debouncedSearchTerm, page]
  );
  // useEffect(() => {
  //   if (userDetails?.subPlan === 'PREMIUM') {
  //     fetchRequestedTabData();
  //   }
  // }, [debouncedSearchTerm, fetchRequestedTabData, userDetails?.subPlan]);

  useEffect(() => {
    if (userDetails?.subPlan === "PREMIUM") {
      fetchRequestedTabData();
    }
  }, [fetchRequestedTabData, userDetails?.subPlan]);

  useEffect(() => {
    fetchRequestedTabData(true);
  }, [debouncedSearchTerm]);

  const handleChangePage = (e: any, p: number) => {
    setPage(p);
  };

  const onIgnore = async (userId: string) => {
    try {
      const res = await api.post(manageConnectionRequest, {
        connect_user_id: userId,
        status: REJECTED,
      });

      if (res.success) {
        fetchRequestedTabData();
        toast.success(res.message || "Request Rejected");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const onAccept = async (userId: string) => {
    try {
      const res = await api.post(manageConnectionRequest, {
        connect_user_id: userId,
        status: APPROVED,
      });

      if (res.success) {
        fetchRequestedTabData();
        toast.success(res.message || "Request Accepted");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (isLoading) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Loading...
      </Typography>
    );
  }
  if (userDetails?.subPlan === "PREMIUM" && requestedTabContent.length === 0) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        No Requested Founder
      </Typography>
    );
  }
  return (
    <>
      <Grid container spacing={2}>
        {userDetails?.subPlan === "PREMIUM" &&
          requestedTabContent.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <InvestorCard
                data={item}
                type={INVESTOR}
                cardType="requested"
                onIgnore={onIgnore}
                onAccept={onAccept}
              />
            </Grid>
          ))}
        {userDetails?.subPlan === "FREE" &&
          connectionsData.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <InvestorCard
                data={item}
                type={INVESTOR}
                cardType="requested"
                onIgnore={onIgnore}
                onAccept={onAccept}
                isBlurred={userDetails?.role == "INVESTOR" ? false : true}
              />
            </Grid>
          ))}
      </Grid>
      {count > 8 && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            siblingCount={0}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </>
  );
};

const ConnectedTabContent = ({ searchValue }: { searchValue: string }) => {
  const [connectedTabContent, setConnectedTabContent] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const fetchConnectedTabData = useCallback(
    async (search = false) => {
      if (search) {
        setPage(1);
      }
      try {
        setIsLoading(true);

        const res: any = await api.get(getConnections, {
          page,
          limit: 8,
          type: "connected",
          search: debouncedSearchTerm,
        });
        if (res.success && res.data) {
          setIsLoading(false);
          setConnectedTabContent(res?.data.data);
          setTotalPage(res.data.pagination.totalPages);
          setCount(res.data.pagination.totalCount);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    },
    [debouncedSearchTerm, page]
  );
  useEffect(() => {
    if (userDetails?.subPlan === "PREMIUM") {
      fetchConnectedTabData();
    }
  }, [fetchConnectedTabData, userDetails?.subPlan]);

  useEffect(() => {
    fetchConnectedTabData(true);
  }, [debouncedSearchTerm]);

  const handleChangePage = (e: any, p: number) => {
    setPage(p);
  };

  const onStartChat = (investorId: string) => {
    if (socket && userDetails) {
      socket.emit("user_online", userDetails._id);

      socket.emit("create_room", {
        sender: userDetails._id.toString(),
        receiver: investorId.toString(),
      });

      socket.on("chat_room_id", (roomId) => {
        router.push(`/investor/chats/${roomId}`);
      });
    }
  };

  if (isLoading) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        Loading...
      </Typography>
    );
  }
  if (userDetails?.subPlan === "PREMIUM" && connectedTabContent.length === 0) {
    return (
      <Typography variant="h6" align="center" mt={4}>
        No Connected Founder
      </Typography>
    );
  }
  return (
    <>
      <Grid container spacing={2}>
        {userDetails?.subPlan === "PREMIUM" &&
          connectedTabContent.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <InvestorCard
                data={item}
                type={INVESTOR}
                cardType="connected"
                onStartChat={onStartChat}
              />
            </Grid>
          ))}
        {userDetails?.subPlan === "FREE" &&
          connectionsData.map((item: any) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
              <InvestorCard
                data={item}
                type={INVESTOR}
                cardType="connected"
                onStartChat={onStartChat}
                isBlurred={userDetails?.role == "INVESTOR" ? false : true}
              />
            </Grid>
          ))}
      </Grid>
      {count > 8 && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            siblingCount={0}
            onChange={handleChangePage}
          />
        </Box>
      )}
    </>
  );
};

const FounderPage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const tabs = [
    {
      name: "Requested Founders",
      content: <RequestedTabContent searchValue={searchValue} />,
    },
    {
      name: "Connected Founders",
      content: <ConnectedTabContent searchValue={searchValue} />,
    },
  ];

  return (
    <FounderWrapper>
      <Stack
        direction={{ sx: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" mb={{ xs: 1, md: 0 }}>
          Founders
        </Typography>
        <FounderInputWrapper
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <FounderInput
            type="text"
            id="search"
            name="search"
            placeholder="Search by name or email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <Stack alignItems="center">
            <SearchIcon />
          </Stack>
        </FounderInputWrapper>
      </Stack>
      <Box>
        <DynamicTabs tabs={tabs} />
      </Box>
    </FounderWrapper>
  );
};

export default FounderPage;
