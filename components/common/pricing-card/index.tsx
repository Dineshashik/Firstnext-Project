import { Box, Divider, Stack, Typography } from '@mui/material';
import { CustomButton } from '../ui';
import Image from 'next/image';
import {
  PricingCardWrapper,
  TypeTextWrapper,
  PricingTopSection,
  TypeText,
  PricingDetailsWrapper,
} from './style';

interface PricingCardType {
  id: number;
  iconUrl: string;
  title: string;
  details: string;
}

const PricingCard = ({ data, onClick }: any) => {
  return (
    <PricingCardWrapper>
      <PricingTopSection>
        <TypeTextWrapper>
          <TypeText
            variant="h4"
            align="center"
          >
            {data?.name}
          </TypeText>
        </TypeTextWrapper>
        <Stack alignItems="center">
          {data?.price === 'Free' ? (
            <Typography variant="h3">{data?.price}</Typography>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
            >
              <Typography variant="h3">{data?.price}</Typography>
              <Typography
                variant="h4"
                color="#425466"
                mt={1}
              >
                /Month
              </Typography>
            </Stack>
          )}
          <Typography>{data?.accessTime}</Typography>
          <CustomButton
            color="blue"
            xsWidth="40%"
            mdWidth="60%"
            lgWidth="40%"
            onClick={onClick}
          >
            Get Started
          </CustomButton>
          <Box mt={2}>
            {data?.price !== 'Free' ? (
              <Typography
                mx={2}
                align="center"
              >
                Discounts available for subscriptions of 6 months or more.
              </Typography>
            ) : (
              <Typography>&nbsp;</Typography>
            )}
          </Box>
        </Stack>
      </PricingTopSection>
      <Divider />
      <PricingDetailsWrapper>
        {data?.features?.map((item: any, index: number) => (
          <Stack
            direction="row"
            spacing={2}
            key={index}
            sx={{ marginBottom: '2rem' }}
          >
            <Image
              // src={item.iconUrl}
              src={`/asset/icon/${item.check_box.toString()}.svg`}
              alt="icon"
              width={36}
              height={36}
            />
            <Box>
              <Typography variant="h6">{item?.heading_text}</Typography>
              <Typography minHeight={data.name === 'Free' ? 30 : 0}>
                {item?.sub_text}
              </Typography>
            </Box>
          </Stack>
        ))}
      </PricingDetailsWrapper>
    </PricingCardWrapper>
  );
};

export default PricingCard;
