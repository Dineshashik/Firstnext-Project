'use client';
import { Box, Grid } from '@mui/material';
import {
  ImageInput,
  InputField,
  LocationInput,
  CommonPhoneInput,
  TextareaInputField,
  PhoneInputField,
} from '../ui/input-fields';
import { useFormContext } from 'react-hook-form';

const locationOption = [
  { value: 'Europe', label: 'Europe' },
  { value: 'North America', label: 'North America' },
  { value: 'Latin America', label: 'Latin America' },
  { value: 'Africa', label: 'Africa' },
  { value: 'Middle East', label: 'Middle East' },
  { value: 'Asia', label: 'Asia' },
  { value: 'Australia', label: 'Australia' },
];
const SignupForm = () => {
  const {
    register,
    setValue,
    control,
    formState: { errors },
    getValues,
  } = useFormContext();

  return (
    <Grid
      container
      spacing={2}
    >
      <Grid
        item
        xs={12}
        md={10}
        mt={3}
      >
        <ImageInput
          name="profile"
          label="Upload Photo"
          register={register}
          setValue={setValue}
          errors={errors}
          defaultImage={getValues('profile') ?? ''}
          icon="profile"
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <InputField
          name="first_name"
          label="First Name"
          register={register}
          errors={errors}
          placeholder="First Name"
          required={true}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <InputField
          name="last_name"
          label="Last Name"
          register={register}
          errors={errors}
          placeholder="Last Name"
          required={true}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <InputField
          disabled={true}
          name="email"
          label="Email"
          register={register}
          errors={errors}
          placeholder="Email Address"
          required={true}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <PhoneInputField
          errors={errors}
          name="phone"
          control={control}
          required={true}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
      >
        <LocationInput
          name="country"
          label="Region"
          options={locationOption}
          register={register}
          setValue={setValue}
          errors={errors}
          placeholder="Region"
          defaultValue={getValues('country') || ''}
          required={true}
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <TextareaInputField
          name="bio"
          label="Your Bio"
          register={register}
          errors={errors}
          placeholder="Enter Your Bio"
        />
      </Grid>
    </Grid>
  );
};

export default SignupForm;
