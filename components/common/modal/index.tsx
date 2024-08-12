import React, { ReactElement } from 'react';
import Modal from '@mui/material/Modal';

interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactElement;
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  onClose,
  children,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      {children}
    </Modal>
  );
};

export default CommonModal;
