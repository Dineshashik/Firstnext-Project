'use client';
import { Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Link from 'next/link';
import { Select, MenuItem } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import { boolean } from 'yup';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '@/services/axiosInstance';
import { updateStatus } from '@/services/apiDefinition';
import { SelectWrapper } from './style';

export const FounderVerifieddata = [
  {
    id: 1,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 13,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
];

export const FounderVerifiedColumn: any = [
  {
    name: 'Sr No',
    width: '5%',
    selector: (row: any) => row.id,
    style: { textAlign: 'right' },
  },
  {
    name: 'Name',
    selector: (row: any) => row.name,

    grow: '4',
    format: (row: any) => {
      return (
        <>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
          >
            <Image
              src={row.profile || '/asset/icon/avtar-profile.svg'}
              width={36}
              height={36}
              alt="redirect"
              style={{ borderRadius: '50%' }}
            />
            <Typography
              variant="h6"
              fontSize={14}
            >
              {row.name}
            </Typography>
          </Stack>
        </>
      );
    },
  },
  {
    name: 'Date Joined',
    right: 'true',
    minWidth: '150px',
    selector: (row: any) => row.join_date,
  },
  {
    name: 'Phone No.',
    right: 'true',
    minWidth: '150px',
    selector: (row: any) => row.phone_no,
  },
  {
    name: 'Email',
    right: 'true',
    grow: '2',
    minWidth: '250px',
    selector: (row: any) => row.email,
    format: (row: any) => {
      return (
        <Link
          href={`mailto:${row.email}`}
          onClick={(e) => {
            e.preventDefault();
            window.open(`mailto:${row.email}`, '_blank');
          }}
        >
          {row.email}
        </Link>
      );
    },
  },
];

export const FouderPendingdata = [
  {
    id: 1,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 2,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 3,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 4,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 5,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 6,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 7,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 8,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 9,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 10,
    name: 'Premium',
    join_date: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
];

export const FounderPendingColumn = [
  {
    name: 'Sr No',
    maxWidth: '5%',
    selector: (row: any) => row.id,
    style: { textAlign: 'right' },
  },
  {
    name: 'Name',
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
              src={row.profile || '/asset/icon/avtar-profile.svg'}
              width={36}
              height={36}
              alt="redirect"
              style={{ borderRadius: '50%' }}
            />
            <Typography
              variant="h6"
              fontSize={14}
            >
              {row.name}
            </Typography>
          </Stack>
        </>
      );
    },
  },
  {
    name: 'Date Joined',
    right: 'true',
    minWidth: '150px',
    selector: (row: any) => row.join_date,
  },
  {
    name: 'Phone No.',
    right: 'true',
    minWidth: '150px',
    selector: (row: any) => row.phone_no,
  },
  {
    name: 'Email',
    right: 'true',
    minWidth: '250px',
    selector: (row: any) => row.email,
    format: (row: any) => {
      return (
        <Link
          href={`mailto:${row.email}`}
          onClick={(e) => {
            e.preventDefault();
            window.open(`mailto:${row.email}`, '_blank');
          }}
        >
          {row.email}
        </Link>
      );
    },
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
  header: {
    style: {
      minHeight: '56px',
    },
  },
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

interface IUserInfo {
  _id: string;
  first_name: 'test1';
  last_name: 'test2';
  email: string;
  status: boolean;
  role: string;
  created_at: string;
  admin_status: string;
}
