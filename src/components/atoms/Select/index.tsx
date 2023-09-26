import { useState, useEffect } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';

import styles from './index.styles';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(
  label: string,
  selectLabel: readonly string[],
  theme: Theme
) {
  return {
    fontWeight:
      (selectLabel || ['']).indexOf(label) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

interface OptionsType {
  value: string;
  label: string;
}

type Props = {
  label: string;
  options: OptionsType[];
  value: any;
  onChange: (e: any) => void;
  isMultipleSelect?: boolean;
};

export const SelectComp = ({
  label,
  options,
  value,
  onChange,
  isMultipleSelect = false,
}: Props) => {
  const theme = useTheme();
  const [selectValue, setSelectValue] = useState('');
  const [selectValueArr, setSelectValueArr] = useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent) => {
    setSelectValue(event.target.value as string);
    onChange(event.target.value as string);
  };

  const handleChangeArr = (event: SelectChangeEvent<typeof selectValueArr>) => {
    const {
      target: { value },
    } = event;
    setSelectValueArr(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    onChange(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
  };

  useEffect(() => {
    if (isMultipleSelect) {
      setSelectValueArr(value);
    } else {
      setSelectValue(value);
    }
  }, [value, isMultipleSelect]);

  return isMultipleSelect ? (
    <Box>
      <FormControl sx={styles.formControl}>
        <InputLabel id="multiple-chip-label">{label}</InputLabel>
        <Select
          labelId="multiple-chip-label"
          id="multiple-chip"
          multiple
          value={selectValueArr}
          onChange={handleChangeArr}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={selected => (
            <Box sx={styles.selectedSelect}>
              {selected.map(value => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map(item => (
            <MenuItem
              key={item.value}
              value={item.value}
              style={getStyles(item.label, selectValueArr, theme)}
            >
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  ) : (
    <Box>
      <FormControl sx={styles.formControl}>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={selectValue}
          label={label}
          onChange={handleChange}
        >
          {options.map(item => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
