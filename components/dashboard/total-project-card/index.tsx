import React, { useEffect, useState } from 'react';
import { CardWrapper, Round } from '@/components/common/ui';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Stack, Typography } from '@mui/material';
import Image from 'next/image';
import theme from '@/theme';
import { TotalProjectDoughnutWrapper } from './style';
import { api } from '@/services/axiosInstance';
import { getFounderDashboard } from '@/services/apiDefinition';
import { toast } from 'react-toastify';

ChartJS.register(ArcElement, Tooltip, Legend);

// Custom plugin to draw total in the center
const centerTextPlugin = {
  id: 'centerText',
  beforeDraw: (chart: any) => {
    const ctx = chart.ctx;
    const { width, height } = chart;
    ctx.save();
    const fontSize = (height / 114).toFixed(2);
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
};

// Register the plugin with Chart.js
ChartJS.register(centerTextPlugin);

const TotalProjectCard = () => {
  const [founderDashboardData, setFounderDashboardData] = useState<any>([]);

  const fetchInvestorDashboardData = async () => {
    try {
      const response = await api.get<any>(getFounderDashboard);
      if (response.success) {
        setFounderDashboardData(response.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchInvestorDashboardData();
  }, []);
  const sanitizeData = (value: any) => (isNaN(value) ? 0 : value);

  const data: ChartData<'doughnut'> = {
    labels: ['Active', 'Closed'],
    datasets: [
      {
        label: 'likes',
        data: [
          sanitizeData(founderDashboardData?.activeProjects),
          sanitizeData(founderDashboardData?.closedProjects),
        ],
        backgroundColor: [
          theme.palette.primary.light,
          theme.palette.primary.main,
        ],
        hoverOffset: 4,
      },
    ],
  };

  const options: ChartOptions<'doughnut'> = {
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <CardWrapper fullHeight>
      <Stack direction='row' justifyContent='space-between'>
        <Stack justifyContent='space-between'>
          <Typography fontSize={18}>Total Projects</Typography>
          <Stack direction='column'>
            <Stack direction='row' alignItems='center'>
              <Round bgcolor={theme.palette.primary.light} />
              <Typography variant='body2'>
                Active:{' '}
                {founderDashboardData?.activeProjects
                  ? founderDashboardData?.activeProjects
                  : 0}
              </Typography>
            </Stack>
            <Stack direction='row' alignItems='center'>
              <Round bgcolor={theme.palette.primary.main} />
              <Typography variant='body2'>
                Closed:{' '}
                {founderDashboardData?.closedProjects
                  ? founderDashboardData?.closedProjects
                  : 0}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <TotalProjectDoughnutWrapper>
          <Doughnut data={data} options={options} />
        </TotalProjectDoughnutWrapper>
        <Image
          src='/asset/icon/dash-edit.svg'
          width={24}
          height={24}
          alt='edit'
        />
      </Stack>
    </CardWrapper>
  );
};

export default TotalProjectCard;
