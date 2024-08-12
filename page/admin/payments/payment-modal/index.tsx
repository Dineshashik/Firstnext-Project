import CommonModal from "@/components/common/modal";
import React from "react";
import {
  PaymentsModalBoxWrapper,
  PaymentsSmTextWrapper,
  PaymentsTableText,
} from "./style";
import Image from "next/image";
import { CustomButton } from "@/components/common/ui";
import { Grid, Stack, Theme, Typography, useMediaQuery } from "@mui/material";

const PaymentModal = ({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: any;
}) => {
  const filteredData = Object.entries(data).filter(
    ([key]) => key !== "image"
  ) as any;

  const isSmallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm")
  );

  return (
    <CommonModal open={open} onClose={onClose}>
      <PaymentsModalBoxWrapper>
        <Stack alignItems="center" justifyContent="center" direction="column">
          <Image
            src={data?.image ? data?.image : "/asset/icon/avtar-profile.svg"}
            width={120}
            height={120}
            alt="profile"
            style={{ borderRadius: "50%" }}
          />
          <Grid
            container
            spacing="4px"
            mt={1}
            sx={{ maxHeight: "400px", overflowY: "auto" }}
          >
            {filteredData.map(([key, value]: any, index: any) => (
              <React.Fragment key={index}>
                {isSmallScreen ? (
                  <>
                    <Grid item xs={12}>
                      <PaymentsSmTextWrapper
                        m={0}
                        iseven={(index % 2 === 0).toString()}
                      >
                        <Typography m={0}>{key}</Typography>
                        <Typography variant="h6" mt={1}>
                          {value}
                        </Typography>
                      </PaymentsSmTextWrapper>
                    </Grid>
                  </>
                ) : (
                  <>
                    <Grid item xs={5}>
                      <PaymentsTableText
                        m={0}
                        iseven={(index % 2 === 0).toString()}
                      >
                        {key}
                      </PaymentsTableText>
                    </Grid>
                    <Grid item xs={7}>
                      <PaymentsTableText
                        variant="h6"
                        iseven={(index % 2 === 0).toString()}
                      >
                        {value}
                      </PaymentsTableText>
                    </Grid>
                  </>
                )}
              </React.Fragment>
            ))}
          </Grid>
        </Stack>
      </PaymentsModalBoxWrapper>
    </CommonModal>
  );
};

export default PaymentModal;
