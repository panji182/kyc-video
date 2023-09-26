import { useState } from 'react';
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
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { ModalComp as Modal } from '@/components/atoms/Modal';
import { SelectComp as Select } from '@/components/atoms/Select';
import { ButtonComp as Button } from '@/components/atoms/Button';
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

const optionsAgent = [
  {
    value: 'agent1',
    label: 'Agent 1',
  },
  {
    value: 'agent2',
    label: 'Agent 2',
  },
];

const optionsCustomerChannel = [
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

const optionsDuration = [
  {
    value: 'equal',
    label: '=',
  },
  {
    value: 'greaterThan',
    label: '>',
  },
  {
    value: 'greaterThanOrEqual',
    label: '>=',
  },
  {
    value: 'lessThan',
    label: '<',
  },
  {
    value: 'lessThanOrEqual',
    label: '<=',
  },
];

type Props = {
  open: boolean;
  onSearched: (e: any) => void;
  onClosePopup: () => void;
};

export const PopupAdvancedSearch = ({
  open,
  onSearched,
  onClosePopup,
}: Props) => {
  const [expanded, setExpanded] = useState<string | false>('panelAgent');
  const [selectedOption, setSelectOption] = useState<string>('');

  const [selectAgents, setSelectAgents] = useState<any>([]);
  const [selectCustomerChannel, setSelectCustomerChannel] = useState<any>('');
  const [cif, setCif] = useState<string>('');
  const [fromTheLast, setFormTheLast] = useState<string>('');
  const [criteria, setCriteria] = useState<string>('');
  const [duration, setDuration] = useState<number>(0);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  const handleChangeOptions = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectOption(event.target.value);
  };

  const handleClear = () => {
    setSelectAgents([]);
    setSelectCustomerChannel('');
    setCif('');
    setFormTheLast('');
    setCriteria('');
    setDuration(0);

    setSelectOption('');
    setExpanded('panelAgent');
  };

  const handleSearch = () => {
    onSearched({
      agents: selectAgents,
      customerChannel: selectCustomerChannel,
      cif,
    });
    alert('Searching applied !!');
  };

  return (
    <Modal open={open} title={'Advanced Search'} onClose={() => onClosePopup()}>
      <>
        <Box sx={{ marginBottom: toRem(16) }}>
          <Accordion
            expanded={expanded === 'panelAgent'}
            onChange={handleChange('panelAgent')}
          >
            <AccordionSummary
              aria-controls="panelAgent-content"
              id="panelAgent-header"
            >
              <Typography>Agent</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Select
                label="Agent"
                isMultipleSelect={true}
                options={optionsAgent}
                value={selectAgents}
                onChange={e => setSelectAgents(e)}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panelCustomerChannel'}
            onChange={handleChange('panelCustomerChannel')}
          >
            <AccordionSummary
              aria-controls="panelCust-content"
              id="panelCust-header"
            >
              <Typography>Customer Channel</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Select
                label="Customer Channel"
                options={optionsCustomerChannel}
                value={selectCustomerChannel}
                onChange={e => setSelectCustomerChannel(e)}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panelCustomer'}
            onChange={handleChange('panelCustomer')}
          >
            <AccordionSummary
              aria-controls="panelCustomer-content"
              id="panelCustomer-header"
            >
              <Typography>Customer</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <TextField
                  id="Cif"
                  value={cif}
                  label="Cif"
                  variant="outlined"
                  onChange={e => setCif(e.target.value)}
                />
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panelDateRange'}
            onChange={handleChange('panelDateRange')}
          >
            <AccordionSummary
              aria-controls="panelDateRange-content"
              id="panelDateRange-header"
            >
              <Typography>Date Range</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <table>
                    <tr>
                      <td>
                        <Radio
                          id="fromTheLast"
                          checked={selectedOption === 'fromTheLast'}
                          onChange={handleChangeOptions}
                          value="fromTheLast"
                          name="radio-buttons"
                        />
                      </td>
                      <td>
                        <label htmlFor="fromTheLast">From The Last</label>
                      </td>
                      <td>
                        <TextField
                          id="fromTheLast"
                          type="number"
                          placeholder="day(s)"
                          value={fromTheLast}
                          variant="outlined"
                          onChange={e => setFormTheLast(e.target.value)}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <Radio
                          id="from"
                          checked={selectedOption === 'range'}
                          onChange={handleChangeOptions}
                          value="range"
                          name="radio-buttons"
                        />
                      </td>
                      <td>
                        <label htmlFor="from">From</label>
                      </td>
                      <td>
                        {' '}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker />
                        </LocalizationProvider>
                      </td>
                    </tr>
                    <tr>
                      <td>&nbsp;</td>
                      <td>
                        <label>To</label>
                      </td>
                      <td>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker />
                        </LocalizationProvider>
                      </td>
                    </tr>
                  </table>
                </RadioGroup>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panelDuration'}
            onChange={handleChange('panelDuration')}
          >
            <AccordionSummary
              aria-controls="panelDuration-content"
              id="panelDuration-header"
            >
              <Typography>Duration</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl>
                <Select
                  label="Duration"
                  options={optionsDuration}
                  value={selectCustomerChannel}
                  onChange={e => setSelectCustomerChannel(e)}
                />
              </FormControl>
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
