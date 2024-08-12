"use client";
import { Box, Grid, Typography } from "@mui/material";
import { EditProjectDetailsWrapper } from "./style";
import EditProjectDetailsCard from "@/components/project-management/edit-project-details";
import { CardWrapper } from "@/components/common/ui";
import ProjectCard from "@/components/common/project-card";
import { FOUNDER } from "@/helpers/constants";
import { useState } from "react";

const EditProjectDetailsPage = ({ projectId }: { projectId: string }) => {
  const [editLoading, setEditLoading] = useState<boolean>(false);

  return (
    <EditProjectDetailsWrapper>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <EditProjectDetailsCard
            projectId={projectId && projectId}
           
          />
        </Grid>
      </Grid>
    </EditProjectDetailsWrapper>
  );
};

export default EditProjectDetailsPage;
