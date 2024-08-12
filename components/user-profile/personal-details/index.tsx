'use client';
import { CardWrapper, CustomButton, Typography } from '@/components/common/ui';
import {
  ImageInput,
  InputField,
  LocationInput,
} from '@/components/common/ui/input-fields';
import { Box, Grid, Stack } from '@mui/material';
import React from 'react';
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { FormWrapper, LogoutButton } from './style';
import SignupForm from '@/components/common/signup-form';

const PersonalDetailsTabs = ({ onSubmit }: any) => {
  const { handleSubmit } = useFormContext();

  return (
    <>
      <Box>
        <Typography variant="h4">Personal Details</Typography>
        {/* <Typography>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </Typography> */}
      </Box>

      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ flexGrow: '1' }}>
          <SignupForm />
        </Box>
        <Stack
          direction="column"
          justifyContent="end"
          mt={2}
        >
          <CustomButton
            icon="default"
            type="submit"
            onClick={() => {}}
            color="blue"
            xsWidth="100%"
            smWidth="30%"
            mdWidth="30%"
            lgWidth="20%"
          >
            Save Changes
          </CustomButton>
          <LogoutButton>Logout</LogoutButton>
        </Stack>
      </FormWrapper>
    </>
  );
};

export default PersonalDetailsTabs;
