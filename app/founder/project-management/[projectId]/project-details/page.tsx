import ProjectDetailsPage from '@/page/founder/project-management/project-details';

const ProjectDetails = ({ params }: { params: { projectId: string } }) => {
  return <ProjectDetailsPage projectId={params.projectId} />;
};

export default ProjectDetails;
