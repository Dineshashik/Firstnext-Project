'use client';
import DynamicTabs from '@/components/common/custom-tab';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  UploadImageInput,
} from '@/components/common/ui/input-fields';
import { adminUpdateFeaturedIn, getFeaturedIn } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { featureInSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

interface LogoSectionTabProps {
  name: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  isLoading?: boolean;
}

const LogoSectionTab = ({
  name,
  register,
  errors,
  isLoading,
}: LogoSectionTabProps) => {
  return (
    <Stack
      direction="column"
      justifyContent="space-between"
      minHeight={{ xs: '100%', lg: 'calc(100vh - 365px)' }}
    >
      <Box
        flexGrow={1}
        mb={2}
        width={{ xs: '100%', md: '60%', lg: '50%' }}
      >
        <InputField
          name={`${name}.name`}
          label="Name"
          register={register}
          errors={errors}
          placeholder="Logo Name"
        />

        <UploadImageInput
          name={`${name}.image`}
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
  );
};

const FeaturesInTab = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(featureInSchema),
  });
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchLivePlatform() {
      try {
        const response: any = await api.get<any>(getFeaturedIn);
        if (response.success) {
          reset({
            title: response?.data?.title,
            section1: {
              name: response.data.section1.name,
            },
            section2: {
              name: response.data.section2.name,
            },
            section3: {
              name: response.data.section3.name,
            },
            section4: {
              name: response.data.section4.name,
            },
            section5: {
              name: response.data.section5.name,
            },
            section6: {
              name: response.data.section6.name,
            },
            section7: {
              name: response.data.section7.name,
            },
            section8: {
              name: response.data.section8.name,
            },
          });
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Somthing went wrong');
      }
    }

    fetchLivePlatform();
  }, [reset]);

  const onSubmit = async (data: FieldValues) => {

    const formData = new FormData();
    [
      'section1',
      'section2',
      'section3',
      'section4',
      'section5',
      'section6',
      'section7',
      'section8',
    ].forEach((boxKey: string) => {
      const boxData = data[boxKey];
      formData.append(`${boxKey}[name]`, boxData.name);
      if (boxData.image && Object.keys(boxData.image).length > 0) {
        formData.append(`${boxKey}[image]`, boxData.image[0]);
      }
    });
    formData.append(`title`, data.title);
    setIsLoading(true);

    try {
      const response = await api.put(
        adminUpdateFeaturedIn,
        formData,
        'multipart/form-data'
      );

      if (response.success) {
        toast.success(
          response?.message || 'HeroSection data updated successfully'
        );
        setIsLoading(false);
      } else {
        toast.error(response?.message || 'Something went wrong');
        setIsLoading(false);
      }
    } catch (error) {
      toast.error('Something went wrong');
      setIsLoading(false);
    }
  };

  const tabs = [
    {
      name: 'section1',
      content: (
        <LogoSectionTab
          name="section1"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section2',
      content: (
        <LogoSectionTab
          name="section2"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section3',
      content: (
        <LogoSectionTab
          name="section3"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section4',
      content: (
        <LogoSectionTab
          name="section4"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section5',
      content: (
        <LogoSectionTab
          name="section5"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section6',
      content: (
        <LogoSectionTab
          name="section6"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section7',
      content: (
        <LogoSectionTab
          name="section7"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
    {
      name: 'section8',
      content: (
        <LogoSectionTab
          name="section8"
          register={register}
          errors={errors}
          isLoading={isLoading}
        />
      ),
    },
  ];
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box width={{ xs: '100%', md: '50%' }}>
        <InputField
          name="title"
          label="Title"
          register={register}
          errors={errors}
          placeholder="Title"
        />
      </Box>
      <DynamicTabs tabs={tabs} />
    </form>
  );
};

export default FeaturesInTab;
