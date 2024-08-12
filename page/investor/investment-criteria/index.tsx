'use client';
import { Box, Grid, Typography } from '@mui/material';
import {
  ImageInput,
  InputField,
  LocationInput,
  MultiSelectInput,
  SelectInput,
  TextareaInputField,
  UploadDocumentInput,
} from '../../../components/common/ui/input-fields/index';
import { useFormContext } from 'react-hook-form';
import {
  availableFundingAmounOption,
  desiredDevelopmentStageOption,
  desiredFundingStage,
  desiredIndustryOption,
  desiredInvestorBenefits,
  desiredReturn,
  exitStrategy,
  locationOption,
} from './data';

const SignupInvestmentCriteria = () => {
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    getValues,
  } = useFormContext();

  return (
    <Box>
      <Box mb={4}>
        <Typography variant="h4">Investment Criteria</Typography>
        <Typography>
          Please define your preferred investment criteria, allowing you to
          discover suitable founders and projects that align with your
          requirements.
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <MultiSelectInput
            name="desired_industry"
            label="Desired Industry"
            options={desiredIndustryOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Select Desired Industry"
            defaultValue={getValues('desired_industry') || []}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <LocationInput
            name="desired_location"
            label="Region"
            options={locationOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Enter Region"
            defaultValue={getValues('desired_location') || []}
            multiple={true}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiSelectInput
            name="stage_of_development"
            label="Desired Development Stage"
            options={desiredDevelopmentStageOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Desired Development Stage"
            defaultValue={getValues('stage_of_development') || []}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiSelectInput
            name="funding_amount"
            label="Available Funding Amount (USD)"
            options={availableFundingAmounOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Available Funding Amount (USD)"
            defaultValue={getValues('funding_amount') || []}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiSelectInput
            name="desired_funding_stage"
            label="Desired Funding Stage"
            options={desiredFundingStage}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Desired Funding Stage"
            defaultValue={getValues('desired_funding_stage') || []}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <InputField
            name="desired_return"
            label="Desired Return (Estimated ROI, %)"
            register={register}
            errors={errors}
            type="number"
            placeholder="Desired Return (Estimated ROI, %)"
            defaultValue=""
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiSelectInput
            name="exit_strategy"
            label="Exit Strategy"
            options={exitStrategy}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Exit Strategy"
            defaultValue={getValues('exit_strategy') || []}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <MultiSelectInput
            name="investor_benefits"
            label="Desired Investor Benefits"
            options={desiredInvestorBenefits}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Desired Investor Benefits"
            defaultValue={getValues('investor_benefits') || []}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignupInvestmentCriteria;
