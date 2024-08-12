"use client";
import React, { useState } from 'react';
import InvestmentCriteriaPage from '@/page/investor/investment-criteria';
import { useForm, FormProvider } from 'react-hook-form';
import { Stack, Container } from '@mui/material';
import { CustomButton, Typography } from '@/components/common/ui';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import { investorDetails } from '@/services/apiDefinition';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { user } from '@/lib/slices/userSlice';
import { fetchUser } from '@/lib/thunks/userThunk';

const Page = () => {
  const methods = useForm();
  const router = useRouter();
  const userData: any = useAppSelector(user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const response = await api.post<any>(investorDetails, data);
      if (response.success) {
        dispatch(fetchUser());
        setIsLoading(false);
        toast.success(
          response?.message || 'Investment Criteria added successfully'
        );
        // if (userData?.admin_status !== 'MORE_DETAILS') {
        //   router.push(`/${userData.role.toLowerCase()}/signup?tab=PRICE`);
        // } else {
        //   router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
        // }
        router.push(`/investor`)
      } else {
        setIsLoading(false);
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <FormProvider {...methods}>
      <Container maxWidth="lg" sx={{ backgroundColor: 'white', paddingX: 4, paddingY: 8, borderRadius: 3, boxShadow: 2 ,marginTop:"20px",marginBottom:"20px"}}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <InvestmentCriteriaPage />
          <Stack direction="row" justifyContent="end" mt={5}>
            <CustomButton
              type="submit"
              onClick={() => {}}
              color="blue"
              xsWidth="100%"
              smWidth="35%"
              mdWidth="30%"
              lgWidth="25%"
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Submit
            </CustomButton>
          </Stack>
        </form>
      </Container>
    </FormProvider>
  );
};

export default Page;
