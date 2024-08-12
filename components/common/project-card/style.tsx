"use client";
import { Box, Card, Stack, Typography, styled } from "@mui/material";
import Image from "next/image";

const ProjectCardWrapper = styled(Card)(({ theme }) => ({
  backgroundColor: theme.palette.info.light,
  borderRadius: "24px",
  marginBottom: "8px !important",
  border: "1px solid #DEEAF6",
  boxShadow: "none",
}));

const ProjectCardImage = styled(Image)(({ theme }) => ({
  borderRadius: "16px 16px 0px 0px",
  width: "100%",
  height: "100%",
  top: "0px",
  left: "0px",
  objectFit: "cover",
}));

const ImageWrapper = styled(Box)(({ theme }) => ({
  height: "230px",
  position: "relative",
  border: "8px solid white",
}));

const LocationText = styled(Typography)(({ theme }) => ({
  marginBottom: "0px",
  marginLeft: "8px",
  fontSize: "16px",
  fontWeight: 400,
  color: theme.palette.secondary.light,
  marginTop: "0px",
}));

const CardBottomTextWrapper = styled(Stack)(({ theme }) => ({
  borderTop: "1px solid #DEEAF6",
  marginTop: "24px",
}));

const TextWrapper = styled(Stack)(({ theme }) => ({
  // marginTop: "16px",
  width: "min(180px,98%)",
  margin: "auto",

  justifyContent: "center",
}));

const LikeWrapper = styled(Stack)(({ theme }) => ({
  position: "absolute",
  right: "12px",
  top: "16px",
  minWidth: "60px",
  backgroundColor: theme.palette.info.light,
  border: "1px solid #DEEAF6",
  borderRadius: "50px",
  padding: "6px 12px",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  cursor: "pointer",
}));

export {
  LocationText,
  ImageWrapper,
  ProjectCardImage,
  ProjectCardWrapper,
  CardBottomTextWrapper,
  TextWrapper,
  LikeWrapper,
};
