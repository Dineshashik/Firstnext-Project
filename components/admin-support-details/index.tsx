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
import convertToTitleCase from '@/utils/convertToTitleCase';

const AdminSupportDetails = ({ data }: { data: any }) => {
  const filteredData = Object.entries(data).filter(
    ([key]) => key !== 'image' && key !== 'join_at'
  );
  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down('sm')
  );
  return (
    <Grid
      container
      spacing="4px"
    >
      <Grid
        item
        xs={12}
      >
        <Grid
          container
          spacing="4px"
        >
          {filteredData.map(([key, value]: any, index) => (
            <React.Fragment key={index}>
              {key !== 'company_docs' && key !== 'document_accessible' ? (
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
                            {convertToTitleCase(key)}
                          </Typography>
                          <Typography
                            variant="h6"
                            mt={1}
                          >
                            {value}
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
                          {convertToTitleCase(key)}
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
                          {value}
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
                          <Typography
                            variant="h6"
                            key={idx}
                          >
                            {doc.name}
                          </Typography>
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
                        <SmTextWrapper
                          mt={0}
                          iseven={(index % 2 === 0).toString()}
                        >
                          {value?.map((doc: any, idx: number) => (
                            <Typography
                              variant="h6"
                              key={idx}
                            >
                              {doc.name}
                            </Typography>
                          ))}
                        </SmTextWrapper>
                      </Grid>
                    </>
                  )}
                </>
              )}
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AdminSupportDetails;
