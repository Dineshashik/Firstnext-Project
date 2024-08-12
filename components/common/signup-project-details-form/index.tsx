'use client';
import React, { useState } from 'react';
import { CardWrapper, CustomButton } from '@/components/common/ui';
import {
  ImageInput,
  InputField,
  MultiSelectInput,
  SelectInput,
  TextareaInputField,
  UploadDocumentInput,
} from '@/components/common/ui/input-fields';
import {
  Box,
  FormControl,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useFormContext } from 'react-hook-form';

import {
  BenefitsForInveOption,
  ExitStrategyOption,
  FundingReqOption,
  PerformPeojectionOption,
  ProjectFundClosedOption,
  StageOfDevOption,
  StageOfFunAndComOption,
} from './data';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Image from 'next/image';

const SignupProjectDetailsForm = ({
  documents,
  handleRemoveDoc,
  radioValue,
  handleRadioChange,
  existingDoc,
  handleExistingRemoveDoc,
  handleExistingRadioChange,
}: any) => {
  const {
    register,
    setValue,
    formState: { errors },
    getValues,
  } = useFormContext();
  return (
    <Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <ImageInput
            icon="project"
            name="image"
            label="Upload Project Photo"
            register={register}
            setValue={setValue}
            errors={errors}
            defaultImage={getValues('image') ?? ''}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="project_name"
            label="Project Name"
            register={register}
            errors={errors}
            placeholder="Project Name"
            required={true}
            defaultValue={getValues('project_name') || ''}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="funding_scope"
            label="Funding Purpose"
            register={register}
            errors={errors}
            placeholder="Funding Purpose"
            required={true}
            defaultValue={getValues('funding_scope') || ''}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextareaInputField
            name="description"
            label="Project Description"
            register={register}
            errors={errors}
            placeholder="Enter Project Description"
            required={true}
            defaultValue={getValues('description') || ''}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="amount_to_raised"
            label="Exact Amount to be Raised (USD)"
            register={register}
            errors={errors}
            placeholder="$ 0.00"
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="market_opportunity"
            label="Market Opportunity"
            register={register}
            errors={errors}
            placeholder="Market Opportunity"
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <SelectInput
            name="stage_of_development"
            label="Development Stage"
            options={StageOfDevOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Select Development Stage"
            defaultValue={getValues('stage_of_development') || ''}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <MultiSelectInput
            name="funding_requirements"
            label="Funding Amount (USD)"
            options={FundingReqOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Select Funding Amount (USD)"
            defaultValue={getValues('funding_requirements') || []}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <SelectInput
            name="funding_stage"
            label="Funding Stage"
            options={StageOfFunAndComOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Select Funding Stage"
            defaultValue={getValues('funding_stage') || ''}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="performance_projections"
            label="Return (Estimated ROI, %)"
            register={register}
            errors={errors}
            placeholder="Return (Estimated ROI, %)"
            type="number"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="revenue_model"
            label="Revenue Model"
            register={register}
            errors={errors}
            defaultValue=""
            placeholder="Revenue Model"
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <SelectInput
            name="exit_strategy"
            label="Exit Strategy"
            options={ExitStrategyOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Exit Strategy"
            defaultValue={getValues('exit_strategy') || ''}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <MultiSelectInput
            name="investor_benefits"
            label="Investor Benefits"
            options={BenefitsForInveOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Investor Benefits"
            defaultValue={getValues('investor_benefits') || []}
            required={true}
          />
        </Grid>
      </Grid>
      <Box
        mt={3}
        mb={2}
      >
        <Typography variant="h4">Upload Project Documents</Typography>
        <Typography>
          Please upload your project documents here (such as a pitch
          presentation, business plan, etc.). You can choose if the investors
          can see your documents by default (public) or only upon request
          (private).
        </Typography>
      </Box>
      <UploadDocumentInput
        name="documents"
        label="Browse Document"
        register={register}
        errors={errors}
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
        text/plain, application/pdf"
        placeholder="Drag and Drop your Files here."
      />
      {existingDoc?.map((item: any) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          key={item.id}
        >
          <Stack
            direction="row"
            alignItems="center"
            mt={1}
            spacing={2}
          >
            <Image
              src="/asset/icon/documents.svg"
              alt="doc"
              width={60}
              height={60}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: {
                  xs: '100px', // Adjust the value as needed for small screens
                  sm: '250px', // Adjust the value as needed for medium screens
                  md: '300px', // Adjust the value as needed for larger screens
                },
              }}
            >
              {item?.doc_name}
              {/* {item?.name} */}
            </Typography>
            <CloseOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => handleExistingRemoveDoc(item._id)}
            />
          </Stack>
          <Stack ml={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radioValue[item?.public]}
                defaultValue={item?.public}
                onChange={(e) => handleExistingRadioChange(e, item._id)}
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Private"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
      ))}
      {documents?.map((item: any) => (
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          key={item.id}
        >
          <Stack
            direction="row"
            alignItems="center"
            mt={1}
            spacing={2}
          >
            <Image
              src="/asset/icon/documents.svg"
              alt="doc"
              width={60}
              height={60}
            />
            <Typography
              variant="h6"
              noWrap
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: {
                  xs: '100px', // Adjust the value as needed for small screens
                  sm: '250px', // Adjust the value as needed for medium screens
                  md: '300px', // Adjust the value as needed for larger screens
                },
              }}
              onClick={() => {
                const doc_url = URL.createObjectURL(item.doc);
                window.open(doc_url, '_blank');
              }}
            >
              {item?.doc?.name || item?.name}
              {/* {item?.name} */}
            </Typography>
            <CloseOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => handleRemoveDoc(item.id)}
            />
          </Stack>
          <Stack ml={2}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                value={radioValue[item?.name]}
                onChange={(e) => handleRadioChange(e, item.id)}
                sx={{ flexDirection: 'row' }}
              >
                <FormControlLabel
                  value="true"
                  control={<Radio />}
                  label="Public"
                />
                <FormControlLabel
                  value="false"
                  control={<Radio />}
                  label="Private"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </Stack>
      ))}
      {/* <Box mt={3} mb={2}>
        <Typography variant="h4">Project Funded/Closed</Typography>
        <Typography>
          Specify whether this project is open for funding or closed.
        </Typography>
        <SelectInput
          name="project_closed"
          options={ProjectFundClosedOption as any}
          register={register}
          errors={errors}
          setValue={setValue}
          placeholder="Select Project Funded/Closed"
          defaultValue={getValues("project_closed")}
        />
      </Box> */}
    </Box>
  );
};

export default SignupProjectDetailsForm;
