import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CompanyEditDetailsWrapper, EditCompanyBackButton } from './style';
import { Box, Stack, Typography } from '@mui/material';
import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import SignupCompanyDetailsForm from '@/components/common/signup-company-details-forn';
import { CustomButton } from '@/components/common/ui';
import { FOUNDER } from '@/helpers/constants';
import { companyUpdate } from '@/services/apiDefinition';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  signupCompanyFounderDetailsSchema,
  signupCompanyInvestorDetailsSchema,
} from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';

type FormData = {
  firstName: string;
  lastName: string;
};

const CompanyEditDetails = ({ type, setEditProfile, companyDetails }: any) => {
  const [documents, setDocuments] = useState<any>([]);
  const [deletedDoc, setDeletedDoc] = useState<any>([]);
  const [existingDoc, setExistingDoc] = useState<any>(
    companyDetails?.company_docs
  );
  const methods = useForm<any>({
    resolver: yupResolver(signupCompanyFounderDetailsSchema),
    defaultValues: {
      // company_docs: companyDetails.company_docs,
      company_name: companyDetails.company_name,
      website: companyDetails.website,
      established_year: companyDetails.established_year,
      number_of_employees: companyDetails.number_of_employees,
      industry: companyDetails.industry,
      description: companyDetails.description,
      contact_function: companyDetails.contact_function,
      contact_number: companyDetails.contact_number,
      contact_fname: companyDetails.contact_fname,
      contact_lname: companyDetails.contact_lname,
      company_location: companyDetails.company_location,
      company_logo: companyDetails?.company_logo,
      cover_photo: companyDetails?.cover_photo,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const route = useRouter();
  const { errors } = methods?.formState;

  const onSubmit = async (data: any) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]: any) => {
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
            (values?.image_url || values.logo_url || '').includes('cloudinary')
          )
            return;
          toast.error(`Invalid value for ${key}: ${value}`);
        }
      } else if (key === 'company_docs') {
        for (let i = 0; i < documents?.length; i++) {
          formData.append(key, documents[i].doc);
        }
      } else {
        const formattedValue = Array.isArray(value)
          ? JSON.stringify(value)
          : String(value);
        formData.append(key, formattedValue);
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
        toast.success(
          response?.message || 'company details updated successfully'
        );
        setEditProfile(false);
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
    <CompanyEditDetailsWrapper>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Box>
          <Typography variant="h4">Company Details</Typography>
          <Typography>Helps others on the platform know you better</Typography>
        </Box>
        <EditCompanyBackButton
          onClick={() => setEditProfile(false)}
          variant="text"
          startIcon={<KeyboardArrowLeftIcon />}
        >
          Back
        </EditCompanyBackButton>
      </Stack>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <SignupCompanyDetailsForm
            type={FOUNDER}
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
              loadingText="Updating..."
            >
              Save Changes
            </CustomButton>
          </Stack>
        </form>
      </FormProvider>
    </CompanyEditDetailsWrapper>
  );
};

export default CompanyEditDetails;
