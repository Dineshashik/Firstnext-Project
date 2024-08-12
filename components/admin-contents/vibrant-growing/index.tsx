'use client';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  UploadImageInput,
  UploadVideoInput,
} from '@/components/common/ui/input-fields';
import { adminUpdateVibrant, getVibrant } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { adminVibrantGrowingTabSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Grid, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const BoxData = [
  {
    id: 1,
    name: 'Section 1',
    value: 'section1',
  },
  {
    id: 2,
    name: 'Section 2',
    value: 'section2',
  },
  {
    id: 3,
    name: 'Section 3',
    value: 'section3',
  },
];

const VibrantGrowingTab = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(adminVibrantGrowingTabSchema),
  });

  useEffect(() => {
    async function fetchVibrant() {
      try {
        const response = await api.get<any>(getVibrant);
        if (response.success) {
          const { section1, section2, section3 } = response.data;
          reset({
            section1: {
              heading_text: section1.heading_text,
              sub_text: section1.heading_text,
            },
            section2: {
              heading_text: section2.heading_text,
              sub_text: section2.heading_text,
            },
            section3: {
              heading_text: section3.heading_text,
              sub_text: section3.heading_text,
            },
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }

    fetchVibrant();
  }, [reset]);
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.keys(data).forEach((sectionKey) => {
      const section = data[sectionKey];
      Object.keys(section).forEach((fieldKey) => {
        const value = section[fieldKey];
        const fieldValue = typeof value === 'object' ? value[0] : value;
        formData.append(`${sectionKey}[${fieldKey}]`, fieldValue);
      });
    });

    try {
      setIsLoading(true)
      const response = await api.put<any>(
        adminUpdateVibrant,
        formData,
        'multipart/form-data'
      );
      if (response.success) {
        setIsLoading(false)
        toast.success(
          response?.message || 'Vibrant Growing data updated successfully'
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
            {BoxData.map((item) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={item.id}
              >
                <Typography
                  variant="h4"
                  mb={2}
                >
                  {item.name}
                </Typography>
                <UploadVideoInput
                  name={`${item.value}.image`}
                  label="Upload Video"
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

export default VibrantGrowingTab;
