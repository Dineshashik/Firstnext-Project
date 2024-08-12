import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {
  IconButton,
  Stack,
  useMediaQuery,
  Theme,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { ReactElement } from 'react';
import {
  DialogApproveButtonWrapper,
  DialogButtonWrapper,
  DialogHeader,
  DialogWrapper,
} from './style';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';

export default function CustomDialog({
  children,
  title,
  onReject,
  onMoreDetails,
  onApprove,
  open,
  onClose,
  userId,
  isUserVerified,
}: {
  children: ReactElement;
  open: boolean;
  title: string;
  onReject: (rowId: string) => void;
  onMoreDetails: (rowId: string) => void;
  onApprove: (rowId: string) => void;
  onClose: () => void;
  userId: string;
  isUserVerified: boolean;
}) {
  const isTablet = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <DialogWrapper
      fullScreen={isTablet ? true : false}
      fullWidth={true}
      maxWidth="lg"
      open={open}
      onClose={onClose}
    >
      <DialogHeader
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4">{title}</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      {!isUserVerified && (
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          justifyContent="end"
          spacing={{ xs: 1, md: 2 }}
          m={2}
        >
          <DialogButtonWrapper
            color="error"
            onClick={() => onReject(userId)}
          >
            Reject
          </DialogButtonWrapper>
          <DialogButtonWrapper
            color="secondary"
            onClick={() => onMoreDetails(userId)}
          >
            More Details
          </DialogButtonWrapper>
          <DialogApproveButtonWrapper onClick={() => onApprove(userId)}>
            Approve
          </DialogApproveButtonWrapper>
        </Stack>
      )}
    </DialogWrapper>
  );
}
