'use client';
import React, { useState, useEffect, useCallback } from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartOptions,
  ChartData,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {
  Typography,
  Stack,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import Image from 'next/image';
import { SelectChangeEvent } from '@mui/material/Select';
import theme from '@/theme';
import { DoughnutWrapper, StatisticsCardWrapper } from './style';
import { Round } from '@/components/common/ui';
import { ADMIN } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import {
  founderDashboardProject,
  getDropdownListOfProject,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

const options: ChartOptions<'doughnut'> = {
  plugins: {
    legend: {
      display: false,
    },
  },
};

interface StatisticsCardType {
  type: 'admin' | 'founder' | 'investor';
  title?: string;
  adminDashboardData?: any;
  project?: string;
  setProject?: any;
}

const StatisticsCard = ({
  title,
  type,
  adminDashboardData,
  project,
  setProject,
}: StatisticsCardType) => {
  const { projectData, projectListDashboardData } = adminDashboardData;
  const dummy = ['Active', 'Closed'];
  const dummyOne = ['Founder', 'Investor'];
  const sanitizeData = (value: any) => (isNaN(value) ? 0 : value);

  const dataFounder: ChartData<'doughnut'> = {
    labels: title === 'Total Projects' ? dummy : dummyOne,
    datasets: [
      {
        label: 'likes',
        data: [
          sanitizeData(projectData?.projectLikeCount),
          sanitizeData(projectData?.projectViewCount),
        ],
        backgroundColor: [
          theme.palette.primary.light,
          theme.palette.primary.main,
        ],
        hoverOffset: 4,
      },
    ],
  };

  const totalProject = [
    adminDashboardData?.activeProjects,
    adminDashboardData?.closedProjects,
  ];
  const totalRevenue = [
    adminDashboardData.founderRevenue || 0,
    adminDashboardData?.investorRevenue || 0,
  ];
  const dataAdmin: ChartData<'doughnut'> = {
    labels: title === 'Total Projects' ? dummy : dummyOne,
    datasets: [
      {
        data: title === 'Total Projects' ? totalProject : totalRevenue,
        backgroundColor: [
          theme.palette.primary.light,
          theme.palette.primary.main,
        ],
        hoverOffset: 4,
      },
    ],
  };

  const plugins: any = [
    {
      beforeDraw: (chart: any) => {
        const ctx = chart.ctx;
        const { width, height } = chart;
        ctx.save();
        const fontSize = (height / 200).toFixed(2);
        ctx.font = `${fontSize}em sans-serif`;
        ctx.textBaseline = 'middle';
        const total = chart.data.datasets[0].data.reduce(
          (a: number, b: number) => a + b,
          0
        );
        const text = total.toString();
        const textX = Math.round((width - ctx.measureText(text).width) / 2);
        const textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.restore();
      },
    },
  ];

  const handleChange = (event: SelectChangeEvent) => {
    {
      setProject && setProject(event.target.value as string);
    }
  };

  return (
    <StatisticsCardWrapper>
      <Stack
        direction="row"
        justifyContent="space-between"
      >
        <Typography fontSize={18}>{title || 'Project Statistics'}</Typography>
        <Image
          src={
            type !== ADMIN
              ? '/asset/icon/dash-edit.svg'
              : title === 'Total Projects'
              ? '/asset/icon/dash-total-project.svg'
              : '/asset/icon/dash-icon-project.svg'
          }
          width={type !== ADMIN ? 24 : 48}
          height={type !== ADMIN ? 24 : 48}
          alt="edit"
        />
      </Stack>
      {type !== ADMIN && (
        <>
          <Stack
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
            >
              <Round bgcolor={theme.palette.primary.main} />
              <Typography variant="body2">
                Total Likes: {projectData?.projectLikeCount}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
            >
              <Round bgcolor={theme.palette.primary.light} />
              <Typography variant="body2">
                Total Views: {projectData?.projectViewCount}
              </Typography>
            </Stack>
          </Stack>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">
              Select Project
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={project}
              label="Select Project"
              onChange={handleChange}
            >
              {projectListDashboardData.length > 0 &&
                projectListDashboardData?.map((item: any) => (
                  <MenuItem
                    key={item?._id}
                    value={item?._id}
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      maxWidth: '100%',
                    }}
                  >
                    {item?.project_name.substring(0, 40)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <DoughnutWrapper>
            {/* <Stack
          direction="row"
          alignItems="center"
        >
          <Round bgcolor={theme.palette.primary.light} />
          <Typography variant="body2">Total Views: 20000</Typography>
        </Stack> */}
            {projectListDashboardData.length > 1 &&
            (projectData?.projectLikeCount > 0 ||
              projectData?.projectViewCount > 0) ? (
              <Doughnut
                data={dataFounder}
                options={options}
              />
            ) : (
              <Typography variant="h6">No data to display</Typography>
            )}
            {/* <Stack
          direction="row"
          alignItems="center"
        >
          <Round bgcolor={theme.palette.primary.light} />
          <Typography variant="body2">Total Views: 20000</Typography>
        </Stack> */}
          </DoughnutWrapper>
        </>
      )}
      {type === ADMIN && (
        <>
          <DoughnutWrapper>
            <Doughnut
              data={dataAdmin}
              options={options}
              plugins={plugins}
            />
          </DoughnutWrapper>
          <Stack
          // direction="row"
          // alignItems="center"
          // spacing={2}
          >
            <Stack
              direction="row"
              alignItems="center"
            >
              <Round bgcolor={theme.palette.primary.light} />
              <Typography variant="body2">
                {title === 'Total Projects'
                  ? `Active: ${adminDashboardData?.activeProjects}`
                  : `Founder: ${adminDashboardData?.founderRevenue || 0}`}
              </Typography>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
            >
              <Round bgcolor={theme.palette.primary.main} />
              <Typography variant="body2">
                {title === 'Total Projects'
                  ? `Closed: ${adminDashboardData?.closedProjects}`
                  : `Investor: ${adminDashboardData?.investorRevenue || 0}`}
              </Typography>
            </Stack>
          </Stack>
        </>
      )}
    </StatisticsCardWrapper>
  );
};

export default StatisticsCard;
