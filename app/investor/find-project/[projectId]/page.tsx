import FindProjectDetailsPage from '@/page/investor/find-project/project-details';

const FindProjectDetails = ({ params }: { params: { projectId: string } }) => {
  return <FindProjectDetailsPage projectId={params.projectId} />;
};

export default FindProjectDetails;
