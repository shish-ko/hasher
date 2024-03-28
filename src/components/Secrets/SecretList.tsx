import { useState } from "react";
import { IUserSecrets } from "~interfaces/index";
import { AvailableSecret } from "./AvailableSecret";
import { Accordion, AccordionDetails, AccordionSummary, Button, Divider, Menu, MenuItem, MenuItemProps, Stack, Typography, styled } from "@mui/material";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { FutureSecret } from "./FutureSecret";
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import DownIcon from '@mui/icons-material/South';
import UpIcon from '@mui/icons-material/North';

interface ISecretsList {
  secrets: IUserSecrets,
  refetch: (searchParams?: URLSearchParams) => void,
}

const SortMenuItem = styled((props: MenuItemProps) => <MenuItem {...props} disableGutters />)({ fontSize: '1.2rem', p: '3px 10px' });

export const SecretsList: React.FC<ISecretsList> = ({ secrets: { availableSecrets, futureSecrets, subscribedTo }, refetch }) => {
  const [anchor, setAnchor] = useState<null | HTMLButtonElement>(null);
  const sortParams = new URLSearchParams();

  const createdASC = () => {
    sortParams.append('sort', 'createdASC');
    refetch(sortParams);
  };
  const createdDESC = () => {
    sortParams.append('sort', 'createdDESC');
    refetch(sortParams);
  };
  const availableASC = () => {
    sortParams.append('sort', 'availableASC');
    refetch(sortParams);
  };
  const availableDESC = () => {
    sortParams.append('sort', 'availableDESC');
    refetch(sortParams);
  };

  return (
    <>
      {
        availableSecrets.length ?
          <Accordion sx={{ backgroundColor: 'background.default' }} defaultExpanded>
            <AccordionSummary expandIcon={<ArrowDownwardIcon htmlColor="white" fontSize="large" />}>
              <Typography variant="h3" color="white" mb={0}>Available secrets:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button onClick={(e) => { setAnchor(e.currentTarget); }} endIcon={<KeyboardDoubleArrowDownIcon />} sx={{ position: 'absolute', right: 0, mb: 1 }}>
                Sort by
              </Button>
              <Menu open={!!anchor} anchorEl={anchor} onClose={() => { setAnchor(null); }} transformOrigin={{ vertical: 'top', horizontal: 'right' }} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} >
                <SortMenuItem onClick={createdASC}><UpIcon fontSize="small" /> Created ASC</SortMenuItem>
                <SortMenuItem onClick={createdDESC}><DownIcon fontSize="small" /> Created DESC</SortMenuItem>
                <Divider />
                <SortMenuItem onClick={availableASC}><UpIcon fontSize="small" />Available ASC</SortMenuItem>
                <SortMenuItem onClick={availableDESC}><DownIcon fontSize="small" /> Available DESC</SortMenuItem>
              </Menu>
              <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10} mt={20}>
                {availableSecrets.map((secret) => <AvailableSecret secret={secret} key={secret.id} />)}
              </Stack>
            </AccordionDetails>
          </Accordion>
          :
          <Accordion disabled>
            <AccordionSummary>
              <Typography variant="h3" color="white" mb={0}>There is no available secrets</Typography>
            </AccordionSummary>
          </Accordion>
      }
      {
        futureSecrets.length ?
          <Accordion sx={{ backgroundColor: 'background.default' }}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon htmlColor="white" fontSize="large" />}>
              <Typography variant="h3" color="white" mb={0}>Future secrets:</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10}>
                {futureSecrets.map((secret) => <FutureSecret secret={secret} countdownHandler={refetch} sx={{ flexBasis: '30%' }} key={secret.id} />)}
              </Stack>
            </AccordionDetails>
          </Accordion> :
          <Accordion disabled>
            <AccordionSummary>
              <Typography variant="h3" color="white" mb={0}>There is no future secrets</Typography>
            </AccordionSummary>
          </Accordion>
      }
      {
        !!subscribedTo?.availableSecrets.length &&
        <Accordion sx={{ backgroundColor: 'background.default' }}>
          <AccordionSummary expandIcon={<ArrowDownwardIcon htmlColor="white" fontSize="large" />}>
            <Typography variant="h3" color="white" mb={0}>Subscribed available secrets:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10} mt={20}>
              {subscribedTo.availableSecrets.map((secret) => <AvailableSecret secret={secret} key={secret.id} />)}
            </Stack>
          </AccordionDetails>
        </Accordion>
      }
      {
        !!subscribedTo?.futureSecrets.length &&
        <Accordion sx={{ backgroundColor: 'background.default' }}>
          <AccordionSummary expandIcon={<ArrowDownwardIcon htmlColor="white" fontSize="large" />}>
            <Typography variant="h3" color="white" mb={0}>Subscribed future secrets:</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Stack direction='row' gap='5%' flexWrap='wrap' rowGap={10} mt={20}>
              {subscribedTo.futureSecrets.map((secret) => <FutureSecret secret={secret} countdownHandler={refetch} sx={{ flexBasis: '30%' }} key={secret.id} />)}
            </Stack>
          </AccordionDetails>
        </Accordion>
      }
    </>
  );
};
