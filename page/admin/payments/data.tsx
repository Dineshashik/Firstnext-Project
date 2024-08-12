"use client";
import { Stack, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

export const AdminPaymentsData = [
  {
    id: 1,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 2,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 3,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 4,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 5,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 6,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 7,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 8,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",

    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
  {
    id: 9,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  },
];

export const AdminPaymentsColumn = [
  {
    name: "Sr No",
    width: "5%",

    selector: (row: any) => row.id,
    style: { textAlign: "right" },
  },
  {
    name: "Name",
    selector: (row: any) => row.name,
    grow: "4",
    format: (row: any) => {
      return (
        <>
          <Stack direction="row" alignItems="center" gap={1}>
            <Image
              src={row.image ? row.image : "/asset/icon/avtar-profile.svg"}
              width={36}
              height={36}
              alt="redirect"
              style={{ borderRadius: "50%" }}
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
    name: "Trans_ID",
    right: "true",
    selector: (row: any) => row.trans_id,
  },
  {
    name: "Amount",
    right: "true",
    selector: (row: any) => row.amount,
  },
  {
    name: "Start Date",
    right: "true",
    selector: (row: any) => row.start_date,
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
    format: (row: any) => {
      return (
        <Link href={`mailto:${row.email}`} style={{ textDecoration: "none" }}>
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
