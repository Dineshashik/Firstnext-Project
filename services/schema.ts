import * as yup from 'yup';

export const signupCompanyFounderDetailsSchema = yup.object().shape({
  company_logo: yup.mixed(),
  cover_photo: yup.mixed(),
  company_name: yup.string().required('Company name is required').max(50, 'Company name cannot be more than 50 characters'),
  website: yup.string().notRequired().optional(),
  established_year: yup.string().required('Year Established is required'),
  number_of_employees: yup.string().required('No. of Employees is required'),
  industry: yup.string().required('Industry is required'),
  company_location: yup.string().required("Region name is required"),
  description: yup.string(),
  contact_fname: yup.string().required('Contact first name is required').max(15, 'first name cannot be more than 15 characters'),
  contact_lname: yup.string().required('Contact last name is required').max(15, 'last name cannot be more than 15 characters'),
  contact_number: yup.string().required('Contact number is required'),
  contact_function: yup.string().required('Contact function is required').max(30, 'Contact function cannot be more than 30 characters'),
  company_docs: yup.mixed().optional(),
  authorized: yup.boolean().oneOf([true], 'Please authorize first').required('Please authorize first'),
  alldocuments: yup.number().min(1, 'Please upload at least one document').max(3, 'You can upload up to three documents').required('Please upload at least one document')

});
export const signupCompanyInvestorDetailsSchema = yup.object().shape({
  company_logo: yup.mixed(),
  cover_photo: yup.mixed(),
  company_name: yup.string().required('Company name is required').max(50, 'Company name cannot be more than 50 characters'),
  website: yup.string().notRequired().optional(),
  established_year: yup.string().nullable(),
  number_of_employees: yup.string().nullable(),
  industry: yup.array().optional(),
  company_location: yup.string().required("Region name is required"),
  description: yup.string(),
  contact_fname: yup.string().required('Contact first name is required').max(15, 'first name cannot be more than 15 characters'),
  contact_lname: yup.string().required('Contact last name is required').max(15, 'last name cannot be more than 15 characters'),
  contact_number: yup.string().required('Contact number is required'),
  contact_function: yup.string().required('Contact function is required').max(30, 'Contact function cannot be more than 30 characters'),
  company_docs: yup.mixed().optional(),
  authorized: yup.boolean().oneOf([true], 'Please authorize first').required('Please authorize first'),
  alldocuments: yup.number().min(1, 'Please upload at least one document').max(3, 'You can upload up to three documents').required('Please upload at least one document')
});

// export const signupCompanyInvestorEditDetailsSchema = yup.object().shape({
//   company_logo: yup.mixed(),
//   cover_photo: yup.mixed(),
//   company_name: yup.string().required('Company name is required').max(50, 'Company name cannot be more than 50 characters'),
//   website: yup.string().notRequired().optional(),
//   established_year: yup.string().required('Year Established is required'),
//   number_of_employees: yup.string().required('No. of Employees is required'),
//   industry: yup.array().optional(),
//   company_location: yup.string().required("Region name is required"),
//   description: yup.string(),
//   contact_fname: yup.string().required('Contact first name is required').max(15, 'first name cannot be more than 15 characters'),
//   contact_lname: yup.string().required('Contact last name is required').max(15, 'last name cannot be more than 15 characters'),
//   contact_number: yup.string().required('Contact number is required'),
//   contact_function: yup.string().required('Contact function is required').max(30, 'Contact function cannot be more than 30 characters'),
//   company_docs: yup.mixed().optional(),
//   authorized: yup.boolean().oneOf([true], 'Please authorize first').required('Please authorize first'),
//   alldocuments: yup.number().min(1, 'Please upload at least one document').max(3, 'You can upload up to three documents').required('Please upload at least one document')
// });

export const signupPersonalDetailsSchema = yup.object().shape({
  profile: yup.mixed().optional(),
  bio: yup.string(),
  phone: yup.string().required('Contact Number is required'),
  first_name: yup.string().required('first_name is required').max(15, 'first name cannot be more than 15 characters'),
  last_name: yup.string().required('last_name is required').max(15, 'last name cannot be more than 15 characters'),
  email: yup.string(),
  country: yup.string().required("Region name is required"),
});



export const signupProjectDetailsSchema = yup.object().shape({
  project_name: yup.string()
    .required('Project name is required')
    .max(40, 'Project name cannot be more than 40 characters'),
  funding_scope: yup.string()
    .required('Funding Purpose is required')
    .max(30, 'Funding Purpose cannot be more than 30 characters'),
  description: yup.string()
    .required('Description is required'),
  amount_to_raised: yup.number()
    .required('Exact Amount to be Raised is required')
    .typeError('Exact Amount to be Raised must be a number'), // Added type error message
  market_opportunity: yup.string()
    .required('Market Opportunity is required').max(30, 'Funding Purpose cannot be more than 30 characters'),
  stage_of_development: yup.string()
    .required('Development Stage is required'),
  funding_requirements: yup.array().of(yup.string().required()).min(1, 'Select at least one option').required('Funding Amount (USD) is required'),
  funding_stage: yup.string()
    .required('Funding Stage is required'),
  performance_projections: yup.string().nullable()
    .typeError('Performance projections must be a number'),
  revenue_model: yup.string()
    .required('Revenue Model is required'),
  exit_strategy: yup.string()
    .required('Exit Strategy is required'),
  investor_benefits: yup.array().of(yup.string().required()).min(1, 'Select at least one option').required('Investor Benefits is required'),
  alldocuments: yup.number().max(3, 'You can upload up to three documents')

});

export const adminFooterTabSchema = yup.object().shape({
  section1: yup.object().shape({
    heading_text: yup.string().min(5, 'Heading text must be at least 5 characters').max(100, 'Heading text must be at most 100 characters'),
    sub_text: yup.string().min(5, 'Heading text must be at least 5 characters').max(200, 'Heading text must be at most 200 characters'),
  }),
  section2: yup.object().shape({
    about_company: yup.string().min(5, 'Heading text must be at least 5 characters').max(200, 'Heading text must be at most 200 characters'),
    social_media: yup.object().shape({
      instagram: yup
        .string()
        .url('Invalid Instagram URL')
        .required('Instagram URL is required'),
      facebook: yup
        .string()
        .url('Invalid Facebook URL')
        .required('Facebook URL is required'),
      youtube: yup
        .string()
        .url('Invalid YouTube URL')
        .required('YouTube URL is required'),
      twitter: yup
        .string()
        .url('Invalid Twitter URL')
        .required('Twitter URL is required'),
    }),
  }),
});

export const heroSectionSchema = yup.object().shape({
  heading_text: yup.string()
    .min(10, 'Heading text must be at least 10 characters')
    .max(200, 'Heading text cannot be more than 80 characters'),
  sub_text: yup.string()
    .min(20, 'Sub text must be at least 20 characters')
    .max(200, 'Sub text cannot be more than 200 characters'),
});

export const newApproachSchema = yup.object().shape({
  box1: yup.object().shape({
    heading_text: yup.string().min(20, 'Heading text must be at least 20 characters').max(70, 'Heading text must be at most 70 characters'),
    sub_text: yup.string().min(20, 'Sub text must be at least 20 characters').max(530, 'Sub text must be at most 230 characters')
  }),
  box2: yup.object().shape({
    heading_text: yup.string().min(10, 'Heading text must be at least 10 characters').max(70, 'Heading text must be at most 70 characters'),
    sub_text: yup.string().min(20, 'Sub text must be at least 20 characters').max(530, 'Sub text must be at most 230 characters')
  }),
  box3: yup.object().shape({
    heading_text: yup.string().min(10, 'Heading text must be at least 10 characters').max(70, 'Heading text must be at most 70 characters'),
    sub_text: yup.string().min(20, 'Sub text must be at least 20 characters').max(530, 'Sub text must be at most 230 characters')
  }),
  heading_text: yup.string().min(10, 'Heading text must be at least 10 characters').max(70, 'Heading text must be at most 70 characters'),
  sub_text: yup.string().min(20, 'Sub text must be at least 20 characters').max(530, 'Sub text must be at most 230 characters')
});

export const adminVibrantGrowingTabSchema = yup.object().shape({
  section1: yup.object().shape({
    heading_text: yup.string().min(5, 'Heading text must be at least 5 characters').max(100, 'Heading text must be at most 100 characters'),
    sub_text: yup.string().min(5, 'Sub text must be at least 5 characters').max(200, 'Sub text must be at most 200 characters'),
  }),
  section2: yup.object().shape({
    heading_text: yup.string().min(5, 'Heading text must be at least 5 characters').max(100, 'Heading text must be at most 100 characters'),
    sub_text: yup.string().min(5, 'Sub text must be at least 5 characters').max(200, 'Sub text must be at most 200 characters'),
  }),
  section3: yup.object().shape({
    heading_text: yup.string().min(5, 'Heading text must be at least 5 characters').max(100, 'Heading text must be at most 100 characters'),
    sub_text: yup.string().min(5, 'Sub text must be at least 5 characters').max(200, 'Sub text must be at most 200 characters'),
  }),
});

export const adminLivePlatformSchema = yup.object().shape({
  heading_text: yup.string().min(10, 'Heading text must be at least 10 characters').max(100, 'Heading text must be at most 100 characters'),
  sub_text: yup.string().min(20, 'Sub text must be at least 20 characters').max(200, 'Sub text must be at most 200 characters'),
  box1: yup.object().shape({
    heading_text: yup.string().min(3, 'Heading text must be at least 3 characters').max(40, 'Heading text must be at most 40 characters'),
    sub_text: yup.string().min(10, 'Sub text must be at least 10 characters').max(200, 'Sub text must be at most 200 characters'),
  }),
  box2: yup.object().shape({
    heading_text: yup.string().min(3, 'Heading text must be at least 3 characters').max(40, 'Heading text must be at most 40 characters'),
    sub_text: yup.string().min(10, 'Sub text must be at least 10 characters').max(200, 'Sub text must be at most 200 characters'),
  }),
  box3: yup.object().shape({
    heading_text: yup.string().min(3, 'Heading text must be at least 3 characters').max(40, 'Heading text must be at most 40 characters'),
    sub_text: yup.string().min(10, 'Sub text must be at least 10 characters').max(200, 'Sub text must be at most 200 characters'),
  }),
});

export const cardFormSchema = yup.object().shape({
  number: yup
    .string()
    .required('Card number is required')
    .matches(/^[0-9]{16}$/, 'Card number must be 16 digits'),
  expiration: yup
    .date()
    .required('Expiration date is required')
    .typeError('Invalid expiration date'),
  cvc: yup
    .string()
    .required('CVC is required')
    .matches(/^[0-9]{3,4}$/, 'CVC must be 3 or 4 digits'),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Last password is required'),
  newPassword: yup.string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long'),
  reEnterNewPassword: yup.string()
    .oneOf([yup.ref('newPassword'), ''], 'Passwords must match')
    .required('Re-enter new password is required'),
});


export const changeAdminPasswordSchema = yup.object().shape({
  last_password: yup.string().required('Last password is required'),
  new_password: yup.string()
    .required('New password is required')
    .min(8, 'New password must be at least 8 characters long'),
  re_enter_new_password: yup.string()
    .oneOf([yup.ref('new_password'), ''], 'Passwords must match')
    .required('Re-enter new password is required'),
});


const sectionSchema = yup.object().shape({
  name: yup.string()
    .min(3, 'Section name must be at least 3 characters')
    .max(20, 'Section name cannot be more than 20 characters'),
});

export const featureInSchema = yup.object().shape({
  title: yup.string()
    .min(5, 'Title must be at least 5 characters')
    .max(50, 'Title cannot be more than 50 characters'),
  section1: sectionSchema,
  section2: sectionSchema,
  section3: sectionSchema,
  section4: sectionSchema,
  section5: sectionSchema,
  section6: sectionSchema,
  section7: sectionSchema,
  section8: sectionSchema,
});