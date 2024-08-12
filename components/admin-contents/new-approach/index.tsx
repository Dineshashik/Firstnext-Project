'use client';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  UploadImageInput,
} from '@/components/common/ui/input-fields';
import {
  adminUpdateNewApproach,
  getNewApproach,
} from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { newApproachSchema } from '@/services/schema';
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

const NewApproachTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(newApproachSchema),
  });

  useEffect(() => {
    async function fetchNewApproach() {
      try {
        const response = await api.get<any>(getNewApproach);
        if (response.success) {
          reset({
            box1: {
              heading_text: response.data.box1.heading_text,
              sub_text: response.data.box1.sub_text,
            },
            box2: {
              heading_text: response.data.box2.heading_text,
              sub_text: response.data.box2.sub_text,
            },
            box3: {
              heading_text: response.data.box3.heading_text,
              sub_text: response.data.box3.sub_text,
            },
            heading_text: response.data.heading_text,
            sub_text: response.data.sub_text,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Somthing went wrong');
      }
    }

    fetchNewApproach();
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
      setIsLoading(true);
      const response = await api.put<any>(
        adminUpdateNewApproach,
        formData,
        'multipart/form-data'
      );
      if (response.success) {
        setIsLoading(false);
        toast.success(
          response?.message || 'LivePlatform data updated successfully'
        );
      }
    } catch (error: any) {
      setIsLoading(false);
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
                md={6}
                lg={4}
                spacing={4}
                mt={2}
                key={item.id}
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
          >
            Submit
          </CustomButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default NewApproachTab;
