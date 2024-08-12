import React, { useEffect, useState } from 'react';
import { Box, Radio, Stack, Typography } from '@mui/material';
import { CustomButton } from '../ui';
import CommonModal from '../modal';
import CardForm from '../card-form';
import { api } from '@/services/axiosInstance';
import {
  createStripeCustomer,
  createSubscription,
  getSubscriptions,
  updateSubscription,
} from '@/services/apiDefinition';
import {
  PricingCardWrapper,
  PricingPlanCardWrapper,
  PricingTopSection,
  RadioButtonWrapper,
  TypeText,
  TypeTextWrapper,
} from './style';
import { ToastContainer, toast } from 'react-toastify';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { useRouter } from 'next/navigation';

type SubIdType = {
  [month: string]: string;
};
const PricingRenewPlanCard = () => {
  const [selectedValue, setSelectedValue] = useState<any>('3');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [subId, setSubId] = useState<SubIdType>({});
  const [planDetails, setPlanDetails] = useState([]);

  // const [detailsForm, setDetailsForm] = useState<'card' | 'bank' | null>(null);
  const userData: any = useAppSelector(user);
  const router = useRouter();
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const res: any = await api.get(getSubscriptions);
        if (res.data) {
          setPlanDetails(res?.data);
          const transformedData = res.data.reduce((acc: any, item: any) => {
            acc[Number(item.month) || 0] = item._id;
            return acc;
          }, {} as SubIdType);
          setSubId(transformedData);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }

    fetchData();
  }, []);

  const handleSubPlan = async () => {
    try {
      setIsLoading(true);
      const res = await api.post(createStripeCustomer);
      if (res.success) {
        setIsLoading(false);
        setShowPaymentModal(true);
      }
    } catch (error: any) {
      setIsLoading(false);
      router.back();
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <PricingCardWrapper>
      <PricingTopSection>
        <TypeTextWrapper>
          <TypeText
            variant="h4"
            align="center"
          >
            Select Subscription Plan
          </TypeText>
        </TypeTextWrapper>
        <Stack>
          <Typography
            variant="h3"
            align="center"
            mx={2}
          >
            Subscription Plans
          </Typography>
        </Stack>
      </PricingTopSection>
      <Stack
        m={{ xs: 2, md: 4 }}
        spacing={3}
      >
        {planDetails
          .filter((plan: any) => plan.plan_type === 'PREMIUM')
          .map((plan: any) => (
            <RadioButtonWrapper
              direction="row"
              p={{ xs: 2, md: 4 }}
              key={plan._id}
            >
              <Radio
                checked={selectedValue === plan.month}
                onChange={() => handleRadioChange(plan.month)}
                value={plan.month}
                name="radio-buttons"
                inputProps={{ 'aria-label': plan.month }}
              />
              <Box>
                <Typography
                  variant="h4"
                  fontSize={24}
                >
                  {`${plan.month} Months`}
                  {plan.discount > 0 ? (
                    <>
                      <span style={{ margin: '0 4px' }}>|</span>
                      <span style={{ color: '#635BFF' }}>{plan.discount}%</span>
                    </>
                  ) : (
                    ''
                  )}
                </Typography>
                <Typography>
                  Price:
                  <span
                    style={{
                      textDecoration:
                        plan.discount > 0 ? 'line-through' : 'none',
                      marginLeft: '4px',
                    }}
                  >
                    {plan?.price / 100} USD
                  </span>{' '}
                  {plan.discount > 0 && (
                    <>
                      <span style={{ margin: '0 4px' }}>|</span>
                      <span>{plan.discounted_price / 100} USD</span>
                    </>
                  )}
                </Typography>
                <Typography>
                  Note: Renews automatically every {plan.month} months if not
                  canceled.
                </Typography>
              </Box>
            </RadioButtonWrapper>
          ))}
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        m={{ xs: 2, md: 4 }}
        py={3}
      >
        <CustomButton
          color="blue"
          xsWidth="100%"
          smWidth="70%"
          mdWidth="40%"
          lgWidth="30%"
          onClick={handleSubPlan}
          isLoading={isLoading}
        >
          Continue
        </CustomButton>
      </Stack>
      <CommonModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <PricingPlanCardWrapper>
          <CardForm
            planId={subId[selectedValue]}
            onClose={() => setShowPaymentModal(false)}
            update={true}
          />
        </PricingPlanCardWrapper>
      </CommonModal>
    </PricingCardWrapper>
  );
};

export default PricingRenewPlanCard;
