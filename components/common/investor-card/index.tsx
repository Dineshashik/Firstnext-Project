import { Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';
import {
  ConnectButton,
  InvestorCardWrapper,
  InvestorImage,
  InvestorImageWrapper,
  NextLink,
} from './style';
import Image from 'next/image';
import CheckIcon from '@mui/icons-material/Check';
import Link from 'next/link';
import { APPROVED, FOUNDER, INVESTOR } from '@/helpers/constants';
import { useRouter } from 'next/navigation';

interface InvestorCardReqType {
  type: 'founder' | 'investor';
  cardType: 'requested';
  onAccept: (e: any) => void;
  onIgnore: (e: any) => void;
  data?: any;
  isLoading?: boolean;
  loadingText?: string;
  isBlurred?: boolean;
}

interface InvestorCardLikedType {
  type: 'founder' | 'investor';
  cardType: 'liked';
  onConnect: (e: any) => void;
  data?: any;
  isLoading?: boolean;
  loadingText?: string;
  isBlurred?: boolean;
}

interface InvestorCardConType {
  type: 'founder' | 'investor';
  cardType: 'connected';
  onStartChat: (e: any) => void;
  data?: any;
  isLoading?: boolean;
  loadingText?: string;
  isBlurred?: boolean;
}

interface InvestorCardCommonType {
  type: 'founder' | 'investor';
  cardType: 'liked' | 'connected';
  onConnect: (e: any) => void;
  onStartChat: (e: any) => void;
  data?: any;
  isLoading?: boolean;
  loadingText?: string;
  isBlurred?: boolean;
}

const status: any = {
  APPROVED: 'Start Chat',
  PENDING: 'Pending',
  NONE: 'Connect',
};
const InvestorCard = (
  props:
    | InvestorCardReqType
    | InvestorCardLikedType
    | InvestorCardConType
    | InvestorCardCommonType
) => {
  const { cardType, type, data, isLoading, loadingText } = props;
  const { onAccept, onIgnore } = props as InvestorCardReqType;
  const { onConnect } = props as InvestorCardLikedType;
  const { onStartChat } = props as InvestorCardConType;

  if (!data) {
    <InvestorCardWrapper>
      <Stack
        direction="column"
        alignItems="center"
        p={3}
      >
        <Typography
          variant="h4"
          align="center"
        >
          Loading...
        </Typography>
      </Stack>
    </InvestorCardWrapper>;
  }
  const router = useRouter();

  return (
    <InvestorCardWrapper
      sx={{ filter: props?.isBlurred ? 'blur(6px)' : 'none' }}
    >
      <InvestorImageWrapper>
        <InvestorImage
          src={
            data?.profile?.image_url ||
            data?.user?.profile?.image_url ||
            '/asset/images/investor.svg'
          }
          alt="pic"
          fill
          onClick={() => {
            if (!props?.isBlurred) {
              router.push(
                type === FOUNDER
                  ? `/founder/investors/${data?._id}`
                  : `/investor/founder/${data?.user?._id}`
              );
            }
          }}
          style={{ cursor: 'pointer' }}
        />
      </InvestorImageWrapper>
      <Stack
        direction="column"
        alignItems="center"
        p={3}
      >
        <NextLink
          href={
            type === FOUNDER
              ? `/founder/investors/${data?.user?._id}`
              : `/investor/founder/${data?.user?._id}`
          }
        >
          <Typography
            variant="h4"
            mb={2}
            align="center"
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              maxWidth: '220px',
            }}
          >
            {data?.user?.first_name || data?.first_name}{' '}
            {data?.user?.last_name || data?.last_name}
          </Typography>
        </NextLink>
        <Stack
          direction="row"
          alignItems="center"
          mb={3}
        >
          <Image
            src="/asset/icon/location.svg"
            alt="location"
            width={14}
            height={16}
          />
          <Typography ml={1}>
            {data?.company?.company_location ||
              data?.user?.country ||
              'Not found'}
          </Typography>
        </Stack>
        {cardType === 'requested' && (
          <Stack
            width="100%"
            spacing="11px"
            direction="row"
          >
            <ConnectButton
              startIcon={<CheckIcon />}
              onClick={() => onAccept(data?.user?._id)}
              disabled={props?.isBlurred}
            >
              Accept
            </ConnectButton>
            <ConnectButton
              color="error"
              onClick={() => onIgnore(data?.user?._id)}
              disabled={props?.isBlurred}
            >
              Ignore
            </ConnectButton>
          </Stack>
        )}

        {cardType === 'liked' && (
          <ConnectButton
            color="primary"
            onClick={() => {
              data.connection_status === APPROVED
                ? onStartChat(data?.user?._id || data?._id)
                : onConnect(data?.user?._id || data?._id);
            }}
            disabled={
              isLoading ||
              (data?.user?.connection_status || data?.connection_status) ===
                'PENDING'
            }
          >
            {isLoading
              ? loadingText || 'Loading...'
              : status[
                  data?.user?.connection_status || data?.connection_status
                ]}
          </ConnectButton>
        )}
        {cardType === 'connected' && (
          <ConnectButton
            color="primary"
            onClick={() => onStartChat(data?.user?._id)}
            disabled={props?.isBlurred}
          >
            Start Chat
          </ConnectButton>
        )}
      </Stack>
    </InvestorCardWrapper>
  );
};

export default InvestorCard;
