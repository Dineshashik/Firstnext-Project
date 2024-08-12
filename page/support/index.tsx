"use client";
import React from "react";
import {
  SupportPageWrapper,
  //  FullHeightCardWrapper
} from "./style";
import { Box, Divider, Grid, Stack, Typography } from "@mui/material";
import SupportCard from "@/components/support";
// import { CardWrapper } from "@/components/common/ui";
// import Image from "next/image";

const CompanyDetailsData = [
  {
    id: 1,
    iconUrl: "/asset/icon/email.svg",
    title: "Email",
    value: "contact@matchudo.com",
  },
  {
    id: 2,
    iconUrl: "/asset/icon/contact-number.svg",
    title: "Phone Number",
    value: "+971 55 255 36 78",
  },
  {
    id: 3,
    iconUrl: "/asset/icon/location-blue.svg",
    title: "Location",
    value: "United Arab Emirates",
  },
];

const SupportPage = () => {
  return (
    <SupportPageWrapper>
      <Grid container spacing={2} minHeight="calc(100vh - 136px)">
        <Grid item xs={12} md={12}>
          <SupportCard />
        </Grid>
        {/* <Grid item xs={12} md={4}>
          <FullHeightCardWrapper >
            <Typography variant="h4">Let&#39;s Connect</Typography>
            {CompanyDetailsData.map((item) => (
              <Box key={item.id}>
                <Divider sx={{ margin: "24px 0px" }} />
                <Stack direction="row" alignItems="center">
                  <Image
                    src={item.iconUrl}
                    alt={item.title}
                    width={24}
                    height={24}
                  />
                  <Stack direction="column" ml={2}>
                    <Typography variant="body2">{item.title}</Typography>
                    <Typography variant="h4" fontSize={16}>
                      {item.value}
                    </Typography>
                  </Stack>
                </Stack>
              </Box>
            ))}
            <Box mt={4}> 
              {/* <iframe
                style={{ borderRadius: "24px" }}
                width="100%"
                height="200"
                src="https://maps.google.com/maps?width=100%25&amp;height=200&amp;hl=en&amp;q=1%20Grafton%20Street,%20Dublin,%20Ireland+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
              />*/}
        {/*<iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14956446.11549796!2d53.28145972211769!3d23.766054738846318!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43496ad9c645%3A0xbde66e5084295162!2sDubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2sin!4v1718880942492!5m2!1sen!2sin"
                width="100%"
                height="200"
                style={{ borderRadius: "24px" }}
              ></iframe>
            </Box>
          </FullHeightCardWrapper>
        </Grid>  */}
      </Grid>
    </SupportPageWrapper>
  );
};

export default SupportPage;
