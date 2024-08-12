'use client';
import { Button, styled } from '@mui/material';

interface FilterButtonProps {
  active: string;
}

const FilterButton = styled(Button)<FilterButtonProps>(({ theme, active }) => ({
  borderRadius: '100px',
  textTransform: 'none',
  boxShadow: 'none',
  backgroundColor:
    active === 'true' ? theme.palette.primary.main : 'transparent',
  color: active === 'true' ? theme.palette.info.light : '#0A2540',
  border: active === 'true' ? 'none' : '1px solid #DEEAF6',
}));

export { FilterButton };
