"use client";
import { CardWrapper } from "@/components/common/ui";
import { styled, Box } from "@mui/material";

const SupportPageWrapper = styled(Box)(({ theme }) => ({
  margin: "36px",
  minHeight: "calc(100vh - 136px) !important",

  [theme.breakpoints.down("md")]: {
    margin: "16px",
  },
}));

// const FullHeightCardWrapper = styled(CardWrapper)(({ theme }) => ({
//   height: '100%',
// }));

export {
  SupportPageWrapper,
  // FullHeightCardWrapper
};
