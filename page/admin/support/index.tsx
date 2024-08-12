"use client";
import { Box, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  AdminSupportInput,
  AdminSupportInputWrapper,
  AdminSupportWrapper,
} from "./style";
import DynamicTabs from "@/components/common/custom-tab";
import { CustomButton } from "@/components/common/ui";
import DataTable from "react-data-table-component";
import {
  SupportInvestorColumn,
  SupportInvestordata,
  conditionalRowStyles,
  tableCustomStyles,
} from "./data";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getSupportById, getSupportDetails } from "@/services/apiDefinition";
import { api } from "@/services/axiosInstance";
import { FOUNDER } from "@/helpers/constants";
import { toast } from "react-toastify";
import CustomDialog from "@/components/common/dialog";
import AdminDetails from "@/components/admin-details";
import useDebouncedValue from "@/utils/useDebounced";
import AdminSupportDetails from "@/components/admin-support-details";

type HandleMoreDetailsClick = (rowId: string) => void;
interface AdminSupportInvestorTabType {
  onShowClick: HandleMoreDetailsClick;
  searhValue: string;
}

interface AdminSupportFounderTabType {
  onShowClick: HandleMoreDetailsClick;
  searhValue: string;
}
const AdminSupportFounderTabContent = ({
  onShowClick,
  searhValue,
}: AdminSupportFounderTabType) => {
  const [supportFounderContent, setSupportFounderContent] = useState<any>();
  const [pending, setPending] = useState<boolean>(false);
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
    async function fetchSupportFounderData() {
      try {
        setPending(true);
        const res: any = await api.get(getSupportDetails, {
          search: debouncedSearchTerm,
          page: page,
          limit: pageSize,
          role: "FOUNDER",
        });

        if (res.success && res.data) {
          setPending(false);
          setSupportFounderContent(res.data);
          setTotalCount(res.data?.pagination?.totalCount);
        }
      } catch (error) {
        setPending(false);
        toast.error("Something went wrong");
      }
    }
    fetchSupportFounderData();
  }, [debouncedSearchTerm, page, pageSize]);

  return (
    <DataTable
      columns={
        [
          ...SupportInvestorColumn,
          {
            name: "Actions",
            width: "10%",
            right: "true",
            cell: (row: any) => (
              <Image
                src="/asset/icon/table-show.svg"
                alt="show"
                width={30}
                height={30}
                onClick={() => onShowClick(row._id)}
              />
            ),
          },
        ] as any
      }
      data={supportFounderContent?.supportDetails}
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

const AdminSupportInvestorTabContent = ({
  onShowClick,
  searhValue,
}: AdminSupportInvestorTabType) => {
  const [supportInvestorContent, setSupportInvestorContent] = useState<any>();
  const [pending, setPending] = useState<boolean>(false);
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
    async function fetchSupportFounderData() {
      try {
        setPending(true);
        const res: any = await api.get(getSupportDetails, {
          search: debouncedSearchTerm,
          page: page,
          limit: pageSize,
          role: "INVESTOR",
        });

        if (res.success && res.data) {
          setPending(false);
          setSupportInvestorContent(res.data);
          setTotalCount(res.data?.pagination?.totalCount);
        }
      } catch (error) {
        setPending(false);
        toast.error("Something went wrong");
      }
    }
    fetchSupportFounderData();
  }, [debouncedSearchTerm]);

  return (
    <DataTable
      columns={
        [
          ...SupportInvestorColumn,
          {
            name: "Actions",
            right: "true",
            width: "10%",
            cell: (row: any) => (
              <Image
                src="/asset/icon/table-show.svg"
                alt="show"
                width={30}
                height={30}
                onClick={() => onShowClick(row._id)}
              />
            ),
          },
        ] as any
      }
      data={supportInvestorContent?.supportDetails}
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

const AdminSupport = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [searhValue, setSearchValue] = useState<string>("");
  const [supportDetails, setSupportDetails] = useState<any>();

  const onShowClick = async (rowId: string) => {
    try {
      const supportUserDetails: any = await api.get(
        `${getSupportById}/${rowId}`
      );
      if (supportUserDetails.success) {
        setSupportDetails(supportUserDetails?.data);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
    setOpen(true);
    setUserId(rowId);
  };

  const tabs = [
    {
      name: "Founders",
      content: (
        <AdminSupportFounderTabContent
          onShowClick={onShowClick}
          searhValue={searhValue}
        />
      ),
    },
    {
      name: "Investors",
      content: (
        <AdminSupportInvestorTabContent
          onShowClick={onShowClick}
          searhValue={searhValue}
        />
      ),
    },
  ];

  const updatedSupportDetails = {
    name: `${supportDetails?.first_name} ${supportDetails?.last_name}`,
    email: supportDetails?.email,
    phone: supportDetails?.phone,
    message: supportDetails?.message,
    ...(supportDetails?.image
      ? { uploaded_image: supportDetails.image.image_name }
      : {}),
  };
  return (
    <AdminSupportWrapper>
      <Stack
        direction={{ sx: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" mb={{ xs: 1, md: 0 }}>
          Support
        </Typography>
        <Stack direction="row" spacing={2}>
          <AdminSupportInputWrapper
            direction="row"
            justifyContent="space-between"
            spacing={4}
          >
            <AdminSupportInput
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
          </AdminSupportInputWrapper>
        </Stack>
      </Stack>
      <Box>
        <DynamicTabs tabs={tabs} />
      </Box>
      <CustomDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Support User Details"
        onReject={() => {}}
        onMoreDetails={() => {}}
        onApprove={() => {}}
        userId={userId as string}
        isUserVerified={true}
      >
        <AdminSupportDetails data={updatedSupportDetails} />
      </CustomDialog>
    </AdminSupportWrapper>
  );
};

export default AdminSupport;
