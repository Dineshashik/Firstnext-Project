const PersonalDetails = {
  image: '',
  name: 'John Doe',
  email: 'johndoe@gmail.com',
  phone_number: '+1 234 567 890',
  location: 'Abu Dhabi, Dubai',
};

const CompanyDetails = {
  company_name: 'John Doe',
  image: '',
  website: 'www.website.com',
  established_year: '2014',
  number_of_employees: '20',
  sector: 'Pharma',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.",
  contact_person_name: 'John Doe',
  contact_number: '+1 123 456 7890',
  contact_function: 'Contact Function',
  company_docs: [
    {
      id: 1,
      name: 'Project Funded/Closed',
    },
    {
      id: 2,
      name: 'Project Funded/Closed',
    },
    {
      id: 3,
      name: 'Project Funded/Closed',
    },
    {
      id: 4,
      name: 'Project Funded/Closed',
    },
  ],
};

const ProjectDetails = {
  project_name: 'Project Name',
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset.",
  image: '',
  funding_scope: 'Funding Scope',
  stage_of_development: 'Stage of Development',
  funding_requirements: 'Funding Requirements',
  funding_stage: 'Funding Stage',
  performance_projections: 'Performance Projections',
  exit_strategy: 'Exit Strategy',
  investor_benefits: 'Benefits of Investors',
  project_closed: 'Project Funded/Closed',
  document_accessible: [
    {
      id: 1,
      name: 'abc',
    },
    {
      id: 2,
      name: 'xyz',
    },
    {
      id: 3,
      name: 'acb',
    },
    {
      id: 4,
      name: 'xyz',
    },
  ],
};

const PricingDetails = {
  pricing: 'Free',
  image: '',
  join_at: '',
};

export { PersonalDetails, PricingDetails, CompanyDetails, ProjectDetails };
