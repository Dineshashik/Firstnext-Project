'use client';
import DynamicTabs from '@/components/common/custom-tab';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  TextareaInputField,
} from '@/components/common/ui/input-fields';
import { FREE } from '@/helpers/constants';
import {
  adminUpdateSubscriptionPlan,
  getSubscriptionContent,
  updateSubscriptionContent,
} from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { Box, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  FieldError,
  FieldErrors,
  FieldValues,
  useForm,
  UseFormRegister,
} from 'react-hook-form';
import { toast } from 'react-toastify';

interface TextFileInputPropsType {
  textFieldName: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const TextFiledInput = ({
  textFieldName = 'text1',
  register,
  errors,
}: TextFileInputPropsType) => {
  return (
    <>
      <InputField
        name={`${textFieldName}.heading_text`}
        label="Heading Text"
        register={register}
        errors={errors}
        placeholder="Heading Text"
      />
      <TextareaInputField
        name={`${textFieldName}.sub_text`}
        label="Sub text"
        register={register}
        errors={errors}
        placeholder="Sub text"
      />
      <Stack direction="row" spacing={1} my={2}>
        <input
          type="checkbox"
          {...register(`${textFieldName}.check_box`)}
        />
        <Typography variant='h6'>Feature Available or Not</Typography>
      </Stack>
    </>
  );
};

const AdminSubsFreeTab = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>();

  useEffect(() => {
    async function fetchFreeData() {
      try {
        const response = await api.get<any>(getSubscriptionContent, {
          plan_type: FREE,
        });
        if (response.success && response.data) {
          reset(response.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    }

    fetchFreeData();
  }, [reset]);

  const onSubmit = async (data: any) => {
    const req = {
      ...data,
      plan_type: FREE,
    };
    try {
      setIsLoading(true)
      const response = await api.put<any>(updateSubscriptionContent, req);
      if (response.success) {
        setIsLoading(false)
        toast.success(
          response?.message || 'Subscriptions Content updated successfully'
        );
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const tabs = [
    {
      name: 'Text 1',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text1"
        />
      ),
    },
    {
      name: 'Text 2',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text2"
        />
      ),
    },
    {
      name: 'Text 3',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text3"
        />
      ),
    },
    {
      name: 'Text 4',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text4"
        />
      ),
    },
    {
      name: 'Text 5',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text5"
        />
      ),
    },
    {
      name: 'Text 6',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text6"
        />
      ),
    },
    {
      name: 'Text 7',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text7"
        />
      ),
    },
    {
      name: 'Text 8',
      content: (
        <TextFiledInput
          register={register}
          errors={errors}
          textFieldName="text8"
        />
      ),
    },
  ];
  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DynamicTabs tabs={tabs} />
        <CustomButton
          icon="default"
          color="blue"
          type="submit"
          isLoading={isLoading}
          loadingText='Submit...'
        >
          Submit
        </CustomButton>
      </form>
    </Box>
  );
};

export default AdminSubsFreeTab;
