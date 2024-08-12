import React from "react";
import { Typography, Stack, Box } from "@mui/material";
import Image from "next/image";
import { DashboardCardWrapper, BackGroungImage } from "./style";
import Link from "next/link";
import CircularProgress from "@mui/material/CircularProgress";

interface DashboardCardPropsType {
  length: any;
  id: number;
  title: string;
  number: number;
  iconUrl: string;
  redirect: string;
}

function GradientCircularProgress() {
  return (
    <React.Fragment>
      <svg width={0} height={0}>
        <defs>
          <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e01cd5" />
            <stop offset="100%" stopColor="#1CB5E0" />
          </linearGradient>
        </defs>
      </svg>
      <CircularProgress
        sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
      />
    </React.Fragment>
  );
}

const DashboardCard = ({ data }: { data: DashboardCardPropsType }) => {
  return (
    // <Link href={data.redirect} style={{ textDecoration: "none" }}>
      <DashboardCardWrapper>
        <Stack direction="row" justifyContent="space-between">
          <Box zIndex={1}>
            <Typography fontSize="18px">{data.title}</Typography>
            {data?.number >= 0 ? (
              <Typography variant="h3" mt="20px">
                {data?.number}
              </Typography>
            ) : (
              <GradientCircularProgress />
            )}
          </Box>
          <Link href={data?.redirect}>
            <Image
              src="/asset/icon/redirect.svg"
              width={48}
              height={48}
              alt="redirect"
            />
          </Link>
        </Stack>

        <BackGroungImage
          src={data.iconUrl}
          alt="project"
          width={161}
          height={135}
        />
      </DashboardCardWrapper>
    // </Link>
  );
};

export default DashboardCard;
