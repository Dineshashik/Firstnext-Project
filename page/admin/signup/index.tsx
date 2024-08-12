"use client";
import React, { useState } from "react";
import {
  ForgotPasswordText,
  FormWrapper,
  FounderInvestorTopSection,
  LinkWrapper,
  PricingCardWrapper,
  PricingTopSection,
  SignUpPageWrapper,
} from "./style";

import { ContainerWrapper, CustomButton } from "@/components/common/ui";
import { InputField } from "@/components/common/ui/input-fields";
import {
  Box,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";

import Image from "next/image";
import { FieldValues, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

const AdminSignup = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();
  const onSubmit = (data: FieldValues) => {
    console.log("AdminSignup", data);
  };

  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  return (
    <>
      <SignUpPageWrapper>
        <ContainerWrapper>
          <Box px={2}>
            <PricingCardWrapper>
              <PricingTopSection>
                <Stack direction="row" justifyContent="center" my={4}>
                  <Image
                    // src="/asset/images/logo.svg"
                    src="/asset/images/letsconnect-gradient.svg"
                    alt="logo"
                    width={192}
                    height={30}
                  />
                </Stack>
                <Stack>
                  <Typography variant="h4" align="center" mx={2}>
                    Create your account
                  </Typography>
                  <Typography align="center" mx={2}>
                    Sign Up to Let&#39;s Connect to continue.
                  </Typography>
                </Stack>
              </PricingTopSection>
              <FormWrapper onSubmit={handleSubmit(onSubmit)}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="first_name"
                      label="First Name"
                      type="text"
                      register={register}
                      errors={errors}
                      placeholder="First Name"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <InputField
                      name="last_name"
                      label="Last Name"
                      type="text"
                      register={register}
                      errors={errors}
                      placeholder="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name="company_name"
                      label="Company Name"
                      type="text"
                      register={register}
                      errors={errors}
                      placeholder="Company Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name="email"
                      label="Email"
                      type="text"
                      register={register}
                      errors={errors}
                      placeholder="Email"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputField
                      name="password"
                      label="Password"
                      type="text"
                      register={register}
                      errors={errors}
                      placeholder="Password"
                    />
                  </Grid>
                </Grid>

                <Stack
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                  mx={{ xs: 2, md: 4 }}
                  my={2}
                >
                  <CustomButton
                    color="blue"
                    xsWidth="100%"
                    smWidth="70%"
                    mdWidth="40%"
                    lgWidth="40%"
                    icon="default"
                    type="submit"
                  >
                    Create Account
                  </CustomButton>
                </Stack>
              </FormWrapper>
              <Typography
                mt={2}
                px={{ xs: 2, md: 4 }}
                pb={{ xs: 2, md: 6 }}
                align="center"
              >
                Have an account?
                <LinkWrapper href="/admin/signin"> Sign in</LinkWrapper>
              </Typography>
            </PricingCardWrapper>
          </Box>
        </ContainerWrapper>
      </SignUpPageWrapper>
    </>
  );
};

export default AdminSignup;
