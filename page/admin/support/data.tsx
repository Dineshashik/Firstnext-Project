"use client";
import { Button, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { EmailTypography, TableButton } from "./style";

export const SupportInvestordata = [
  {
    id: 1,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 2,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 3,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 4,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 5,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 6,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 7,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 8,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 9,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 10,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 11,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 12,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 13,
    name: "John Doe",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
];

export const SupportInvestorColumn = [
  {
    name: "Sr No.",
    minWidth: "50px",
    selector: (row: any, index: number) => index + 1,
    style: { textAlign: "right" },
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    minWidth: "200px",
    format: (row: any) => {
      return (
        <Typography variant="h6" fontSize={14}>
          {row.first_name} {row.last_name}
        </Typography>
      );
    },
  },
  {
    name: "Description",
    right: "true",
    minWidth: "200px",
    selector: (row: any) => row.message,
  },
  {
    name: "Phone No.",
    right: "true",
    minWidth: "200px",
    selector: (row: any) => row.phone,
  },
  {
    name: "Email",
    right: "true",
    grow: "2",
    selector: (row: any) => row.email,
    format: (row: any) => {
      return (
        <EmailTypography variant="h6" color="#4286F4" fontSize={14}>
          {row.email}
        </EmailTypography>
      );
    },
  },
];

export const FouderPendingdata = [
  {
    id: 1,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 2,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 3,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 4,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 5,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 6,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 7,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 8,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 9,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 10,
    name: "Premium",
    join_data: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
];

export const FounderPendingColumn = [
  {
    name: "Sr No.",
    maxWidth: "5%",
    selector: (row: any) => row.id,
    style: { textAlign: "right" },
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    format: (row: any) => {
      return (
        <>
          <Stack direction="row" alignItems="center" gap={1}>
            <Image
              src="/asset/icon/avtar-profile.svg"
              width={36}
              height={36}
              alt="redirect"
            />
            <Typography variant="h6" fontSize={14}>
              {row.name}
            </Typography>
          </Stack>
        </>
      );
    },
  },
  {
    name: "Date Joined",
    right: "true",
    selector: (row: any) => row.join_data,
  },
  {
    name: "Phone No.",
    right: "true",
    selector: (row: any) => row.phone_no,
  },
  {
    name: "Email",
    right: "true",
    selector: (row: any) => row.email,
  },
];

export const conditionalRowStyles = [
  {
    when: (row: any) => true,
    style: (row: any) => ({
      backgroundColor: row.id % 2 === 0 ? "#F6F9FC" : "#EBF3FC",
    }),
  },
];

export const tableCustomStyles = {
  border: "none !important",
  headRow: {
    style: {
      backgroundColor: "#F6F9FC",
      marginBottom: "6px",
      BorderBottomStyle: "none",
      borderBottomWidth: "0px",
      borderBottomColor: "none",
      borderRadius: "10px",
    },
  },
  rows: {
    style: {
      borderRadius: "10px",
      marginBottom: "6px",
      BorderBottomStyle: "none !important",
      borderBottomWidth: "0px !important",
      borderBottomColor: "none !important",
    },
  },
};
