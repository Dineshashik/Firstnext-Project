"use client";
import { Stack, Box, CardContent, Divider, Typography } from "@mui/material";
import Image from "next/image";
import { CustomButton } from "../ui";
import StarIcon from "@mui/icons-material/Star";
import {
  LocationText,
  ProjectCardWrapper,
  ProjectCardImage,
  ImageWrapper,
  CardBottomTextWrapper,
  TextWrapper,
  LikeWrapper,
} from "./style";
import { useRouter } from "next/navigation";
import { FOUNDER } from "@/helpers/constants";
import { bookmarkProject } from "@/services/apiDefinition";
import { api } from "@/services/axiosInstance";
import { toast } from "react-toastify";
import { useState } from "react";

const ProjectCard = ({
  data,
  type,
  fetchProjectData,
  isBlurred,
  page,
  fetchInvestorDetails,
}: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLikeClick = async (projectId: any) => {
    if (type === FOUNDER) {
      router.push(`/founder/liked-by-investors/${projectId}`);
    } else {
      try {
        setLoading(true);

        const res: any = await api.put(`${bookmarkProject}/${projectId}`, {});
        if (res.success) {
          toast.success(res.message || "Project Bookmark updated successfully");
          if (page !== "details") {
            fetchProjectData();
          } else {
            fetchInvestorDetails();
          }
        } else {
          toast.error(res.message || "Something went wrong");
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <ProjectCardWrapper>
      <ImageWrapper>
        <ProjectCardImage
          sx={{ filter: isBlurred ? "blur(6px)" : "none", objectFit: "fill" }}
          src={
            data?.image?.image_url
              ? data?.image?.image_url
              : "/asset/images/dummy-project.png"
          }
          alt="company"
          fill
        />
        <LikeWrapper
          onClick={() => !loading && handleLikeClick(data?._id)}
          style={{ pointerEvents: loading ? "none" : "auto" }}
        >
          {data?.book_mark ? (
            <StarIcon sx={{ color: "#FDCC0D" }} fontSize="small" />
          ) : (
            <StarIcon sx={{ color: "#000000" }} fontSize="small" />
          )}
          <Typography variant="h6" fontSize={14} mt="1px">
            {data?.bookmark_count}
          </Typography>
        </LikeWrapper>
      </ImageWrapper>
      <CardContent>
        <Typography
          variant="h4"
          style={{
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 1,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
          }}
          sx={{ filter: isBlurred ? "blur(6px)" : "none" }}
        >
          {data?.project_name}
        </Typography>
        <Stack direction="row" alignItems="center" mt={1}>
          <Image
            src="/asset/icon/location.svg"
            alt="location"
            width={14}
            height={16}
            style={{ margin: "auto 0px" }}
          />
          <LocationText>{data?.company?.company_location}</LocationText>
        </Stack>
        <Typography
          style={{
            fontSize: "16px",
            lineHeight: "1.6",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textOverflow: "ellipsis",
            height: "75px",
          }}
          sx={{ filter: isBlurred ? "blur(6px)" : "none" }}
        >
          {data?.description}
        </Typography>
        <Stack direction="row" alignItems="center">
          <Typography>Company / Funding Stage:</Typography>
          <Typography variant="h6" ml={1}>
            {data?.funding_stage}
          </Typography>
        </Stack>
      </CardContent>
      <Stack direction="row" justifyContent="center">
        <CustomButton
          onClick={() =>
            router.push(
              `${
                type === FOUNDER
                  ? `/founder/project-management/${data?._id}/project-details`
                  : `/investor/find-project/${data?._id}`
              }`
            )
          }
          icon="redirect"
          color="blue"
          xsWidth="70%"
        >
          View Project
        </CustomButton>
      </Stack>
      <CardBottomTextWrapper direction="row">
        <Box sx={{ width: "50%", paddingTop: "15px", paddingLeft: "5px" }}>
          <TextWrapper direction="row">
            <Image
              src="/asset/icon/dollar.svg"
              alt="dollar"
              width={36}
              height={36}
            />
            <Box sx={{ marginLeft: "8px" }}>
              <Typography variant="h4" sx={{ color: "#2FB4F7" }}>
                {new Intl.NumberFormat().format(data?.amount_to_raised)}
              </Typography>
              <Typography style={{ marginTop: "0px" }}>
                Total Required
              </Typography>
            </Box>
          </TextWrapper>
        </Box>
        <Divider orientation="vertical" flexItem />
        <Box sx={{ width: "50%", paddingTop: "15px", paddingLeft: "5px" }}>
          <TextWrapper direction="row">
            <Image
              src="/asset/icon/industry.svg"
              alt="dollar"
              width={36}
              height={36}
            />
            <Box sx={{ marginLeft: "8px" }}>
              <Typography
                variant="h4"
                sx={{
                  color: "#2FB4F7",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 1,
                  WebkitBoxOrient: "vertical",
                  textOverflow: "ellipsis",
                }}
              >
                {data?.company?.industry}
              </Typography>
              <Typography mt={0} mb={2}>
                Industry
              </Typography>
            </Box>
          </TextWrapper>
        </Box>
      </CardBottomTextWrapper>
    </ProjectCardWrapper>
  );
};

export default ProjectCard;
