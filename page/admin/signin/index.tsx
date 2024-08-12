'use client';
import React from 'react';
import {
  ContainerWrapper,
  CustomButton,
  //   InputField,
} from '@/components/common/ui';
import {
  InputField,
} from '@/components/common/ui/input-fields';
import { Box, Stack, Typography } from '@mui/material';
import { FieldValues, Resolver, useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';
import {
  ForgotPasswordText,
  FormWrapper,
  LinkWrapper,
  PricingCardWrapper,
  PricingTopSection,
  SignInPageWrapper,
} from './style';
import Image from 'next/image';
// import { api } from '@/utils/axiosInstance';
// import { authSignin } from '@/utils/apiDefination'

interface FormData {
  email: string;
  password: string;
}
// const schema = yup
//   .object({
//     email: yup.string().email().required(),
//     password: yup
//       .string()
//       .required()
//       .min(6, 'Password must be at least 6 characters long.'),
//   })
//   .required();

const AdminSignin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = async (data: any) => {
    // console.log('AdminSignin', data);
    // try {
    //   const user = await api.post<any>(authSignin, data);
    //   console.log('user -->', user);
    // } catch (error) {
    //   console.log(error);
    // }
  };
  return (
    <>
      <SignInPageWrapper>
        <ContainerWrapper>
          <Box px={2}>
            <PricingCardWrapper>
              <PricingTopSection>
                <Stack
                  direction="row"
                  justifyContent="center"
                  my={4}
                >
                  <Image
                    // src="/asset/images/logo.svg"
                    src="/asset/images/letsconnect-gradient.svg"
                    alt="logo"
                    width={192}
                    height={30}
                  />
                </Stack>
                <Stack>
                  <Typography
                    variant="h4"
                    align="center"
                    mx={2}
                  >
                    Sign in to your account
                  </Typography>
                  <Typography
                    align="center"
                    mx={2}
                  >
                    Sign In to Let&#39;s Connect to continue.
                  </Typography>
                </Stack>
              </PricingTopSection>
              <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <InputField
                  name="email"
                  label="Email"
                  type="email"
                  register={register}
                  errors={errors}
                  placeholder="Email Address"
                />
                <Box
                  py={1}
                  sx={{ position: 'relative' }}
                >
                  <ForgotPasswordText>Forgot Password?</ForgotPasswordText>
                </Box>
                <InputField
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors}
                  placeholder="Password"
                />
                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  m={{ xs: 2, md: 4 }}
                  py={3}
                >
                  <CustomButton
                    color="blue"
                    xsWidth="100%"
                    smWidth="70%"
                    mdWidth="40%"
                    lgWidth="30%"
                    icon="default"
                    type="submit"
                  >
                    Continue
                  </CustomButton>
                </Stack>
              </FormWrapper>
              <Typography
                mt={8}
                px={{ xs: 2, md: 4 }}
                py={{ xs: 4, md: 6 }}
                align="center"
              >
                Don&apos;t have an account?{' '}
                <LinkWrapper href="/admin/signup">Sign up</LinkWrapper>
              </Typography>
            </PricingCardWrapper>
          </Box>
        </ContainerWrapper>
      </SignInPageWrapper>
    </>
  );
};

export default AdminSignin;



