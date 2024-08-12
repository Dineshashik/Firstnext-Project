'use client';
import React, { useState, useEffect } from 'react';
import { CardWrapper, CustomButton } from '@/components/common/ui';
import {
  Box,
  CircularProgress,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { FieldValues, FormProvider, useForm } from 'react-hook-form';
import SignupProjectDetailsForm from '@/components/common/signup-project-details-form';
import {
  getMyProjectById,
  projectUpdate,
  updateProjectStatus,
} from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signupProjectDetailsSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';

const names = [
  { title: 'Active', value: 'active' },
  { title: 'Close', value: 'close' },
];

const EditProjectDetailsCard = ({ projectId }: { projectId: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [editLoading, setEditLoading] = useState<boolean>(false);
  const [dropDownValue, setDropDownValue] = useState('active');
  const [documents, setDocuments] = useState<any>([]);
  const [radioValue, setRadioValue] = React.useState<any>([]);
  const [projectByIdData, setProjectByIdData] = useState<any>();
  const [deletedDoc, setDeletedDoc] = useState<any>([]);
  const [updatedDoc, setUpdatedDoc] = useState<any>([]);
  const [existingDoc, setExistingDoc] = useState<any>([]);

  const handleChange = async (e: any) => {
    setDropDownValue(e.target.value);
    const status = e.target.value === 'active' ? false : true;
    try {
      const res = await api.put<any>(`${updateProjectStatus}/${projectId}`, {
        project_closed: status,
      });
      if (res.success) {
        toast.success('Project status updated successfully');
        setDropDownValue(res.data.project_closed ? 'close' : 'active');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };
  const methods = useForm<any>({
    resolver: yupResolver(signupProjectDetailsSchema),
  });

  const { errors }: any = methods?.formState;
  useEffect(() => {
    setEditLoading(true);
    const fetchProjectByIdData = async () => {
      try {
        const response = await api.get<any>(`${getMyProjectById}/${projectId}`);
        if (response.success) {
          setProjectByIdData(response.data[0]);
          setExistingDoc(response.data[0]?.project_docs);
          setDropDownValue(
            response.data[0]?.project_closed ? 'close' : 'active'
          );
        }
        setEditLoading(false);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
        setEditLoading(false);
      }
    };

    fetchProjectByIdData();
  }, [projectId]);

  useEffect(() => {
    if (projectByIdData) {
      methods.reset({
        project_name: projectByIdData?.project_name,
        funding_scope: projectByIdData?.funding_scope,
        description: projectByIdData?.description,
        amount_to_raised: projectByIdData?.amount_to_raised,
        market_opportunity: projectByIdData?.market_opportunity,
        stage_of_development: projectByIdData.stage_of_development,
        funding_requirements: projectByIdData?.funding_requirements,
        funding_stage: projectByIdData?.funding_stage,
        performance_projections: projectByIdData?.performance_projections,
        revenue_model: projectByIdData?.revenue_model,
        exit_strategy: projectByIdData?.exit_strategy,
        investor_benefits: projectByIdData?.investor_benefits,
        image: projectByIdData?.image,
        // project_closed: projectByIdData?.project_closed,
      });
    }
  }, [methods, methods.reset, projectByIdData]);

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
      const res: any = await api.put(
        `${projectUpdate}/${projectId}`,
        formData,
        'multipart/form-data'
      );

      if (res.success) {
        setIsLoading(false);
        toast.success(res.message || 'Details updated successfully');
        router.push(`/founder/project-management/${projectId}/project-details`);
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

  return (
    <CardWrapper>
      <Box padding={3}>
        <Stack
          direction="row"
          justifyContent="space-between"
        >
          <Box>
            <Typography variant="h4">Project Details</Typography>
          </Box>
          <Select
            value={dropDownValue}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {names.map((item) => (
              <MenuItem
                key={item.title}
                value={item.value}
              >
                {item.title}
              </MenuItem>
            ))}
          </Select>
        </Stack>
        {editLoading && (
          <Stack
            alignItems="center"
            justifyContent="center"
            direction="column"
          >
            <CircularProgress color="primary" />
          </Stack>
        )}
        {!editLoading && (
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
        )}
      </Box>
    </CardWrapper>
  );
};

export default EditProjectDetailsCard;
