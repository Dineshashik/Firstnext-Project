import EditProjectDetailsPage from "@/page/founder/project-management/edit-project-details";

const EditProjectDetails = ({ params }: { params: { projectId: string } }) => {
  return <EditProjectDetailsPage projectId={params?.projectId} />;
};

export default EditProjectDetails;
