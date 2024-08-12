'use client';
import { CustomButton } from '@/components/common/ui';
import {
  DatePickerInput,
  ImageInput,
  InputField,
} from '@/components/common/ui/input-fields';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { updateUser } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { Box, Grid, Stack } from '@mui/material';
import React, { useEffect } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AdminProfileDetailsTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<FieldValues>();

  const userDetails: any = useAppSelector(user);

  useEffect(() => {
    reset({
      first_name: userDetails?.first_name,
      last_name: userDetails?.last_name,
      phone: userDetails?.phone,
      email: userDetails?.email,
      profile: userDetails?.profile,
    });
  }, [reset, userDetails]);

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append('first_name', data.first_name);
    formData.append('last_name', data.last_name);
    formData.append('phone', data.phone);

    if (data.profile && data.profile[0] instanceof File) {
      formData.append('profile', data.profile[0]);
    }
    try {
      const res: any = await api.put(
        updateUser,
        formData,
        'multipart/form-data'
      );

      if (res.success) {
        toast.success(res.message || 'Details updated successfully');
      } else {
        toast.error(res.message || 'Something went wrong');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={4}
        >
          <ImageInput
            name="profile"
            label="Upload Photo"
            register={register}
            errors={errors}
            defaultImage={getValues('profile') ?? ''}
            icon="profile"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        >
          <Stack spacing={2}>
            <InputField
              name="first_name"
              label="First Name"
              register={register}
              errors={errors}
              placeholder="Enter First Name"
            />
            <InputField
              name="email"
              label="Email"
              register={register}
              errors={errors}
              placeholder="Enter Your Email Address"
              disabled={true}
            />
            {/* <DatePickerInput name="date_of_birth" label="Date of Birth" register={register} errors={errors} /> */}
          </Stack>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        >
          <Stack spacing={2}>
            <InputField
              name="last_name"
              label="Last Name"
              register={register}
              errors={errors}
              placeholder="Enter Last Name"
            />
            <InputField
              name="phone"
              label="Phone Number"
              register={register}
              errors={errors}
              placeholder="Enter Your Phone Number"
            />
          </Stack>
        </Grid>
      </Grid>
      <CustomButton
        color="blue"
        type="submit"
        icon="default"
      >
        Save Changes
      </CustomButton>
    </form>
  );
};

export default AdminProfileDetailsTab;
