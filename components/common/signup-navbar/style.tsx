'use client';
import {
  AppBar,
  Button,
  Box,
  styled,
  Stack,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Image from 'next/image';

const NavbarWrapper = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#0A2540',
  boxShadow: 'none',
  padding: '14px 36px',
  [theme.breakpoints.down('md')]: {
    padding: '8px 0px',
  },
}));

const MenuWrapper = styled(Stack)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const MenuItemWrapper = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  color: theme.palette.info.light,
  display: 'block',
  fontWeight: '600',
  textTransform: 'none',
  padding: '6px 16px',

  [theme.breakpoints.down('lg')]: {
    padding: '6px 8px',
  },

  '&:hover': {
    opacity: '80%',
  },
}));

const LogoImage = styled(Image)(({ theme }) => ({
  // paddingLeft: '16px',
  [theme.breakpoints.down('lg')]: {
    width: '150px',
    height: '30px',
    paddingLeft: '0px',
  },
}));

const DrawerMenuIcon = styled(MenuIcon)(({ theme }) => ({
  display: 'none',
  paddingRight: '16px',
  [theme.breakpoints.down('md')]: {
    display: 'block',
  },
}));

const DrawerListItemButton = styled(ListItemButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const DrawerListWrapper = styled(Box)(({ theme }) => ({
  width: '100%',
}));

const SignupProfileBoxWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  marginTop: '16px',
  maxWidth: '400px',
  borderRadius: '12px',
  boxShadow: '0px 4px 20px 0px #00000040',

  [theme.breakpoints.down('md')]: {
    marginTop: '8px',
  },
}));

export {
  NavbarWrapper,
  MenuItemWrapper,
  MenuWrapper,
  LogoImage,
  DrawerMenuIcon,
  DrawerListItemButton,
  DrawerListWrapper,
  SignupProfileBoxWrapper,
};
