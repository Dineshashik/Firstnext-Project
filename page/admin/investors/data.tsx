'use client';
import { Button, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import { SelectWrapper, TableButton } from './style';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TableColumn } from 'react-data-table-component';
import Link from 'next/link';
import { updateStatus } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
import { MenuItem } from '@mui/material';

export const InvestorVerifieddata = [
  {
    id: 1,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 2,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 3,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 4,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 5,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 6,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 7,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 8,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 9,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 10,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 11,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 12,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
  {
    id: 13,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
    status: 'Active',
  },
];

const StatusDropdown = ({ status, id }: any) => {

  const displayValue = status ? 'Active' : 'Inactive';
  const statusApi = updateStatus + '/' + id
  const handleChange = async (event: any) => {
    const newValue = event.target.value as string; // Get the selected value
    try {
      const response = await api.put(
        statusApi,
        { status: newValue === 'Active' ? true : false },
      );

      if (response.success) {
        toast.success(
          response?.message || 'Status Updated successfully'
        );
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <SelectWrapper
      value={displayValue}
      defaultValue={displayValue}
      onChange={(event) => handleChange(event)} // Pass the entire event object to handleChange
      variant='filled'
      size="small"
      input={<OutlinedInput />}
    >
      <MenuItem value="Active">Active</MenuItem>
      <MenuItem value="Inactive">Inactive</MenuItem>
    </SelectWrapper>
  );
};

export const InvestorVerifiedColumn: TableColumn<any>[] = [
  {
    name: 'Sr No',
    width: '5%',

    selector: (row: any) => row.id,
    style: { textAlign: 'right' },
  },
  {
    name: 'Name',
    selector: (row: any) => row.name,

    grow: 4,
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
    right: true,
    selector: (row: any) => row.join_date,
  },
  {
    name: 'Phone No.',
    right: true,
    selector: (row: any) => row.phone_no,
  },
  {
    name: 'Email',
    right: true,
    grow: 2,
    selector: (row: any) => row.email,
    format: (row: any) => {
      return (
        <Link href={`mailto:${row.email}`} onClick={(e) => {
          e.preventDefault();
          window.open(`mailto:${row.email}`, '_blank');
        }}>
          {row.email}
        </Link>
      );
    },
  },
  // {
  //   name: 'Status',
  //   right: true,
  //   width: '10%',
  //   selector: (row: any) => row.status,
  //   format: (row: any) => {
  //     if (row.status === true) {
  //       return (
  //         <>
  //           <Typography
  //             color="#635BFF"
  //             variant="h6"
  //             fontSize={14}
  //           >
  //             {'Active'}
  //           </Typography>
  //         </>
  //       );
  //     } else {
  //       return (
  //         <>
  //           <Typography
  //             variant="h6"
  //             fontSize={14}
  //             fontWeight={400}
  //           >
  //             {'Inactive'}
  //           </Typography>
  //         </>
  //       );
  //     }
  //   },
  // },
  // {
  //   name: 'Status',
  //   right: true,
  //   width: '150px',
  //   selector: (row: any) => row.status,
  //   format: (row: any) => {
  //     return (
  //       <StatusDropdown status={row.status} id={row.user_id} />
  //     );
  //   },
  // },
  // {
  //   name: 'Actions',
  //   width: '10%',
  //   right: 'true',
  //   cell: () => (
  //     <Stack
  //       spacing={2}
  //       direction="row"
  //     >
  //       <Image
  //         src="/asset/icon/table-show.svg"
  //         alt="show"
  //         width={30}
  //         height={30}
  //       />
  //       <Image
  //         src="/asset/icon/table-delete.svg"
  //         alt="show"
  //         width={30}
  //         height={30}
  //       />
  //     </Stack>
  //   ),
  // },
];

export const FouderPendingdata = [
  {
    id: 1,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 2,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 3,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 4,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 5,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 6,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 7,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 8,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 9,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
  {
    id: 10,
    name: 'Premium',
    join_data: '02/04/2024',
    phone_no: '+1 123 456 789',
    email: 'loremipsum@gmail.com',
  },
];

export const InvestorPendingColumn = [
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
    selector: (row: any) => row.join_date,
  },
  {
    name: 'Phone No.',
    right: 'true',
    selector: (row: any) => row.phone_no,
  },
  {
    name: 'Email',
    right: 'true',
    selector: (row: any) => row.email,
    format: (row: any) => {
      return (
        <Link href={`mailto:${row.email}`} onClick={(e) => {
          e.preventDefault();
          window.open(`mailto:${row.email}`, '_blank');
        }}>
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
