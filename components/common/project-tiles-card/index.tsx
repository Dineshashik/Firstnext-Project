import { CardWrapper } from '@/components/common/ui';
import { Typography, Stack, Divider, Box, List, ListItem } from '@mui/material';
import Image from 'next/image';
import { useState } from 'react';
import CommonModal from '../modal';
import { ProjectInfoCardWrapper } from './style';

interface ProjectOverViewDataType {
  id: number;
  iconUrl: string;
  title: string;
  value: string;
}

const ProjectTilesCard = ({
  title,
  data,
}: {
  title: string;
  data: ProjectOverViewDataType[];
}) => {
  const [expanded, setExpanded] = useState(false);
  const [modalData, setModalData] = useState<any>();

  const handleViewMore = (value: string[]) => {
    setModalData(value);
    setExpanded(true);
  };
  return (
    <CardWrapper>
      <Typography variant="h4">{title}</Typography>
      {data?.map((item: any) => (
        <Box key={item.id}>
          <Divider sx={{ margin: '24px 0px' }} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack
              direction="row"
              alignItems="center"
            >
              <Image
                src={item.iconUrl}
                alt={item.title}
                width={24}
                height={24}
              />
              <Typography
                ml={2}
                variant="body2"
              >
                {item.title}
              </Typography>
            </Stack>
            {/* <Typography variant="h4" fontSize={16} align="right">
              {item.value}
            </Typography> */}

            {item.title === 'Revenue Model' ||
            item.title === 'Funding Requirements' ? (
              <Box
                sx={{
                  maxHeight: '70px',
                  maxWidth: '250px',
                  overflowY: 'auto',
                  overflowX: 'none',
                }}
              >
                <Typography
                  variant="h4"
                  fontSize={16}
                  align="right"
                >
                  {Array.isArray(item.value) ? (
                    <span>{item.value}</span>
                  ) : (
                    <span style={{ wordBreak: 'break-all' }}>{item.value}</span>
                  )}
                </Typography>
              </Box>
            ) : (
              <Typography
                variant="h4"
                fontSize={16}
                align="right"
              >
                {Array.isArray(item.value) ? item.value.join(', ') : item.value}
              </Typography>
            )}
          </Stack>
        </Box>
      ))}
    </CardWrapper>
  );
};

export default ProjectTilesCard;
