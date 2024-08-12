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
const PricingPlanCard = ({
  type,
  pricingCardType,
}: {
  type: 'founder' | 'investor';
  pricingCardType: boolean;
}) => {
  const [selectedValue, setSelectedValue] = useState<any>(
    pricingCardType ? '0' : '3'
  );
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [subId, setSubId] = useState<SubIdType>({});
  const [planDetails, setPlanDetails] = useState([]);
  // const [detailsForm, setDetailsForm] = useState<'card' | 'bank' | null>(null);
  const userData: any = useAppSelector(user);
  const router = useRouter();
  const handleRadioChange = (value: string) => {
    setSelectedValue(value);
  };

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

  const handleFreePlan = async () => {
    try {
      const createStripeRes = await api.post(createStripeCustomer);
      const createSubRes = await api.post(createSubscription, {
        plan_id: subId[selectedValue],
      });

      if (createStripeRes.success && createSubRes.success) {
        router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
        toast.success('Free Subscription activated successfully');
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }

    router.push(`/${userData.role.toLowerCase()}/signup?tab=ADMIN`);
  };

  if (!planDetails || planDetails.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h4">Loading...</Typography>
      </Box>
    );
  }
  return (
    <PricingCardWrapper>
      <PricingTopSection>
        <TypeTextWrapper>
          <TypeText
            variant="h4"
            align="center"
          >
            {pricingCardType ? 'Demo Access' : 'Select Subscription Plan'}
          </TypeText>
        </TypeTextWrapper>
        <Stack>
          <Typography
            variant="h3"
            align="center"
            mx={2}
          >
            {pricingCardType ? 'Free Subscription Plan' : 'Subscription Plans'}
          </Typography>
          {/* <Typography
            align="center"
            mx={2}
          >
            This plan for demo .
          </Typography> */}
        </Stack>
      </PricingTopSection>
      <Stack
        m={{ xs: 2, md: 4 }}
        spacing={3}
      >
        {pricingCardType ? (
          <RadioButtonWrapper
            direction="row"
            p={{ xs: 2, md: 4 }}
          >
            <Radio
              checked={selectedValue === '0'}
              onChange={() => handleRadioChange('0')}
              value={selectedValue}
              name="radio-buttons"
              inputProps={{ 'aria-label': '0' }}
            />
            <Box>
              <Typography
                variant="h4"
                fontSize={24}
              >
                Free
              </Typography>
              <Typography>
                Note: Demo account for illustrative purposes only. An upgrade to
                the full access version is possible at any time.
              </Typography>
            </Box>
          </RadioButtonWrapper>
        ) : (
          <>
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
                          <span style={{ color: '#635BFF' }}>
                            {plan.discount}%
                          </span>
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
                          marginLeft: '6px',
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
                    </Typography>{' '}
                    <Typography>
                      Note: Renews automatically every {plan.month} months if
                      not canceled.
                    </Typography>
                  </Box>
                </RadioButtonWrapper>
              ))}
            {/* <RadioButtonWrapper direction='row' p={{ xs: 2, md: 4 }}>
              <Radio
                checked={selectedValue === '3'}
                onChange={() => handleRadioChange('3')}
                value={selectedValue}
                name='radio-buttons'
                inputProps={{ 'aria-label': '3' }}
              />
              <Box>
                <Typography variant='h4' fontSize={24}>
                  3 Months
                </Typography>
                <Typography>
                  Note: Renews automatically every 3 months if not canceled.
                </Typography>
              </Box>
            </RadioButtonWrapper>
            <RadioButtonWrapper direction='row' p={{ xs: 2, md: 4 }}>
              <Radio
                checked={selectedValue === '6'}
                onChange={() => handleRadioChange('6')}
                value={selectedValue}
                name='radio-buttons'
                inputProps={{ 'aria-label': '6' }}
              />
              <Box>
                <Typography variant='h4' fontSize={24}>
                  6 Months | 10% Off
                </Typography>
                <Typography>
                  Note: Renews automatically every 6 months if not canceled.
                </Typography>
              </Box>
            </RadioButtonWrapper>
            <RadioButtonWrapper direction='row' p={{ xs: 2, md: 4 }}>
              <Radio
                checked={selectedValue === '12'}
                onChange={() => handleRadioChange('12')}
                value={selectedValue}
                name='radio-buttons'
                inputProps={{ 'aria-label': '12' }}
              />
              <Box>
                <Typography variant='h4' fontSize={24}>
                  12 Months | 20% Off
                </Typography>
                <Typography>
                  Note: Renews automatically every 12 months if not canceled.
                </Typography>
              </Box>
            </RadioButtonWrapper> */}
          </>
        )}
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="center"
        m={{ xs: 2, md: 4 }}
        py={3}
      >
        {pricingCardType ? (
          <CustomButton
            color="blue"
            xsWidth="100%"
            smWidth="70%"
            mdWidth="50%"
            lgWidth="50%"
            onClick={handleFreePlan}
          >
            Continue
          </CustomButton>
        ) : (
          <CustomButton
            color="blue"
            xsWidth="100%"
            smWidth="70%"
            mdWidth="40%"
            lgWidth="30%"
            onClick={async () => {
              await api.post(createStripeCustomer);
              setShowPaymentModal(true);
            }}
          >
            Continue
          </CustomButton>
        )}
      </Stack>
      <CommonModal
        open={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
      >
        <PricingPlanCardWrapper>
          {/* {!detailsForm && (
            <Stack
              direction="row"
              spacing={2}
            >
              <CardWrapper onClick={() => setDetailsForm('card')}>
                <Typography variant="h4">Enter Card Details</Typography>
              </CardWrapper>
              <CardWrapper onClick={() => setDetailsForm('bank')}>
                <Typography variant="h4">Enter Bank Details</Typography>
              </CardWrapper>
            </Stack>
          )} */}
          <CardForm
            planId={subId[selectedValue]}
            onClose={() => setShowPaymentModal(false)}
            update={false}
          />
        </PricingPlanCardWrapper>
      </CommonModal>
    </PricingCardWrapper>
  );
};

export default PricingPlanCard;
