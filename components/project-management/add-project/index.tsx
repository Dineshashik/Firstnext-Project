'use client';
import React, { useState, useEffect } from 'react';
import { CardWrapper, CustomButton } from '@/components/common/ui';
import { Box, MenuItem, Select, Stack, Typography } from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import SignupProjectDetailsForm from '@/components/common/signup-project-details-form';
import { toast } from 'react-toastify';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';
import { api } from '@/services/axiosInstance';
import { projectDetails } from '@/services/apiDefinition';
import { yupResolver } from '@hookform/resolvers/yup';
import { signupProjectDetailsSchema } from '@/services/schema';

const AddProjectDetailsCard = () => {
  const [documents, setDocuments] = useState<any>([]);
  const [radioValue, setRadioValue] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const methods = useForm({
    resolver: yupResolver(signupProjectDetailsSchema),
  });
  const userData: any = useAppSelector(user);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'image') {
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
        if (key !== 'documents') {
          const formattedValue = Array.isArray(value)
            ? JSON.stringify(value)
            : String(value);
          formData.append(key, formattedValue);
        }
      }
    });

    for (let i = 0; i < data.documents.length; i++) {
      formData.append(`docs[${i}][doc]`, documents[i].doc);
      formData.append(`docs[${i}][public]`, radioValue[i]);
    }

    try {
      setIsLoading(true);
      const response = await api.post<any>(
        projectDetails,
        formData,
        'multipart/form-data'
      );
      if (response.success) {
        toast.success(response?.message || 'project created successfully');
        setIsLoading(false);
        methods.reset();
        router.push(`/${userData.role.toLowerCase()}/project-management`);
      } else {
        setIsLoading(false);
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  methods.watch((data: any) => {
    if (data.documents?.length > 0) {
      let temp = [];
      for (let i = 0; i < data.documents.length; i++) {
        temp.push({ id: i, doc: data.documents[i] });
      }
      setDocuments([...temp]);
    }
  });

  const handleRadioChange = (e: any, id: number) => {
    const index = documents.findIndex((doc: any) => doc.id === id);
    const updatedRadioValue = [...radioValue];
    updatedRadioValue[index] = e.target.value;
    setRadioValue(updatedRadioValue);
  };

  const handleRemoveDoc = (id: number) => {
    const updatedDocuments = documents.filter((doc: any) => doc.id !== id);
    const updatedRadioValue = radioValue.filter(
      (_: any, index: number) => index !== id
    );
    setDocuments(updatedDocuments);
    setRadioValue(updatedRadioValue);
  };

  return (
    <CardWrapper>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4">Project Details</Typography>
          {/* <Typography>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </Typography> */}
        </Box>
      </Stack>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SignupProjectDetailsForm
            documents={documents}
            handleRemoveDoc={handleRemoveDoc}
            radioValue={radioValue}
            handleRadioChange={handleRadioChange}
          />
          <Stack
            direction="row"
            justifyContent="end"
            mt={5}
          >
            <CustomButton
              type="submit"
              onClick={() => {}}
              color="blue"
              xsWidth="100%"
              smWidth="35%"
              mdWidth="30%"
              lgWidth="20%"
              icon="default"
              isLoading={isLoading}
            >
              Save Changes
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </CardWrapper>
  );
};

export default AddProjectDetailsCard;
