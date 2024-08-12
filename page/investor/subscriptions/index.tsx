'use client';
import { Grid } from '@mui/material';
import { SubscriptionsPageWrapper } from './style';
import YourSubscritions from '@/components/subscriptions/your-subscription';
import SubscriptionsHistory from '@/components/subscriptions/subscription-history';
import { useEffect, useState } from 'react';
import { api } from '@/services/axiosInstance';
import {
  cancelSubscription,
  getUserSubscription,
  getUserTransactions,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';

const InvestorSubscriptionsPage = () => {
  const [subscriptionData, setSubscriptionData] = useState<any>([]);
  const [transactionsData, setTransactionsData] = useState<any>([]);
  const SubscriptionsDetails = [
    {
      id: 1,
      key: 'Status',
      value: subscriptionData?.active ? 'Active' : 'Completed',
    },
    {
      id: 2,
      key: 'Plan',
      value: subscriptionData?.plan_id?.plan_type,
    },
    {
      id: 3,
      key: 'Amount',
      value: '$' + (subscriptionData?.plan_id?.price / 100).toString(),
    },
    {
      id: 4,
      key: 'Start Date',
      value: new Date(subscriptionData?.start_date).toLocaleDateString(
        'en-US',
        {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }
      ),
    },
    {
      id: 5,
      key: 'Renewal Date',
      value: new Date(subscriptionData?.end_date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    {
      id: 6,
      key: 'Payment Mode',
      value: 'Stripe',
    },
    {
      id: 7,
      key: 'Sub_ID',
      value: subscriptionData?.subscription_id,
    },
  ];

  const futureSubscriptionsDetails = [
    {
      id: 1,
      key: 'Status',
      value: subscriptionData?.future_subscription?.at(0)?.active
        ? 'Active'
        : 'Completed',
    },
    {
      id: 2,
      key: 'Plan',
      value: subscriptionData?.future_subscription?.at(0)?.plan_id?.plan_type,
    },
    {
      id: 3,
      key: 'Amount',
      value: (
        subscriptionData?.future_subscription?.at(0)?.plan_id?.price / 100
      ).toString(),
    },
    {
      id: 4,
      key: 'Start Date',
      value: new Date(
        subscriptionData?.future_subscription?.at(0)?.start_date
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    {
      id: 5,
      key: 'Renewal Date',
      value: new Date(
        subscriptionData?.future_subscription?.at(0)?.end_date
      ).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }),
    },
    {
      id: 6,
      key: 'Payment Mode',
      value: 'Stripe',
    },
    {
      id: 7,
      key: 'Sub_ID',
      value: subscriptionData?.future_subscription?.at(0)?.subscription_id,
    },
  ];
  async function fetchSubscriptionData() {
    try {
      const resSubscription: any = await api.get(getUserSubscription);
      if (resSubscription.success) {
        setSubscriptionData(resSubscription.data);
        if (resSubscription?.data) {
          const resTransactions: any = await api.get(
            getUserTransactions + '/' + resSubscription?.data?._id
          );
          if (resTransactions.success) {
            setTransactionsData(resTransactions.data.filter((item:any) => item.plan.plan_type !== "FREE"));
          }
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    fetchSubscriptionData();
  }, []);

  const handleCancelPlan = async () => {
    try {
      const response = await api.get<any>(cancelSubscription);
      if (response.success) {
        fetchSubscriptionData();
        toast.success(response?.message || 'Cancel subscription successfully');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <SubscriptionsPageWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={4}>
          <YourSubscritions
            data={SubscriptionsDetails}
            handleCancelPlan={handleCancelPlan}
            futureSubscriptionData={
              subscriptionData?.future_subscription?.at(0) &&
              futureSubscriptionsDetails
            }
          />
        </Grid>
        <Grid item xs={12} lg={8}>
          <SubscriptionsHistory data={transactionsData} />
        </Grid>
      </Grid>
    </SubscriptionsPageWrapper>
  );
};

export default InvestorSubscriptionsPage;
