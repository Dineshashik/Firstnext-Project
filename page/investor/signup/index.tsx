'use client';
import { useEffect, useState } from 'react';
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
import {
  ApprovalCardWrapper,
  InvestorSignupCardTab,
  InvestorSignupPageWrapper,
} from './style';
import Image from 'next/image';
import SignupCompanyDetails from '@/components/signup/company-details';
import SignupPricing from '@/components/signup/signup-pricing';
import InvestmentCriteria from '@/components/signup/investment-criteria';
import { INVESTOR } from '@/helpers/constants';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import {
  getCompany,
  getInvestmentCriteria,
  updateUserProfile,
} from '@/services/apiDefinition';
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
    iconUrl: '/asset/icon/investment-criteria.svg',
    title: 'Investment Criteria',
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
    iconUrl: '/asset/icon/investment-criteria.svg',
    title: 'Investment Criteria',
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
const InvestorSignupPage = ({ tab }: { tab: TabKeys }) => {
  const router = useRouter();
  const [value, setValue] = useState(showTab[tab]);
  const [companyDetails, setCompanyDetails] = useState<any>();
  const [investmentCriteria, setInvestmentCriteria] = useState<any>();
  const userData = useAppSelector(user) as any;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue <= showTab[userData.stage]) {
      router.push(`/investor/signup?tab=${revShowTab[newValue]}`);
      setValue(newValue);
    } else {
      router.push(`/investor/signup?tab=${tab}`);
    }
  };

  useEffect(() => {
    setValue(showTab[tab]);
  }, [tab]);

  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('lg')
  );

  const handleClose = () => {
    deleteCookie('token');
    router.push(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
    );
  };

  useEffect(() => {
    async function fetchCompanyData() {
      try {
        const response = await api.get<any>(getCompany);
        if (response.success) {
          setCompanyDetails(response.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }
    fetchCompanyData();
  }, [tab]);

  useEffect(() => {
    async function fetchInvestmentCriteriaData() {
      try {
        const response = await api.get<any>(getInvestmentCriteria);
        if (response.success) {
          setInvestmentCriteria(response.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }
    fetchInvestmentCriteriaData();
  }, [tab]);
  const handleEditDetails = async () => {
    try {
      const res = await api.put(updateUserProfile, {});
      if (res.success) {
        router.push(`/investor/signup?tab=${revShowTab[0]}`);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Somthing went wrong');
    }
  };

  return (
    <InvestorSignupPageWrapper>
      <Container maxWidth="xl">
        {tab === 'ADMIN' ? (
          <ApprovalCardWrapper>
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
          </ApprovalCardWrapper>
        ) : (
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={12}
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
                    <InvestorSignupCardTab
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
                      {...a11yProps(item.id)}
                    />
                  ))}
                </Tabs>
              </CardWrapper>
            </Grid>
            <Grid
              item
              xs={12}
              md={12}
              lg={9}
            >
              <TabPanel
                value={showTab[tab]}
                index={0}
              >
                <PersonalDetails />
              </TabPanel>
              <TabPanel
                value={showTab[tab]}
                index={1}
              >
                <SignupCompanyDetails
                  type={INVESTOR}
                  companyDetails={companyDetails && companyDetails}
                  setCompanyDetails={setCompanyDetails}
                />
              </TabPanel>
              <TabPanel
                value={showTab[tab]}
                index={2}
              >
                <InvestmentCriteria
                  investmentCriteria={investmentCriteria && investmentCriteria}
                />
              </TabPanel>
              {userData?.admin_status !== 'MORE_DETAILS' && (
                <TabPanel
                  value={showTab[tab]}
                  index={3}
                >
                  <SignupPricing type={INVESTOR} />
                </TabPanel>
              )}
            </Grid>
          </Grid>
        )}
      </Container>
    </InvestorSignupPageWrapper>
  );
};

export default InvestorSignupPage;
