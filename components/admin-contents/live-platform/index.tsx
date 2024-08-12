'use client';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  UploadImageInput,
} from '@/components/common/ui/input-fields';
import {
  adminUpdateLivePlatform,
  getLivePlatform,
} from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { adminLivePlatformSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BoxData = [
  {
    id: 1,
    name: 'Box 1',
    value: 'box1',
  },
  {
    id: 2,
    name: 'Box 2',
    value: 'box2',
  },
  {
    id: 3,
    name: 'Box 3',
    value: 'box3',
  },
];

const LivePlatformTab = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(adminLivePlatformSchema),
  });

  useEffect(() => {
    async function fetchLivePlatform() {
      try {
        const response = await api.get<any>(getLivePlatform);
        if (response.success) {
          reset({
            box1: {
              heading_text: response.data.livePlatform.box1.heading_text,
              sub_text: response.data.livePlatform.box1.sub_text,
            },
            box2: {
              heading_text: response.data.livePlatform.box2.heading_text,
              sub_text: response.data.livePlatform.box2.sub_text,
            },
            box3: {
              heading_text: response.data.livePlatform.box3.heading_text,
              sub_text: response.data.livePlatform.box3.sub_text,
            },
            heading_text: response.data.livePlatform.heading_text,
            sub_text: response.data.livePlatform.sub_text,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Somthing went wrong');
      }
    }

    fetchLivePlatform();
  }, [reset]);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    formData.append('heading_text', data.heading_text);
    formData.append('sub_text', data.sub_text);
    ['box1', 'box2', 'box3'].forEach((boxKey: string) => {
      const boxData = data[boxKey];
      formData.append(`${boxKey}[heading_text]`, boxData.heading_text);
      formData.append(`${boxKey}[sub_text]`, boxData.sub_text);
      if (boxData.image && Object.keys(boxData.image).length > 0) {
        formData.append(`${boxKey}[image]`, boxData.image[0]);
      }
    });

    try {
      setIsLoading(true)
      const response = await api.put<any>(
        adminUpdateLivePlatform,
        formData,
        'multipart/form-data'
      );
      if (response.success) {
        setIsLoading(false)
        toast.success(
          response?.message || 'LivePlatform data updated successfully'
        );
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        justifyContent="space-between"
        minHeight={{ xs: '100%', lg: 'calc(100vh - 300px)' }}
      >
        <Box
          flexGrow={1}
          mb={2}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
              lg={4}
            >
              <InputField
                name="heading_text"
                label="Heading Text"
                register={register}
                errors={errors}
                placeholder="Heading Text"
              />
              <InputField
                name="sub_text"
                label="Sub Text"
                register={register}
                errors={errors}
                placeholder="Sub Text"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={4}
            ></Grid>
            <Grid
              item
              xs={12}
              md={3}
              lg={4}
            ></Grid>
            {BoxData.map((item) => (
              <Grid
                item
                xs={12}
                md={4}
                spacing={4}
                key={item.id}
                mt={1}
              >
                <Typography
                  variant="h4"
                  mb={2}
                >
                  {item.name}
                </Typography>
                <UploadImageInput
                  name={`${item.value}.image`}
                  label="Upload Image"
                  register={register}
                  errors={errors}
                  placeholder="Upload files"
                />
                <InputField
                  name={`${item.value}.heading_text`}
                  label="Heading Text"
                  register={register}
                  errors={errors}
                  placeholder="Heading Text"
                />
                <InputField
                  name={`${item.value}.sub_text`}
                  label="Sub Text"
                  register={register}
                  errors={errors}
                  placeholder="Sub Text"
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Stack alignItems="flex-end">
          <CustomButton
            type="submit"
            color="blue"
            icon="default"
            xsWidth="100%"
            smWidth="30%"
            mdWidth="20%"
            lgWidth="10%"
            isLoading={isLoading}
            loadingText='Submit...'
          >
            Submit
          </CustomButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default LivePlatformTab;
