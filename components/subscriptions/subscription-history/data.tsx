import { Typography } from '@mui/material';

export const SubscriptionHistorydata = [
  {
    id: 1,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Active',
  },
  {
    id: 2,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Active',
  },
  {
    id: 3,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
  {
    id: 4,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
  {
    id: 5,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Active',
  },
  {
    id: 6,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
  {
    id: 7,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Active',
  },
  {
    id: 8,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
  {
    id: 9,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
  {
    id: 10,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Active',
  },
  {
    id: 11,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
  {
    id: 12,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Active',
  },
  {
    id: 13,
    planType: 'Premium',
    TranDate: 'July 22, 2022',
    transId: 'July 22, 2022',
    amount: '$399.00',
    status: 'Completed',
  },
];

export const SubscriptionHistoryColumn = [
  {
    name: 'Sr No',
    selector: (row: any) => row.id,
  },
  {
    name: 'Plan Type',
    selector: (row: any) => row.planType,
  },
  {
    name: 'Start Date',
    selector: (row: any) => row.startDate,
  },
  {
    name: 'Renewal Date',
    selector: (row: any) => row.renewalDate,
  },
  {
    name: 'Trans_ID',
    selector: (row: any) => row.transId,
  },
  {
    name: 'Amount',
    selector: (row: any) => row.amount,
    format: (row: any) => {
      return (
        <>
          <Typography
            color="#635BFF"
            variant="h6"
            fontSize={14}
          >
            {row.amount}
          </Typography>
        </>
      );
    },
  },
  {
    name: 'Status',
    selector: (row: any) => row.status,
    format: (row: any) => {
      if (row.status === 'Active') {
        return (
          <>
            <Typography
              color="#635BFF"
              variant="h6"
              fontSize={14}
            >
              {'Active'}
            </Typography>
          </>
        );
      } else {
        return (
          <>
            <Typography
              variant="h6"
              fontSize={14}
              fontWeight={400}
            >
              {'Completed'}
            </Typography>
          </>
        );
      }
    },
  },
];

export const conditionalRowStyles = [
  {
    when: (row: any) => true,
    style: (row: any) => ({
      backgroundColor: row.id % 2 === 0 ? '#EBF3FC' : '#F6F9FC',
    }),
  },
];

export const tableCustomStyles = {
  border: 'none !important',
  headRow: {
    style: {
      backgroundColor: '#EBF3FC',
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
