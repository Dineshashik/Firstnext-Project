import { CustomButton, Typography } from '@/components/common/ui';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { InvestmetCriteriaCardWrapper } from './style';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import SignupCompanyDetailsForm from '@/components/common/signup-company-details-forn';
import { FOUNDER, INVESTOR } from '@/helpers/constants';
import SignupInvestmentCriteria from '@/components/common/signup-investment-criteria';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import { investorDetails } from '@/services/apiDefinition';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { user } from '@/lib/slices/userSlice';
import { fetchUser } from '@/lib/thunks/userThunk';

const InvestmentCriteria = ({ investmentCriteria }: any) => {
  const methods = useForm({
    defaultValues: {
      desired_industry: investmentCriteria?.desired_industry,
      desired_location: investmentCriteria?.desired_location,
      stage_of_development: investmentCriteria?.stage_of_development,
      funding_amount: investmentCriteria?.funding_amount,
      desired_funding_stage: investmentCriteria?.desired_funding_stage,
      desired_return: investmentCriteria?.desired_return,
      exit_strategy: investmentCriteria?.exit_strategy,
      investor_benefits: investmentCriteria?.investor_benefits,
    },
  });

  useEffect(() => {
    if (investmentCriteria) {
      methods.reset({
        desired_industry: investmentCriteria?.desired_industry,
        desired_location: investmentCriteria?.desired_location,
        stage_of_development: investmentCriteria?.stage_of_development,
        funding_amount: investmentCriteria?.funding_amount,
        desired_funding_stage: investmentCriteria?.desired_funding_stage,
        desired_return: investmentCriteria?.desired_return,
        exit_strategy: investmentCriteria?.exit_strategy,
        investor_benefits: investmentCriteria?.investor_benefits,
      });
    }
  }, [investmentCriteria, methods]);

  const router = useRouter();
  const userData: any = useAppSelector(user);
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState<boolean>();
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
        if (userData?.admin_status !== 'MORE_DETAILS') {
          router.push(`/${userData.role.toLowerCase()}/signup?tab=PRICE`);
        } else {
          router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
        }
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
    <InvestmetCriteriaCardWrapper>
      <Stack>
        <Typography variant="h4">Investment Criteria</Typography>
        <Typography>
          Please define your preferred investment criteria, allowing you to
          discover suitable founders and projects that align with your
          requirements.
        </Typography>
      </Stack>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* here I have to change founder or investor */}
          <SignupInvestmentCriteria />
          <Stack
            direction="row"
            justifyContent="end"
            mt={5}
          >
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
              Save & Continue
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </InvestmetCriteriaCardWrapper>
  );
};

export default InvestmentCriteria;
