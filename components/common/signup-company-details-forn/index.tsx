'use client';
import { Box, Grid, Stack, Typography } from '@mui/material';
import {
  ImageInput,
  InputField,
  LocationInput,
  MultiSelectInput,
  PhoneInputField,
  SelectInput,
  TextareaInputField,
  UploadDocumentInput,
} from '../ui/input-fields';
import { useFormContext } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';

import { FOUNDER, INVESTOR } from '@/helpers/constants';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import Image from 'next/image';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { isValidPhoneNumber } from 'react-phone-number-input';

const SignupCompanyDetailsForm = ({
  type,
  documents,
  handleRemoveDoc,
  existingDoc,
  handleExistingRemoveDoc,
}: {
  type: string;
  documents?: any;
  handleRemoveDoc?: any;
  existingDoc?: any;
  handleExistingRemoveDoc: (docId: string) => void;
}) => {
  const [checkBox1, setCheckBox1] = useState(false);
  const userData: any = useAppSelector(user);
  const {
    register,
    setValue,
    formState: { errors },
    watch,
    getValues,
    control,
  } = useFormContext();

  const sectorArray = [
    { value: 'Art & Culture', label: 'Art & Culture' },
    { value: 'Beauty & Wellness', label: 'Beauty & Wellness' },
    { value: 'Biotech & Life Sciences', label: 'Biotech & Life Sciences' },
    { value: 'Blockchain & Crypto', label: 'Blockchain & Crypto' },
    { value: 'Communication Services', label: 'Communication Services' },
    { value: 'Consumer Goods', label: 'Consumer Goods' },
    { value: 'Education & Edtech', label: 'Education & Edtech' },
    { value: 'Energy', label: 'Energy' },
    { value: 'Financial Services', label: 'Financial Services' },
    {
      value: 'Fintech (Financial Technology)',
      label: 'Fintech (Financial Technology)',
    },
    { value: 'Food & Beverage', label: 'Food & Beverage' },
    { value: 'Healthcare & Healthtech', label: 'Healthcare & Healthtech' },
    { value: 'Industrials', label: 'Industrials' },
    {
      value: 'IT (Information Technology)',
      label: 'IT (Information Technology)',
    },
    { value: 'Media & Entertainment', label: 'Media & Entertainment' },
    { value: 'Marketing & PR', label: 'Marketing & PR' },
    {
      value: 'Real Estate',
      label: 'Real Estate',
    },
    { value: 'Retail & E-Commerce', label: 'Retail & E-Commerce' },
    { value: 'Social & Leisure', label: 'Social & Leisure' },
    {
      value: 'Sustainability & Environment',
      label: 'Sustainability & Environment',
    },
    { value: 'Transportation', label: 'Transportation' },
    { value: 'Travel & Hospitality', label: 'Travel & Hospitality' },
    { value: 'Other', label: 'Other' },
    { value: 'Other Services', label: 'Other Services' },
    { value: 'Materials', label: 'Materials' },
    { value: 'Legal & Regulatory', label: 'Legal & Regulatory' },
    { value: 'insurance', label: 'insurance' },
  ];

  const locationOption = [
    { value: 'Europe', label: 'Europe' },
    { value: 'North America', label: 'North America' },
    { value: 'Latin America', label: 'Latin America' },
    { value: 'Africa', label: 'Africa' },
    { value: 'Middle East', label: 'Middle East' },
    { value: 'Asia', label: 'Asia' },
    { value: 'Australia', label: 'Australia' },
  ];

  return (
    <Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
        >
          <ImageInput
            name="company_logo"
            label="Upload Company Logo"
            register={register}
            setValue={setValue}
            errors={errors}
            icon="company"
            defaultImage={getValues('company_logo') ?? ''}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
        >
          <ImageInput
            name="cover_photo"
            label="Cover Photo"
            register={register}
            setValue={setValue}
            errors={errors}
            icon="image"
            defaultImage={getValues('cover_photo') ?? ''}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={12}
          lg={6}
        >
          <InputField
            name="company_name"
            label="Company Name"
            register={register}
            errors={errors}
            placeholder="Company Name"
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="website"
            label="Website"
            register={register}
            errors={errors}
            placeholder="Enter Website"
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="established_year"
            label="Year Established"
            type="number"
            register={register}
            errors={errors}
            placeholder="Enter Year Established"
            required={type === FOUNDER ? true : false}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <InputField
            name="number_of_employees"
            label="No. of Employees"
            register={register}
            type="number"
            errors={errors}
            placeholder="Enter Number of Employees"
            required={type === FOUNDER ? true : false}
          />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          {type === FOUNDER ? (
            <SelectInput
              name="industry"
              label="Industry"
              options={sectorArray}
              register={register}
              errors={errors}
              setValue={setValue}
              placeholder="Select Industry"
              defaultValue={getValues('industry') || ''}
              required={true}
            />
          ) : (
            <MultiSelectInput
              name="industry"
              label="Industry"
              options={sectorArray}
              register={register}
              errors={errors}
              setValue={setValue}
              placeholder="Select Industry"
              defaultValue={getValues('industry') || []}
              required={false}
            />
          )}
          {/* <MultiSelectInput
            name="industry"
            label="Industry"
            options={sectorArray}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Select Industry"
            defaultValue={getValues('industry') || []}
            required={false}
          /> */}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
        >
          <LocationInput
            name="company_location"
            label="Region"
            options={locationOption}
            register={register}
            errors={errors}
            setValue={setValue}
            placeholder="Enter Region"
            defaultValue={getValues('company_location') || ''}
            required={true}
          />
        </Grid>
        <Grid
          item
          xs={12}
        >
          <TextareaInputField
            name="description"
            label="Company Description"
            register={register}
            errors={errors}
            placeholder="Enter Company Description"
          />
        </Grid>
      </Grid>
      <Box
        mt={3}
        mb={2}
      >
        <Typography variant="h4">Contact Details</Typography>
        <FormGroup>
          <FormControlLabel
            onChange={() => {
              if (!checkBox1) {
                setCheckBox1(!checkBox1),
                  setValue('contact_fname', userData?.first_name),
                  setValue('contact_lname', userData?.last_name),
                  setValue('contact_number', userData?.phone);
              } else {
                setCheckBox1(!checkBox1),
                  setValue('contact_fname', ''),
                  setValue('contact_lname', ''),
                  setValue('contact_number', '');
              }
            }}
            control={<Checkbox />}
            label="Same as Signup details"
          />
        </FormGroup>
      </Box>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            columnSpacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <InputField
                placeholder="First Name"
                name="contact_fname"
                label="First Name"
                register={register}
                errors={errors}
                defaultValue={checkBox1 ? userData?.first_name : ''}
                required={true}
              />
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
            >
              <InputField
                placeholder="Last Name"
                name="contact_lname"
                label="Last Name"
                register={register}
                errors={errors}
                defaultValue={checkBox1 ? userData?.last_name : ''}
                required={true}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
        >
          <Grid
            container
            columnSpacing={2}
          >
            <Grid
              item
              xs={12}
              md={6}
            >
              <InputField
                placeholder="Contact Function"
                name="contact_function"
                label="Contact Function"
                register={register}
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
            >
              {/* <InputField
                placeholder="Contact Number"
                name="contact_number"
                label="Contact Number"
                register={register}
                errors={errors}
                type="number"
                required={true}
              /> */}
              <PhoneInputField
                control={control}
                name="contact_number"
                errors={errors}
                required={true}
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <FormGroup>
                <FormControlLabel
                  {...register('authorized')}
                  control={<Checkbox />}
                  label="Authorized to act on Let's Connect on behalf of the Company"
                />
              </FormGroup>
              {errors && errors['authorized'] && (
                <Typography
                  m={0}
                  fontSize={12}
                  color="error"
                >
                  {(errors['authorized'] as any).message as string}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Box
        mt={3}
        mb={2}
      >
        <Typography variant="h4">
          Upload Company Documents <span style={{ color: 'red' }}> *</span>
        </Typography>
        <Typography>
          Please upload supporting documents to verify your company&apos;s
          legitimacy and enhance trustworthiness on the platform.
        </Typography>
      </Box>

      <UploadDocumentInput
        name="company_docs"
        label="Browse Document"
        accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
        text/plain, application/pdf"
        register={register}
        errors={errors}
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
                  xs: '100px',
                  sm: '250px',
                  md: '300px',
                },
              }}
            >
              {item?.doc_name}
            </Typography>
            <CloseOutlinedIcon
              sx={{ cursor: 'pointer' }}
              onClick={() => handleExistingRemoveDoc(item._id)}
            />
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
                  xs: '100px',
                  sm: '250px',
                  md: '300px',
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
        </Stack>
      ))}
    </Box>
  );
};

export default SignupCompanyDetailsForm;
