'use client';
import {
  styled,
  AppBarProps as MuiAppBarProps,
  Toolbar,
  Typography,
  Box,
  ListItemButton,
  Stack,
} from '@mui/material';
import MuiAppBar from '@mui/material/AppBar';
import Image from 'next/image';
import Link from 'next/link';
import { CardWrapper } from '../ui';

const drawerWidth = 300;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open?: boolean;
}>(({ theme, open }) => ({
  backgroundColor: theme.palette.info.main,
  minHeight: 'calc(100vh - 80px)',
  height: 'calc(100vh - 80px)',
  flexGrow: 1,
  marginTop: '80px',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    marginLeft: `-${drawerWidth}px`,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.up('xl')]: {
      marginLeft: 0,
    },
  }),
  [theme.breakpoints.down('sm')]: {
    minHeight: 'calc(100vh - 60px)',
    marginTop: '60px',
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  background: theme.palette.info.light,
  boxShadow: '4px 8px 16px 0px #635BFF1A',

  [theme.breakpoints.up('sm')]: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: `${drawerWidth}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  },
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: '50px',
  marginTop: '30px',
}));

const LogoImage = styled(Image)(({ theme }) => ({
  marginRight: 'auto',
  marginLeft: 'auto',
  [theme.breakpoints.down('lg')]: {
    width: '150px',
    height: '30px',
    paddingLeft: '0px',
  },
}));

const ToolbarWrapper = styled(Toolbar)(({ theme }) => ({
  justifyContent: 'space-between',
  minHeight: '80px !important',
  paddingLeft: '36px !important',
  paddingRight: '36px !important',
  [theme.breakpoints.down('sm')]: {
    minHeight: '60px !important',
  },
  [theme.breakpoints.down('md')]: {
    paddingLeft: '18px !important',
    paddingRight: '18px !important',
  },
}));

const UserNameText = styled(Typography)(({ theme }) => ({
  fontSize: '16px',
  color: '#111111',
  display: '-webkit-box',
  WebkitLineClamp: 1,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
}));
const UserTypeText = styled(Typography)(({ theme }) => ({
  fontSize: '14px',
  color: '#111111',
  margin: '0px',
  textTransform: 'capitalize',
}));

const BellIconWrapper = styled(Stack)(({ theme }) => ({
  padding: '14px 15px',
  background: '#DEEAF6',
  borderRadius: '50px',
  cursor: 'pointer',
}));

const ListItemButtonWrapper = styled(ListItemButton)(({ theme }) => ({
  padding: '16px 36px',
  '&:hover': {
    background: '#EDF4FB',
  },
}));

const LinkWrapper = styled(Link)(({ theme }) => ({
  textDecoration: 'none',
  width: '100%',
}));

const SmAddButton = styled(Stack)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,

  borderRadius: '50px',
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

const NotificationBoxWrapper = styled(CardWrapper)(({ theme }) => ({
  marginTop: '20px',
  maxWidth: '400px',
  width: '300px',
  [theme.breakpoints.down('md')]: {
    marginTop: '8px',
  },
}));

const HeaderWrapper = styled(Stack)(() => ({
  padding: '10px 16px',
  margin: '3px 0px',
}));

const ProfileBoxWrapper = styled(Box)(({ theme }) => ({
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
  Main,
  AppBar,
  DrawerHeader,
  LogoImage,
  ToolbarWrapper,
  UserNameText,
  UserTypeText,
  BellIconWrapper,
  ListItemButtonWrapper,
  LinkWrapper,
  SmAddButton,
  NotificationBoxWrapper,
  HeaderWrapper,
  ProfileBoxWrapper,
};
