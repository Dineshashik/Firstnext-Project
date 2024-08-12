'use client';
import { useEffect, useState } from 'react';
import {
  Box,
  Drawer,
  CssBaseline,
  List,
  IconButton,
  ListItem,
  Stack,
  Avatar,
  Badge,
  Typography,
  Divider,
  useMediaQuery,
  Theme,
} from '@mui/material';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Popper from '@mui/material/Popper';
import { cookies } from 'next/headers';
import Image from 'next/image';
import { AdminMenuItem, FounderMenuItem, InvestorMenuItem } from './data';
import {
  AppBar,
  DrawerHeader,
  LogoImage,
  Main,
  ToolbarWrapper,
  UserNameText,
  BellIconWrapper,
  UserTypeText,
  ListItemButtonWrapper,
  LinkWrapper,
  SmAddButton,
  NotificationBoxWrapper,
  HeaderWrapper,
  ProfileBoxWrapper,
} from './style';
import AddIcon from '@mui/icons-material/Add';
import { CustomButton } from '../ui';
import { useRouter } from 'next/navigation';
import { FOUNDER, INVESTOR, ADMIN } from '@/helpers/constants';
import { usePathname } from 'next/navigation';
import MessageRequestCard from '../message-request-card';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { fetchUser } from '@/lib/thunks/userThunk';
import { deleteCookie } from 'cookies-next';
import { useSocket } from '@/context/SocketContext';
import { api } from '@/services/axiosInstance';
import {
  getNotifications,
  getLastNotification,
  clearNotification,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';
import {
  MessageDetailsTextWrapper,
  MsgTilesWrapper,
  TilesButtonWrapper,
} from '../message-request-card/style';

const drawerWidth = 300;

const menuItemsByType = {
  [FOUNDER]: FounderMenuItem,
  [INVESTOR]: InvestorMenuItem,
  [ADMIN]: AdminMenuItem,
};

// type User = {
//   _id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   otp: number;
//   otp_expiry_time: string;
//   status: boolean;
//   role: 'ADMIN' | 'FOUNDER' | 'INVESTOR';
//   set_fgt_pswd: boolean;
//   created_at: string;
//   updated_at: string;
// };

export default function Navbar({
  children,
  type,
}: {
  children: React.ReactNode;
  type: 'founder' | 'investor' | 'admin';
}) {
  const [open, setOpen] = useState(false);
  const [invisible, setInvisible] = useState(true);
  const MenuItemComponent = menuItemsByType[type];
  const pathname = usePathname();
  const { socket } = useSocket();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(
    null
  );
  const userDetails: any = useAppSelector(user);
  const [notificationList, setNotificationList] = useState([]);
  const dispatch = useAppDispatch();
  const userData: any = useAppSelector(user);
  const [isLoading, setIsLoading] = useState(false);

  const openPopper = Boolean(anchorEl);
  const id = openPopper ? 'simple-popper' : undefined;

  const openProfilePopper = Boolean(anchorElProfile);
  const profileId = openProfilePopper ? 'simple-popper' : undefined;

  const getNotification = async () => {
    try {
      setIsLoading(true);
      const res: any = await api.get(getNotifications);
      if (res.success && res.data) {
        setNotificationList(res.data);
        setIsLoading(false);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const getLastNotificationFun = async () => {
    try {
      const res: any = await api.get(getLastNotification);
      if (res.success && res.data) {
        setInvisible(res.data.seen);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  const isLargeScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.up('lg')
  );

  useEffect(() => {
    if (isLargeScreen) {
      setOpen(true);
    }
    dispatch(fetchUser());
  }, [dispatch]);

  useEffect(() => {
    if (socket && userData) {
      socket.emit('user_online', userData._id);
      socket.on('receive_notification', () => {
        getLastNotificationFun();
        if (!openPopper) {
          getNotification();
        }
      });
    }
    getLastNotificationFun();
  }, [socket, userData]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleBadgeVisibility = () => {
    setInvisible(!invisible);
  };

  const handleToggle = (event: any) => {
    getNotification();
    setAnchorEl(anchorEl ? null : event.currentTarget);
    setInvisible(true);
  };

  const handleProfileToggle = (event: any) => {
    setAnchorElProfile(anchorElProfile ? null : event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorElProfile(null);
  };

  const handleLogout = () => {
    deleteCookie('token');
    router.push(
      `${process.env.NEXT_PUBLIC_REDIRECT_URL}?logout=true` as string
    );
  };

  const handleClearNotification = async () => {
    if (userData?.subPlan !== 'FREE') {
      try {
        const res: any = await api.delete(clearNotification);
        if (res.success) {
          setNotificationList([]);
          toast.success(res?.message || 'Notification deleted Successfully');
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }
  };
  const drawer = (
    <Stack
      direction="column"
      justifyContent="space-between"
      height="100%"
    >
      <Box>
        <DrawerHeader>
          <LogoImage
            // src="/asset/images/logo.svg"
            src="/asset/images/letsconnect-gradient.svg"
            alt="logo"
            width={192}
            height={30}
          />
        </DrawerHeader>
        <List>
          {MenuItemComponent.map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              onClick={isLargeScreen ? () => {} : handleDrawerToggle}
            >
              <LinkWrapper href={item.slug}>
                <ListItemButtonWrapper>
                  <Image
                    src={item.iconUrl}
                    alt={item.name}
                    width={30}
                    height={30}
                  />
                  <Typography
                    variant="h6"
                    ml="12px"
                  >
                    {item.name}
                  </Typography>
                </ListItemButtonWrapper>
              </LinkWrapper>
            </ListItem>
          ))}
        </List>
      </Box>
      <List>
        <ListItem
          disablePadding
          onClick={handleDrawerToggle}
        >
          <LinkWrapper href={`/${type}/user-profile`}>
            <ListItemButtonWrapper>
              <Image
                src="/asset/icon/setting.svg"
                alt="setting"
                width={30}
                height={30}
              />
              <Typography
                variant="h6"
                ml="12px"
              >
                Settings
              </Typography>
            </ListItemButtonWrapper>
          </LinkWrapper>
        </ListItem>
      </List>
    </Stack>
  );

  const container =
    typeof window !== 'undefined' ? () => document.body : undefined;

  return (
    <>
      {pathname === '/admin/signup' ||
      pathname === '/admin/signin' ||
      pathname === '/founder/signup' ||
      pathname === '/investor/signup' ? (
        <>{children}</>
      ) : (
        <>
          <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
              position="fixed"
              open={open}
            >
              <ToolbarWrapper>
                <IconButton
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ padding: 0, margin: 0 }}
                >
                  <Image
                    src="/asset/icon/menu.svg"
                    alt="menu"
                    width={21}
                    height={16}
                  />
                </IconButton>
                <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                >
                  {type === FOUNDER && (
                    <Box display={{ xs: 'none', sm: 'block' }}>
                      <CustomButton
                        onClick={() =>
                          router.push(`/founder/project-management/add-project`)
                        }
                        color="blue"
                        variant="text"
                        icon="add"
                      >
                        Add Project
                      </CustomButton>
                    </Box>
                  )}

                  <Stack
                    direction="row"
                    spacing={2}
                  >
                    {type === FOUNDER && (
                      <SmAddButton>
                        <AddIcon sx={{ margin: '10px' }} />
                      </SmAddButton>
                    )}
                    <BellIconWrapper
                      onClick={handleToggle}
                      aria-describedby={id}
                    >
                      <Badge
                        color="error"
                        variant="dot"
                        invisible={invisible}
                      >
                        <Image
                          src="/asset/icon/bell.svg"
                          alt="bell"
                          width={14}
                          height={16}
                        />
                      </Badge>
                    </BellIconWrapper>
                    <Popper
                      id={id}
                      open={openPopper}
                      anchorEl={anchorEl}
                      placement="bottom-end"
                      sx={{ zIndex: 1 }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <NotificationBoxWrapper>
                          <HeaderWrapper
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Typography
                              variant="h4"
                              fontSize={18}
                            >
                              All Notifications
                            </Typography>
                            <Typography
                              variant="h6"
                              color="primary"
                              sx={{ cursor: 'pointer' }}
                              onClick={handleClearNotification}
                            >
                              Clear All
                            </Typography>
                          </HeaderWrapper>
                          {isLoading && userData?.subPlan !== 'FREE' && (
                            <Typography
                              variant="h4"
                              align="center"
                              mt={1}
                            >
                              Loading...
                            </Typography>
                          )}
                          {userData?.subPlan == 'FREE' ? (
                            <Box
                              sx={{
                                height: 'auto',
                                overflow: 'auto',
                                filter: userDetails?.role == "INVESTOR" ? "none" :'blur(4px)',
                              }}
                            >
                              {[...Array(3)].map((_, index) => (
                                <MsgTilesWrapper
                                  direction="row"
                                  index={3}
                                  sx={{ marginBottom: '5px' }}
                                  key={index}
                                >
                                  <Avatar alt="profile" />
                                  <Box ml={1}>
                                    <Typography
                                      variant="h6"
                                      fontSize={14}
                                    >
                                      Hi How are you??
                                    </Typography>
                                    <MessageDetailsTextWrapper
                                      variant="body2"
                                      m={0}
                                    >
                                      This is good company
                                    </MessageDetailsTextWrapper>
                                    <MessageDetailsTextWrapper
                                      variant="body2"
                                      m={0}
                                    >
                                      3 hours ago
                                    </MessageDetailsTextWrapper>
                                  </Box>
                                </MsgTilesWrapper>
                              ))}
                            </Box>
                          ) : notificationList.length > 0 ? (
                            <MessageRequestCard
                              cardType="notification"
                              height="300px"
                              data={notificationList}
                            />
                          ) : (
                            !isLoading && (
                              <Typography
                                variant="h4"
                                align="center"
                                mt={1}
                              >
                                No notifications
                              </Typography>
                            )
                          )}
                        </NotificationBoxWrapper>
                      </ClickAwayListener>
                    </Popper>
                    <IconButton
                      sx={{ padding: '0px' }}
                      onClick={handleProfileToggle}
                    >
                      <Avatar
                        alt="user"
                        src={userData?.profile?.image_url}
                        sx={{ width: '44px', height: '44px' }}
                      />
                    </IconButton>
                    <Popper
                      id={profileId}
                      open={openProfilePopper}
                      anchorEl={anchorElProfile}
                      placement="bottom-start"
                      sx={{ zIndex: 1 }}
                    >
                      <ClickAwayListener onClickAway={handleClose}>
                        <ProfileBoxWrapper>
                          <Typography
                            variant="h6"
                            px={6}
                            py={2}
                            onClick={() => {
                              router.push(`/${type}/user-profile`),
                                setAnchorElProfile(null);
                            }}
                            sx={{ cursor: 'pointer' }}
                          >
                            Profile
                          </Typography>
                          <Divider />
                          <Typography
                            variant="h6"
                            color="error"
                            py={2}
                            px={6}
                            sx={{ cursor: 'pointer' }}
                            onClick={handleLogout}
                          >
                            Logout
                          </Typography>
                        </ProfileBoxWrapper>
                      </ClickAwayListener>
                    </Popper>
                    <Stack
                      justifyContent="center"
                      display={{ xs: 'none', sm: 'flex' }}
                      sx={{ cursor: 'pointer' }}
                      onClick={handleProfileToggle}
                    >
                      <UserNameText variant="h5">
                        {userData?.first_name} {userData?.last_name}
                      </UserNameText>
                      <UserTypeText>
                        {userData?.role.toLowerCase()}
                      </UserTypeText>
                    </Stack>
                  </Stack>
                </Stack>
              </ToolbarWrapper>
            </AppBar>
            <Box
              component="nav"
              sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
              aria-label="mailbox folders"
            >
              <Drawer
                container={container}
                variant="temporary"
                open={open}
                onClose={handleDrawerToggle}
                sx={{
                  display: { xs: 'block', xl: 'none' },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    boxShadow: '4px 8px 16px 0px #635BFF1A',
                  },
                }}
              >
                {drawer}
              </Drawer>
              <Drawer
                open={open}
                variant="persistent"
                sx={{
                  display: { xs: 'none', xl: 'block' },
                  '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    width: drawerWidth,
                    boxShadow: '4px 8px 16px 0px #635BFF1A',
                  },
                }}
              >
                {drawer}
              </Drawer>
            </Box>
            <Main open={open}>{children}</Main>
          </Box>
        </>
      )}
    </>
  );
}
