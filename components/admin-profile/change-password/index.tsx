'use client';
import { CustomButton } from '@/components/common/ui';
import { ImageInput, InputField } from '@/components/common/ui/input-fields';
import { updatePassword } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { changeAdminPasswordSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid } from '@mui/material';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AdminChangePasswordTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(changeAdminPasswordSchema),
  });

  const onSubmit = async (data: any) => {
    const reqData = {
      oldPassword: data.last_password,
      newPassword: data.new_password,
    };

    try {
      const res: any = await api.post(updatePassword, reqData);
      if (res.success) {
        toast.success(res.message || 'Password updated successfully');
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
        mb={2}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        >
          <Box>
            <InputField
              name="last_password"
              label="Last Password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Enter Last Password"
            />
            <InputField
              name="new_password"
              label="New Password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Enter New Password"
            />
            <InputField
              name="re_enter_new_password"
              label="Re-enter New Password"
              register={register}
              errors={errors}
              type="password"
              placeholder="Re-enter New Password"
            />
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
        ></Grid>
      </Grid>
      <CustomButton
        color="blue"
        icon="default"
        type="submit"
      >
        Save Changes
      </CustomButton>
    </form>
  );
};

export default AdminChangePasswordTab;
