'use client';
import { Grid, Typography } from '@mui/material';
import { AddProjectDetailsWrapper } from './style';
import { CardWrapper } from '@/components/common/ui';
import ProjectCard from '@/components/common/project-card';
import { FOUNDER } from '@/helpers/constants';
import AddProjectDetailsCard from '@/components/project-management/add-project';

export const ProjectPreviewCardData = {
  id: 1,
  imageUrl: '/asset/images/project1.png',
  companyName: 'Company Name Mention Here',
  companyLocation: 'Abu Dhabi, Dubai',
  details:
    'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry s standard dummy text ever since the.',
  totalRequired: '$40,000',
  industry: 'Pharma',
  fundingStage: 'Bootstrapping',
};

const AddProjectPage = () => {
  return (
    <AddProjectDetailsWrapper>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
        >
          <AddProjectDetailsCard />
        </Grid>
        {/* <Grid
          item
          xs={12}
          md={4}
        >
          <CardWrapper>
            <Typography
              variant="h4"
              mb={2}
            >
              Preview Project
            </Typography>
            <ProjectCard
              data={ProjectPreviewCardData}
              type={FOUNDER}
            />
          </CardWrapper>
        </Grid> */}
      </Grid>
    </AddProjectDetailsWrapper>
  );
};

export default AddProjectPage;
