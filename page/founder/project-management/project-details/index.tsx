'use client';
import { Grid } from '@mui/material';
import { ProjectDetailsWrapper } from './style';
import ProjectDetailsCard from '@/components/project-management/project-details';
import ProjectTilesCard from '@/components/common/project-tiles-card';
import { ProjectOverviewCardData } from './data';
import { FOUNDER } from '@/helpers/constants';
import { useEffect, useState } from 'react';
import { getMyProjectById, projectFindById } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';

const ProjectDetailsPage = ({ projectId }: { projectId: string }) => {
  const [projectByIdData, setProjectByIdData] = useState<any>();

  //here is some issue in response I am getting object instade of array
  // when I am calling same api in postman i am not getting any data
  // looking strange please check

  const fetchProjectByIdData = async () => {
    try {
      const response = await api.get<any>(`${getMyProjectById}/${projectId}`);
      if (response.success) {
        setProjectByIdData(response.data[0]);
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    fetchProjectByIdData();
  }, []);

  const ProjectOverviewCardData = [
    {
      id: 1,
      iconUrl: '/asset/icon/sector.svg',
      title: 'Company Stage',
      value: projectByIdData?.funding_stage,
    },
    {
      id: 2,
      iconUrl: '/asset/icon/overview-develop.svg',
      title: 'Stage of Development',
      value: projectByIdData?.stage_of_development,
    },
    {
      id: 3,
      iconUrl: '/asset/icon/overview-funding.svg',
      title: 'Funding Requirements',
      value: projectByIdData?.funding_requirements,
    },
    {
      id: 4,
      iconUrl: '/asset/icon/overview-purpose.svg',
      title: 'Estimated ROI',
      value: projectByIdData?.performance_projections,
    },
    {
      id: 5,
      iconUrl: '/asset/icon/overview-opportunity.svg',
      title: 'Market Opportunity',
      value: projectByIdData?.market_opportunity,
    },
    // {
    //   id: 6,
    //   iconUrl: "/asset/icon/overview-projections.svg",
    //   title: "Performance Projections",
    //   value: projectByIdData?.performance_projections,
    // },
    {
      id: 6,
      iconUrl: '/asset/icon/overview-revenue.svg',
      title: 'Revenue Model',
      value: projectByIdData?.revenue_model,
    },
    {
      id: 7,
      iconUrl: '/asset/icon/investors.svg',
      title: 'Benefits for Investors',
      value: projectByIdData?.investor_benefits?.join(', ') || '',
    },
    {
      id: 8,
      iconUrl: '/asset/icon/overview-strategy.svg',
      title: 'Exit Strategy',
      value: projectByIdData?.exit_strategy,
    },
  ];
  return (
    <ProjectDetailsWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <ProjectDetailsCard
            type={FOUNDER}
            projectId={projectId}
            projectByIdData={projectByIdData && projectByIdData}
            isBlurred={false}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ProjectTilesCard
            title='Project Overview'
            data={ProjectOverviewCardData}
          />
        </Grid>
      </Grid>
    </ProjectDetailsWrapper>
  );
};

export default ProjectDetailsPage;
