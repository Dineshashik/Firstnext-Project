import {
  Box,
  Grid,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { SmTextWrapper, TableText } from './style';
import Image from 'next/image';
import convertToTitleCase from '@/utils/convertToTitleCase';
import { useRouter } from 'next/navigation';

interface CompanyDetailsType {
  company_name: string;
  established_year: string;
  no_of_employees: string;
  industry_or_sector: string;
  company_description: string;
  contact_person_name: string;
  contact_no: string;
  contact_function: string;
  documents: {
    id: number;
    name: string;
  }[];
}

interface AdminPersonalType {
  name: string;
  email: string;
  phone_number: string;
  location: string;
}

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

interface PricingDetailsType {
  pricing: string;
}
interface InvestmentCriteriaType {
  desired_stage_of_dev: string;
  desired_location: string;
  funding_amount_available: string;
  desired_funding_stage: string;
  desired_return: string;
  exit_strategy: string;
  desired_benefits_of_investors: string;
}
const AdminDetails = ({
  data,
}: {
  data:
    | CompanyDetailsType
    | ProjectDetailsType
    | AdminPersonalType
    | PricingDetailsType
    | InvestmentCriteriaType;
}) => {
  const filteredData = Object.entries(data).filter(
    ([key]) => key !== 'image' && key !== 'join_at'
  );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  const router = useRouter();
  return (
    <Grid
      container
      spacing="4px"
    >
      {filteredData.map(([key, value], index) => (
        <React.Fragment key={index}>
          {key !== 'documents' ? (
            <>
              {isSmallScreen ? (
                <>
                  <Grid
                    item
                    xs={12}
                  >
                    <SmTextWrapper
                      m={0}
                      iseven={(index % 2 === 0).toString()}
                    >
                      <Typography m={0}>
                        {key == 'project_closed'
                          ? 'Project Funded/Closed'
                          : convertToTitleCase(key)}
                      </Typography>
                      <Typography
                        variant="h6"
                        mt={1}
                      >
                        {Array.isArray(value) ? value?.join(', ') : value}
                      </Typography>
                    </SmTextWrapper>
                  </Grid>
                </>
              ) : (
                <>
                  <Grid
                    item
                    xs={5}
                  >
                    <TableText
                      m={0}
                      iseven={(index % 2 === 0).toString()}
                    >
                      {key == 'project_closed'
                        ? 'Project Funded/Closed'
                        : convertToTitleCase(key)}
                    </TableText>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                  >
                    <TableText
                      variant="h6"
                      iseven={(index % 2 === 0).toString()}
                    >
                      {Array.isArray(value) ? value?.join(', ') : value}
                    </TableText>
                  </Grid>
                </>
              )}
            </>
          ) : (
            <>
              {isSmallScreen ? (
                <Grid
                  item
                  xs={12}
                >
                  <SmTextWrapper
                    mt={0}
                    iseven={(index % 2 === 0).toString()}
                  >
                    <Typography
                      m={0}
                      pb={1}
                    >
                      {convertToTitleCase(key)}
                    </Typography>
                    {value?.map((doc: any, idx: number) => (
                      <Stack
                        key={doc?.id || idx}
                        direction="row"
                        onClick={() => window.open(doc?.doc_url, '_blank')}
                      >
                        <Box mt={1}>
                          <Image
                            src="/asset/icon/documents.svg"
                            alt="doc"
                            width={40}
                            height={40}
                          />
                        </Box>
                        <Stack
                          justifyContent="center"
                          ml={2}
                        >
                          <Typography
                            variant="h6"
                            key={idx}
                          >
                            {doc?.doc_name}
                          </Typography>
                        </Stack>
                      </Stack>
                    ))}
                  </SmTextWrapper>
                </Grid>
              ) : (
                <>
                  <Grid
                    item
                    xs={5}
                  >
                    <TableText
                      m={0}
                      iseven={(index % 2 === 0).toString()}
                    >
                      {convertToTitleCase(key)}
                    </TableText>
                  </Grid>
                  <Grid
                    item
                    xs={7}
                  >
                    {value?.length > 0 && (
                      <SmTextWrapper
                        mt={0}
                        iseven={(index % 2 === 0).toString()}
                      >
                        {value?.map((doc: any, idx: number) => (
                          <Stack
                            key={doc?.id || idx}
                            direction="row"
                            onClick={() => window.open(doc?.doc_url, '_blank')}
                          >
                            <Box mt={1}>
                              <Image
                                src="/asset/icon/documents.svg"
                                alt="doc"
                                width={40}
                                height={40}
                              />
                            </Box>
                            <Stack
                              justifyContent="center"
                              ml={2}
                            >
                              <Typography
                                variant="h6"
                                key={idx}
                              >
                                {doc?.doc_name}
                              </Typography>
                            </Stack>
                          </Stack>
                        ))}
                      </SmTextWrapper>
                    )}
                    {value?.length === 0 && (
                      <TableText
                        variant="h6"
                        iseven={(index % 2 === 0).toString()}
                      >
                        {Array.isArray(value) ? value?.join(', ') : value}
                      </TableText>
                    )}
                  </Grid>
                </>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </Grid>
  );
};

export default AdminDetails;
