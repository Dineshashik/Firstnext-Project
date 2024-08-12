import React, { useEffect, useState } from 'react';
import DynamicTabs from '@/components/common/custom-tab';
import CustomDialog from '@/components/common/dialog';
import AdminDetails from '@/components/admin-details';
// import {
//   CompanyDetails,
//   PersonalDetails,
//   PricingDetails,
//   ProjectDetails,
// } from './data';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { getUserDetails } from '@/services/apiDefinition';
import Image from 'next/image';
import { Grid, Stack, Theme, Typography, useMediaQuery } from '@mui/material';
import { AvtarImageWrapper } from './style';

const InvestorModal = ({
  open,
  onClose,
  userId,
  onRejectClick,
  onMoreDetailsClick,
  onApproveClick,
}: {
  open: boolean;
  onClose: () => void;
  userId: string | null;
  onRejectClick: (rowId: string) => void;
  onMoreDetailsClick: (rowId: string) => void;
  onApproveClick: (rowId: string) => void;
}) => {
  const [userDetails, setUserDetails] = useState<any>();
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const res: any = await api.get(`${getUserDetails}/${userId}`);
        if (res.success && res.data) {
          setUserDetails(res.data[0]);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }
    if (userId) {
      fetchUserDetails();
    }
  }, [userId]);

  const PersonalDetails = {
    name: `${userDetails?.first_name} ${userDetails?.last_name}`,
    email: userDetails?.email,
    phone_number: userDetails?.phone,
    location: userDetails?.country,
  };

  const CompanyDetails = {
    company_name: userDetails?.company?.company_name,
    website: userDetails?.company?.website,
    established_year: userDetails?.company?.established_year,
    no_of_employees: userDetails?.company?.number_of_employees,
    industry_or_sector: userDetails?.company?.industry,
    Location:  userDetails?.company?.company_location,
    company_description: userDetails?.company?.description,
    contact_person_name: `${userDetails?.first_name} ${userDetails?.last_name}`,
    contact_no: userDetails?.company?.contact_number,
    contact_function: userDetails?.company?.contact_function,
    // documents: [
    //   {
    //     id: 1,
    //     name: 'Project Funded/Closed',
    //   },
    //   {
    //     id: 2,
    //     name: 'Project Funded/Closed',
    //   },
    //   {
    //     id: 3,
    //     name: 'Project Funded/Closed',
    //   },
    //   {
    //     id: 4,
    //     name: 'Project Funded/Closed',
    //   },
    // ],
    documents: userDetails?.company?.company_docs,
  };

  const InvestmentCriteriaDetails: any = {
    desired_stage_of_dev:
      userDetails?.investment_criteria?.stage_of_development,
    desired_location: userDetails?.investment_criteria?.desired_location,
    funding_amount_available: userDetails?.investment_criteria?.funding_amount,
    desired_funding_stage:
      userDetails?.investment_criteria?.desired_funding_stage,
    desired_return: userDetails?.investment_criteria?.desired_return,
    exit_strategy: userDetails?.investment_criteria.exit_strategy,
    desired_benefits_of_investors:
      userDetails?.investment_criteria.investor_benefits,
  };

  const PricingDetails = {
    pricing: userDetails?.plan?.plan_type,
    start_date: new Date(
      userDetails?.subscription?.start_date
    ).toLocaleDateString('en-GB'),
    end_date: new Date(userDetails?.subscription?.end_date).toLocaleDateString(
      'en-GB'
    ),
  };

  const tabs = [
    {
      name: 'Personal Details',
      content: <AdminDetails data={PersonalDetails} />,
    },
    {
      name: 'Company Details',
      content: <AdminDetails data={CompanyDetails} />,
    },
    {
      name: 'Investment Criteria',
      content: <AdminDetails data={InvestmentCriteriaDetails} />,
    },
    { name: 'Pricing', content: <AdminDetails data={PricingDetails} /> },
  ];

  return (
    <CustomDialog
      open={open}
      onClose={onClose}
      title="Investor Details"
      onReject={onRejectClick}
      onMoreDetails={onMoreDetailsClick}
      onApprove={onApproveClick}
      userId={userId as string}
      isUserVerified={userDetails?.admin_status === 'APPROVED'}
    >
      <Grid
        container
        spacing={4}
      >
        <Grid
          item
          xs={12}
          md={3}
        >
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
            sx={{ position: 'sticky', top: 0 }}
          >
            <AvtarImageWrapper
              src={
                userDetails?.profile?.image_url ||
                '/asset/icon/avtar-profile.svg'
              }
              width={isSmallScreen ? 160 : 240}
              height={isSmallScreen ? 160 : 240}
              alt="profile"
            />
            <Typography align="center">
              Joined from{' '}
              {new Date(userDetails?.created_at).toLocaleDateString('en-GB')}
            </Typography>
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
        >
          <DynamicTabs tabs={tabs} />
        </Grid>
      </Grid>
    </CustomDialog>
  );
};

export default InvestorModal;
