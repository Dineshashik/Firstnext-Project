"use client";
import { useEffect } from "react";
import { Box, Grid, Popper, Stack, Typography, MenuItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AdminFounderInput,
  AdminFounderInputWrapper,
  AdminFounderWrapper,
  FounderFilterButtonWrapper,
  FounderPopperBoxWrapper,
  MoreDetailsModalWrapper,
  TableButton,
  FilterButton,
} from "./style";
import DynamicTabs from "@/components/common/custom-tab";
import { CardWrapper, CustomButton } from "@/components/common/ui";
import DataTable from "react-data-table-component";
import {
  FouderPendingdata,
  FounderVerifiedColumn,
  FounderPendingColumn,
  FounderVerifieddata,
  conditionalRowStyles,
  tableCustomStyles,
} from "./data";
import { useState, createContext, useRef } from "react";
import Image from "next/image";
import FounderModal from "./founder-modal";
import {
  FieldValues,
  RegisterOptions,
  SubmitHandler,
  UseFormRegisterReturn,
  useForm,
} from "react-hook-form";
import {
  DatePickerInput,
  SelectInput,
  TextareaInputField,
} from "@/components/common/ui/input-fields";
import { api } from "@/services/axiosInstance";
import {
  adminGetUsers,
  getUserDetails,
  updateStatus,
  userApproval,
} from "@/services/apiDefinition";
import transformTableData from "@/utils/transformData";
import { toast } from "react-toastify";
import CommonModal from "@/components/common/modal";
import useDebouncedValue from "@/utils/useDebounced";
import OutlinedInput from "@mui/material/OutlinedInput";
import { SelectWrapper } from "./style";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type HandleMoreDetailsClick = (rowId: string) => void;
interface VerifiedFoundersTabType {
  onDelete: HandleMoreDetailsClick;
  onShowClick: HandleMoreDetailsClick;
  searchValue: string;
  date: { start_date: Date | null; end_date: Date | null; status: string };
  resetFilter: any;
}

interface PendingVerificationTabType {
  onMoreDetailsClick: HandleMoreDetailsClick;
  onApproveClick: HandleMoreDetailsClick;
  onRejectClick: HandleMoreDetailsClick;
  onShowClick: HandleMoreDetailsClick;
  searchValue: string;
  date: { start_date: Date | null; end_date: Date | null; status: string };
  approveLoading: boolean;
  resetFilter: boolean;
}

const VerifiedFoundersTabContent = ({
  onDelete,
  onShowClick,
  searchValue,
  date,
  resetFilter = false,
}: VerifiedFoundersTabType) => {
  const [pending, setPending] = useState(false);
  const [varifiedFounder, setVarifiedFounder] = useState<any>();
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);
  const [flag, setFlag] = useState(true);
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
        const response = await api.get<any>(adminGetUsers, {
          page: page,
          limit: pageSize,
          role: "FOUNDER",
          admin_status: "APPROVED",
          search: debouncedSearchTerm,
          ...(date?.start_date ? { start_date: date.start_date } : {}),
          ...(date?.end_date ? { end_date: date.end_date } : {}),
          ...(date?.status
            ? { status: date.status === "active" ? true : false }
            : {}),
        });
        if (response.data) {
          const transformedData = await transformTableData(
            response.data?.allUsers
          );
          setTotalCount(response.data?.pagination?.totalCount);
          setPending(false);
          setVarifiedFounder(transformedData);
        }
   
      } catch (error) {
        console.error("Error fetching founder data:", error);
      }
    };

    if (debouncedSearchTerm) {
      setPage(1);
    }
    fetchFounderData();
  }, [debouncedSearchTerm, date, flag, page, pageSize]);

  const StatusDropdown = ({ status, id }: any) => {
    const displayValue = status ? "Active" : "Inactive";
    const statusApi = updateStatus + "/" + id;
    const handleChange = async (event: any) => {
      const newValue = event.target.value as string; // Get the selected value
      try {
        const response = await api.put(statusApi, {
          status: newValue === "Active" ? true : false,
        });

        if (response.success) {
          toast.success(response?.message || "Status Updated successfully");
          setFlag(!flag);
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
        variant="filled"
        size="small"
        input={<OutlinedInput />}
      >
        <MenuItem value="Active">Active</MenuItem>
        <MenuItem value="Inactive">Inactive</MenuItem>
      </SelectWrapper>
    );
  };

  return (
    <>
      <DataTable
        columns={
          [
            ...FounderVerifiedColumn,
            {
              name: "Status",
              right: "true",
              width: "150px",
              selector: (row: any) => row.status,
              format: (row: any) => {
                return <StatusDropdown status={row.status} id={row.user_id} />;
              },
            },
            {
              name: "Actions",
              width: "10%",
              right: "true",
              cell: (row: any) => (
                <Stack spacing={2} direction="row">
                  <Image
                    src="/asset/icon/table-show.svg"
                    alt="show"
                    width={30}
                    height={30}
                    onClick={() => onShowClick(row.user_id)}
                  />
                  {/* <Image
                    src="/asset/icon/table-delete.svg"
                    alt="show"
                    width={30}
                    height={30}
                    onClick={() => onDelete(row.user_id)}
                  /> */}
                </Stack>
              ),
            },
          ] as any
        }
        progressPending={pending}
        data={varifiedFounder}
        conditionalRowStyles={conditionalRowStyles}
        customStyles={tableCustomStyles}
        fixedHeader={true}
        pagination
        paginationServer
        paginationTotalRows={totalCount}
        paginationDefaultPage={page}
        onChangeRowsPerPage={handlePerRowsChange}
        className="mt-3 !overflow-y-auto"
        onChangePage={handlePageChange}
        fixedHeaderScrollHeight="calc(100vh - 322px)"
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        // pagination
      />
    </>
  );
};

const PendingVerificationTabContent = ({
  onMoreDetailsClick,
  onApproveClick,
  onRejectClick,
  onShowClick,
  searchValue,
  date,
  approveLoading,
  resetFilter,
}: PendingVerificationTabType) => {
  const [pending, setPending] = useState(false);
  const [pendingFounder, setPendingFounder] = useState<any>();
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);
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
        const response = await api.get<any>(adminGetUsers, {
          page: page,
          limit: pageSize,
          role: "FOUNDER",
          admin_status: "PENDING",
          search: debouncedSearchTerm,
          ...(date?.start_date ? { start_date: date.start_date } : {}),
          ...(date?.end_date ? { end_date: date.end_date } : {}),
        });
        if (response.data) {
          const transformedData = await transformTableData(
            response.data?.allUsers
          );
          setTotalCount(response.data?.pagination?.totalCount);

          setPending(false);
          setPendingFounder(transformedData);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    if (debouncedSearchTerm) {
      setPage(1);
    }
    fetchFounderData();
  }, [debouncedSearchTerm, date, approveLoading, page, pageSize]);

  return (
    <>
      <DataTable
        columns={
          [
            ...FounderPendingColumn,
            {
              name: "Actions",
              right: "true",
              minWidth: "30%",
              cell: (row: any) => (
                <Stack spacing={2} direction="row">
                  <TableButton
                    disabled={approveLoading}
                    onClick={() => onApproveClick(row.user_id)}
                  >
                    Approve
                  </TableButton>
                  <TableButton
                    color="secondary"
                    onClick={() => onMoreDetailsClick(row.user_id)}
                  >
                    More Details
                  </TableButton>
                  <TableButton
                    color="error"
                    onClick={() => onRejectClick(row.user_id)}
                  >
                    Reject
                  </TableButton>
                  <Image
                    src="/asset/icon/table-show.svg"
                    alt="show"
                    width={30}
                    height={30}
                    onClick={() => onShowClick(row.user_id)}
                  />
                </Stack>
              ),
            },
          ] as any
        }
        data={pendingFounder}
        conditionalRowStyles={conditionalRowStyles}
        customStyles={tableCustomStyles}
        fixedHeader={true}
        progressPending={pending}
        pagination
        paginationServer
        paginationTotalRows={totalCount}
        paginationDefaultPage={page}
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        fixedHeaderScrollHeight="calc(100vh - 322px)"
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      />
    </>
  );
};

const AdminFounderPage = () => {
  const [open, setOpen] = useState(false);
  const [moreDetailsModal, setMoreDetailsModal] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState<string>("");
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams?.toString());
  const router = useRouter();
  const pathname = usePathname();
  const defaultStatus = searchParams.get("status") || "";
  const [date, setDate] = useState<{
    start_date: Date | null;
    end_date: Date | null;
    status: any;
  }>({
    start_date: null,
    end_date: null,
    status: defaultStatus ? defaultStatus : null,
  });
  useEffect(() => {
    setDate((prev) => ({ ...prev, status: defaultStatus }));
    params.delete("status");
    router.replace(`${pathname}?${params.toString()}`);
  }, []);
  const [commentLoading, setCommentLoading] = useState<boolean>(false);
  const [approveLoading, setApproveLoading] = useState<boolean>(false);
  const [filterStatus, setFilterStatus] = useState(false);
  const popperRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const openPopper = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const {
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  const {
    register: moreDetailsRegister,
    handleSubmit: moreDetailsSubmit,
    formState: { errors: moreDetailsError },
  } = useForm<any>();

  const onSubmit: SubmitHandler<any> = (data) => {
    setDate(data);
    setAnchorEl(null);
    setFilterStatus(true);
  };

  // on more button click
  const onMoreDetailsSubmit: SubmitHandler<any> = async (data: any) => {
    const reqData = {
      admin_status: "MORE_DETAILS",
      admin_note: data.admin_note,
      user_id: userId,
    };
    try {
      setCommentLoading(true);
      const res: any = await api.post(userApproval, reqData);
      if (res.success) {
        setCommentLoading(false);
        toast.success(res.message || "Comment added successfully");
        setMoreDetailsModal(false);
      }
    } catch (error: any) {
      setCommentLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleReset = () => {
    setDate({ start_date: null, end_date: null, status: null });
    resetField;
    setAnchorEl(null);
    setFilterStatus(true);
  };
  const handleApply = (e: any) => {
    e.preventDefault();
    setAnchorEl(null);
  };

  //on More details
  const handleMoreDetailsClick = (rowId: string) => {
    setOpen(false);
    setMoreDetailsModal(true);
    setUserId(rowId);
  };

  //on Approved click handle
  const onApproveClick = async (rowId: string) => {
    const data = {
      admin_status: "APPROVED",
      user_id: rowId,
    };
    try {
      setApproveLoading(true);
      const res: any = await api.post(userApproval, data);
      if (res.success) {
        setApproveLoading(false);
        toast.success(res.message || "User Approved successfully");
      }
    } catch (error: any) {
      setApproveLoading(false);
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  //on Rejected click handle
  const onRejectClick = async (rowId: string) => {
    const data = {
      admin_status: "REJECTED",
      user_id: rowId,
    };
    try {
      const res: any = await api.post(userApproval, data);
      if (res.success) {
        toast.success(res.message || "User rejected successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  // onShow click handle
  const onShowClick = async (rowId: string) => {
    setOpen(true);
    setUserId(rowId);
  };

  // onShow click handle
  const onDelete = (rowId: string) => {
    setOpen(true);
    setUserId(rowId);
  };

  const statusData = [
    {
      label: "Active",
      value: "active",
    },
    {
      label: "Inactive",
      value: "inactive",
    },
  ];

  const tabs = [
    {
      name: "Verified Founders",
      content: (
        <VerifiedFoundersTabContent
          onShowClick={onShowClick}
          onDelete={onDelete}
          searchValue={searchValue}
          date={date}
          resetFilter={filterStatus}
        />
      ),
    },
    {
      name: "Pending Verification",
      content: (
        <PendingVerificationTabContent
          onMoreDetailsClick={handleMoreDetailsClick}
          onApproveClick={onApproveClick}
          onRejectClick={onRejectClick}
          onShowClick={onShowClick}
          searchValue={searchValue}
          date={date}
          approveLoading={approveLoading}
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
          Manage Founders
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
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Stack alignItems="center">
              <SearchIcon />
            </Stack>
          </AdminFounderInputWrapper>
          <FilterButton onClick={handleClick}>Filter</FilterButton>
        </Stack>
      </Stack>
      <Box>
        <DynamicTabs tabs={tabs} />
      </Box>
      <CommonModal
        open={moreDetailsModal}
        onClose={() => setMoreDetailsModal(false)}
      >
        <MoreDetailsModalWrapper>
          <form onSubmit={moreDetailsSubmit(onMoreDetailsSubmit)}>
            <TextareaInputField
              name="admin_note"
              label="Comments"
              register={moreDetailsRegister}
              errors={moreDetailsError}
              placeholder="Enter Comments"
            />
            <CustomButton
              color="blue"
              icon="default"
              type="submit"
              xsWidth="100%"
              mdWidth="40%"
              lgWidth="30%"
              isLoading={commentLoading}
              loadingText="Submit..."
            >
              Submit
            </CustomButton>
          </form>
        </MoreDetailsModalWrapper>
      </CommonModal>
      <FounderModal
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
        onApproveClick={onApproveClick}
        onMoreDetailsClick={handleMoreDetailsClick}
        onRejectClick={onRejectClick}
      />
      <Popper
        id={id}
        open={openPopper}
        anchorEl={anchorEl}
        ref={popperRef}
        sx={{ zIndex: 1 }}
        placement="bottom-end"
      >
        <FounderPopperBoxWrapper>
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
            <SelectInput
              name="status"
              options={statusData}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Status"
              defaultValue={date?.status ? date?.status : null}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1} mt={1}>
              <FounderFilterButtonWrapper
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </FounderFilterButtonWrapper>
              <FounderFilterButtonWrapper
                variant="contained"
                // onClick={handleApply}
                type="submit"
              >
                Apply
              </FounderFilterButtonWrapper>
            </Stack>
          </form>
        </FounderPopperBoxWrapper>
      </Popper>
    </AdminFounderWrapper>
  );
};

export default AdminFounderPage;
