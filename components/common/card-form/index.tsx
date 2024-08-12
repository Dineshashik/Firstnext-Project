import { Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DatePickerInput, InputField } from '../ui/input-fields';
import { CustomButton } from '../ui';
import { toast } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardFormSchema } from '@/services/schema';
import { api } from '@/services/axiosInstance';
import {
  createStripeCustomer,
  createSubscription,
  updateSubscription,
} from '@/services/apiDefinition';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';

const stripe = require('stripe')(
  process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string
);

const CardForm = ({
  planId,
  onClose,
  update = false,
}: {
  planId: string;
  onClose: any;
  update: boolean;
}) => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const userData: any = useAppSelector(user);
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<any>({
    resolver: yupResolver(cardFormSchema),
  });

  const onSubmit = async (data: any) => {
    if (data.expiration) {
      const date = new Date(data.expiration);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      try {
        setIsLoading(true);
        const token = await stripe.tokens.create({
          card: {
            number: data.number,
            exp_month: month,
            exp_year: year,
            cvc: data.cvc,
          },
        });
        if (update) {
          const res = await api.put(updateSubscription, {
            plan_id: planId,
            token: token?.id,
          });
          if (res.success) {
            router.back();
            setIsLoading(false);
            onClose();
          } else {
            toast.error(res.message || 'Something went wrong');
          }
        } else {
          const res = await api.post(createSubscription, {
            plan_id: planId,
            token: token?.id,
          });
          if (res.success) {
            router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
            setIsLoading(false);
            onClose();
          } else {
            toast.error(res.message || 'Something went wrong');
          }
        }
      } catch (error: any) {
        setIsLoading(false);
        onClose();
        toast.error(error?.response?.data.message || 'Something went wrong');
      }
    }
  };
  return (
    <Stack>
      <Typography
        variant="h4"
        mb={2}
      >
        Add your card details
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          container
          spacing={2}
        >
          <Grid
            item
            xs={12}
          >
            <InputField
              name="number"
              label="Card Number"
              register={register}
              errors={errors}
              placeholder="Enter Your Card Number"
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <DatePickerInput
              name="expiration"
              label="Expiration"
              register={register}
              errors={errors}
              placeholder="Enter expiry"
              views={['month', 'year']}
              setValue={setValue}
              disablePast={true}
            />
          </Grid>
          <Grid
            item
            xs={6}
          >
            <InputField
              name="cvc"
              label="CVV"
              register={register}
              errors={errors}
              placeholder="Enter CVV number"
            />
          </Grid>
        </Grid>
        <CustomButton
          icon="default"
          color="blue"
          type="submit"
          isLoading={isLoading}
          loadingText="Submit..."
        >
          Submit
        </CustomButton>
      </form>
    </Stack>
  );
};

export default CardForm;
