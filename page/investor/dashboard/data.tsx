'use client';
import { Box, Button, Stack } from '@mui/material';
import { useState } from 'react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { AcationButtonModal, IgnoreButton } from './style';
export const InvestorDashboardCardData = [
  {
    id: 1,
    title: 'Total Bookmark Project',
    number: '15',
    iconUrl: '/asset/icon/dash-project-view.svg',
    redirect: '/investor/bookmark',
  },
  {
    id: 2,
    title: 'Total Connection',
    number: '3,417',
    iconUrl: '/asset/icon/dash-project-view.svg',
    redirect: '/investor/founder',
  },
];

export const InvestorProjectData = [
  {
    id: 1,
    imageUrl: '/asset/images/project1.png',
    companyName: 'Company Name Mention Here',
    companyLocation: 'Abu Dhabi, Dubai',
    details:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the.',
    totalRequired: '$40,000',
    industry: 'Pharma',
    fundingStage: 'Bootstrapping',
  },
  {
    id: 2,
    imageUrl: '/asset/images/project1.png',
    companyName: 'Company Name Mention Here',
    companyLocation: 'Abu Dhabi, Dubai',
    details:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the.',
    totalRequired: '$40,000',
    industry: 'IT',
    fundingStage: 'Bootstrapping',
  },
];

interface RowData {
  id: number;
  name: string;
  projectName: string;
  receivedDate: string;
}

export const columns = [
  {
    name: '#',
    width: '5%',
    selector: (row: RowData) => row.id,
  },
  {
    name: 'Investor Name',

    width: '50%',
    selector: (row: RowData) => row.name,
  },
  {
    name: 'Project Name',
    width: '15%',

    selector: (row: RowData) => row.projectName,
  },
  {
    name: 'Received Date',
    width: '20%',

    selector: (row: RowData) => row.receivedDate,
  },
  {
    name: 'Actions',

    width: '10%',
    cell: (row: RowData) => <ActionCell row={row} />,
  },
];

const ActionCell = ({ row }: any) => {
  const [showModal, setShowModal] = useState(false);

  const toogleAction = () => {
    setShowModal(!showModal);
  };

  const handleAccept = () => {
    setShowModal(false);
  };

  const handleIgnore = () => {
    setShowModal(false);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Button onClick={toogleAction}>
        <MoreHorizIcon sx={{ color: '#0A2540' }} />
      </Button>

      {showModal && (
        <AcationButtonModal
          direction="column"
          spacing={1}
        >
          <IgnoreButton variant="contained">Accept</IgnoreButton>
          <IgnoreButton color="error">Ignore</IgnoreButton>
        </AcationButtonModal>
      )}
    </Box>
  );
};

export const data = [
  {
    id: 1,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
  {
    id: 2,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
  {
    id: 3,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
  {
    id: 4,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
  {
    id: 5,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
  {
    id: 6,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
  {
    id: 7,
    name: 'Investor Name Mention Here',
    projectName: 'Lorem Ipsum',
    receivedDate: 'Apr 02, 2024',
    action: '...',
  },
];
