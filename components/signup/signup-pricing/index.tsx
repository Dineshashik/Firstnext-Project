import React, { useEffect, useState } from 'react';
import { SignupPricingCardWrapper } from './style';
import { Box, Stack, Typography } from '@mui/material';
import CustomCarousel from '@/components/common/carousel';
import PricingCard from '@/components/common/pricing-card';
import { PricingData } from './data';
import PricingPlanCard from '@/components/common/pricing-plan';
import { CustomButton } from '@/components/common/ui';
import { getSubscriptionContent } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';

const breakpoint = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 2,
    slidesToSlide: 2,
  },
  tablet: {
    breakpoint: { max: 1024, min: 700 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 700, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

const SignupPricing = ({ type }: { type: 'founder' | 'investor' }) => {
  const [freeContent, setFreeContent] = useState<any>({});
  const [premiumContent, setPremiumContent] = useState<any>({});
  const [showSubCard, setShowSubCard] = useState(false);
  const [pricingCardType, setPricingCardType] = useState(false);

  async function fetchSubscriptionContent(planType: string, setContent: any) {
    try {
      const response = await api.get<any>(
        `${getSubscriptionContent}?plan_type=${planType}`
      );
      if (response?.success) {
        const newArray = Object.values(response?.data)?.filter(
          (obj) => typeof obj === 'object'
        );
        if (response?.data?.plan_type === 'FREE') {
          setContent({
            name: 'Demo Access',
            accessTime: 'Forever',
            features: newArray,
            price: 'Free',
          });
        } else {
          setContent({
            name: 'Full Access',
            accessTime: 'Monthly Price',
            features: newArray,
            price: `${response?.data?.display_price} USD`,
          });
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  }

  useEffect(() => {
    fetchSubscriptionContent('PREMIUM', setPremiumContent);
    fetchSubscriptionContent('FREE', setFreeContent);
  }, []);

  const handleSubCard = () => {
    setPricingCardType(false);
    setShowSubCard(true);
  };

  const handleFreeSubCard = () => {
    setPricingCardType(true);
    setShowSubCard(true);
  };
  return (
    <SignupPricingCardWrapper>
      <Stack direction='row' justifyContent='space-between'>
        <Box>
          <Typography variant='h4'>Pricing</Typography>
          <Typography>Choose a plan to proceed.</Typography>
        </Box>
        {showSubCard && (
          <CustomButton
            color='blue'
            xsWidth='10%'
            smWidth='15%'
            icon='default'
            onClick={() => setShowSubCard(false)}
          >
            Back
          </CustomButton>
        )}
      </Stack>

      {!showSubCard ? (
        <CustomCarousel breakpoint={breakpoint}>
          {/* {PricingData.map((item) => (
            <PricingCard
              data={item}
              key={item.name}
              onClick={handleSubCard}
            />
          ))} */}
          <PricingCard
            data={freeContent}
            key={freeContent.name}
            onClick={handleFreeSubCard}
          />
          <PricingCard
            data={premiumContent}
            key={premiumContent.name}
            onClick={handleSubCard}
          />
        </CustomCarousel>
      ) : (
        <PricingPlanCard pricingCardType={pricingCardType} type={type} />
      )}
    </SignupPricingCardWrapper>
  );
};

export default SignupPricing;
