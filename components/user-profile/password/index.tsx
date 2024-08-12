'use client';
import { CardWrapper, CustomButton } from '@/components/common/ui';
import { InputField } from '@/components/common/ui/input-fields';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  BoxWrapper,
  DeactivateAccountModal,
  DeactiveButton,
  FormWrapper,
} from './style';
import { LogoutButton } from '../personal-details/style';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import { deleteAccount, updatePassword } from '@/services/apiDefinition';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import CommonModal from '@/components/common/modal';
import { changePasswordSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';

const PasswordTab = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(changePasswordSchema),
  });

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (data: any) => {
    const reqData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
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

  const router = useRouter();

  const handleLogout = () => {
    deleteCookie('token');
    router.push(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
    );
  };

  const handleDeactivateAccount = async () => {
    try {
      setIsLoading(true);
      const res: any = await api.delete(deleteAccount);
      if (res.success) {
        setIsLoading(false);
        toast.success('Account deactivated');
        deleteCookie('token');
        router.push(
          `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h4">Password</Typography>
        <Typography>Change your password here.</Typography>
      </Box>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <BoxWrapper mt={2}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={8}
              lg={6}
            >
              <InputField
                name="oldPassword"
                label="Old Password"
                register={register}
                errors={errors}
                type="password"
                placeholder="Old Password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={6}
            ></Grid>
            <Grid
              item
              xs={12}
              md={8}
              lg={6}
            >
              <InputField
                name="newPassword"
                label="New Password"
                register={register}
                errors={errors}
                type="password"
                placeholder="New Password"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={4}
              lg={6}
            ></Grid>
            <Grid
              item
              xs={12}
              md={8}
              lg={6}
            >
              <InputField
                name="reEnterNewPassword"
                label="Re-enter New Password"
                register={register}
                errors={errors}
                type="password"
                placeholder="Re-enter New Password"
              />
            </Grid>
          </Grid>
        </BoxWrapper>
        <Stack
          direction={{ sx: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
        >
          <DeactiveButton onClick={() => setShowModal(true)}>
            Deactivate Account
          </DeactiveButton>
          <CustomButton
            color="blue"
            icon="default"
            type="submit"
            xsWidth="100%"
            mdWidth="30%"
            lgWidth="20%"
          >
            Save Changes
          </CustomButton>
          <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Stack>
        <CommonModal
          open={showModal}
          onClose={() => setShowModal(false)}
        >
          <DeactivateAccountModal>
            <Typography
              variant="h4"
              align="center"
              mb={4}
              mt={4}
            >
              Are you sure to deactivate account?
            </Typography>
            <Typography
              align="center"
              mb={4}
              mt={2}
            >
              To reactivate your account, you will need to contact the admin.
            </Typography>
            <Stack
              spacing={2}
              direction="column"
              alignItems="center"
            >
              <DeactiveButton
                disabled={isLoading}
                onClick={handleDeactivateAccount}
              >
                Deactivate
              </DeactiveButton>
              <CustomButton
                color="blue"
                xsWidth="100%"
                smWidth="100%"
                mdWidth="100%"
                lgWidth="100%"
                onClick={() => setShowModal(false)}
                icon="default"
              >
                Cancel
              </CustomButton>
            </Stack>
          </DeactivateAccountModal>
        </CommonModal>
      </FormWrapper>
    </>
  );
};

export default PasswordTab;
