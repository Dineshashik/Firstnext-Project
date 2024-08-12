import SignupForm from '@/components/common/signup-form';
import { CardWrapper, CustomButton, Typography } from '@/components/common/ui';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { PersonalDetailsCardWrapper } from './style';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { yupResolver } from '@hookform/resolvers/yup';

import { signupPersonalDetailsSchema } from '@/services/schema';
import { useRouter } from 'next/navigation';
import { fetchUser } from '@/lib/thunks/userThunk';
import { userUpdate } from '@/services/apiDefinition';

const SignupPersonalDetails: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const userData: any = useAppSelector(user);
  const router = useRouter();
  // Initialize React Hook Form with resolver and default values
  const methods = useForm<any>({
    resolver: yupResolver(signupPersonalDetailsSchema),
    defaultValues: {
      first_name: userData?.first_name,
      last_name: userData?.last_name,
      email: userData?.email,
      bio: userData?.bio,
      country: userData?.country,
      profile: userData?.profile,
    },
  });
  useEffect(() => {
    if (userData) {
      methods.reset({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData?.email,
        bio: userData?.bio,
        phone: userData?.phone,
        country: userData?.country,
        profile: userData?.profile,
      });
    }
  }, [methods, userData]);

  // Form submission handler
  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    try {
      const formData = prepareFormData(data);
      // Make API call to update user details
      setIsLoading(true);
      const response = await api.put<any>(
        userUpdate,
        formData,
        'multipart/form-data'
      );

      if (response.success) {
        toast.success(response?.message || 'User updated successfully');
        setIsLoading(false);
        dispatch(fetchUser());
        router.push(`/${userData.role.toLowerCase()}/signup?tab=COMPANY`);
      } else {
        setIsLoading(false);
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  // Function to prepare form data for submission
  const prepareFormData = (data: FieldValues): FormData => {
    const formData = new FormData();

    // Iterate over form data and append to FormData object
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'profile') {
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          let values: any = value;
          if ((values?.image_url || '').includes('cloudinary')) return;
          toast.error(`Invalid value for ${key}: ${value}`);
        }
      } else {
        formData.append(key, String(value));
      }
    });

    return formData;
  };
  const { errors } = methods.formState;
  return (
    <PersonalDetailsCardWrapper>
      <Stack>
        <Typography variant="h4">Personal Details</Typography>
        <Typography>
          Let&apos;s start with entering your personal details below.
        </Typography>
      </Stack>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SignupForm />
          <Stack
            direction="row"
            justifyContent="end"
            mt={5}
          >
            <CustomButton
              type="submit"
              color="blue"
              xsWidth="100%"
              smWidth="35%"
              mdWidth="33%"
              lgWidth="35%"
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Save & Continue
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </PersonalDetailsCardWrapper>
  );
};

export default SignupPersonalDetails;
