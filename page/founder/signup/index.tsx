'use client';
import { CardWrapper, CustomButton } from '@/components/common/ui';
import PersonalDetails from '@/components/signup/personal-details';
import {
  Box,
  Container,
  Grid,
  Stack,
  Tabs,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  FounderSignupCardTab,
  FounderSignupPageWrapper,
  FounderApprovalCardWrapper,
} from './style';
import Image from 'next/image';
import SignupCompanyDetails from '@/components/signup/company-details';
import SignupProjectDetails from '@/components/signup/project-details';
import SignupPricing from '@/components/signup/signup-pricing';
import { FOUNDER } from '@/helpers/constants';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import {
  getCompany,
  getUserProjects,
  updateUserProfile,
} from '@/services/apiDefinition';
import { truncate } from 'fs/promises';
import Link from 'next/link';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      minHeight="100%"
    >
      {value === index && (
        <Box
          minHeight="100%"
          display="flex"
          flexDirection="column"
        >
          {children}
        </Box>
      )}
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TabData = [
  {
    id: 0,
    iconUrl: '/asset/icon/profile.svg',
    title: 'Personal Details',
  },
  {
    id: 1,
    iconUrl: '/asset/icon/company.svg',
    title: 'Company Details',
  },
  {
    id: 2,
    iconUrl: '/asset/icon/project-managment.svg',
    title: 'Project Details',
  },
  {
    id: 3,
    iconUrl: '/asset/icon/subscriptions.svg',
    title: 'Pricing',
  },
];

const TabDataMoreDetails = [
  {
    id: 0,
    iconUrl: '/asset/icon/profile.svg',
    title: 'Personal Details',
  },
  {
    id: 1,
    iconUrl: '/asset/icon/company.svg',
    title: 'Company Details',
  },
  {
    id: 2,
    iconUrl: '/asset/icon/project-managment.svg',
    title: 'Project Details',
  },
];

type TabKeys = 'DETAILS' | 'COMPANY' | 'OTHER' | 'PRICE' | 'ADMIN';

const showTab: any = {
  DETAILS: 0,
  COMPANY: 1,
  OTHER: 2,
  PRICE: 3,
  ADMIN: 4,
};

const revShowTab: any = {
  0: 'DETAILS',
  1: 'COMPANY',
  2: 'OTHER',
  3: 'PRICE',
};

const FounderSignupPage = ({ tab }: { tab: TabKeys }) => {
  const router = useRouter();
  const [value, setValue] = React.useState<number>(showTab[tab]);
  const [projectDetails, setProjectDetails] = useState();
  const [companyDetails, setCompanyDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userData: any = useAppSelector(user);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= showTab[userData.stage]) {
      router.push(`/founder/signup?tab=${revShowTab[newValue]}`);
      setValue(newValue);
    } else {
      router.push(`/founder/signup?tab=${tab}`);
    }
  };
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );

  useEffect(() => {
    setValue(showTab[tab]);
  }, [tab]);

  const handleClose = () => {
    deleteCookie('token');
    router.push(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
    );
  };

  async function fetchSignupDetails() {
    try {
      setIsLoading(true);
      const projectDetails: any = await api.get(getUserProjects);
      const companyDetails: any = await api.get(getCompany);
      if (projectDetails?.data && projectDetails?.data) {
        setProjectDetails(projectDetails.data?.data[0]);
        setCompanyDetails(companyDetails.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }

  const handleEditDetails = async () => {
    try {
      const res = await api.put(updateUserProfile, {});
      if (res.success) {
        router.push(`/founder/signup?tab=${revShowTab[0]}`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchSignupDetails();
  }, []);
  return (
    <FounderSignupPageWrapper>
      <Container maxWidth="xl">
        {tab === 'ADMIN' ? (
          <FounderApprovalCardWrapper>
            <Image
              src="/asset/images/matchudo_logo.svg"
              alt="attachment"
              width={200}
              height={200}
              style={{ marginBottom: '10px' }}
            />
            <Typography
              variant="h3"
              align="center"
            >
              Thanks for registering on our platform.
            </Typography>
            <Typography
              mt={2}
              mb={6}
              align="center"
            >
              {userData?.admin_status === 'PENDING' &&
                'Your account is now awaiting approval. We will notify you as soon as your details have been verified.'}
              {userData?.admin_status === 'REJECTED' && (
                <>
                  Your account has not been approved. Please contact the support
                  team at{' '}
                  <Link href="mailto:contact@matchudo.com">
                    contact@letsconnect.com
                  </Link>{' '}
                  for further information.
                </>
              )}
              {userData?.admin_status === 'APPROVED' &&
                'Your account is now approved. Please login again.'}
              {userData?.admin_status === 'MORE_DETAILS' &&
              userData?.admin_note &&
              userData?.more_details_updated
                ? 'Thank you for submitting the additional details.'
                : userData?.admin_note}
            </Typography>
            {userData?.admin_note && !userData?.more_details_updated ? (
              <CustomButton
                color="blue"
                onClick={handleEditDetails}
              >
                Edit Details
              </CustomButton>
            ) : (
              <CustomButton
                color="blue"
                onClick={handleClose}
              >
                Close
              </CustomButton>
            )}
          </FounderApprovalCardWrapper>
        ) : (
          <>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                md={4}
                lg={3}
              >
                <CardWrapper>
                  <Tabs
                    orientation={isTablet ? 'horizontal' : 'vertical'}
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    variant="scrollable"
                    visibleScrollbar
                    sx={{ minHeight: { lg: 'calc(100vh - 187px)' } }}
                  >
                    {(userData?.admin_status !== 'MORE_DETAILS'
                      ? TabData
                      : TabDataMoreDetails
                    ).map((item) => (
                      <FounderSignupCardTab
                        // theme={theme}
                        label={
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                          >
                            <Image
                              src={item.iconUrl}
                              alt={item.iconUrl}
                              width={30}
                              height={30}
                            />
                            <Typography variant="h6">{item.title}</Typography>
                          </Stack>
                        }
                        key={item.id}
                        // isActive={value === item.id}
                        {...a11yProps(item.id)}
                      />
                    ))}
                  </Tabs>
                </CardWrapper>
              </Grid>
              <Grid
                item
                xs={12}
                md={8}
                lg={9}
              >
                <TabPanel
                  value={value as number}
                  index={0}
                >
                  <PersonalDetails />
                </TabPanel>
                <TabPanel
                  value={value as number}
                  index={1}
                >
                  {!isLoading ? (
                    <SignupCompanyDetails
                      companyDetails={companyDetails}
                      type={FOUNDER}
                      // fetchSignupDetails={fetchSignupDetails}
                      setCompanyDetails={setCompanyDetails}
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      mt={3}
                      align="center"
                    >
                      Loading...
                    </Typography>
                  )}
                </TabPanel>
                <TabPanel
                  value={value as number}
                  index={2}
                >
                  {!isLoading ? (
                    <SignupProjectDetails
                      fetchSignupDetails={fetchSignupDetails}
                      projectData={projectDetails}
                    />
                  ) : (
                    <Typography
                      variant="h6"
                      mt={3}
                      align="center"
                    >
                      Loading...
                    </Typography>
                  )}
                </TabPanel>
                {userData?.admin_status !== 'MORE_DETAILS' && (
                  <TabPanel
                    value={value as number}
                    index={3}
                  >
                    <SignupPricing type={FOUNDER} />
                  </TabPanel>
                )}
              </Grid>
            </Grid>
          </>
        )}
      </Container>
    </FounderSignupPageWrapper>
  );
};

export default FounderSignupPage;
