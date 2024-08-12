import { CardWrapper, CustomButton, Typography } from "@/components/common/ui";
import { Box, Grid, Stack } from "@mui/material";
import React, { useState } from "react";
import {
  SubscriptionCardWrapper,
  TableText,
  CancelPlanButton,
  ConfirmCardWrapper,
} from "./style";
import CommonModal from "@/components/common/modal";
import { Router } from "next/router";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/lib/hooks";
import { user } from "@/lib/slices/userSlice";

const YourSubscritions = ({
  data,
  futureSubscriptionData,
  handleCancelPlan,
}: {
  data: { id: number; key: string; value: string }[];
  handleCancelPlan: any;
  futureSubscriptionData?: any;
}) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const userDetails: any = useAppSelector(user);

  const isCancel = data.some(
    (item) => item.key === "Status" && item.value === "Active"
  );

  const onCancelPlan = async () => {
    if (isCancel) {
      setShowModal(true);
    }
  };

  const premiumPlanData = data.filter(
    (item) => item.key === "Plan" && item.value === "PREMIUM"
  );

  return (
    <CardWrapper>
      <SubscriptionCardWrapper>
        <Box>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h4">Your Subscriptions</Typography>
            <CustomButton
              color="blue"
              icon="default"
              onClick={() =>
                router.push(
                  `/${userDetails?.role.toLowerCase()}/subscriptions/renew-plan`
                )
              }
            >
              Upgrade Plan
            </CustomButton>
          </Stack>
          <Box mt={2}>
            {futureSubscriptionData && (
              <Typography variant="h4" gutterBottom mb={2}>
                Current Plan:
              </Typography>
            )}

            {premiumPlanData && premiumPlanData.length > 0 ? (
              data.map((item) => (
                <Grid container key={item.id} spacing="4px">
                  <Grid item xs={5}>
                    <TableText m={0} iseven={(item.id % 2 === 0).toString()}>
                      {item.key}
                    </TableText>
                  </Grid>
                  <Grid item xs={7}>
                    <TableText
                      variant="h6"
                      iseven={(item.id % 2 === 0).toString()}
                      color={
                        item.value === "Active"
                          ? "#34CC96"
                          : item.key === "Amount"
                          ? "#635BFF"
                          : ""
                      }
                      style={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {item.value}
                    </TableText>
                  </Grid>
                </Grid>
              ))
            ) : (
              <Typography variant="h4" align="left" mt={6}>
                You are currently using the Free Plan. Upgrade your plan to
                unlock blurred features and enjoy the full experience.
              </Typography>
            )}
            {futureSubscriptionData && (
              <div>
                <Typography variant="h4" gutterBottom my={2}>
                  Upcoming Plan:
                </Typography>
                {futureSubscriptionData.map((item: any) => (
                  <Grid container key={item.id} spacing="4px">
                    <Grid item xs={5}>
                      <TableText m={0} iseven={(item.id % 2 === 0).toString()}>
                        {item.key}
                      </TableText>
                    </Grid>
                    <Grid item xs={7}>
                      <TableText
                        variant="h6"
                        iseven={(item.id % 2 === 0).toString()}
                        color={
                          item.value === "Active"
                            ? "#34CC96"
                            : item.key === "Amount"
                            ? "#635BFF"
                            : ""
                        }
                        style={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {item.key === "Status"
                          ? item.value === "Active"
                            ? "Upcoming"
                            : "Upcoming"
                          : item.value}{" "}
                      </TableText>
                    </Grid>
                  </Grid>
                ))}
              </div>
            )}
          </Box>
        </Box>
        <CancelPlanButton
          color="error"
          disabled={!isCancel}
          onClick={onCancelPlan}
        >
          Cancel Plan
        </CancelPlanButton>
        <CommonModal open={showModal} onClose={() => setShowModal(false)}>
          <ConfirmCardWrapper>
            {/* <Typography variant='h4' align='center' mb={2}>
              Your Subscription
            </Typography> */}
            <Typography variant="h4" align="center" my={4}>
              Are you sure you want to cancel your plan / Subscription?
            </Typography>
            <Stack direction="row" spacing={2} justifyContent="center">
              <CustomButton
                icon="default"
                color="blue"
                onClick={() => {
                  handleCancelPlan();
                  setShowModal(false);
                }}
              >
                Yes
              </CustomButton>
              <CustomButton
                icon="default"
                color="blue"
                onClick={() => setShowModal(false)}
              >
                No
              </CustomButton>
            </Stack>
          </ConfirmCardWrapper>
        </CommonModal>
      </SubscriptionCardWrapper>
    </CardWrapper>
  );
};

export default YourSubscritions;
