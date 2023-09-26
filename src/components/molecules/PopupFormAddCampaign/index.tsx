'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';

import { CampaignInput } from '@/types/template/Campaign';
import { toRem } from '@/helpers/globalFunctions';
import { Dayjs } from 'dayjs';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const Button = dynamic(() => import('@/components/atoms/Button'));
const DatePicker = dynamic(() => import('@/components/atoms/DatePicker'));
const TimePicker = dynamic(() => import('@/components/atoms/TimePicker'));
const HolidayPicker = dynamic(() => import('@/components/atoms/HolidayPicker'));
const DayOfWeekPicker = dynamic(
  () => import('@/components/atoms/DayOfWeekPicker')
);

const initCampaignInput: CampaignInput = {
  name: '',
  type: '',
  dateStart: undefined,
  dateEnd: undefined,
  timeStart: undefined,
  timeEnd: undefined,
};

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: CampaignInput) => void;
  onClosePopup: () => void;
};

const optionsCampaignType = [
  {
    value: 'default',
    label: 'Default',
  },
  {
    value: 'special',
    label: 'Special Campaign',
  },
];

const PopupFormAddCampaign = ({ open, onSubmited, onClosePopup }: Props) => {
  const [campaignInput, setCampaignInput] =
    useState<CampaignInput>(initCampaignInput);

  const handleInput = (value: string | Dayjs | null, name: string) => {
    setCampaignInput((prevState: CampaignInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelect = (value: string, name: string) => {
    setCampaignInput((prevState: CampaignInput) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setCampaignInput({ ...initCampaignInput });
  };

  const handleSubmit = () => {
    onSubmited({ ...campaignInput });
    onClosePopup();
  };

  const handleSelectDays = (selectedDays: boolean[]) => {
    console.log(81, selectedDays);
  };

  return (
    <Modal open={open} title={'Create Campaign'} onClose={() => onClosePopup()}>
      <>
        <Grid container spacing={1} sx={{ marginBottom: toRem(16) }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <TextInput
              id="name"
              label="Enter Campaign Name"
              formInput={true}
              placeholder="Enter Campaign Name"
              value={campaignInput.name}
              variant="outlined"
              onChange={val => handleInput(val, 'name')}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="type"
              label="Campaign Type"
              options={optionsCampaignType}
              isFormInput={true}
              value={campaignInput.type}
              onChange={val => handleSelect(val, 'type')}
              sx={{ margin: 0 }}
            />
          </Grid>
          {campaignInput.type === 'default' && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>Working Hour</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <>
                  <DayOfWeekPicker
                    lang={'en'}
                    onSelectDays={handleSelectDays}
                  />
                </>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>From</FormLabel>
                  <TimePicker
                    value={campaignInput.timeStart}
                    onChange={newValue => handleInput(newValue, 'timeStart')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>To</FormLabel>
                  <TimePicker
                    value={campaignInput.timeEnd}
                    onChange={newValue => handleInput(newValue, 'timeEnd')}
                  />
                </FormControl>
              </Grid>
            </>
          )}
          {campaignInput.type === 'special' && (
            <>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>Period</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>From</FormLabel>
                  <DatePicker
                    value={campaignInput.dateStart}
                    onChange={newValue => handleInput(newValue, 'dateStart')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>To</FormLabel>
                  <DatePicker
                    value={campaignInput.dateEnd}
                    onChange={newValue => handleInput(newValue, 'dateEnd')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>Time</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>From</FormLabel>
                  <TimePicker
                    value={campaignInput.timeStart}
                    onChange={newValue => handleInput(newValue, 'timeStart')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <FormControl
                  sx={{
                    marginLeft: toRem(8),
                    marginRight: toRem(8),
                    maxWidth: toRem(200),
                  }}
                >
                  <FormLabel sx={{ mb: toRem(8) }}>To</FormLabel>
                  <TimePicker
                    value={campaignInput.timeEnd}
                    onChange={newValue => handleInput(newValue, 'timeEnd')}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography>Holiday</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <HolidayPicker
                  minDate={campaignInput.dateStart}
                  maxDate={campaignInput.dateEnd}
                />
              </Grid>
            </>
          )}
        </Grid>
        <Stack direction="row" justifyContent="flex-end" gap={2}>
          <Button
            label="Clear"
            variant="contained"
            color="error"
            onClick={handleClear}
          />
          <Button label="Submit" variant="contained" onClick={handleSubmit} />
        </Stack>
      </>
    </Modal>
  );
};

export default PopupFormAddCampaign;
