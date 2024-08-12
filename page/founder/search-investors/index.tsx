'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Box,
  Button,
  Grid,
  Pagination,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { CustomButton } from '@/components/common/ui';
import {
  CheckIconWrapper,
  ClearButton,
  FilterButton,
  FilterButtonWrapper,
  ModalBoxWrapper,
  ModalIconWrapper,
  PopperBoxWrapper,
  SearchInvestorsInput,
  SearchInvestorsInputWrapper,
  SearchInvestorsWrapper,
} from './style';
import InvestorCard from '@/components/common/investor-card';
import CommonModal from '@/components/common/modal';
import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined';
import {
  InputField,
  LocationInput,
  MultiSelectInput,
  SelectInput,
} from '@/components/common/ui/input-fields';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FOUNDER } from '@/helpers/constants';
import { api } from '@/services/axiosInstance';
import {
  createConnectionRequest,
  getInvestors,
} from '@/services/apiDefinition';
import { toast } from 'react-toastify';
import useDebouncedValue from '@/utils/useDebounced';
import { industryOption, investmentRange, locationOption } from './data';
import {
  desiredFundingStage,
  desiredInvestorBenefits,
  exitStrategy,
  stageOfDevOption,
} from '@/page/investor/bookmark/data';
import { useSocket } from '@/context/SocketContext';
import { useAppSelector } from '@/lib/hooks';
import { useRouter } from 'next/navigation';
import { user } from '@/lib/slices/userSlice';
import { connectionsData } from '@/helpers/connectionsData';

const tabTitle = [
  {
    id: 0,
    title: 'Investment Range',
  },
  {
    id: 1,
    title: 'Industry',
  },
  {
    id: 2,
    title: 'Location',
  },
  {
    id: 3,
    title: 'Desired Company Stage',
  },
  {
    id: 4,
    title: 'Desired Development Stage',
  },
  {
    id: 5,
    title: 'Desired Return',
  },
];

const SearchInvestorsPage = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };
  const [investorData, setInvestorData] = useState<any>([]);
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popper' : undefined;
  const { socket } = useSocket();
  const userDetails: any = useAppSelector(user);
  const router = useRouter();
  const [connectView, setConnectView] = useState(false);
  const [connectLoading, setConnectLoading] = useState<any>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>('');
  const [filters, setFilters] = useState<any>();
  const debouncedSearchTerm = useDebouncedValue(searchValue, 700);
  const [keepMounted, setKeepMounted] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPage] = useState<number>(1);
  const [count, setCount] = useState<number>(0);

  const fetchSearchInvestor = useCallback(
    async (search = false) => {
      if (search) {
        setCurrentPage(1);
      }
      try {
        setIsLoading(true);
        const res: any = await api.post(
          getInvestors,
          {
            ...filters,
            search: debouncedSearchTerm,
            page: currentPage,
            limit: 12,
          },
          'application/json'
        );
        if (res.success && res.data) {
          setIsLoading(false);
          setInvestorData(res.data.data);
          setTotalPage(res.data.pagination.totalPages);
          setCount(res.data.pagination.totalCount);
        }
      } catch (error: any) {
        setIsLoading(false);
        toast.error(error?.response?.data?.message || 'Something went wrong');
      }
    },
    [filters, debouncedSearchTerm, currentPage]
  );

  useEffect(() => {
    fetchSearchInvestor(true);
  }, [filters, debouncedSearchTerm]);

  useEffect(() => {
    fetchSearchInvestor();
  }, [currentPage]);

  // react-hook-form
  const {
    register,
    setValue,
    resetField,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<FieldValues>();

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setFilters(data);
    setAnchorEl(null);
    setKeepMounted(true);
  };

  const handleReset = () => {
    reset();
    setFilters({});
    setAnchorEl(null);
    setKeepMounted(false);
  };

  const onModalClose = () => {
    resetField;
    setAnchorEl(null);
  };

  const onConnect = async (userId: string) => {
    try {
      setConnectLoading((prevLoading: any) => ({
        ...prevLoading,
        [userId]: true,
      }));

      const res = await api.post(createConnectionRequest, {
        connect_user_id: userId,
      });
      socket?.emit('send_invitation', {
        sender: userDetails._id.toString(),
        receiver: userId.toString(),
      });
      if (res.success) {
        setConnectLoading((prevLoading: any) => ({
          ...prevLoading,
          [userId]: false,
        }));
        fetchSearchInvestor();
        setConnectView(true);
      }
    } catch (error: any) {
      setConnectLoading((prevLoading: any) => ({
        ...prevLoading,
        [userId]: false,
      }));
      toast.error(error?.response.data.message || 'Request unsuccessful');
    }
  };

  const onStartChat = (investorId: string) => {
    if (socket && userDetails) {
      socket.emit('user_online', userDetails._id);

      socket.emit('create_room', {
        sender: userDetails._id.toString(),
        receiver: investorId.toString(),
      });

      socket.on('chat_room_id', (roomId: any) => {
        router.push(`/founder/chats/${roomId}`);
      });
    }
  };

  const handleChangePage = (e: any, p: number) => {
    setCurrentPage(p);
  };

  return (
    <SearchInvestorsWrapper>
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
          Search Investors
        </Typography>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={1}
        >
          <FilterButton
            variant="contained"
            onClick={handleClick}
            startIcon={<FilterAltOutlinedIcon />}
            aria-describedby={id}
            type="button"
          >
            Filters
          </FilterButton>
          <SearchInvestorsInputWrapper
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            spacing={4}
          >
            <SearchInvestorsInput
              type="text"
              id="search"
              name="search"
              placeholder="Search by name or email"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Stack alignItems="center">
              <SearchIcon />
            </Stack>
          </SearchInvestorsInputWrapper>
        </Stack>
      </Stack>
      <Popper
        id={id}
        open={open}
        anchorEl={anchorEl}
        ref={popperRef}
        keepMounted={keepMounted}
      >
        <PopperBoxWrapper>
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
              // defaultValue=""
              defaultValue={getValues('industry') || []}
            />
            <MultiSelectInput
              name="location"
              options={locationOption}
              register={register}
              errors={errors}
              setValue={setValue}
              placeholder="Select Location"
              defaultValue={getValues('location') || []}
            />
            <MultiSelectInput
              name="desired_company_stage"
              options={desiredFundingStage}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Desired Company/Funding Stage"
              defaultValue={getValues('desired_company_stage') || []}
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
              name="investor_benefits"
              options={desiredInvestorBenefits}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Investor benefits"
              defaultValue={getValues('investor_benefits') || []}
            />
            <InputField
              name="desired_return"
              register={register}
              errors={errors}
              label=""
              type="number"
              placeholder="Desired return"
            />
            <MultiSelectInput
              name="exit_strategy"
              options={exitStrategy}
              register={register}
              setValue={setValue}
              errors={errors}
              placeholder="Exit Strategy"
              defaultValue={getValues('exit_strategy') || []}
            />
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={1}
              mt={1}
            >
              <FilterButtonWrapper
                variant="outlined"
                onClick={handleReset}
              >
                Reset
              </FilterButtonWrapper>
              <FilterButtonWrapper
                variant="contained"
                type="submit"
              >
                Apply
              </FilterButtonWrapper>
            </Stack>
          </form>
        </PopperBoxWrapper>
      </Popper>
      <Box mt={2}>
        {!isLoading ? (
          <Grid
            container
            spacing={2}
          >
            {userDetails?.subPlan === 'PREMIUM' && (
              <>
                {investorData.length > 0 ? (
                  investorData.map((item: any) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      lg={3}
                      key={item._id}
                    >
                      <InvestorCard
                        key={item._id}
                        data={item}
                        type={FOUNDER}
                        cardType="liked"
                        onConnect={onConnect}
                        isLoading={!!connectLoading[item._id]}
                        loadingText="Requesting..."
                        onStartChat={onStartChat}
                      />
                    </Grid>
                  ))
                ) : (
                  <Grid
                    item
                    xs={12}
                  >
                    <Typography
                      align="center"
                      variant="h6"
                      mt={2}
                    >
                      No Investor Found
                    </Typography>
                  </Grid>
                )}
              </>
            )}
          </Grid>
        ) : (
          <Typography
            align="center"
            variant="h6"
            mt={2}
          >
            Loading ...
          </Typography>
        )}
        <Grid
          container
          spacing={2}
        >
          {userDetails?.subPlan === 'FREE' &&
            connectionsData.map((item: any) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={item._id}
              >
                <InvestorCard
                  key={item._id}
                  data={item}
                  type={FOUNDER}
                  cardType="liked"
                  onConnect={onConnect}
                  isLoading={!!connectLoading[item._id]}
                  loadingText="Requesting..."
                  onStartChat={onStartChat}
                  isBlurred={true}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      {count > 12 && (
        <Box
          display="flex"
          justifyContent="center"
          mt={5}
        >
          <Pagination
            color="primary"
            siblingCount={0}
            count={totalPages}
            page={currentPage}
            onChange={handleChangePage}
          />
        </Box>
      )}

      <CommonModal
        open={connectView}
        onClose={() => setConnectView(false)}
      >
        <ModalBoxWrapper>
          <Stack
            alignItems="center"
            direction="column"
            minHeight="100%"
            justifyContent="space-between"
          >
            <ModalIconWrapper>
              <CheckIconWrapper />
            </ModalIconWrapper>
            <Typography
              variant="h3"
              textAlign="center"
              p={3}
            >
              Connection Request Sent Successfully{' '}
            </Typography>
            <CustomButton
              color="blue"
              onClick={() => setConnectView(false)}
            >
              Close
            </CustomButton>
          </Stack>
        </ModalBoxWrapper>
      </CommonModal>
    </SearchInvestorsWrapper>
  );
};

export default SearchInvestorsPage;
