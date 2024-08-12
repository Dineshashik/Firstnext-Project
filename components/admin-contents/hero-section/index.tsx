'use client';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  UploadImageInput,
} from '@/components/common/ui/input-fields';
import {
  adminUpdateHeroSection,
  getHeroSection,
} from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { heroSectionSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormData {
  headingText: string;
}

const HeroSectionTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    resolver: yupResolver(heroSectionSchema),
  });

  useEffect(() => {
    async function fetchLivePlatform() {
      try {
        const response: any = await api.get<any>(getHeroSection);
        if (response.success) {
          reset({
            heading_text: response.data.heading_text,
            sub_text: response.data.sub_text,
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }

    fetchLivePlatform();
  }, [reset]);

  const onSubmit = async (data: FieldValues) => {
    const formData = new FormData();
    formData.append('heading_text', data.heading_text);
    formData.append('sub_text', data.sub_text);
    if (data.image && Object.keys(data.image).length > 0) {
      formData.append('image', data.image[0]);
    }
    try {
      setIsLoading(true);
      const response = await api.put(
        adminUpdateHeroSection,
        formData,
        'multipart/form-data'
      );

      if (response.success) {
        setIsLoading(false);
        toast.success(
          response?.message || 'HeroSection data updated successfully'
        );
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ height: '100%' }}
    >
      <Stack
        direction="column"
        justifyContent="space-between"
        minHeight={{ xs: '100%', lg: 'calc(100vh - 300px)' }}
      >
        <Box
          flexGrow={1}
          mb={2}
          width={{ xs: '100%', md: '60%', lg: '50%' }}
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
            label="Sub text"
            register={register}
            errors={errors}
            placeholder="Sub text"
          />
          <UploadImageInput
            name="image"
            label="Upload Image"
            register={register}
            errors={errors}
            placeholder="Upload files"
          />
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
            loadingText="Submit..."
          >
            Submit
          </CustomButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default HeroSectionTab;
