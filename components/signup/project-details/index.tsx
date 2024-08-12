'use client';
import React, { useEffect, useState } from 'react';
import { SignupProjectCardWrapper, SkipButton } from './style';
import { Stack, Typography } from '@mui/material';
import { SubmitHandler, useForm, FormProvider } from 'react-hook-form';
import SignupProjectDetailsForm from '@/components/common/signup-project-details-form';
import { CustomButton } from '@/components/common/ui';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import {
  getUserProjects,
  projectDetails,
  projectUpdate,
  skipProjectUpdateStage,
} from '@/services/apiDefinition';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';
import { signupProjectDetailsSchema } from '@/services/schema';
import { fetchUser } from '@/lib/thunks/userThunk';

const SignupProjectDetails = ({
  projectData,
  handleAddMore,
  fetchSignupDetails,
}: any) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any>([]);
  const [radioValue, setRadioValue] = useState<any>([]);
  const [deletedDoc, setDeletedDoc] = useState<any>([]);
  const [updatedDoc, setUpdatedDoc] = useState<any>([]);
  const [existingDoc, setExistingDoc] = useState<any>(
    projectData?.project_docs
  );
  const userData: any = useAppSelector(user);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const methods = useForm<any>({
    resolver: yupResolver(signupProjectDetailsSchema),
  });
  const [isSkipLoading, setSkipLoading] = useState<boolean>(false);

  const { errors }: any = methods.formState;
  useEffect(() => {
    methods.reset({
      project_name: projectData?.project_name,
      funding_scope: projectData?.funding_scope,
      description: projectData?.description,
      amount_to_raised: projectData?.amount_to_raised,
      market_opportunity: projectData?.market_opportunity,
      stage_of_development: projectData?.stage_of_development,
      funding_requirements: projectData?.funding_requirements,
      funding_stage: projectData?.funding_stage,
      performance_projections: projectData?.performance_projections,
      revenue_model: projectData?.revenue_model,
      exit_strategy: projectData?.exit_strategy,
      investor_benefits: projectData?.investor_benefits,
      image: projectData?.image,
    });
  }, [methods, projectData]);

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
      } else if (key === 'documents') {
        for (let i = 0; i < documents.length; i++) {
          formData.append(`docs[${i}][doc]`, documents[i].doc);
          formData.append(`docs[${i}][public]`, radioValue[i]);
        }
      } else {
        const formattedValue = Array.isArray(value)
          ? JSON.stringify(value)
          : String(value);
        formData.append(key, formattedValue);
      }
    });

    deletedDoc.map((item: string, index: number) =>
      formData.append(`deletedDocs[${[index]}]`, item)
    );
    updatedDoc.map((item: { _id: string; public: boolean }, index: number) => {
      formData.append(`updatedDocs[${index}][_id]`, item._id);
      formData.append(`updatedDocs[${index}][public]`, item.public.toString());
    });

    try {
      setIsLoading(true);
      let response: any = {};
      if (projectData?._id) {
        response = await api.put<any>(
          `${projectUpdate}/${projectData?._id}`,
          formData,
          'multipart/form-data'
        );
      } else {
        response = await api.post<any>(
          projectDetails,
          formData,
          'multipart/form-data'
        );
      }

      if (response?.success) {
        dispatch(fetchUser());
        toast.success(response?.message || 'project created successfully');
        fetchSignupDetails();
        setIsLoading(false);
        if (userData?.admin_status !== 'MORE_DETAILS') {
          router.push(`/${userData.role.toLowerCase()}/signup?tab=PRICE`);
        } else {
          router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
        }
      } else {
        setIsLoading(false);
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    methods.setValue(
      'alldocuments',
      (documents?.length || 0) + (existingDoc?.length || 0)
    );
  }, [documents, existingDoc]);

  methods.watch((data: any) => {
    if (data?.documents?.length > 0) {
      let temp = [];
      let docLength = documents?.length ?? 0;
      for (let i = 0; i < data?.documents?.length; i++) {
        temp.push({ id: i + docLength, doc: data.documents[i] });
      }
      setDocuments([...temp]);
      methods.setValue('documents', []);
    }
  });

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: number
  ) => {
    const index = documents.findIndex((doc: any) => doc.id === id);
    const updatedRadioValue = [...radioValue];
    updatedRadioValue[index] = e.target.value;
    setRadioValue(updatedRadioValue);
  };

  const handleExistingRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    docId: string
  ) => {
    const value = (event.target as HTMLInputElement).value;
    setUpdatedDoc([
      ...updatedDoc,
      {
        _id: docId,
        public: event.target.value,
      },
    ]);
  };

  const handleRemoveDoc = (id: number) => {
    const updatedDocuments = documents.filter((doc: any) => doc.id !== id);

    setDocuments(updatedDocuments);
  };

  const handleExistingRemoveDoc = (docId: string) => {
    const updatedExistingDoc = existingDoc.filter(
      (doc: any) => doc._id !== docId
    );
    setExistingDoc(updatedExistingDoc);
    setDeletedDoc([...deletedDoc, docId]);
  };

  const handleSkip = async () => {
    try {
      setSkipLoading(true);
      const res = await api.put(skipProjectUpdateStage, {});
      if (res.success) {
        setSkipLoading(false);
        if (userData?.admin_status !== 'MORE_DETAILS') {
          router.push(`/${userData.role.toLowerCase()}/signup?tab=PRICE`);
        } else {
          router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
        }
        toast.success('Project skip for now');
      }
    } catch (error: any) {
      setSkipLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <SignupProjectCardWrapper>
      <Stack>
        <Typography variant="h4">Project Details</Typography>
        <Typography>
          Please share the details of your project for which you are currently
          seeking funding and/or partners.
        </Typography>
      </Stack>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SignupProjectDetailsForm
            documents={documents}
            handleRemoveDoc={handleRemoveDoc}
            radioValue={radioValue}
            handleRadioChange={handleRadioChange}
            existingDoc={existingDoc}
            handleExistingRemoveDoc={handleExistingRemoveDoc}
            handleExistingRadioChange={handleExistingRadioChange}
          />
          {errors && errors['alldocuments'] && (
            <Typography
              m={0}
              fontSize={12}
              color="error"
              align="center"
              mt={2}
            >
              {(errors['alldocuments'] as any).message as string}
            </Typography>
          )}
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="end"
            mt={5}
            spacing={2}
          >
            <SkipButton onClick={handleSkip}>Skip for Now</SkipButton>
            <CustomButton
              type="submit"
              onClick={() => {}}
              color="blue"
              xsWidth="100%"
              mdWidth="30%"
              lgWidth="25%"
              icon="default"
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Save & Continue
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </SignupProjectCardWrapper>
  );
};

export default SignupProjectDetails;
