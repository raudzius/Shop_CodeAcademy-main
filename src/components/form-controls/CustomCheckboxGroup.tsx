import {
 Box, Checkbox, FormControlLabel, FormGroup,
} from '@mui/material';
import React from 'react';
import FieldLabel from './FieldLabel';

export type CheckboxOption = {
  value: string;
  label: string;
  checked?: boolean;
};

type CheckboxGroupProps = {
  formLabel: string;
  name: string;
  options: CheckboxOption[];
  value?: CheckboxOption[];
  onChange?: (e: React.ChangeEvent<HTMLInputElement>, value: CheckboxOption[]) => void;
};

type MutateOptions = (value: CheckboxOption[], option: CheckboxOption) => CheckboxOption[];

const CustomCheckboxGroup: React.FC<CheckboxGroupProps> = ({
  formLabel,
  name,
  options,
  value,
  onChange,
}) => {
  const checkboxGroupRef = React.useRef<null | HTMLDivElement>(null);
  const selectedValues = value && value.map((option) => option.value);

  const createAppendedValue: MutateOptions = (currentValue, option) => [...currentValue, option];

  const createReducedValue: MutateOptions = (currentValue, option) => currentValue
  .filter((x) => x.value !== option.value);

  const createControlledValue = (
    currentValue: CheckboxOption[],
    checked: boolean,
    newOption: CheckboxOption,
  ) => (checked
      ? createAppendedValue(currentValue, newOption)
      : createReducedValue(currentValue, newOption));

  const createUncontrolledValue = () => {
    const optionContainer = checkboxGroupRef.current as HTMLDivElement;
    const checkboxes = Array.from(
      optionContainer.querySelectorAll<HTMLInputElement>('input[type=checkbox]'),
    );
    return checkboxes
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => options
      .find((option) => option.value === checkbox.value)) as CheckboxOption[];
  };

  const handleRadioChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    newOption: CheckboxOption,
  ) => {
    if (onChange) {
      const newValue: CheckboxOption[] = value
        ? createControlledValue(value, checked, newOption)
        : createUncontrolledValue();

      onChange(e, newValue);
    }
  };

  return (
    <Box>
      <FieldLabel>{formLabel}</FieldLabel>
      <FormGroup sx={{ display: 'flex', flexDirection: 'column', px: 2 }} ref={checkboxGroupRef}>
        {options.map((option) => (
          <FormControlLabel
            key={option.value}
            control={(
              <Checkbox
                name={name}
                value={option.value}
                checked={selectedValues?.includes(option.value)}
                onChange={(e, newChecked) => handleRadioChange(e, newChecked, option)}
              />
            )}
            label={option.label}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default CustomCheckboxGroup;
