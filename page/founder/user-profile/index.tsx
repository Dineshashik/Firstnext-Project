'use client';
import { CardWrapper } from '@/components/common/ui';
import {
  Box,
  Grid,
  Stack,
  Tab,
  Tabs,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { useEffect } from 'react';
import {
  CardTab,
  FounderUserProfilePageWrapper,
  LogoutButton,
  TabsCardWrapper,
} from './style';
import Image from 'next/image';
import PersonalDetails from '@/components/user-profile/personal-details';
import PasswordTab from '@/components/user-profile/password';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import { api } from '@/services/axiosInstance';
import { updateUser } from '@/services/apiDefinition';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { toast } from 'react-toastify';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/lib/thunks/userThunk';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupPersonalDetailsSchema } from '@/services/schema';

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

function FounderUserProfilePage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const userDetails: any = useAppSelector(user);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const theme = useTheme();
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('md')
  );
  const methods = useForm<any>({
    resolver: yupResolver(signupPersonalDetailsSchema),
    defaultValues: {
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      email: userDetails?.email,
      bio: userDetails?.bio,
      country: userDetails?.country,
      profile: userDetails?.profile,
    },
  });

  useEffect(() => {
    methods.reset({
      first_name: userDetails && userDetails?.first_name,
      last_name: userDetails && userDetails?.last_name,
      email: userDetails && userDetails?.email,
      phone: userDetails && userDetails?.phone,
      country: userDetails && userDetails?.country,
      bio: userDetails && userDetails?.bio,
      profile: userDetails && userDetails?.profile,
    });
  }, [methods, methods.reset, userDetails]);

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone', data.phone);
    formData.append('bio', data.bio);
    formData.append('country', data.country);
    if (data?.profile && Object.keys(data?.profile).length > 0) {
      formData.append('profile', data?.profile[0]);
    }
    try {
      const res: any = await api.put(
        `${updateUser}`,
        formData,
        'multipart/form-data'
      );

      if (res.success) {
        toast.success(res.message || 'Details updated successfully');
        dispatch(fetchUser());
      } else {
        toast.error(res.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const handleLogout = () => {
    deleteCookie('token');
    router.push(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
    );
  };

  return (
    <FounderUserProfilePageWrapper>
      <Grid
        container
        spacing={2}
        sx={{ minHeight: 'calc(100vh - 136px)' }}
      >
        <Grid
          item
          xs={12}
          md={3}
        >
          <TabsCardWrapper>
            <Box>
              <Tabs
                orientation={isTablet ? 'horizontal' : 'vertical'}
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                variant="scrollable"
                visibleScrollbar
              >
                <CardTab
                  label={
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Image
                        src="/asset/icon/profile.svg"
                        alt="profile"
                        width={30}
                        height={30}
                      />
                      <Typography variant="h6">Personal Details</Typography>
                    </Stack>
                  }
                  {...a11yProps(0)}
                />
                <CardTab
                  label={
                    <Stack
                      direction="row"
                      spacing={1}
                      alignItems="center"
                    >
                      <Image
                        src="/asset/icon/overview-develop.svg"
                        alt="profile"
                        width={30}
                        height={30}
                      />
                      <Typography variant="h6">Password</Typography>
                    </Stack>
                  }
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
          </TabsCardWrapper>
        </Grid>
        <Grid
          item
          xs={12}
          md={9}
        >
          <CardWrapper sx={{ height: '100%' }}>
            <TabPanel
              value={value}
              index={0}
            >
              <FormProvider {...methods}>
                <PersonalDetails onSubmit={onSubmit} />
              </FormProvider>
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
            >
              <PasswordTab />
            </TabPanel>
          </CardWrapper>
        </Grid>
      </Grid>
    </FounderUserProfilePageWrapper>
  );
}

export default FounderUserProfilePage;
