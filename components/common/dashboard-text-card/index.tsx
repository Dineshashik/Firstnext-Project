import React from 'react';
import { Typography, Stack, Box } from '@mui/material';
import CallMadeIcon from '@mui/icons-material/CallMade';
import { DashboardTextCardWrapper, UpgradeTextWrapper } from './style';
import Link from 'next/link';
import Image from 'next/image';

const DashboardTextCard = () => {
  return (
    <DashboardTextCardWrapper>
      <Box zIndex={1}>
        <Typography
          variant="h4"
          fontSize={24}
        >
          Want to boost your visibility?
        </Typography>
        <Typography
          fontSize={18}
          mt="12px"
        >
          Boost your profile and projects now.
        </Typography>
      </Box>
      <Stack
        justifyContent="center"
        direction="row"
      >
        <Image
          src="/asset/icon/lock-founder.svg"
          alt="lock"
          height={61}
          width={42}
        />
      </Stack>
      <Stack
        direction="row"
        justifyContent="end"
      >
        <UpgradeTextWrapper variant="h6">Coming Soon</UpgradeTextWrapper>
      </Stack>
    </DashboardTextCardWrapper>
  );
};

export default DashboardTextCard;
