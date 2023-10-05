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
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { Dayjs } from 'dayjs';
import styles from './index.styles';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const TimePicker = dynamic(() => import('@/components/atoms/TimePicker'));
const DateTimePicker = dynamic(
  () => import('@/components/atoms/DateTimePicker')
);
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

const optionsKycStatus = [
  {
    value: 1,
    label: 'Passed',
  },
  {
    value: 0,
    label: 'Failed',
  },
];

const optionsCriteria = [
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
  // eslint-disable-next-line no-unused-vars
  onSearched: (e: any) => void;
  onClosePopup: () => void;
};

const PopupAdvancedSearchKyc = ({ open, onSearched, onClosePopup }: Props) => {
  const [expanded, setExpanded] = useState<string | false>('panelAgent');
  const [selectedOption, setSelectOption] = useState<string>('');

  const [selectAgents, setSelectAgents] = useState<any>([]);
  const [selectCustomerChannel, setSelectCustomerChannel] =
    useState<string>('');
  const [cif, setCif] = useState<string>('');
  const [fromTheLast, setFromTheLast] = useState<string>('');
  const [fromDateTime, setFromDateTime] = useState<Dayjs | null>(null);
  const [toDateTime, setToDateTime] = useState<Dayjs | null>(null);
  const [criteria, setCriteria] = useState<string>('');
  const [duration, setDuration] = useState<Dayjs | null>(null);
  const [kycName, setKycName] = useState<string>('');
  const [selectKycStatus, setSelectKycStatus] = useState<string>('');

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
    setFromTheLast('');
    setFromDateTime(null);
    setToDateTime(null);
    setCriteria('');
    setDuration(null);
    setKycName('');
    setSelectKycStatus('');

    setSelectOption('');
    setExpanded('panelAgent');
  };

  const handleSearch = () => {
    onSearched({
      agents: selectAgents,
      customerChannel: selectCustomerChannel,
      cif,
      lastDays: fromTheLast,
      fromDateTime: fromDateTime ? fromDateTime.format() : null,
      toDateTime: toDateTime ? toDateTime.format() : null,
      criteria,
      duration: duration ? duration.format('HH:mm:ss') : null,
      kycName,
      kycStatus: selectKycStatus,
    });
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
              <TextInput
                label="Cif"
                value={cif}
                variant="outlined"
                onChange={e => setCif(e)}
                sx={{ margin: toRem(8) }}
              />
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
              <FormControl sx={styles.formControl}>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                >
                  <table>
                    <tbody>
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
                          <TextInput
                            type="number"
                            value={fromTheLast}
                            variant="outlined"
                            placeholder="day(s)"
                            onChange={e => setFromTheLast(e)}
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
                          <DateTimePicker
                            value={fromDateTime}
                            onChange={newValue => setFromDateTime(newValue)}
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>&nbsp;</td>
                        <td>
                          <label>To</label>
                        </td>
                        <td>
                          <DateTimePicker
                            value={toDateTime}
                            onChange={newValue => setToDateTime(newValue)}
                          />
                        </td>
                      </tr>
                    </tbody>
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
              <Stack gap={1}>
                <Select
                  label="Criteria"
                  options={optionsCriteria}
                  value={criteria}
                  onChange={e => setCriteria(e)}
                />
                <TimePicker
                  label="Duration"
                  ampm={false}
                  format="HH:mm:ss"
                  value={duration}
                  onChange={newValue => setDuration(newValue)}
                  sx={{ margin: toRem(8) }}
                />
              </Stack>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panelKycName'}
            onChange={handleChange('panelKycName')}
          >
            <AccordionSummary
              aria-controls="panelKycName-content"
              id="panelKycName-header"
            >
              <Typography>KYC Name</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextInput
                label="KYC Name"
                value={kycName}
                variant="outlined"
                onChange={e => setKycName(e)}
                sx={{ margin: toRem(8) }}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === 'panelKycStatus'}
            onChange={handleChange('panelKycStatus')}
          >
            <AccordionSummary
              aria-controls="panelKycStatus-content"
              id="panelKycStatus-header"
            >
              <Typography>KYC Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Select
                label="KYC Status"
                options={optionsKycStatus}
                value={selectKycStatus}
                onChange={e => setSelectKycStatus(e)}
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

export default PopupAdvancedSearchKyc;
