import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { AccordionWrapper, SmTextWrapper, TableText } from "./style";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Image from "next/image";
import convertToTitleCase from "@/utils/convertToTitleCase";
import { useRouter } from "next/navigation";
import { api } from "@/services/axiosInstance";
import { getUsersProjects } from "@/services/apiDefinition";
import { toast } from "react-toastify";

interface ProjectDetailsType {
  project_name: string;
  project_description: string;
  funding_scope: string;
  funding_or_company_stage: string;
  funding_requirements: string;
  funding_stage: string;
  performance_projections: string;
  exit_strategy: string;
  benefits_of_investors: string;
  project_closed: string;
  documents: {
    id: number;
    name: string;
  }[];
}

const AdminProjectDetails = ({ userId }: { userId: string }) => {
  // const filteredData = Object.entries(data).filter(
  //     ([key]) => key !== 'image' && key !== 'join_at'
  // );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const getProjectsData = async () => {
      try {
        const response = await api.get<any>(getUsersProjects + "/" + userId);
        if (response.success && response.data) {
          setProjectData(response?.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      }
    };
    getProjectsData();
  }, [userId]);

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const router = useRouter();
  return (
    <>
      <Stack spacing={2} mt={5}>
        {projectData && (
          projectData?.length > 0 ? (
            projectData?.map((project: any, index) => {
              const panel = `panel-${index}`;
              return (
                <AccordionWrapper key={index} elevation={0}>
                  <Accordion
                    key={index}
                    expanded={expanded === panel}
                    onChange={handleChange(panel)}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                    >
                      <Typography variant="h6">{project?.project_name}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container spacing="4px">
                        <>
                          {isSmallScreen ? (
                            <>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>Project Name</Typography>
                                  <Typography variant="h6" mt={1} sx={{ wordBreak: 'break-all' }}>
                                    {project?.project_name}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>Funding Scope</Typography>
                                  <Typography variant="h6" mt={1} sx={{ wordBreak: 'break-all' }}>
                                    {project?.funding_scope}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>Project Description</Typography>
                                  <Typography variant="h6" mt={1} sx={{ wordBreak: 'break-all' }}>
                                    {project?.description}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>
                                    Stage of Development
                                  </Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.stage_of_development}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>
                                    Funding Requirements
                                  </Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.funding_requirements}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>
                                    Funding/Company Stage
                                  </Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.funding_stage}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>
                                    Performance Projections
                                  </Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.performance_projections}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>Exit Strategy</Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.exit_strategy}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>
                                    Benefits of Investors
                                  </Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.investor_benefits}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>Documents</Typography>
                                  <Grid item xs={7}>
                                  {/* <SmTextWrapper
                                    mt={0}
                                    iseven={(index % 2 === 0).toString()}
                                  > */}
                                    {project?.docs?.length > 0 && project?.docs?.map((doc: any, idx: number) => (
                                      <Stack
                                        key={doc?.id || idx}
                                        direction="row"
                                        onClick={() =>
                                          window.open(doc?.doc_url, "_blank")
                                        }
                                      >
                                        <Box mt={1}>
                                          <Image
                                            src="/asset/icon/documents.svg"
                                            alt="doc"
                                            width={40}
                                            height={40}
                                          />
                                        </Box>
                                        <Stack justifyContent="center" ml={2}>
                                          <Typography variant="h6" key={idx}>
                                            {doc?.doc_name}
                                          </Typography>
                                        </Stack>
                                      </Stack>
                                    ))}
                                    {
                                      project?.docs?.length == 0 && <Typography variant="h6" mt={1}>
                                      No document found
                                    </Typography>
                                    }
                                  {/* </SmTextWrapper> */}
                                </Grid>
                                </SmTextWrapper>
                              </Grid>
                              <Grid item xs={12}>
                                <SmTextWrapper
                                  m={0}
                                  iseven={(index % 2 === 0).toString()}
                                >
                                  <Typography m={0}>
                                    Project Funded/Closed
                                  </Typography>
                                  <Typography variant="h6" mt={1}>
                                    {project?.project_closed === "false"
                                      ? "FALSE"
                                      : "TRUE"}
                                  </Typography>
                                </SmTextWrapper>
                              </Grid>
                            </>
                          ) : (
                            <>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Project Name
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                    sx={{ wordBreak: 'break-all' }}
                                  >
                                    {project?.project_name}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Funding Scope
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                    sx={{ wordBreak: 'break-all' }}
                                  >
                                    {project?.funding_scope}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Project Description
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                    sx={{ wordBreak: 'break-all' }}
                                  >
                                    {project?.description}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Stage of Development
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.stage_of_development}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Funding Requirements
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.funding_requirements}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Funding/Company Stage
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.funding_stage}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Performance Projections
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.performance_projections}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Exit Strategy
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.exit_strategy}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Benefits of Investors
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.investor_benefits}
                                  </TableText>
                                </Grid>
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Documents
                                  </TableText>
                                </Grid>
                                {project?.docs?.length > 0 && <Grid item xs={7}>
                                  <SmTextWrapper
                                    mt={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.docs?.map((doc: any, idx: number) => (
                                      <Stack
                                        key={doc?.id || idx}
                                        direction="row"
                                        onClick={() =>
                                          window.open(doc?.doc_url, "_blank")
                                        }
                                      >
                                        <Box mt={1}>
                                          <Image
                                            src="/asset/icon/documents.svg"
                                            alt="doc"
                                            width={40}
                                            height={40}
                                          />
                                        </Box>
                                        <Stack justifyContent="center" ml={2}>
                                          <Typography variant="h6" key={idx}>
                                            {doc?.doc_name}
                                          </Typography>
                                        </Stack>
                                      </Stack>
                                    ))}
                                  </SmTextWrapper>
                                </Grid>}
                                {
                                  project?.docs?.length == 0 && <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    No document found
                                  </TableText>
                                </Grid> 
                                }
                              </>
                              <>
                                <Grid item xs={5}>
                                  <TableText
                                    m={0}
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    Project Funded/Closed
                                  </TableText>
                                </Grid>
                                <Grid item xs={7}>
                                  <TableText
                                    variant="h6"
                                    iseven={(index % 2 === 0).toString()}
                                  >
                                    {project?.project_closed === "false"
                                      ? "FALSE"
                                      : "TRUE"}
                                  </TableText>
                                </Grid>
                              </>
                            </>
                          )}
                        </>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </AccordionWrapper>
              );
            })
          ) :
            <Typography variant="h4" align="center">No Project added</Typography>
        )}
      </Stack>
    </>
  );
};

export default AdminProjectDetails;
