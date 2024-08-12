'use client';
import { useEffect, useState } from 'react';
import {
  Typography,
  Container,
  Stack,
  ListItem,
  List,
  Drawer,
  Avatar,
  Box,
  Popper,
  Divider,
  ClickAwayListener,
} from '@mui/material';
import {
  NavbarWrapper,
  MenuItemWrapper,
  MenuWrapper,
  LogoImage,
  DrawerMenuIcon,
  DrawerListItemButton,
  DrawerListWrapper,
  SignupProfileBoxWrapper,
} from './style';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { fetchUser } from '@/lib/thunks/userThunk';
import { useRouter } from 'next/navigation';
import { deleteCookie } from 'cookies-next';

// const pagesMd = ['About', 'Founders', 'Investors', 'Pricing', 'Contact'];

const SignupNavbar = ({ type }: { type: 'founder' | 'investor' | 'admin' }) => {
  const [open, setOpen] = useState(false);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  const userData: any = useAppSelector(user);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const openProfilePopper = Boolean(anchorElProfile);
  const profileId = openProfilePopper ? 'simple-popper' : undefined;
  const handleProfileToggle = (event: any) => {
    setAnchorElProfile(anchorElProfile ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElProfile(null);
  };
  const handleLogout = () => {
    deleteCookie('token');
    router.push(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
    );
  };

  const DrawerList = (
    <DrawerListWrapper onClick={toggleDrawer(false)}>
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        my={3}
        mx={2}
      >
        <LogoImage
          src='/asset/icon/logo-blue.svg'
          alt='logo'
          width={192}
          height={30}
        />
        <CloseIcon onClick={toggleDrawer(false)} sx={{ color: '#425466' }} />
      </Stack>
      {/* <List>
        {pagesMd.map((text, index) => (
          <ListItem
            key={index}
            disablePadding
          >
            <DrawerListItemButton>
              <Typography>{text}</Typography>
              <KeyboardArrowRightIcon sx={{ color: '#425466' }} />
            </DrawerListItemButton>
          </ListItem>
        ))}
      </List> */}
    </DrawerListWrapper>
  );

  return (
    <NavbarWrapper position='static'>
      <Container maxWidth='xl'>
        <Stack direction='row' justifyContent='space-between'>
          <Stack
            justifyContent='center'
            alignContent='center'
            alignItems='center'
            direction='row'
          >
            {/* <DrawerMenuIcon
              fontSize="large"
              onClick={toggleDrawer(true)}
            /> */}
            <LogoImage
              // src='/asset/images/logo-white.svg'
              src='/asset/images/letsconnectlogo.svg'
              alt='logo'
              width={192}
              height={30}
            />
          </Stack>
          {/* <MenuWrapper direction="row">
            {pagesMd.map((page) => (
              <MenuItemWrapper
                key={page}
                sx={{ my: 2 }}
              >
                {page}
              </MenuItemWrapper>
            ))}
          </MenuWrapper> */}
          <Stack direction='row' alignItems='center' spacing={1}>
            <Avatar
              alt='Remy Sharp'
              src={
                userData?.profile?.image_url || '/asset/icon/avtar-profile.svg'
              }
              sx={{ width: '44px', height: '44px', cursor: 'pointer' }}
              onClick={handleProfileToggle}
            />
            <Box
              display={{ xs: 'none', md: 'block', cursor: 'pointer' }}
              onClick={handleProfileToggle}
            >
              <Typography variant='h6' color='white'>
                {userData?.first_name} {userData?.last_name}
              </Typography>
              <Typography variant='body2' color='white' m={0}>
                {userData?.role
                  ? userData.role.charAt(0).toUpperCase() +
                    userData.role.slice(1).toLowerCase()
                  : ''}
              </Typography>
            </Box>
          </Stack>
          <Popper
            id={profileId}
            open={openProfilePopper}
            anchorEl={anchorElProfile}
            placement='bottom-start'
            sx={{ zIndex: 1 }}
          >
            <ClickAwayListener onClickAway={handleClose}>
              <SignupProfileBoxWrapper>
                {/* <Typography
                  variant="h6"
                  px={6}
                  py={2}
                  onClick={() => router.push(`/${type}/user-profile`)}
                  sx={{ cursor: 'pointer' }}
                >
                  Profile
                </Typography>
                <Divider /> */}
                <Typography
                  variant='h6'
                  color='error'
                  py={2}
                  px={6}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleLogout}
                >
                  Logout
                </Typography>
              </SignupProfileBoxWrapper>
            </ClickAwayListener>
          </Popper>
        </Stack>
        <Drawer open={open} onClose={toggleDrawer(false)}>
          {DrawerList}
        </Drawer>
      </Container>
    </NavbarWrapper>
  );
};

export default SignupNavbar;
