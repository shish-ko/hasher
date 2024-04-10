import { Accordion, AccordionDetails, AccordionSummary, Stack, Typography } from "@mui/material";
import { SecretSkeleton_S } from "./SecretSkeleton_S";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

export const SkeletonList: React.FC = () => {
  return (
    <Accordion sx={{ backgroundColor: 'background.default' }} defaultExpanded>
      <AccordionSummary expandIcon={<ArrowDownwardIcon htmlColor="white" fontSize="large" />}>
        <Typography variant="h3" color="white" mb={0}>Available secrets:</Typography>
      </AccordionSummary>
      <AccordionDetails>      
        <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10} mt={20}>
          <SecretSkeleton_S />
          <SecretSkeleton_S />
          <SecretSkeleton_S />
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};
