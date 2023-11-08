import { useState, useEffect } from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormLabel from '@mui/material/FormLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { toRem } from '@/helpers/globalFunctions';

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
  value: string | number;
  label: string;
}

const FormControlStyle = styled(FormControl)(({ theme }) => ({
  width: toRem(200),

  [theme.breakpoints.down('md')]: {
    width: '100%',
  },
}));

type Props = {
  id?: string;
  label?: string;
  options: OptionsType[];
  value: any;
  // eslint-disable-next-line no-unused-vars
  onChange: (e: any) => void;
  // eslint-disable-next-line no-unused-vars
  onBlur?: (e: any) => void;
  error?: boolean;
  sx?: any;
  isMultipleSelect?: boolean;
  isFormInput?: boolean;
};

const SelectComp = ({
  id,
  label,
  options,
  value,
  onChange,
  isMultipleSelect = false,
  isFormInput = false,
  error = false,
  sx,
  ...props
}: Props) => {
  const theme = useTheme();
  const [selectValue, setSelectValue] = useState('');
  const [selectValueArr, setSelectValueArr] = useState<string[]>([]);
  const usedId = id ? { id } : {};
  const usedLabel = label && !isFormInput ? { label } : {};

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

  const renderSelectType = () => {
    const fieldSetStyle = {
      '& fieldset': {
        top: 0,
      },
    };
    return isMultipleSelect ? (
      <Select
        {...usedId}
        {...usedLabel}
        displayEmpty={isFormInput}
        labelId="multiple-chip-label"
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
        sx={{
          ...fieldSetStyle,
          ...sx,
        }}
        {...props}
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
    ) : (
      <Select
        {...usedId}
        {...usedLabel}
        displayEmpty={isFormInput}
        labelId="simple-select-label"
        value={selectValue}
        onChange={handleChange}
        sx={{
          ...fieldSetStyle,
          ...sx,
        }}
        {...props}
      >
        {options.map(item => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  return !isFormInput ? (
    <FormControlStyle error={error}>
      <InputLabel {...usedId} sx={styles.textLabel}>
        {label}
      </InputLabel>
      {renderSelectType()}
    </FormControlStyle>
  ) : (
    <FormControlStyle
      error={error}
      sx={{
        '& .MuiOutlinedInput-notchedOutline legend': {
          display: 'none',
        },
      }}
    >
      <FormLabel
        {...usedId}
        sx={{ ...styles.textLabel, ...styles.bottomSpace }}
      >
        {label}
      </FormLabel>
      {renderSelectType()}
    </FormControlStyle>
  );
};

export default SelectComp;
