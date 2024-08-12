"use client";
import React from "react";
import { CustomButton, Typography } from "../common/ui";
import { Grid } from "@mui/material";
import {
  InputField,
  TextareaInputField,
  UploadImageInput,
} from "../common/ui/input-fields";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FullHeightCardWrapper } from "./style";
import { api } from "@/services/axiosInstance";
import { createSupportQuery } from "@/services/apiDefinition";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  first_name: yup.string().required("First Name is required"),
  last_name: yup.string().required("Last Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone No. is required"),
  message: yup.string().required("Message is required"),
});

const SupportCard = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.first_name);
    formData.append("last_name", data.last_name);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("message", data.message);
    if (data?.image && Object.keys(data?.image).length > 0) {
      formData.append("image", data.image[0]);
    }
    try {
      const res: any = await api.post(createSupportQuery, formData);

      if (res.success) {
        toast.success(res.message || "Support Query Created successfully");
        reset();
      } else {
        toast.error(res.message || "Something went wrong");
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <FullHeightCardWrapper className="dinesh">
      <Typography variant="h4">Reach out to us today.</Typography>
      <Typography mb={3}>
        We would love to hear from you. Concerns, queries or just want to say
        hi?
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <InputField
              name="first_name"
              label="First Name"
              register={register}
              errors={errors}
              placeholder="First Name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name="last_name"
              label="Last Name"
              register={register}
              errors={errors}
              placeholder="Last Name"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name="email"
              label="Email"
              register={register}
              errors={errors}
              placeholder="Email Address"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <InputField
              name="phone"
              label="Phone No."
              register={register}
              errors={errors}
              placeholder="Phone No."
              type="number"
            />
          </Grid>
          <Grid item xs={12}>
            <TextareaInputField
              name="message"
              label="Message"
              register={register}
              errors={errors}
              placeholder="Enter Message"
            />
          </Grid>
          <Grid item xs={12}>
            <UploadImageInput
              name="image"
              label="Upload Image"
              register={register}
              errors={errors}
              placeholder="Upload Image"
            />
          </Grid>
          <Grid item xs={12} sm={5} md={4} lg={3}>
            <CustomButton color="blue" type="submit" xsWidth="100%">
              Send Message
            </CustomButton>
          </Grid>
        </Grid>
      </form>
    </FullHeightCardWrapper>
  );
};

export default SupportCard;
