"use client";
import React, { useCallback, useEffect, useState } from "react";
import {
  InvestorDetailsConnectButton,
  InvestorDetailsPageWrapper,
} from "./style";
import { Button, Grid, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { CardWrapper } from "@/components/common/ui";
import InvestorDetailsCard from "@/components/investor-details";
import ProjectTilesCard from "@/components/common/project-tiles-card";
import {
  CompanyProfileData,
  InvestorProfileData,
  InvestorDetails,
} from "./data";
import { FOUNDER } from "@/helpers/constants";
import { toast } from "react-toastify";
import { api } from "@/services/axiosInstance";
import {
  createConnectionRequest,
  getInvestorById,
} from "@/services/apiDefinition";

const reqStatus: any = {
  APPROVED: "Start Chat",
  PENDING: "Requested",
  NONE: "Connect",
};

const InvestorDetailsPage = ({ investorId }: { investorId: string }) => {
  const [investorDetails, setInvestorDetails] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchConnectedTabData = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await api.get(`${getInvestorById}/${investorId}`);
      if (res.success) {
        setInvestorDetails(res.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  }, [investorId]);

  useEffect(() => {
    fetchConnectedTabData();
  }, [fetchConnectedTabData]);

  const handleConnect = async () => {
    try {
      const res: any = await api.post(createConnectionRequest, {
        connect_user_id: investorDetails[0]?._id,
      });
      if (res.success) {
        fetchConnectedTabData();
        toast.success(res.message || "Request Sent successfully");
      }
    } catch (error: any) {
      toast.error(error?.response.data.message || "Request unsuccessful");
    }
  };

  const projectValue: any = {
    companyName: investorDetails[0]?.company?.company_name,
    industry: investorDetails[0]?.company?.industry,
    contactFunction: investorDetails[0]?.company?.contact_function,
    noOfEmp: investorDetails[0]?.company?.number_of_employees,
    webSite: investorDetails[0]?.company?.website,
  };

  const investorValue: any = {
    investmentRange:
      investorDetails[0]?.investment_criteria?.funding_amount || "Not Found",
    intrustedIndustry:
      investorDetails[0]?.investment_criteria?.desired_industry || "Not Found",
    location: investorDetails[0]?.country || "Not Found",
    companyStage:
      investorDetails[0]?.investment_criteria?.desired_funding_stage ||
      "Not Found",
    developmentStage:
      investorDetails[0]?.investment_criteria?.stage_of_development ||
      "Not Found",
  };

  const updatedInvestorData = InvestorProfileData.map((item, index) => {
    return {
      ...item,
      value: Object.values(investorValue)[index] as string,
    };
  });

  const updatedCompanyData = CompanyProfileData.map((item, index) => {
    return {
      ...item,
      value: Object.values(projectValue)[index] as string,
    };
  });

  return (
    <InvestorDetailsPageWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <CardWrapper>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h4">Investor Details</Typography>
              <InvestorDetailsConnectButton
                variant="outlined"
                onClick={handleConnect}
                disabled={isLoading}
              >
                {!isLoading
                  ? reqStatus[investorDetails[0]?.connection_status]
                  : "Connect..."}
              </InvestorDetailsConnectButton>
            </Stack>
            {investorDetails.length > 0 && (
              <InvestorDetailsCard data={investorDetails[0]} type={FOUNDER} />
            )}
          </CardWrapper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Stack spacing={2}>
            <ProjectTilesCard
              title="Investor Profile"
              data={updatedInvestorData}
            />
            <ProjectTilesCard
              title="Company Profile"
              data={updatedCompanyData}
            />
          </Stack>
        </Grid>
      </Grid>
    </InvestorDetailsPageWrapper>
  );
};

export default InvestorDetailsPage;
