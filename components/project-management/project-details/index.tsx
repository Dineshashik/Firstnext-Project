import { CustomButton, TitleButtonBoxWrapper } from '@/components/common/ui';
import React, { useState } from 'react';
import { Box, Button, Grid, Stack, Typography } from '@mui/material';
import {
  ProjectDetailsCompanyImage,
  ProjectDetailsImageWrapper,
  RequiredFundingWrapper,
} from './style';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FOUNDER } from '@/helpers/constants';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createDocumentRequest } from '@/services/apiDefinition';
import { useSocket } from '@/context/SocketContext';
import { user } from '@/lib/slices/userSlice';
import { useAppSelector } from '@/lib/hooks';

interface LoaderState {
  isLoading: boolean;
  document_id: string;
}

const ProjectDetailsCard = ({
  type,
  projectId,
  projectByIdData,
  isBlurred,
}: {
  type: string;
  projectId: string;
  projectByIdData?: any;
  isBlurred?: boolean;
}) => {
  const router = useRouter();
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  const handleOpenDocument = (doc: any) => {
    const docType = doc?.doc_name?.split('.').pop();
    if (['doc', 'docs', 'pdf'].includes(docType)) {
      window.open(
        `https://docs.google.com/viewer?url=${doc.doc_url}`,
        '_blank'
      );
    } else {
      window.open(doc.doc_url, '_blank');
    }
  };

  const onRequest = async (
    document_id: string,
    status: string,
    url: string
  ) => {
    if (status === 'APPROVED' || status === 'PUBLIC') {
      window.open(url, '_blank');
    } else if (status === 'LOCKED' || status === 'PENDING') {
      if (socket && userDetails && status !== 'PENDING') {
        socket.emit('doc_request', {
          project_id: projectId,
          sender: userDetails?._id,
          receiver: projectByIdData?.user_id?._id,
        });
      }

      try {
        const res = await api.post<any>(createDocumentRequest, {
          document_id: document_id,
        });
        if (res.success) {
          toast.success(res.message || 'Request sent successfully');
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    } else {
      toast.warning(
        'Your request has been rejected, Please contact on support'
      );
    }
  };

  return (
    <TitleButtonBoxWrapper
      title='Project Details'
      buttonName='Edit Project'
      onClick={() =>
        router.push(`/founder/project-management/${projectId}/edit-project`)
      }
      showButton={type === FOUNDER ? true : false}
    >
      <ProjectDetailsImageWrapper>
        <ProjectDetailsCompanyImage
          sx={{ filter: isBlurred ? 'blur(6px)' : 'none' }}
          src={
            projectByIdData?.image
              ? projectByIdData?.image?.image_url
              : '/asset/images/company-profile.svg'
          }
          alt='pic'
          fill
        />
      </ProjectDetailsImageWrapper>
      <Typography
        variant='h4'
        fontSize={24}
        my={2}
        sx={{
          filter: isBlurred ? 'blur(6px)' : 'none',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {projectByIdData?.project_name}
      </Typography>
      <Typography
        sx={{
          filter: isBlurred ? 'blur(6px)' : 'none',
          wordWrap: 'break-word',
          lineHeight: 1.75,
        }}
      >
        {projectByIdData?.description}
      </Typography>
      <RequiredFundingWrapper
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        my={3}
      >
        <Typography>Required Funding Amount</Typography>
        <Typography variant='h4' fontSize={24}>
          $ {new Intl.NumberFormat().format(projectByIdData?.amount_to_raised)}
        </Typography>
      </RequiredFundingWrapper>
      <Grid container spacing={2}>
        {projectByIdData &&
          (projectByIdData?.project_docs || projectByIdData?.docs)?.map(
            (item: any, index: any) => (
              <Grid item xs={12} sm={6} key={index}>
                <Stack
                  direction='row'
                  sx={{ filter: isBlurred ? 'blur(6px)' : 'none' }}
                >
                  <Box mt={1}>
                    <Image
                      src='/asset/icon/documents.svg'
                      alt='doc'
                      width={60}
                      height={60}
                      onClick={() => handleOpenDocument(item)}
                    />
                  </Box>
                  <Stack
                    justifyContent='center'
                    alignItems='center'
                    direction='row'
                    onClick={() =>
                      onRequest(item?._id, item?.status, item?.doc_url)
                    }
                    ml={2}
                    sx={{ cursor: 'pointer' }}
                  >
                    <Typography variant='h6'>{item?.doc_name}</Typography>
                    {item?.status === 'APPROVED' && <LockOpenOutlinedIcon />}
                    {(item?.status === 'LOCKED' ||
                      item?.status === 'PENDING' ||
                      item?.status === 'REJECTED') && ( // Conditionally render LockOutlinedIcon
                      <LockOutlinedIcon /> // Add style for spacing
                    )}
                    {/* {item?.status === 'LOCKED' && (
                  <CustomButton
                    color='blue'
                    icon='default'
                    onClick={() => onRequest(item?._id)}
                    isLoading={loader.isLoading && loader.document_id === item?._id}
                  >
                    Request
                  </CustomButton>
                )} */}
                    {/* {item?.status !== 'PUBLIC' && <Typography variant="h6" style={{ marginLeft: '5px' }}>{item?.status}</Typography>} */}
                    {/* </Typography> */}
                  </Stack>
                </Stack>
              </Grid>
            )
          )}
      </Grid>
    </TitleButtonBoxWrapper>
  );
};

export default ProjectDetailsCard;
