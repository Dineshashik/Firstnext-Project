'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FindProjectFilterButton,
  FindProjectFilterButtonWrapper,
  FindProjectPageWrapper,
  FindProjectPopperBoxWrapper,
  SearchProjectInput,
  SearchProjectInputWrapper,
} from './style';
import {
  Box,
  Grid,
  Pagination,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import {
  InputField,
  MultiSelectInput,
  SelectInput,
} from '@/components/common/ui/input-fields';
import { FieldValues, useForm } from 'react-hook-form';
import ProjectCard from '@/components/common/project-card';
import {
  FindProjectCardData,
  desiredFundingStage,
  desiredInvestorBenefits,
  exitStrategy,
  industryOption,
  investmentRange,
  locationOption,
  stageOfDevOption,
} from './data';
import { INVESTOR } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import { projectFindAll } from '@/services/apiDefinition';
import { toast } from 'react-toastify';
import useDebouncedValue from '@/utils/useDebounced';
import { projectData } from '@/helpers/projectData';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';

const FindProjectPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const [filters, setFilters] = useState<any>();
  const [projectAllData, setProjectAllData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [keepMounted, setKeepMounted] = useState<boolean>(true);
  const debouncedSearchTerm: any = useDebouncedValue(searchValue, 700);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  // react-hook-form
  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<FieldValues>();

  const onSubmit = async (data: FieldValues) => {
    setKeepMounted(true);
    setFilters(data);
    setAnchorEl(null);
    setPage(1);
  };

  const handleReset = () => {
    setFilters({});
    reset();
    setAnchorEl(null);
    setKeepMounted(false);
    setPage(1);
  };

  const userDetails: any = useAppSelector(user);

  const fetchProjectData = useCallback(
    async (search = false) => {
      if (search) {
        setPage(1);
      }
      try {
        setIsLoading(true);
        const response = await api.post<any>(
          projectFindAll,
          {
            ...filters,
            search: debouncedSearchTerm,
            page,
            limit: 12,
          },
          'application/json'
        );
        if (response.success) {
          setProjectAllData(response.data.data);
          setTotalPage(response.data.pagination.totalPages);
          setCount(response.data.pagination.totalCount);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || 'Something went wrong');
      } finally {
        setIsLoading(false);
      }
    },
    [page, debouncedSearchTerm, filters]
  );

  useEffect(() => {
    if (userDetails?.subPlan === 'PREMIUM') {
      fetchProjectData();
    }
  }, [filters, page, userDetails?.subPlan]);

  useEffect(() => {
    fetchProjectData(true);
  }, [debouncedSearchTerm, userDetails?.subPlan]);

  const handleChangePage = (e: any, p: number) => {
    setPage(p);
  };

  return (
    <FindProjectPageWrapper>
      <Stack
        direction={{ sx: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography
          variant="h4"
          mb={{ xs: 1, md: 0 }}
        >
          Find Projects
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          <FindProjectFilterButton
            variant="contained"
            onClick={handleClick}
            startIcon={<FilterAltOutlinedIcon />}
            aria-describedby={id}
            type="button"
          >
            Filters
          </FindProjectFilterButton>
          <SearchProjectInputWrapper
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <SearchProjectInput
              type="text"
              id="search"
              name="search"
              placeholder="What are you looking for?"
              value={searchValue}
              onChange={(e) => {
                setAnchorEl(null);
                setSearchValue(e.target.value);
              }}
            />
            <Stack alignItems="center">
              <SearchIcon />
            </Stack>
          </SearchProjectInputWrapper>
        </Stack>
      </Stack>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        ref={popperRef}
        keepMounted={keepMounted}
      >
        <FindProjectPopperBoxWrapper>
          <form onSubmit={handleSubmit(onSubmit)}>
            <MultiSelectInput
              name="investment_range"
              options={investmentRange}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Investment Range"
              defaultValue={getValues('investment_range') || []}
            />
            <MultiSelectInput
              name="industry"
              options={industryOption}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Industry"
              defaultValue={getValues('industry') || []}
            />
            <MultiSelectInput
              name="location"
              options={locationOption}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Location"
              defaultValue={getValues('location') || []}
            />
            <MultiSelectInput
              name="funding_stage"
              options={desiredFundingStage}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Funding Stage"
              defaultValue={getValues('funding_stage') || []}
              reset={reset}
            />
            <MultiSelectInput
              name="stage_of_development"
              options={stageOfDevOption}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Stage of development"
              defaultValue={getValues('stage_of_development') || []}
            />
            <MultiSelectInput
              name="exit_strategy"
              options={exitStrategy}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Exit strategy"
              defaultValue={getValues('exit_strategy') || []}
            />
            <MultiSelectInput
              name="investor_benefits"
              options={desiredInvestorBenefits}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Investor benefits"
              defaultValue={getValues('investor_benefits') || []}
            />
            <InputField
              name="performance_projections"
              register={register}
              errors={errors}
              label=""
              type="number"
              placeholder="Performance projections"
            />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              mt={1}
            >
              <FindProjectFilterButtonWrapper
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </FindProjectFilterButtonWrapper>
              <FindProjectFilterButtonWrapper
                variant="contained"
                type="submit"
              >
                Apply
              </FindProjectFilterButtonWrapper>
            </Stack>
          </form>
        </FindProjectPopperBoxWrapper>
      </Popper>

      <Box mt={2}>
        <Grid
          container
          spacing={2}
        >
          {userDetails?.subPlan === 'PREMIUM' &&
            projectAllData?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={item._id}
              >
                <ProjectCard
                  type={INVESTOR}
                  data={item}
                  fetchProjectData={fetchProjectData}
                />
              </Grid>
            ))}
          {userDetails?.subPlan === 'FREE' &&
            projectData?.map((item: any) => (
              <Grid
                item
                xs={12}
                md={6}
                lg={4}
                key={item._id}
              >
                <ProjectCard
                  type={INVESTOR}
                  data={item}
                  fetchProjectData={fetchProjectData}
                  isBlurred={userDetails?.role == "INVESTOR" ? false : true}
                />
              </Grid>
            ))}
        </Grid>

        {!isLoading &&
          ((userDetails?.subPlan === 'PREMIUM' &&
            projectAllData.length === 0) ||
            (userDetails?.subPlan === 'FREE' && projectData.length === 0)) && (
            <Typography
              variant="h6"
              align="center"
              mt={4}
            >
              No data found
            </Typography>
          )}
        {count > 12 && (
          <Box
            display="flex"
            justifyContent="center"
            mt={5}
          >
            <Pagination
              color="primary"
              count={totalPages}
              page={page}
              siblingCount={0}
              onChange={handleChangePage}
            />
          </Box>
        )}
        {/* {isLoading && (
          <Typography variant='h6' align='center' mt={4}>
            Loading...
          </Typography>
        )} */}
        {/* {!isLoading ? (
          <Grid container spacing={2}>
            {projectAllData?.map((item: any) => (
              <Grid item xs={12} md={6} lg={4} key={item._id}>
                <ProjectCard
                  type={INVESTOR}
                  data={item}
                  fetchProjectData={fetchProjectData}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography variant="h6" align="center" mt={4}>
            Loading...
          </Typography>
        )} */}
      </Box>
    </FindProjectPageWrapper>
  );
};

export default FindProjectPage;
