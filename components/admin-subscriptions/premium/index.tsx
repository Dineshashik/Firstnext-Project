'use client';
import DynamicTabs from '@/components/common/custom-tab';
import { CustomButton } from '@/components/common/ui';
import {
  InputField,
  SelectInput,
  TextareaInputField,
} from '@/components/common/ui/input-fields';
import { FREE, PREMIUM } from '@/helpers/constants';
import {
  adminUpdateSubscriptionContent,
  adminUpdateSubscriptionPlan,
  getSubscriptionContent,
  getSubscriptions,
  updateSubscriptionContent,
  updateSubscriptionPlan,
} from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { Box, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const TextFiledInput = ({ textFieldName = 'text1', register, errors }: any) => {
  return (
    <Stack spacing={1} width={{ xs: '100%', md: '60%', lg: '40%' }}>
      <InputField
        name={`${textFieldName}.heading_text`}
        label='Heading Text'
        register={register}
        errors={errors}
        placeholder='Heading Text'
      />
      <TextareaInputField
        name={`${textFieldName}.sub_text`}
        label='Sub text'
        register={register}
        errors={errors}
        placeholder='Sub text'
      />
      <Stack direction='row' spacing={1} my={2}>
        <input type='checkbox' {...register(`${textFieldName}.check_box`)} />
        <Typography variant='h6'>Feature Available or Not</Typography>
      </Stack>
    </Stack>
  );
};

const TextFiledSubMonthInput = ({ month = '3', existingData }: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FieldValues>();

  useEffect(() => {
    reset(existingData);
  }, [reset, existingData]);

  const onSubMonthSubmit = async (data: any) => {
    try {
      const response = await api.put<any>(updateSubscriptionPlan, {
        discount: +data.discount,
        price: +data.price,
        plan_type: PREMIUM,
        month: +month,
      });
      if (response.success) {
        toast.success(
          response?.message || 'Subscription Plan updated successfully'
        );
      } else {
        toast.error(response?.message || 'Somthing went wrong');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Somthing went wrong');
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubMonthSubmit)}>
      <Box width={{ xs: '100%', md: '60%', lg: '40%' }}>
        <InputField
          name='price'
          label='Price ($)'
          register={register}
          errors={errors}
          placeholder='Enter Price'
          type='number'
        />
        <Box mt={1} />
        <InputField
          name='discount'
          label='Discount (%)'
          register={register}
          errors={errors}
          placeholder='Enter Discount You gave'
          type='number'
        />
      </Box>
      <Stack direction='row' justifyContent='end' mt={5} mb={3}>
        <CustomButton icon='default' color='blue' type='submit'>
          Submit
        </CustomButton>
      </Stack>
    </form>
  );
};

const DisplayPriceInput = ({
  textFieldName = 'display_price',
  register,
  errors,
}: any) => {
  return (
    <Stack spacing={1} width={{ xs: '100%', md: '60%', lg: '40%' }}>
      <InputField
        name={`display_price`}
        label='Pricing Per Month'
        type='number'
        register={register}
        errors={errors}
        placeholder='Enter Pricing Per Month'
      />
    </Stack>
  );
};

const AdminSubsPremiumTab = () => {
  const [subMonthData, setSubMonthData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register: textRegister,
    handleSubmit: textHandleSubmit,
    formState: { errors: textErrors },
    reset,
  } = useForm<any>();

  function getPlanDetailsForMonth(data: any, month: string) {
    const plan: any = data && data.find((plan: any) => plan.month === month);
    if (plan) {
      return {
        price: plan.price / 100,
        discount: plan.discount,
      };
    }
  }

  useEffect(() => {
    async function fetchFreeData() {
      try {
        const response = await api.get<any>(getSubscriptionContent, {
          plan_type: PREMIUM,
        });
        if (response.success && response.data) {
          reset(response.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }

    fetchFreeData();
  }, [reset]);

  useEffect(() => {
    async function fetchSubMonthData() {
      try {
        const response = await api.get<any>(getSubscriptions);
        if (response.success && response.data) {
          setSubMonthData(response.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }

    fetchSubMonthData();
  }, [reset]);

  const onSubTextSubmit = async (data: any) => {
    const req = {
      ...data,
      plan_type: PREMIUM,
    };
    try {
      setIsLoading(true);
      const response = await api.put<any>(updateSubscriptionContent, req);
      if (response.success) {
        setIsLoading(false);
        toast.success(
          response?.message || 'Subscriptions Content updated successfully'
        );
      } else {
        setIsLoading(false);
        toast.error(response?.message || 'Something went wrong');
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const tabs = [
    {
      name: 'Display Pricing',
      content: (
        <DisplayPriceInput
          register={textRegister}
          errors={textErrors}
          textFieldName='display_price'
        />
      ),
    },
    {
      name: 'Text 1',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text1'
        />
      ),
    },
    {
      name: 'Text 2',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text2'
        />
      ),
    },
    {
      name: 'Text 3',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text3'
        />
      ),
    },
    {
      name: 'Text 4',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text4'
        />
      ),
    },
    {
      name: 'Text 5',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text5'
        />
      ),
    },
    {
      name: 'Text 6',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text6'
        />
      ),
    },
    {
      name: 'Text 7',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text7'
        />
      ),
    },
    {
      name: 'Text 8',
      content: (
        <TextFiledInput
          register={textRegister}
          errors={textErrors}
          textFieldName='text8'
        />
      ),
    },
  ];

  const subTabs = [
    {
      name: '3 Months',
      content: (
        <TextFiledSubMonthInput
          month='3'
          existingData={getPlanDetailsForMonth(subMonthData, '3')}
        />
      ),
    },
    {
      name: '6 Months',
      content: (
        <TextFiledSubMonthInput
          month='6'
          existingData={getPlanDetailsForMonth(subMonthData, '6')}
        />
      ),
    },
    {
      name: '12 Months',
      content: (
        <TextFiledSubMonthInput
          month='12'
          existingData={getPlanDetailsForMonth(subMonthData, '12')}
        />
      ),
    },
  ];
  return (
    <Box>
      <DynamicTabs tabs={subTabs} />

      <form onSubmit={textHandleSubmit(onSubTextSubmit)}>
        <DynamicTabs tabs={tabs} />
        <Stack direction='row' justifyContent='end' mt={5}>
          <CustomButton
            icon='default'
            color='blue'
            type='submit'
            isLoading={isLoading}
            loadingText='Submit...'
          >
            Submit
          </CustomButton>
        </Stack>
      </form>
    </Box>
  );
};

export default AdminSubsPremiumTab;
