import React, { useEffect, useMemo, useState } from "react";
import { TitleButtonBoxWrapper } from "@/components/common/ui";
import { CompanyImage, CompanyImageWrapper, CompanyLogoImage } from "./style";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";
import { INVESTOR } from "@/helpers/constants";
import { api } from "@/services/axiosInstance";
import { getCompany } from "@/services/apiDefinition";
import { toast } from "react-toastify";

interface CompanyDetailsPropsType {
  onClick: () => void;
  type: "founder" | "investor";
  data: any;
  images: {
    company_logo: string;
    cover_photo: string;
  };
  document: any;
}

const CompanyDetails = ({
  onClick,
  data,
  images,
  type,
  document,
}: CompanyDetailsPropsType) => {
  const onDocClick = (doc: any) => {
    const docType = doc?.doc_name?.split(".").pop();
    if (["doc", "docs", "pdf"].includes(docType)) {
      window.open(
        `https://docs.google.com/viewer?url=${doc.doc_url}`,
        "_blank"
      );
    } else {
      window.open(doc.doc_url, "_blank");
    }
  };
  return (
    <TitleButtonBoxWrapper
      title="Company Details"
      buttonName="Edit Profile"
      onClick={onClick}
      showButton={true}
    >
      <CompanyImageWrapper>
        <CompanyImage
          src={images.cover_photo || "/asset/images/dummy_cover_image.png"}
          alt="cover"
          fill
        />
        <CompanyLogoImage
          src={images.company_logo || "/asset/images/dummy_cover_image.png"}
          alt="logo"
          fill
        />
      </CompanyImageWrapper>

      <Stack>
        <Grid container spacing={2}>
          {data.map((item: any) => (
            <Grid item xs={12} sm={item.id === 7 ? 12 : 6} key={item.id}>
              <Stack direction="row">
                <Box mt={1}>
                  <Image
                    src={item.iconUrl}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                </Box>
                <Box ml={2}>
                  <Typography variant="body2">{item.title}</Typography>
                  <Typography
                    variant={item.id === 7 ? "body1" : "h6"}
                    maxHeight="250px"
                    sx={{ overflowY: "auto" }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Typography mt={3} mb={2} variant="h4">
          Documents
        </Typography>
        <Grid container spacing={2}>
          {document?.length > 0 &&
            document.map((item: any) => (
              <Grid item xs={12} sm={6} key={item._id}>
                <Stack direction="row" onClick={() => onDocClick(item)}>
                  <Box mt={1}>
                    <Image
                      src="/asset/icon/documents.svg"
                      alt="doc"
                      width={60}
                      height={60}
                    />
                  </Box>
                  <Stack justifyContent="center" ml={2}>
                    <Typography variant="h6">{item?.doc_name}</Typography>
                  </Stack>
                </Stack>
              </Grid>
            ))}
        </Grid>
      </Stack>
    </TitleButtonBoxWrapper>
  );
};

export default CompanyDetails;
