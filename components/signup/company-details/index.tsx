import { CustomButton, Typography } from '@/components/common/ui';
import { Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { CompanyDetailsCardWrapper } from './style';
import { FormProvider, useForm } from 'react-hook-form';
import SignupCompanyDetailsForm from '@/components/common/signup-company-details-forn';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  signupCompanyFounderDetailsSchema,
  signupCompanyInvestorDetailsSchema,
} from '@/services/schema';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { companyUpdate, getCompany } from '@/services/apiDefinition';
import { useRouter } from 'next/navigation';
// interface CompanyDetailsFormData {
//   company_logo: File;
//   cover_photo: File;
//   company_name: string;
//   website: string;
//   established_year: number;
//   number_of_employees: number;
//   sector: string;
//   location: string;
//   description: string;
//   contact_fname: string;
//   contact_lname: string;
//   contact_number: string;
//   contact_function: string;
//   company_docs?: File;
// }

const SignupCompanyDetails = ({
  type,
  companyDetails,
  // fetchSignupDetails,
  setCompanyDetails,
}: {
  companyDetails: any;
  type: 'founder' | 'admin' | 'investor';
  fetchSignupDetails?: any;
  setCompanyDetails?: any;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documents, setDocuments] = useState<any>([]);
  const [deletedDoc, setDeletedDoc] = useState<any>([]);
  const [existingDoc, setExistingDoc] = useState<any>(
    companyDetails?.company_docs
  );

  useEffect(() => {
    setExistingDoc(companyDetails?.company_docs);
  }, [companyDetails?.company_docs]);

  const methods = useForm<any>({
    resolver: yupResolver(
      type === 'investor'
        ? (signupCompanyInvestorDetailsSchema as any)
        : (signupCompanyFounderDetailsSchema as any)
    ),
    defaultValues: {
      company_name: companyDetails?.company_name,
      website: companyDetails?.website,
      established_year: companyDetails?.established_year,
      number_of_employees: companyDetails?.number_of_employees,
      industry: companyDetails?.industry,
      description: companyDetails?.description,
      contact_function: companyDetails?.contact_function,
      contact_number: companyDetails?.contact_number,
      company_logo: companyDetails?.company_logo || '',
      cover_photo: companyDetails?.cover_photo || '',
    },
  });

  const router = useRouter();
  useEffect(() => {
    methods.reset({
      company_name: companyDetails?.company_name,
      website: companyDetails?.website,
      established_year: companyDetails?.established_year,
      number_of_employees: companyDetails?.number_of_employees,
      industry: companyDetails?.industry,
      description: companyDetails?.description,
      contact_fname: companyDetails?.contact_fname,
      contact_lname: companyDetails?.contact_lname,
      contact_function: companyDetails?.contact_function,
      contact_number: companyDetails?.contact_number,
      company_logo: companyDetails?.company_logo,
      cover_photo: companyDetails?.cover_photo,
    });
    methods.setValue('company_location', companyDetails?.company_location);
  }, [companyDetails, methods]);
  const { errors }: any = methods?.formState;
  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'company_logo' || key === 'cover_photo') {
        if (value instanceof FileList) {
          for (let i = 0; i < value.length; i++) {
            formData.append(key, value[i]);
          }
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          let values: any = value;
          if (
            ['cover_photo', 'company_logo'].includes(key) &&
            (values?.image_url || values?.logo_url || '').includes('cloudinary')
          )
            return;
          toast.error(`Invalid value for ${key}: ${value}`);
        }
      } else if (key === 'company_docs') {
        for (let i = 0; i < documents?.length; i++) {
          formData.append(key, documents[i].doc);
        }
      } else {
        const formatedValue = Array.isArray(value)
          ? JSON.stringify(value)
          : String(value);
        if (formatedValue) {
          formData.append(key, formatedValue);
        }
      }
    });
    deletedDoc.map((item: string, index: number) =>
      formData.append(`deleted_docs[${[index]}]`, item)
    );

    try {
      setIsLoading(true);
      const response = await api.post<any>(
        companyUpdate,
        formData,
        'multipart/form-data'
      );
      if (response.success) {
        setIsLoading(false);
        toast.success(response?.message || 'company updated successfully');
        setCompanyDetails(response?.data);
        // await fetchSignupDetails();
        router.push(`/${type}/signup?tab=OTHER`);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error);
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
    if (data.company_docs?.length > 0) {
      let temp = [];
      let docLength = documents?.length ?? 0;
      for (let i = 0; i < data.company_docs.length; i++) {
        temp.push({ id: i + docLength, doc: data.company_docs[i] });
      }
      setDocuments([...temp]);
      methods.setValue('company_docs', []);
    }
  });

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

  return (
    <CompanyDetailsCardWrapper>
      <Stack>
        <Typography variant="h4">Company Details</Typography>
        <Typography>
          Let&apos;s enter your company details to help investors on the
          platform get to know you better.
        </Typography>
      </Stack>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          {/* here I have to change founder or investor */}
          <SignupCompanyDetailsForm
            type={type}
            documents={documents}
            handleRemoveDoc={handleRemoveDoc}
            existingDoc={existingDoc}
            handleExistingRemoveDoc={handleExistingRemoveDoc}
        
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
            <CustomButton
              type="submit"
              onClick={() => {}}
              color="blue"
              xsWidth="100%"
              smWidth="100%"
              mdWidth="30%"
              lgWidth="25%"
              isLoading={isLoading}
              loadingText="Saving..."
            >
              Save & Continue
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </CompanyDetailsCardWrapper>
  );
};

export default SignupCompanyDetails;
