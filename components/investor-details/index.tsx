import React from "react";
import {
  InvestorBackImage,
  InvestorImageWrapper,
  InvestorProfileImage,
} from "./style";
import { Box, Grid, Stack, Typography } from "@mui/material";
import ProjectCard from "../common/project-card";
import { FOUNDER } from "@/helpers/constants";
import { ProjectData } from "@/page/founder/dashboard/data";

interface InvestorDetailsPropsType {
  data: {
    first_name: string;
    last_name: string;
    image: string;
    company: any;
    profile: {
      image_id: string;
      image_url: string;
    };
    projects: any;
    description: string;
  };
  type: "investor" | "founder";
  fetchInvestorDetails?: any
}

const InvestorDetailsCard = ({ fetchInvestorDetails, data, type }: InvestorDetailsPropsType) => {
  const projectCardData = data?.projects?.map((item: any) => {
    return {
      ...item,
      company: { ...data.company },
    };
  });
  return (
    <Box mt={2}>
      <InvestorImageWrapper>
        <InvestorBackImage
          src={data?.company?.cover_photo?.image_url}
          alt="pic"
          fill
        />
        <InvestorProfileImage src={data?.profile?.image_url} alt="pic" fill />
      </InvestorImageWrapper>
      <Box>
        <Typography variant="h4">
          {data?.first_name} {data?.last_name}
        </Typography>
        <Typography>{data?.company?.description}</Typography>
      </Box>
      {type !== FOUNDER && (
        <Typography variant="h4" my={3}>
          Projects
        </Typography>
      )}
      {type !== FOUNDER && (
        <Grid container spacing={2}>
          {projectCardData?.map((item: any) => (
            <Grid item xs={12} md={6} lg={6} key={item._id}>
              <ProjectCard data={item} page={'details'} fetchInvestorDetails={fetchInvestorDetails}/>
            </Grid>
          ))}

          {/* <Grid item xs={12} md={6}>
            <ProjectCard data={ProjectData} />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProjectCard data={ProjectData} />
          </Grid> */}
        </Grid>
      )}
    </Box>
  );
};

export default InvestorDetailsCard;
