import {
  Stack,
  Button,
  MenuItem,
  Box,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Typography,
  TextField,
  Checkbox,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import Image from 'next/image';
import React, { ChangeEvent, ReactNode, useEffect, useState } from 'react';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FileUploader } from 'react-drag-drop-files';
import {
  ImageInputImageWrapper,
  InputFieldInput,
  InputFieldLabel,
  OutlinedInputWrapper,
  SelectInputWrapper,
  UploadDocumentInputWrapper,
  VisuallyHiddenInput,
} from './style';
import {
  DatePicker,
  DateView,
  LocalizationProvider,
} from '@mui/x-date-pickers';
import {
  Controller,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-number-input/style.css';
import PhoneInputWithCountry from 'react-phone-number-input/react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
// import CheckIcon from '@mui/icons-material/Check';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/HorizontalRuleOutlined';
import CheckIcon from '@mui/icons-material/CheckBoxOutlined';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
// import CheckIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
// import CheckBoxOutlineBlankIcon from '@mui/icons-material/RadioButtonUncheckedOutlined';

type InputPropsType = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: any;
  placeholder: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'submit' | 'button';
  defaultValue?: string;
  disabled?: boolean;
  required?: boolean;
};

type ImageInputProps = {
  name: string;
  label: string;
  setValue?: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  icon: 'image' | 'project' | 'profile' | 'company';
  imageSrc?: any;
  defaultImage?: any;
};

type UploadDocumentInputProps = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder?: string;
  accept?: string;
};
type SelectInputProps = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  setValue?: any;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder: string;
  defaultValue?: string[];
  multiple?: boolean;
  required?: boolean;
};

type MultiSelectInputProps = {
  name: string;
  label?: string;
  options: { value: string; label: string }[];
  setValue?: any;
  register: UseFormRegister<FieldValues>;
  errors: any;
  placeholder: string;
  defaultValue?: string[];
  multiple?: boolean;
  reset?: any;
  required?: boolean;
};

type SocialMediaLinkInputPropsType = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: any;
  placeholder?: string;
  icon: ReactNode;
};

type DatePickerInputProps = {
  name: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  placeholder?: string;
  views?: readonly DateView[] | undefined;
  setValue: any;
  disablePast?: boolean;
};
const InputField = ({
  name,
  label,
  register,
  errors,
  placeholder,
  type,
  defaultValue,
  disabled,
  required = false,
}: InputPropsType) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  let key1: any, key2: any;
  if (name && name.split('.')?.length > 1) {
    key1 = name?.split('.')?.[0];
    key2 = name?.split('.')?.[1];
  }

  return (
    <Stack>
      <InputFieldLabel>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </InputFieldLabel>
      <InputFieldInput
        {...register(name)}
        placeholder={placeholder}
        defaultValue={defaultValue}
        type={type === 'password' ? (showPassword ? 'text' : 'password') : type}
        InputProps={{
          endAdornment: type === 'password' && (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
          ...(type === 'number' && { inputProps: { min: 1 } }),
        }}
        disabled={disabled ? disabled : false}
      />

      {errors && key1 && key2 && errors?.[key1]?.[key2]?.message ? (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {errors[key1][key2]?.message}
        </Typography>
      ) : (
        errors[name]?.message && (
          <Typography
            m={0}
            fontSize={12}
            color="error"
          >
            {errors[name]?.message}
          </Typography>
        )
      )}
    </Stack>
  );
};

const TextareaInputField = ({
  name,
  label,
  register,
  errors,
  placeholder,
  required = false,
}: InputPropsType) => {
  return (
    <Stack>
      <InputFieldLabel>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </InputFieldLabel>
      <InputFieldInput
        multiline
        rows={3}
        {...register(name)}
        placeholder={placeholder}
      />
      {errors && errors[name] && (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {(errors[name] as any).message as string}
        </Typography>
      )}
    </Stack>
  );
};

const SocialMediaLinkInput = ({
  name,
  label,
  icon,
  register,
  errors,
  placeholder,
}: // required = false,
SocialMediaLinkInputPropsType) => {
  const splitArr = name.split('.');
  return (
    <Stack>
      <OutlinedInputWrapper
        id="outlined-adornment-password"
        type="text"
        {...register(name)}
        placeholder={placeholder}
        sx={{
          '& input::placeholder': {
            fontSize: '16px',
            color: '#425466',
          },
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              edge="end"
            >
              {icon}
            </IconButton>
          </InputAdornment>
        }
      />
      {errors && (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {
            errors.section2?.social_media[splitArr[splitArr.length - 1]]
              ?.message as string
          }
        </Typography>
      )}
    </Stack>
  );
};

const ImageInput: React.FC<ImageInputProps> = ({
  name,
  label,
  register,
  errors,
  icon,
  defaultImage,
}) => {
  const [previewImg, setPreviewImg] = useState<string | undefined>();
  const [fileName, setFileName] = useState<string | undefined>();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && name) {
      setPreviewImg(URL.createObjectURL(fileList[0]));
      setFileName(fileList[0].name);
    }
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      spacing={2}
    >
      {previewImg ? (
        <Image
          style={{ borderRadius: '50%' }}
          src={previewImg || ''}
          alt="sectors"
          width={100}
          height={100}
        />
      ) : defaultImage?.length !== 0 ? (
        <Image
          style={{ borderRadius: '50%' }}
          src={
            (defaultImage && defaultImage?.logo_url) ||
            (defaultImage && defaultImage?.image_url) ||
            ''
          }
          alt="sectors"
          width={100}
          height={100}
        />
      ) : (
        <ImageInputImageWrapper>
          <Image
            src={`/asset/icon/upload-${icon}.svg`}
            alt="sectors"
            width={48}
            height={48}
          />
        </ImageInputImageWrapper>
      )}
      <Stack
        direction="column"
        ml={{ md: 3 }}
      >
        <label style={{ textAlign: 'center', color: '#425466' }}>
          {fileName || 'JPG or PNG. Max file size 5MB.'}
        </label>

        <Button
          component="label"
          variant="contained"
          sx={{
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            gap: '8px',
            marginTop: '8px',
            padding: '8px 24px',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#635BFF',
            },
          }}
        >
          <Image
            src="/asset/icon/upload.svg"
            alt="upload"
            width={14}
            height={14}
          />
          {label}
          <VisuallyHiddenInput
            type="file"
            accept="image/jpeg, image/png"
            {...register(name, {
              onChange: handleChange,
            })}
          />
        </Button>
        {errors && errors[name] && (
          <Typography
            m={0}
            fontSize={12}
            color="error"
          >
            {(errors[name] as any).message as string}
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};

const SelectInput: React.FC<SelectInputProps> = React.memo(
  ({
    name,
    label,
    options,
    register,
    errors,
    placeholder,
    defaultValue,
    setValue,
    required = false,
  }) => {
    const [state, setState] = useState<string[]>([]);
    useEffect(() => {
      if (defaultValue) {
        setState(defaultValue as string[] | []);
      }
    }, [defaultValue]);

    const handleChange = (event: any) => {
      const temp = event.target.value;
      if (temp) {
        setState(temp);
        setValue(name, temp);
      }
    };

    return (
      <Stack>
        <InputFieldLabel>
          {label}
          {required && <span style={{ color: 'red' }}> *</span>}
        </InputFieldLabel>
        <SelectInputWrapper
          value={state}
          {...register(name, {
            onChange: (e) => handleChange(e),
          })}
          aria-label="Select"
          displayEmpty
          inputProps={{
            'aria-label': 'Without label',
            MenuProps: {
              MenuListProps: {
                sx: {
                  maxHeight: '250px',
                  height: '100%',
                },
              },
            },
          }}
          sx={{
            marginTop: '12px',
            '& .MuiPaper-root': {
              height: '300px !important',
            },
          }}
        >
          <MenuItem
            disabled
            value=""
          >
            {placeholder}
          </MenuItem>
          {options.map((option, index) => (
            <MenuItem
              key={option?.value}
              value={option?.value}
            >
              {option?.label}
            </MenuItem>
          ))}
        </SelectInputWrapper>
        {errors && errors[name] && (
          <Typography
            m={0}
            fontSize={12}
            color="error"
          >
            {(errors[name] as any).message as string}
          </Typography>
        )}
      </Stack>
    );
  }
);

SelectInput.displayName = 'SelectInput';

const MultiSelectInput: React.FC<MultiSelectInputProps> = ({
  name,
  label,
  options,
  register,
  errors,
  placeholder,
  defaultValue,
  setValue,
  reset,
  required = false,
}) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
  React.useEffect(() => {
    setValue(name, defaultValue);
    setSelectedValues(defaultValue as string[] | []);
  }, [register, name, defaultValue, setValue]);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const value = event.target.value as string[];
    setSelectedValues(value);
    setValue(name, value);
  };

  return (
    <Stack width="100%">
      <InputFieldLabel>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </InputFieldLabel>
      <SelectInputWrapper
        {...register(name, {
          onChange: (e) => handleChange(e),
        })}
        value={selectedValues}
        multiple
        aria-label="Select"
        displayEmpty
        renderValue={(selected: any) => {
          if (selected.length === 0) {
            return <>{placeholder}</>;
          }

          return selected?.join(', ');
        }}
        inputProps={{
          'aria-label': 'Without label',
          MenuProps: {
            MenuListProps: {
              sx: {
                height: '250px',
              },
            },
          },
        }}
        sx={{
          marginTop: '12px',
          '& .MuiPaper-root': {
            height: '300px !important',
          },
        }}
      >
        <MenuItem
          disabled
          value=""
        >
          {placeholder}
        </MenuItem>
        {options.map((option, index) => (
          <MenuItem
            key={option?.value}
            value={option?.value}
          >
            <Checkbox
              checked={selectedValues.indexOf(option.value) > -1}
              icon={<CheckBoxOutlineBlankIcon sx={{fill: '#635BFF'}}/>}
              checkedIcon={<CheckIcon />}
              sx={{ marginRight: 1 }}
            />
            <ListItemText primary={option?.label} />
          </MenuItem>
        ))}
      </SelectInputWrapper>

      {errors && errors[name] && (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {(errors[name] as any).message as string}
        </Typography>
      )}
    </Stack>
  );
};

const UploadImageInput: React.FC<UploadDocumentInputProps> = ({
  name,
  label,
  register,
  errors,
  placeholder,
}) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && name) {
      register(name, { value: fileList });

      setFileName(fileList[0].name);
    }
  };

  return (
    <Stack mb={1}>
      <InputFieldLabel>{label}</InputFieldLabel>
      <UploadDocumentInputWrapper
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        px={{ xs: 2, md: 3 }}
        py={{ xs: 2, md: 4 }}
        sx={{
          marginTop: '12px',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={2}
        >
          <Image
            src="/asset/icon/upload-gray.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <label style={{ textAlign: 'center' }}>
            {fileName ? fileName : placeholder}
          </label>
        </Stack>
        <Button
          component="label"
          variant="contained"
          sx={{
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            gap: '8px',
            textAlign: 'center',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#635BFF',
            },
            padding: '8px 24px',
          }}
        >
          Browse File
          <VisuallyHiddenInput
            type="file"
            accept="image/jpeg, image/png"
            onChange={(e) => handleChange(e)}
          />
        </Button>
        {errors && errors[name] && (
          <Typography
            m={0}
            fontSize={12}
            color="error"
          >
            {(errors[name] as any).message as string}
          </Typography>
        )}
      </UploadDocumentInputWrapper>
    </Stack>
  );
};

const UploadVideoInput: React.FC<UploadDocumentInputProps> = ({
  name,
  label,
  register,
  errors,
  placeholder,
}) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList && name) {
      register(name, { value: fileList });

      setFileName(fileList[0].name);
    }
  };

  return (
    <Stack mb={1}>
      <InputFieldLabel>{label}</InputFieldLabel>
      <UploadDocumentInputWrapper
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        px={{ xs: 2, md: 3 }}
        py={{ xs: 2, md: 4 }}
        sx={{
          marginTop: '12px',
        }}
      >
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems="center"
          spacing={2}
        >
          <Image
            src="/asset/icon/upload-gray.svg"
            alt="upload"
            width={24}
            height={24}
          />
          <label style={{ textAlign: 'center' }}>
            {fileName ? fileName : placeholder}
          </label>
        </Stack>
        <Button
          component="label"
          variant="contained"
          sx={{
            borderRadius: '50px',
            textTransform: 'none',
            fontSize: '16px',
            fontWeight: '600',
            gap: '8px',
            textAlign: 'center',
            boxShadow: 'none',
            '&:hover': {
              backgroundColor: '#635BFF',
            },
            padding: '8px 24px',
          }}
        >
          Browse File
          <VisuallyHiddenInput
            type="file"
            // accept="image/jpeg, image/png"
            accept="video/mp4, video/webm, video/ogg"
            onChange={(e) => handleChange(e)}
          />
        </Button>
        {errors && errors[name] && (
          <Typography
            m={0}
            fontSize={12}
            color="error"
          >
            {(errors[name] as any).message as string}
          </Typography>
        )}
      </UploadDocumentInputWrapper>
    </Stack>
  );
};

const LocationInput: React.FC<any> = ({
  name,
  label,
  options,
  register,
  errors,
  setValue,
  placeholder,
  defaultValue,
  required = false,
  multiple = false,
}) => {
  const [state, setState] = useState(multiple ? [] : '');
  useEffect(() => {
    if (defaultValue) {
      setState(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (event: any) => {
    const temp = event.target.value;
    if (temp) {
      setState(temp);
      setValue(name, temp);
    }
  };

  return (
    <Stack>
      <InputFieldLabel>
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </InputFieldLabel>
      <SelectInputWrapper
        multiple={multiple}
        value={state}
        displayEmpty
        defaultValue={defaultValue && defaultValue}
        {...register(name, {
          onChange: (e: any) => handleChange(e),
        })}
        aria-label="Select"
        inputProps={{
          MenuProps: {
            MenuListProps: {
              sx: {
                height: '250px',
              },
            },
          },
        }}
        sx={{
          marginTop: '12px',
        }}
        IconComponent={() => (
          <PlaceOutlinedIcon sx={{ marginRight: '10px', color: '#425466' }} />
        )}
      >
        <MenuItem
          disabled
          value=""
        >
          {placeholder}
        </MenuItem>
        {options?.map((option: any, index: number) => (
          <MenuItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </MenuItem>
        ))}
      </SelectInputWrapper>
      {errors && errors[name] && (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {(errors[name] as any).message as string}
        </Typography>
      )}
    </Stack>
  );
};

const UploadDocumentInput: React.FC<UploadDocumentInputProps> = ({
  name,
  label,
  register,
  errors,
  placeholder,
  accept,
}) => {
  return (
    <UploadDocumentInputWrapper
      direction="column"
      alignItems="center"
      spacing={2}
    >
      <Image
        src="/asset/icon/upload-gray.svg"
        alt="upload"
        width={36}
        height={36}
      />
      <label style={{ textAlign: 'center', color: '#111111', opacity: '50%' }}>
        {placeholder
          ? placeholder
          : 'Please upload a valid company document (Trade License, MoA or similar).'}
      </label>
      <Button
        component="label"
        variant="contained"
        sx={{
          borderRadius: '50px',
          textTransform: 'none',
          fontSize: '16px',
          fontWeight: '600',
          gap: '8px',
          textAlign: 'center',
          boxShadow: 'none',
          '&:hover': {
            backgroundColor: '#635BFF',
          },
          padding: '8px 24px',
        }}
      >
        {label}
        <VisuallyHiddenInput
          multiple={true}
          type="file"
          accept={accept || 'image/*'}
          {...register(name)}
        />
      </Button>
      {errors && errors[name] && (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {(errors[name] as any).message as string}
        </Typography>
      )}
    </UploadDocumentInputWrapper>
  );
};

const DatePickerInput: React.FC<DatePickerInputProps> = ({
  name,
  label,
  register,
  errors,
  placeholder,
  views,
  setValue,
  disablePast,
}) => {
  const handleDateChange = (date: any) => {
    setValue(name, date, { shouldValidate: true });
  };
  return (
    <Stack>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <InputFieldLabel>{label}</InputFieldLabel>
        <DatePicker
          sx={{
            marginTop: '4px',
            '& input::placeholder': {
              fontSize: '16px',
              color: '#425466',
            },
            '& fieldset': {
              borderColor: '#DEEAF6',
            },
            '& .MuiFormLabel-root': {
              opacity: '50% !important',
            },
          }}
          // label={placeholder}
          // {...register(name)}
          onChange={handleDateChange}
          views={views || ['day', 'month', 'year']}
          disablePast={disablePast}
        />
      </LocalizationProvider>
      {errors && errors[name] && (
        <span>{(errors[name] as any).message as string}</span>
      )}
    </Stack>
  );
};

const CommonPhoneInput = ({
  name,
  register,
  setValue,
  defaultCountry,
  label,
  errors,
}: any) => (
  <Stack>
    <InputFieldLabel>{label}</InputFieldLabel>
    <PhoneInput
      name={name}
      {...register(name)}
    />
    {errors && errors[name] && (
      <Typography
        m={0}
        fontSize={12}
        color="error"
      >
        {(errors[name] as any).message as string}
      </Typography>
    )}
  </Stack>
);
const PhoneInputField = ({
  name,
  control,
  errors,
  required,
}: {
  name: string;
  control?: any;
  errors?: any;
  required?: boolean;
}) => {
  const validatePhoneNumber = (value: string) => {
    if (value == null) {
      return 'Contact Number is Required';
    } else {
      return value && isValidPhoneNumber(value) ? true : 'Invalid phone number';
    }
  };

  return (
    <div>
      <InputFieldLabel>
        Contact Number
        {required && <span style={{ color: 'red' }}> *</span>}
      </InputFieldLabel>
      <PhoneInputWithCountry
        international
        name={name}
        control={control}
        rules={{
          validate: validatePhoneNumber,
        }}
      />

      {errors && errors[name] && (
        <Typography
          m={0}
          fontSize={12}
          color="error"
        >
          {(errors[name] as any).message as string}
        </Typography>
      )}
    </div>
  );
};

export {
  InputField,
  ImageInput,
  SelectInput,
  LocationInput,
  UploadDocumentInput,
  TextareaInputField,
  UploadImageInput,
  UploadVideoInput,
  SocialMediaLinkInput,
  DatePickerInput,
  CommonPhoneInput,
  PhoneInputField,
  MultiSelectInput,
};
SelectInput.displayName = 'SelectInput';
