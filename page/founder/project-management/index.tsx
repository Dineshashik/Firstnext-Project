"use client";
import { Box, Grid, Pagination, Stack, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  ProjectManagementWrapper,
  InputWrapper,
  Input,
  DocReqTableButton,
} from "./style";
import DynamicTabs from "@/components/common/custom-tab";
import ProjectCard from "@/components/common/project-card";
import {
  DocumentReqColumn,
  DocumentReqdata,
  ProjectMangCardData,
  conditionalRowStyles,
  tableCustomStyles,
} from "./data";
import { ACTIVE, CLOSE, FOUNDER } from "@/helpers/constants";
import DataTable from "react-data-table-component";
import Image from "next/image";
import FounderModal from "@/page/admin/founders/founder-modal";
import { useCallback, useEffect, useState } from "react";
import { api } from "@/services/axiosInstance";
import { toast } from "react-toastify";
import {
  getDocumentData,
  getUserProjects,
  manageDocumentRequest,
  projectFind,
} from "@/services/apiDefinition";
import useDebouncedValue from "@/utils/useDebounced";
import { useSocket } from "@/context/SocketContext";
import { useAppSelector } from "@/lib/hooks";
import { user } from "@/lib/slices/userSlice";

type HandleMoreDetailsClick = (
  user_id: string,
  document_id: string,
  status: string,
  project_id: string
) => void;
interface DocumentReqTabType {
  // onMoreDetailsClick: HandleMoreDetailsClick;
  onApproveClick: HandleMoreDetailsClick;
  onRejectClick: HandleMoreDetailsClick;
  onShowClick: HandleMoreDetailsClick;
  documentData: any;
  setDocumentData: any;
}

const TabContent = ({
  type,
  searchValue,
}: {
  type: "ACTIVE" | "CLOSE";
  searchValue: string;
}) => {
  const [projManData, setProjManData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const fetchData = useCallback(
    async (search = false) => {
      if (search) {
        setPage(1);
      }
      try {
        setIsLoading(true);
        const response = await api.get<any>(getUserProjects, {
          page,
          limit: 6,
          closed: type === ACTIVE ? false : true,
          search: debouncedSearchTerm,
        });
        if (response.data) {
          setProjManData(response.data.data);
          setTotalPage(response.data.pagination.totalPages);
          setCount(response.data.pagination.totalCount);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [debouncedSearchTerm, page, type]
  );

  // const fetchSearchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await api.get<any>(getUserProjects, {
  //       search: debouncedSearchTerm,
  //     });
  //     if (response.data) {
  //       // setProjManData((prevData: any) => [...prevData, ...response.data.data]);
  //       setProjManData(response.data.data);
  //       setHasMore(response.data.data.length > 0);
  //     }
  //   } catch (error: any) {
  //     toast.error(error?.response?.data?.message || "Something went wrong");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchData(true);
  }, [type, debouncedSearchTerm]);

  useEffect(() => {
    fetchData();
  }, [type, page]);

  const handleChangePage = (e: any, p: number) => {
    setPage(p);
  };

  // useEffect(() => {
  //   if (debouncedSearchTerm) {
  //     fetchSearchData();
  //   }
  // }, [type, debouncedSearchTerm]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const mainElement: any = document.querySelector('main');
  //     if (
  //       mainElement.scrollTop + mainElement.clientHeight ===
  //         mainElement.scrollHeight &&
  //       hasMore &&
  //       !isLoading
  //     ) {
  //       setIsLoading(true);
  //       setTimeout(() => {
  //         setPage((prevPage) => prevPage + 1);
  //         setIsLoading(false);
  //       }, 1000);
  //     }
  //   };
  //   const mainElement: any = document.querySelector('main');
  //   mainElement.addEventListener('scroll', handleScroll);
  //   return () => mainElement.removeEventListener('scroll', handleScroll);
  // }, [hasMore, isLoading]);

  return (
    <>
      <Grid container spacing={2}>
        {projManData.length > 0 ? (
          projManData.map((item) => (
            <Grid item xs={12} md={6} lg={4} key={item._id}>
              <ProjectCard type={FOUNDER} data={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100%"
            >
              <Typography variant="h6">No projects found</Typography>
            </Box>
          </Grid>
        )}
      </Grid>
      {count > 6 && (
        <Box display="flex" justifyContent="center" mt={5}>
          <Pagination
            color="primary"
            count={totalPages}
            siblingCount={0}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      )}
      {/* {isLoading && (
        <Typography variant='h6' align='center' mt={4}>
          Loading...
        </Typography>
      )} */}
    </>
  );
  // return !isLoading ? (
  //   projManData.length > 0 ? (
  //     <Grid container spacing={2}>
  //       {projManData.map((item) => (
  //         <Grid item xs={12} md={6} lg={4} key={item._id}>
  //           <ProjectCard type={FOUNDER} data={item} />
  //         </Grid>
  //       ))}
  //     </Grid>
  //   ) : (
  //     <Typography variant="h6" align="center" mt={4}>
  //       Data Not Found
  //     </Typography>
  //   )
  // ) : (
  //   <Typography align="center" mt={4} variant="h6">
  //     Loading ...
  //   </Typography>
  // );
};

const DocumentReqTab = ({
  // onMoreDetailsClick,
  onApproveClick,
  onRejectClick,
  onShowClick,
  documentData,
  setDocumentData,
}: DocumentReqTabType) => {
  // const [documentData, setDocumentData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchDocumentData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get<any>(getDocumentData); // Replace with your actual API endpoint
        if (response.data) {
          setIsLoading(false);
          setDocumentData(response.data.data);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };

    fetchDocumentData();
  }, []);

  if (isLoading) {
    return (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" align="center" mt={4}>
            Loading...
          </Typography>
        </Grid>
      </Grid>
    );
  }

  return (
    <>
      <DataTable
        columns={
          [
            ...DocumentReqColumn,
            {
              name: "Actions",
              right: "true",
              minWidth: "20%",
              cell: (row: any) => (
                <Stack spacing={2} direction="row">
                  <DocReqTableButton
                    onClick={() =>
                      onApproveClick(
                        row?.user_id,
                        row?.doc_id,
                        "APPROVED",
                        row?.project_id
                      )
                    }
                  >
                    Apporve
                  </DocReqTableButton>
                  {/* <DocReqTableButton
                color="secondary"
                onClick={() => onMoreDetailsClick(row.id)}
              >
                More Details
              </DocReqTableButton> */}
                  <DocReqTableButton
                    color="error"
                    onClick={() =>
                      onRejectClick(
                        row?.user_id,
                        row?.doc_id,
                        "REJECTED",
                        row?.project_id
                      )
                    }
                  >
                    Reject
                  </DocReqTableButton>
                  {/* <Image
                src="/asset/icon/table-show.svg"
                alt="show"
                width={30}
                height={30}
                onClick={() => onShowClick(row.id)}
              /> */}
                </Stack>
              ),
            },
          ] as any
        }
        data={documentData}
        conditionalRowStyles={conditionalRowStyles}
        customStyles={tableCustomStyles}
        fixedHeader={true}
        fixedHeaderScrollHeight="calc(100vh - 322px)"
        paginationRowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
      />
    </>
  );
};

const ProjectManagementPage = () => {
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [documentData, setDocumentData] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  // const handleMoreDetailsClick = (rowId: string) => {
  //   setUserId(rowId);
  // };

  const { socket } = useSocket();
  const userData: any = useAppSelector(user);
  const fetchDocumentData = async () => {
    try {
      const response = await api.get<any>(getDocumentData); // Replace with your actual API endpoint
      if (response.data) {
        setDocumentData(response.data.data);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  const updateDocumentStatus = async (
    user_id: string,
    document_id: string,
    status: string,
    project_id: string
  ) => {
    try {
      const res: any = await api.post(manageDocumentRequest, {
        doc_id: document_id,
        status: status,
        user_id: user_id,
      });
      if (res.success) {
        if (userData) {
         
          socket?.emit('doc_request_manage', {
            sender: userData._id,
            project_id: project_id,
            receiver: user_id,
            status: status,
          });
        }
        toast.success(res.message || "Document status updated");
        fetchDocumentData();
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  const onApproveClick = (
    user_id: string,
    document_id: string,
    status: string,
    project_id: string
  ) => {
    updateDocumentStatus(user_id, document_id, status, project_id);
    setUserId(user_id);
  };
  const onRejectClick = (
    user_id: string,
    document_id: string,
    status: string,
    project_id: string
  ) => {
    updateDocumentStatus(user_id, document_id, status, project_id);
    setUserId(user_id);
  };
  const onShowClick = (rowId: string) => {
    setOpen(true);
    setUserId(rowId);
  };
  const onDelete = (rowId: string) => {
    setOpen(true);
    setUserId(rowId);
  };
  const tabs = [
    {
      name: "Active Projects",
      content: <TabContent type={ACTIVE} searchValue={searchValue} />,
    },
    {
      name: "Closed Projects",
      content: <TabContent type={CLOSE} searchValue={searchValue} />,
    },
    {
      name: "Document Requests",
      content: (
        <DocumentReqTab
          onApproveClick={onApproveClick}
          onRejectClick={onRejectClick}
          onShowClick={onShowClick}
          documentData={documentData}
          setDocumentData={setDocumentData}
        />
      ),
    },
  ];
  return (
    <ProjectManagementWrapper>
      <Stack
        direction={{ sx: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems="center"
        mb={1}
      >
        <Typography variant="h4" mb={{ xs: 1, md: 0 }}>
          Project Management
        </Typography>
        <InputWrapper
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <Input
            type="text"
            id="search"
            name="search"
            placeholder="Search by name or email"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SearchIcon />
        </InputWrapper>
      </Stack>
      <Box>
        <DynamicTabs tabs={tabs} />
      </Box>
      {/* <FounderModal
        open={open}
        onClose={() => setOpen(false)}
        userId={userId}
      /> */}
    </ProjectManagementWrapper>
  );
};

export default ProjectManagementPage;
