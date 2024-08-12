import { CardWrapper } from '@/components/common/ui';
import { Stack, styled, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

const StatisticsCardWrapper = styled(CardWrapper)(({ theme }) => ({
  height: '100%',
}));

const DoughnutWrapper = styled(Stack)(({ theme }) => ({
  height: '251px',
  alignItems: 'center',
  justifyContent: 'center',
}));

export { StatisticsCardWrapper, DoughnutWrapper };
