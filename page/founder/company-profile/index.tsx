'use client';
import React, { useEffect, useMemo, useState } from 'react';
import { Grid, Box } from '@mui/material';
import CompanyDetails from '@/components/company-profile/company-details';
import ProjectTilesCard from '@/components/common/project-tiles-card';
import CompanyEditDetails from '@/components/company-profile/company-edit-details';
import { CompanyDetailsData } from './data';
import { FOUNDER } from '@/helpers/constants';
import { getCompany } from '@/services/apiDefinition';
import { api } from '@/services/axiosInstance';
import { toast } from 'react-toastify';
const data = [
  {
    id: 1,
    iconUrl: '/asset/icon/profile.svg',
    title: 'Name',
    value: 'John Doe',
  },
  {
    id: 2,
    iconUrl: '/asset/icon/contact-number.svg',
    title: 'Contact Number',
    value: '+1 234 556 4879',
  },
  {
    id: 3,
    iconUrl: '/asset/icon/contact-function.svg',
    title: 'Contact Function',
    value: 'Lorem Ipsum',
  },
];
const CompanyProfilePage = () => {
  const [editProfile, setEditProfile] = useState(false);
  const [companyDetails, setCompanyDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCompanyDetails = async () => {
    try {
      setIsLoading(true);
      const res = await api.get(getCompany);
      if (res.success) {
        setIsLoading(false);
        setCompanyDetails(res?.data);
      }
    } catch (error: any) {
      setIsLoading(false);
      toast.error(error?.response?.data?.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  useEffect(() => {
    fetchCompanyDetails();
  }, [editProfile]);

  const compData = useMemo(() => {
    if (companyDetails) {
      const companyData = {
        companyName: companyDetails?.company_name,
        establishedYear: companyDetails?.established_year,
        website: companyDetails?.website,
        industrySector: companyDetails?.industry,
        noOfEmployee: companyDetails?.number_of_employees,
        company_location: companyDetails?.company_location,
        description: companyDetails?.description,
      };

      return CompanyDetailsData.map((item, index) => ({
        ...item,
        value: Object.values(companyData)[index] || item.value,
      }));
    }
    return [];
  }, [companyDetails]);

  const contactDetails = useMemo(() => {
    if (companyDetails) {
      const companyDetailsData = {
        name: `${companyDetails?.contact_fname} ${companyDetails?.contact_lname}`,
        contactNumber: companyDetails?.contact_number,
        contactFunction: companyDetails?.contact_function,
      };

      return data.map((item, index) => ({
        ...item,
        value: Object.values(companyDetailsData)[index] || item.value,
      }));
    }
    return [];
  }, [companyDetails]);

  return (
    <>
      {!editProfile ? (
        <Box p={{ xs: '18px', md: '36px' }}>
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
              lg={8}
            >
              <CompanyDetails
                data={compData}
                onClick={() => setEditProfile(!editProfile)}
                type={FOUNDER}
                images={{
                  company_logo: companyDetails?.company_logo?.logo_url,
                  cover_photo: companyDetails?.cover_photo?.image_url,
                }}
                document={companyDetails?.company_docs || []}
              />
            </Grid>
            <Grid
              item
              xs={12}
              lg={4}
            >
              <ProjectTilesCard
                title="Contact Details"
                data={contactDetails && contactDetails}
              />
            </Grid>
          </Grid>
        </Box>
      ) : (
        <CompanyEditDetails
          type={FOUNDER}
          setEditProfile={setEditProfile}
          companyDetails={companyDetails && companyDetails}
        />
      )}
    </>
  );
};

export default CompanyProfilePage;
