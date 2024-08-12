import { Stack, Typography } from '@mui/material';
import Image from 'next/image';

export const ProjectMangCardData = [
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
  {
    id: 3,
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
    id: 4,
    imageUrl: '/asset/images/project1.png',
    companyName: 'Company Name Mention Here',
    companyLocation: 'Abu Dhabi, Dubai',
    details:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the.',
    totalRequired: '$40,000',
    industry: 'IT',
    fundingStage: 'Bootstrapping',
  },
  {
    id: 5,
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
    id: 6,
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

export const DocumentReqdata = [
  {
    id: 1,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 2,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 3,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 4,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 5,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 6,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 7,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 8,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 9,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 10,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 11,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
  {
    id: 12,
    doc_name: 'Document Name Mention Here',
    project_name: 'Project Name Mention Here',
    investor_name: 'Investor Name Mention Here',
    req_date: '02/04/2024',
  },
];

export const DocumentReqColumn = [
  {
    name: '#',
    maxWidth: '3%',
    selector: (row: any, index : number) => index + 1,
    style: { textAlign: 'right' },
  },
  {
    name: 'Name',
    minWidth: '30%',
    selector: (row: any) => row.name,
    format: (row: any) => {
      return (
        <>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <Image
              src="/asset/icon/doc-req.svg"
              width={36}
              height={36}
              alt="redirect"
            />
            <Typography
              variant="h6"
              fontSize={14}
            >
              {row?.doc?.doc_name}
            </Typography>
          </Stack>
        </>
      );
    },
  },
  {
    name: 'Project Name',
    minWidth: '15%',
    right: 'true',
    selector: (row: any) => row?.project?.project_name,
  },
  {
    name: 'Investor Name',
    minWidth: '15%',
    right: 'true',
    selector: (row: any) => row?.user?.first_name + " " + row?.user?.last_name,
  },
  {
    name: 'Req. Date',
    minWidth: '10%',
    right: 'true',
    maxWidth: '10%',
    selector: (row: any) => row?.created_at,
  },
];

export const conditionalRowStyles = [
  {
    when: (row: any) => true,
    style: (row: any) => ({
      backgroundColor: row.id % 2 === 0 ? '#F6F9FC' : '#EBF3FC',
    }),
  },
];

export const tableCustomStyles = {
  border: 'none !important',
  headRow: {
    style: {
      backgroundColor: '#F6F9FC',
      marginBottom: '6px',
      BorderBottomStyle: 'none',
      borderBottomWidth: '0px',
      borderBottomColor: 'none',
      borderRadius: '10px',
    },
  },
  rows: {
    style: {
      borderRadius: '10px',
      marginBottom: '6px',
      BorderBottomStyle: 'none !important',
      borderBottomWidth: '0px !important',
      borderBottomColor: 'none !important',
    },
  },
};
