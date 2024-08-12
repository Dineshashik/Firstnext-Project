"use client";
import { Box, Grid, Popper, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AdminFounderInput,
  AdminFounderInputWrapper,
  AdminFounderWrapper,
  PaymentFilterButtonWrapper,
  PaymentPopperBoxWrapper,
  PaymentsFilterButton,
  TableButton,
} from "./style";
import DynamicTabs from "@/components/common/custom-tab";
import { CustomButton } from "@/components/common/ui";
import DataTable from "react-data-table-component";
import {
  AdminPaymentsData,
  AdminPaymentsColumn,
  conditionalRowStyles,
  tableCustomStyles,
} from "./data";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import PaymentModal from "./payment-modal";
import {
  FieldValues,
  RegisterOptions,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import { DatePickerInput } from "@/components/common/ui/input-fields";
import useDebouncedValue from "@/utils/useDebounced";
import { getUserPaymentInfo } from "@/services/apiDefinition";
import { api } from "@/services/axiosInstance";
import transformTableData from "@/utils/transformData";
import transformPaymentData from "@/utils/transformPaymentData";
import { toast } from "react-toastify";

type HandleMoreDetailsClick = (rowId: string) => void;
interface VerifiedFoundersTabType {
  onShowClick: HandleMoreDetailsClick;
  searhValue: string;
  date: { start_date: Date | null; end_date: Date | null };
  type: "FOUNDER" | "INVESTOR";
  resetFilter: boolean;
}

const FounderInvestorTabContent = ({
  onShowClick,
  searhValue,
  date,
  type,
  resetFilter,
}: VerifiedFoundersTabType) => {
  const [pending, setPending] = useState(false);
  const [founderInvestor, setFounderInvestor] = useState<any>();
  const debouncedSearchTerm = useDebouncedValue(searhValue, 700);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [totalCount, setTotalCount] = useState<number>();
  const handlePerRowsChange = (pageSize: number) => {
    setPageSize(pageSize);
  };
  const handlePageChange = (page: any) => {
    setPage(page);
  };

  useEffect(() => {
    if (resetFilter) {
      setPage(1);
    }
  }, [resetFilter]);

  useEffect(() => {
    const fetchFounderData = async () => {
      try {
        setPending(true);
        const response = await api.get<any>(getUserPaymentInfo, {
          page: page,
          limit: pageSize,
          role: type,
          search: debouncedSearchTerm,
          ...(date?.start_date ? { start_date: date.start_date } : {}),
          ...(date?.end_date ? { end_date: date.end_date } : {}),
        });
        if (response.success && response.data) {
          setTotalCount(response?.data?.pagination?.totalCount);

          const transformedData = await transformPaymentData(
            response?.data?.data
          );
          setPending(false);
          setFounderInvestor(transformedData);
        }
      } catch (error: any) {
        setPending(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    if (debouncedSearchTerm) {
      setPage(1);
    }
    fetchFounderData();
  }, [debouncedSearchTerm, date, type, page, pageSize]);

  return (
    <DataTable
      columns={
        [
          ...AdminPaymentsColumn,
          {
            name: "Actions",
            right: "true",
            cell: (row: any) => (
              <Stack spacing={2} direction="row">
                <Image
                  src="/asset/icon/table-show.svg"
                  alt="show"
                  width={30}
                  height={30}
                  onClick={() => onShowClick(row)}
                />
              </Stack>
            ),
          },
        ] as any
      }
      data={founderInvestor}
      conditionalRowStyles={conditionalRowStyles}
      customStyles={tableCustomStyles}
      fixedHeader={true}
      fixedHeaderScrollHeight="calc(100vh - 322px)"
      progressPending={pending}
      pagination
      paginationServer
      paginationTotalRows={totalCount}
      paginationDefaultPage={page}
      onChangeRowsPerPage={handlePerRowsChange}
      onChangePage={handlePageChange}
      paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
    />
  );
};

const AdminPaymentsPage = () => {
  const [open, setOpen] = useState(false);
  const [rowData, setRowData] = useState<any>({
    id: 1,
    name: "Investor Name",
    trans_id: "02/04/2024",
    amount: "$29.00",
    start_date: "02/04/2024",
    phone_no: "+1 123 456 789",
    email: "loremipsum@gmail.com",
  });
  const [searhValue, setSearchValue] = useState<string>("");
  const [date, setDate] = useState<{
    start_date: Date | null;
    end_date: Date | null;
  }>({
    start_date: null,
    end_date: null,
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const [filterStatus, setFilterStatus] = useState(false);

  const openPopper = Boolean(anchorEl);
  const id = openPopper ? "simple-popper" : undefined;

  // react-hook-form
  const {
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<any>();

  const onSubmit = (data: any) => {
    setDate(data);
    setAnchorEl(null);
    setFilterStatus(true);
  };

  const handleClick = (event: any) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleReset = () => {
    setDate({ start_date: null, end_date: null });
    resetField;
    setAnchorEl(null);
    setFilterStatus(true);
  };
  const handleApply = () => {
    setAnchorEl(null);
  };

  const onShowClick = (row: string) => {
    setOpen(true);
    setRowData(row);
  };

  const tabs = [
    {
      name: "Investors",
      content: (
        <FounderInvestorTabContent
          onShowClick={onShowClick}
          searhValue={searhValue}
          date={date}
          type="INVESTOR"
          resetFilter={filterStatus}
        />
      ),
    },
    {
      name: "Founders",
      content: (
        <FounderInvestorTabContent
          onShowClick={onShowClick}
          searhValue={searhValue}
          date={date}
          type="FOUNDER"
          resetFilter={filterStatus}
        />
      ),
    },
  ];
  return (
    <AdminFounderWrapper>
      <Stack
        direction={{ sx: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" mb={{ xs: 1, md: 0 }}>
          Payments
        </Typography>
        <Stack direction="row" spacing={2}>
          <AdminFounderInputWrapper
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <AdminFounderInput
              type="text"
              id="search"
              name="search"
              placeholder="Search by name or email"
              value={searhValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Stack alignItems="center">
              <SearchIcon />
            </Stack>
          </AdminFounderInputWrapper>
          <PaymentsFilterButton onClick={handleClick}>
            Filter
          </PaymentsFilterButton>
        </Stack>
      </Stack>
      <Popper
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        ref={popperRef}
        sx={{ zIndex: "2" }}
        placement="bottom-end"
      >
        <PaymentPopperBoxWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <DatePickerInput
              name="start_date"
              label="Start Date"
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <DatePickerInput
              name="end_date"
              label="End Date"
              register={register}
              errors={errors}
              setValue={setValue}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mt={1}>
              <PaymentFilterButtonWrapper
                variant="outlined"
                onClick={handleReset}
                type="button"
              >
                Reset
              </PaymentFilterButtonWrapper>
              <PaymentFilterButtonWrapper
                variant="contained"
                // onClick={handleApply}
                type="submit"
              >
                Apply
              </PaymentFilterButtonWrapper>
            </Stack>
          </form>
        </PaymentPopperBoxWrapper>
      </Popper>
      <Box>
        <DynamicTabs tabs={tabs} />
      </Box>

      <PaymentModal open={open} onClose={() => setOpen(false)} data={rowData} />
    </AdminFounderWrapper>
  );
};

export default AdminPaymentsPage;
