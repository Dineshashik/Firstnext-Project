'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  BookmarkFilterButton,
  BookmarkFilterButtonWrapper,
  BookmarkPageWrapper,
  BookmarkPopperBoxWrapper,
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
  BookmarkCardData,
  desiredFundingStage,
  desiredInvestorBenefits,
  exitStrategy,
  investmentRange,
  locationOption,
  sectorArray,
  stageOfDevOption,
} from './data';
import { INVESTOR } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import { projectFindAll } from '@/services/apiDefinition';
import { useAppSelector } from '@/lib/hooks';
import { user } from '@/lib/slices/userSlice';
import { toast } from 'react-toastify';
import useDebouncedValue from '@/utils/useDebounced';
import { projectData } from '@/helpers/projectData';

const BookmarkPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const userDetails: any = useAppSelector(user);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filters, setFilters] = useState<any>();
  const [keepMounted, setKeepMounted] = useState<boolean>(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [totalPages, setTotalPage] = useState<number>(1);
  // react-hook-form
  const {
    register,
    setValue,
    resetField,
    reset,
    getValues,
    handleSubmit,
    formState: { errors },
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

  const [bookmarkData, setBookmarkData] = useState<any>([]);
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);

  const fetchProjectData = useCallback(
    async (search = false) => {
      if (search) {
        setPage(1);
      }
      try {
        setIsLoading(true);
        const response: any = await api.post<any>(
          projectFindAll,
          {
            ...filters,
            search: debouncedSearchTerm,
            bookmarks: true,
            page,
            limit: 12,
          },
          'application/json'
        );
        if (response.success) {
          setBookmarkData(response.data.data);
          setTotalPage(response.data.pagination.totalPages);
          // setHasMore(response.data.pagination.nextPage);
          setIsLoading(false);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || 'Something went wrong');
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
    <BookmarkPageWrapper>
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
          Bookmarks
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          <BookmarkFilterButton
            variant="contained"
            onClick={handleClick}
            startIcon={<FilterAltOutlinedIcon />}
            aria-describedby={id}
            type="button"
          >
            Filters
          </BookmarkFilterButton>
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
              onChange={(e) => setSearchValue(e.target.value)}
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
        <BookmarkPopperBoxWrapper>
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
              options={sectorArray}
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
              <BookmarkFilterButtonWrapper
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </BookmarkFilterButtonWrapper>
              <BookmarkFilterButtonWrapper
                variant="contained"
                type="submit"
              >
                Apply
              </BookmarkFilterButtonWrapper>
            </Stack>
          </form>
        </BookmarkPopperBoxWrapper>
      </Popper>
      <Box mt={2}>
        {isLoading ? (
          <Typography
            variant="h6"
            align="center"
            mt={4}
          >
            Loading...
          </Typography>
        ) : bookmarkData.length !== 0 ? (
          <Grid
            container
            spacing={2}
          >
            {userDetails?.subPlan === 'PREMIUM' &&
              bookmarkData?.map((item: any) => (
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
                    // isBlurred={true}
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
                    isBlurred={true}
                  />
                </Grid>
              ))}
          </Grid>
        ) : (
          <Typography
            variant="h6"
            align="center"
            mt={4}
          >
            Data Not Found
          </Typography>
        )}
      </Box>
      {bookmarkData?.length > 0 && (
        <Box
          display="flex"
          justifyContent="center"
          mt={5}
        >
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            onChange={handleChangePage}
          />
        </Box>
      )}{' '}
    </BookmarkPageWrapper>
  );
};

export default BookmarkPage;
