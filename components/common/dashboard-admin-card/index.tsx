import React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { BackGroungAdminImage, DashboardAdminCardWrapper } from './style';
import Image from 'next/image';
import CircularProgress from '@mui/material/CircularProgress';
import { useRouter } from 'next/navigation';

interface DashboardAdminCardPropsType {
  id: number;
  title: string;
  number: number | string;
  bgIconUrl: string;
  iconUrl: string;
  role?: string;
  type?: string;
}

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg
        width={0}
        height={0}
      >
        <defs>
          <linearGradient
            id="my_gradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              stopColor="#e01cd5"
            />
            <stop
              offset="100%"
              stopColor="#1CB5E0"
            />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ 'svg circle': { stroke: 'url(#my_gradient)' } }}
      />
    </React.Fragment>
  );
}

const DashboardAdminCard = ({
  data,
}: {
  data: DashboardAdminCardPropsType;
}) => {
  const router = useRouter();
  return (
    <DashboardAdminCardWrapper
      onClick={() => {
        const baseUrl = `admin/${data?.role}s`;
        const typeQuery = data?.type ? `?status=${data.type}` : '';

        if (data?.role === 'investor' || data?.role === 'founder') {
          router.push(`${baseUrl}${typeQuery}`);
        }
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Stack
          zIndex={1}
          justifyContent="space-between"
        >
          <Box>
            <Typography fontSize="18px">{data.title}</Typography>
            {data?.number !== null ? (
              <Typography
                variant="h3"
                mt="20px"
              >
                {data?.number}
              </Typography>
            ) : (
              <GradientCircularProgress />
            )}
          </Box>
        </Stack>

        <Image
          src={data.iconUrl}
          width={48}
          height={48}
          alt="redirect"
        />
      </Stack>

      <BackGroungAdminImage
        src={data.bgIconUrl}
        alt="prohject"
        width={161}
        height={135}
      />
      {/* <Typography zIndex={1}>+2.4% then last week</Typography> */}
    </DashboardAdminCardWrapper>
  );
};

export default DashboardAdminCard;
