import React, { useState } from "react";
import DataTable from "react-data-table-component";
import {
  SubscriptionHistoryColumn,
  SubscriptionHistorydata,
  conditionalRowStyles,
  tableCustomStyles,
} from "./data";
import { CardWrapper } from "@/components/common/ui";
import { Stack, Typography } from "@mui/material";
import { FilterButton } from "./style";

const SubscriptionsHistory = ({ data }: any) => {
  const [activeFilter, setActiveFilter] = useState<string>("Last Month");

  const handleFilterClick = (filter: string) => {
    setActiveFilter(filter === activeFilter ? "Last Month" : filter);
  };

  const transformedData = data?.map((item: any, index: number) => {
    const transaction = item?.transactions[0]; // Assuming you want the first transaction

    return {
      id: index + 1,
      planType:
        item?.plan?.plan_type?.charAt(0).toUpperCase() +
        item?.plan?.plan_type?.slice(1).toLowerCase(), // Capitalize first letter
      startDate: new Date(item?.start_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      renewalDate: new Date(item?.end_date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      transId: transaction?.transaction_id,
      amount: `$${transaction?.amount?.toFixed(2)}`, // Assuming amount is in cents and converting to dollars
      status: item.active ? "Active" : "Inactive",
    };
  });

  return (
    <CardWrapper>
      <Stack direction="row" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Subscription History</Typography>
        {/* <Stack
          direction="row"
          spacing={1}
          alignItems="center"
        >
          <Typography variant="h6">Filter By:</Typography>
          {['Last Month', 'Last Year', '2022'].map((item) => (
            <FilterButton
              key={item}
              variant="contained"
              active={(item === activeFilter).toString()}
              onClick={() => handleFilterClick(item)}
            >
              {item}
            </FilterButton>
          ))}
        </Stack> */}
      </Stack>
      <DataTable
        columns={SubscriptionHistoryColumn}
        data={transformedData}
        conditionalRowStyles={conditionalRowStyles}
        customStyles={tableCustomStyles}
        fixedHeader={true}
        fixedHeaderScrollHeight="calc(100vh - 256px)"
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      />
    </CardWrapper>
  );
};

export default SubscriptionsHistory;
