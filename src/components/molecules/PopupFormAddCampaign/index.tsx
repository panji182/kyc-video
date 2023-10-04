'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';

import { CampaignInput } from '@/types/template/Campaign';
import { toRem } from '@/helpers/globalFunctions';
import { Dayjs } from 'dayjs';

const Modal = dynamic(() => import('@/components/atoms/Modal'));
const TextInput = dynamic(() => import('@/components/atoms/TextInput'));
const Select = dynamic(() => import('@/components/atoms/Select'));
const Button = dynamic(() => import('@/components/atoms/Button'));

type Props = {
  open: boolean;
  // eslint-disable-next-line no-unused-vars
  onSubmited: (e: CampaignInput) => void;
  onClosePopup: () => void;
};

const optionsWorkHour = [
  {
    value: 'wha',
    label: 'Work Hour A',
  },
  {
    value: 'whb',
    label: 'Work Hour B',
  },
];

const optionsHolidays = [
  {
    value: 'Idul Fitri',
    label: 'Idul Fitri',
  },
  {
    value: 'Maulud Nabi',
    label: 'Maulud Nabi',
  },
  {
    value: 'Idul Adha',
    label: 'Idul Adha',
  },
  {
    value: 'Tahun Baru Hijriyah',
    label: 'Tahun Baru Hijriyah',
  },
];

const initCampaignInput: CampaignInput = {
  name: '',
  workHour: '',
  holiday: [optionsHolidays[0].value],
};

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
              id="workHour"
              label="Work Hour"
              options={optionsWorkHour}
              isFormInput={true}
              value={campaignInput.workHour}
              onChange={val => handleSelect(val, 'workHour')}
              sx={{ margin: 0 }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Select
              id="holiday"
              label="Holiday"
              options={optionsHolidays}
              isFormInput={true}
              value={campaignInput.holiday}
              onChange={val => handleSelect(val, 'holiday')}
              isMultipleSelect={true}
              sx={{ margin: 0 }}
            />
          </Grid>
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
