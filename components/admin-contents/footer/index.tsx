'use client';
import React, { useEffect, useState } from 'react';
import { CustomButton } from '@/components/common/ui';
import {
  DatePickerInput,
  InputField,
  SocialMediaLinkInput,
  TextareaInputField,
} from '@/components/common/ui/input-fields';
import { Box, Grid, Stack, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import YouTubeIcon from '@mui/icons-material/YouTube';
import TwitterIcon from '@mui/icons-material/Twitter';

import { FieldValues, useForm } from 'react-hook-form';
import { adminFooterTabSchema } from '@/services/schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { api } from '@/services/axiosInstance';
import { adminUpdateFooter, getFooter } from '@/services/apiDefinition';
import { toast } from 'react-toastify';

// interface FooterTabType {
//   heading_text: string;
//   sub_text: string;
//   about_company: string;
//   instagram_link: string;
//   facebook_link: string;
//   youtube_link: string;
//   twitter_link: string;
// }

interface Section1 {
  heading_text: string;
  sub_text: string;
}

interface SocialMedia {
  twitter: string;
  facebook: string;
  instagram: string;
  youtube: string;
}

interface Section2 {
  social_media: SocialMedia;
  about_company: string;
}

interface Data {
  section1: Section1;
  section2: Section2;
  _id: string;
  created_at: string;
  updated_at: string;
  __v: number;
}

const FooterTab = () => {
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<any>({
    resolver: yupResolver(adminFooterTabSchema),
    defaultValues: {},
  });

  useEffect(() => {
    async function fetchFooter() {
      try {
        const response = await api.get<any>(getFooter);
        if (response.success) {
          reset(response.data);
        }
      } catch (error: any) {
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    }

    fetchFooter();
  }, [reset]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true)
      const response = await api.put<any>(adminUpdateFooter, data);
      if (response.success) {
        setIsLoading(false)
        toast.success(response?.message || 'Footer updated successfully');
      }
    } catch (error: any) {
      setIsLoading(false)
      toast.error(error?.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack
        direction="column"
        justifyContent="space-between"
        minHeight={{ xs: '100%', lg: 'calc(100vh - 300px)' }}
      >
        <Box
          flexGrow={1}
          mb={2}
        >
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <Typography
                variant="h4"
                mb={1}
              >
                Section 1
              </Typography>

              <InputField
                name="section1.heading_text"
                label="Heading Text"
                register={register}
                errors={errors}
                placeholder="Heading Text"
              />
              <InputField
                name="section1.sub_text"
                label="Sub Text"
                register={register}
                errors={errors}
                placeholder="Sub Text"
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              <Typography
                variant="h4"
                mb={1}
              >
                Section 2
              </Typography>
              <TextareaInputField
                name="section2.about_company"
                label="About Company"
                register={register}
                errors={errors}
                placeholder="About Company"
              />
              <SocialMediaLinkInput
                name="section2.social_media.instagram"
                label="Instagram"
                icon={
                  <InstagramIcon sx={{ color: '#425466', opacity: '50%' }} />
                }
                register={register}
                errors={errors}
                placeholder="Instagram"
              />
              <SocialMediaLinkInput
                name="section2.social_media.facebook"
                label="Facebook"
                register={register}
                errors={errors}
                placeholder="Facebook"
                icon={
                  <FacebookOutlinedIcon
                    sx={{ color: '#425466', opacity: '50%' }}
                  />
                }
              />

              <SocialMediaLinkInput
                name="section2.social_media.youtube"
                label="Youtube"
                register={register}
                errors={errors}
                placeholder="Youtube"
                icon={<YouTubeIcon sx={{ color: '#425466', opacity: '50%' }} />}
              />
              <SocialMediaLinkInput
                name="section2.social_media.twitter"
                label="Twitter"
                register={register}
                errors={errors}
                placeholder="Twitter"
                icon={<TwitterIcon sx={{ color: '#425466', opacity: '50%' }} />}
              />
            </Grid>
          </Grid>
        </Box>
        <Stack alignItems="flex-end">
          <CustomButton
            type="submit"
            color="blue"
            icon="default"
            xsWidth="100%"
            smWidth="30%"
            mdWidth="20%"
            lgWidth="10%"
            isLoading={isLoading}
            loadingText='Submit...'
          >
            Submit
          </CustomButton>
        </Stack>
      </Stack>
    </form>
  );
};

export default FooterTab;
