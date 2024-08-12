'use client';
import {
  styled,
  Button,
  Typography,
  Container,
  Box,
  Stack,
  StackProps,
} from '@mui/material';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import AddIcon from '@mui/icons-material/Add';
import { ReactNode } from 'react';
import { Theme } from '@mui/material/styles';

interface CardWrapperProps extends StackProps {
  fullHeight?: boolean;
}

const colorMap = {
  skyblue: '#2FB4F7',
  blue: '#635BFF',
  black: '#000000',
  white: '#FFFFFF33',
  transparent: 'transparent',
};

const ButtonWrapper = styled(Button)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 600,
  lineHeight: '19px',
  padding: '15px 20px',
  borderRadius: '100px',
  textTransform: 'none',
  color: theme.palette.info.light,
  boxShadow: 'none',
  textWrap: 'nowrap',
  maxWidth: '245px',
  maxHeight: '44px',

  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '8px 20px',
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  textTransform: 'none',
  marginBottom: '16px',
  [theme.breakpoints.down('md')]: {
    padding: '0px 16px',
  },
}));

const CustomContainer = styled(Container)(({ theme }) => ({
  paddingTop: '4.5rem',
  paddingBottom: '4.5rem',
  [theme.breakpoints.down('lg')]: {
    padding: '2rem 0px',
  },
}));

const TitleButtonMainWrapper = styled(Box)(({ theme }) => ({
  boxShadow: '4px 8px 16px 0px #635BFF1A',
  borderRadius: '24px',
  height: '100%',
  backgroundColor: theme.palette.info.light,
  padding: '24px',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const CustomButton = ({
  variant,
  children,
  color,
  icon,
  xsWidth,
  smWidth,
  mdWidth,
  lgWidth,
  onClick,
  type = 'button',
  isLoading = false,
  loadingText,
}: {
  children: string;
  type?: 'button' | 'submit';
  variant?: 'contained' | 'text' | 'outlined';
  color: 'skyblue' | 'blue' | 'black' | 'white' | 'transparent';
  icon?: 'default' | 'redirect' | 'add' | undefined;
  xsWidth?: string;
  smWidth?: string;
  mdWidth?: string;
  lgWidth?: string;
  onClick?: (event: any) => void;
  isLoading?: boolean;
  loadingText?: string;
}) => {
  return (
    <ButtonWrapper
      variant={variant || 'contained'}
      sx={{
        backgroundColor: colorMap[color],
        width: { xs: xsWidth, sm: smWidth, md: mdWidth, lg: lgWidth },
        '&:hover': {
          backgroundColor: colorMap[color],
        },
      }}
      endIcon={
        icon === 'redirect' ? (
          <OpenInNewOutlinedIcon sx={{ width: '15px', height: '15px' }} />
        ) : (
          icon !== 'add' &&
          icon !== 'default' && (
            <ArrowForwardIosIcon sx={{ width: '15px', height: '15px' }} />
          )
        )
      }
      startIcon={
        icon === 'add' && <AddIcon sx={{ width: '15px', height: '15px' }} />
      }
      onClick={onClick}
      type={type}
      disabled={isLoading}
    >
      {isLoading ? loadingText || 'Loading...' : children}
    </ButtonWrapper>
  );
};

const TitleWrapper = ({
  children,
  align,
}: {
  children: string | ReactNode;
  align?: string;
}) => {
  return (
    <Title
      sx={{ textAlign: align || 'left' }}
      variant="h2"
    >
      {children}
    </Title>
  );
};

const ContainerWrapper = ({
  children,
  maxWidth,
}: {
  children: React.ReactNode;
  maxWidth?: 'sm' | 'lg' | 'xl';
}) => {
  return (
    <CustomContainer maxWidth={maxWidth || 'xl'}>{children}</CustomContainer>
  );
};

const TitleButtonBoxWrapper = ({
  title,
  buttonName,
  children,
  onClick,
  showButton = true,
}: {
  title: string;
  buttonName: string;
  children: ReactNode;
  onClick: () => void;
  showButton: boolean;
}) => {
  return (
    <TitleButtonMainWrapper>
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          fontSize={18}
          variant="h6"
        >
          {title}
        </Typography>
        {showButton && (
          <CustomButton
            onClick={onClick}
            color="blue"
          >
            {buttonName}
          </CustomButton>
        )}
      </Stack>
      {children}
    </TitleButtonMainWrapper>
  );
};

const CardWrapper = styled(({ fullHeight, ...other }: CardWrapperProps) => (
  <Stack {...other} />
))(({ theme, fullHeight }) => ({
  backgroundColor: theme.palette.info.light,
  boxShadow: '4px 8px 16px 0px #635BFF1A',
  borderRadius: '24px',
  padding: '24px',
  height: fullHeight ? '100%' : 'auto',
  [theme.breakpoints.down('md')]: {
    padding: '16px',
  },
}));

const Round = styled(Box)(
  ({ theme, bgcolor }: { theme?: Theme; bgcolor?: string }) => ({
    backgroundColor: bgcolor || theme?.palette.primary.main,
    width: '16px',
    height: '16px',
    borderRadius: '50px',
    marginRight: '8px',
  })
);

export {
  CustomButton,
  TitleWrapper,
  Typography,
  ContainerWrapper,
  TitleButtonBoxWrapper,
  CardWrapper,
  Round,
};
