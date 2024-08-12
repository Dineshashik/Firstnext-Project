import LikedByInvestorsPage from "@/page/founder/liked-by-investors";

const LikedByInvestors = ({
  params,
}: {
  params: { likedbyinvestorid: string };
}) => {
  return <LikedByInvestorsPage likedbyinvestorid={params.likedbyinvestorid} />;
};

export default LikedByInvestors;
