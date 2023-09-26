import { useState } from 'react';
import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const Button = dynamic(() => import('@/components/atoms/Button'));
import { toRem } from '@/helpers/globalFunctions';

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const optionsChannel = [
  {
    value: 'web',
    label: 'Web',
  },
  {
    value: 'Mobile',
    label: 'Mobile',
  },
  {
    value: 'kiosk',
    label: 'Kiosk',
  },
];

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSearched: (e: any) => void;
  onClosePopup: () => void;
};

const PopupAdvancedSearchDailySummary = ({
  open,
  onSearched,
  onClosePopup,
}: Props) => {
  const [expanded, setExpanded] = useState<string | false>('panelChannel');

  const [selectChannel, setSelectChannel] = useState<string>('');

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleClear = () => {
    setSelectChannel('');

    setExpanded('panelChannel');
  };

  const handleSearch = () => {
    onSearched({
      channel: selectChannel,
    });
  };

  return (
    <Modal open={open} title={'Advanced Search'} onClose={() => onClosePopup()}>
      <>
        <Box sx={{ marginBottom: toRem(16) }}>
          <Accordion
            expanded={expanded === 'panelChannel'}
            onChange={handleChange('panelChannel')}
          >
            <AccordionSummary
              aria-controls="panelChannel-content"
              id="panelChannel-header"
            >
              <Typography>Channel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Select
                label="Channel"
                options={optionsChannel}
                value={selectChannel}
                onChange={e => setSelectChannel(e)}
              />
            </AccordionDetails>
          </Accordion>
        </Box>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button
            label="Clear"
            variant="contained"
            color="error"
            onClick={handleClear}
          />
          <Button label="Search" variant="contained" onClick={handleSearch} />
        </Stack>
      </>
    </Modal>
  );
};

export default PopupAdvancedSearchDailySummary;
