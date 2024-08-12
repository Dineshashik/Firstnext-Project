"use client";
import React, { useEffect, useState } from "react";
import { DashboardWrapper } from "./style";
import { Box, Grid, Stack } from "@mui/material";
import ProjectCard from "@/components/common/project-card";
import { AdminFounderCardData, AdminInvestorCardData } from "./data";
import { TitleButtonBoxWrapper } from "@/components/common/ui";
import DashboardTextCard from "@/components/common/dashboard-text-card";
import StatisticsCard from "@/components/dashboard/statistics-card";
import TotalProjectCard from "@/components/dashboard/total-project-card";
import MessageRequestCard from "@/components/common/message-request-card";
import { ADMIN, FOUNDER } from "@/helpers/constants";
import DashboardAdminCard from "@/components/common/dashboard-admin-card";
import { api } from "@/services/axiosInstance";
import { getAdminDashboard } from "@/services/apiDefinition";
import { toast } from "react-toastify";

const AdminDashboard = () => {
  const [adminDashboardData, setAdminDashboardData] = useState<any>([]);

  const fetchAdminDashboardData = async () => {
    try {
      const response = await api.get<any>(getAdminDashboard);
      if (response.success && response.data) {
        setAdminDashboardData(response.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    fetchAdminDashboardData();
  }, []);

  const AdminFounderData = (data: any) => {
    return [
      {
        id: 1,
        title: "Total No. of Founders",
        number: data?.totalFounders,
        iconUrl: "/asset/icon/dash-icon-founder.svg",
        bgIconUrl: "/asset/icon/dash-founder.svg",
        role: "founder",
        type: "",
      },
      {
        id: 2,
        title: "Active Founders",
        number: data?.activeFounders,
        iconUrl: "/asset/icon/dash-icon-founder.svg",
        bgIconUrl: "/asset/icon/dash-founder.svg",
        role: "founder",
        type: "active",
      },
      {
        id: 3,
        title: "Inactive Founders",
        number: data?.inactiveFounders,
        iconUrl: "/asset/icon/dash-icon-founder.svg",
        bgIconUrl: "/asset/icon/dash-founder.svg",
        role: "founder",
        type: "inactive",
      },
    ];
  };

  const AdminInvestorData = (data: any) => {
    return [
      {
        id: 1,
        title: "Total No. of Investors",
        number: data?.totalInvestor,
        iconUrl: "/asset/icon/dash-icon-investor.svg",
        bgIconUrl: "/asset/icon/dash-investor.svg",
        role: "investor",
        type: "",
      },
      {
        id: 2,
        title: "Active Investors",
        number: data?.activeInvestor,
        iconUrl: "/asset/icon/dash-icon-investor.svg",
        bgIconUrl: "/asset/icon/dash-investor.svg",
        role: "investor",
        type: "active",
      },
      {
        id: 3,
        title: "Inactive Investors",
        number: data?.inactiveInvestor,
        iconUrl: "/asset/icon/dash-icon-investor.svg",
        bgIconUrl: "/asset/icon/dash-investor.svg",
        role: "investor",
        type: "inactive",
      },
    ];
  };

  const tempData = AdminFounderData(adminDashboardData);
  const dummyData = AdminInvestorData(adminDashboardData);

  return (
    <DashboardWrapper>
      <Grid container spacing={3}>
        {tempData &&
          tempData.map((data: any, index: any) => (
            <Grid item lg={4} md={6} xs={12} key={index + 1}>
              <DashboardAdminCard data={data} />
            </Grid>
          ))}

        {dummyData &&
          dummyData.map((data: any, index: any) => (
            <Grid item lg={4} md={6} xs={12} key={index + 1}>
              <DashboardAdminCard data={data} />
            </Grid>
          ))}

        <Grid item lg={4} md={6} xs={12}>
          <StatisticsCard
            title="Total Projects"
            type={ADMIN}
            adminDashboardData={adminDashboardData}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <StatisticsCard
            title="Total Revenue"
            type={ADMIN}
            adminDashboardData={adminDashboardData}
          />
        </Grid>
        <Grid item lg={4} md={6} xs={12}>
          <DashboardAdminCard
            data={{
              id: 3,
              title: "Amount Being Raised",
              number: `$${
                new Intl.NumberFormat().format(
                  Math.floor(adminDashboardData?.amountRaised)
                ) || 0
              }`,
              iconUrl: "/asset/icon/dash-icon-project.svg",
              bgIconUrl: "/asset/icon/dash-project-view.svg",
            }}
          />
        </Grid>
      </Grid>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
