import { Box, Slider, Typography } from '@mui/material';
import useMounted from 'hooks/useMounted';
import * as React from 'react';
import FieldLabel from '../FieldLabel';
import { RangeInput, InputContainer, RangeInputProps } from './components';

type RangeFieldProps = {
  label: string;
  min?: number;
  max?: number;
  value?: NumberRange;
  onChangeCommitted?: (
    event: Event | React.SyntheticEvent<Element, Event>,
    value: NumberRange
  ) => void;
};

const orderRangeASC = (range: NumberRange) => range.sort((a, b) => a - b);

const DEFAULT_MIN = 0;
const DEFAULT_MAX = 100;
const DEFAULT_RANGE: NumberRange = [DEFAULT_MIN, DEFAULT_MAX];

const RangeField: React.FC<RangeFieldProps> = ({
  label,
  min,
  max,
  value = DEFAULT_RANGE,
  onChangeCommitted,
}) => {
  const isMounted = useMounted();
  const [bounds, setBounds] = React.useState<NumberRange>(DEFAULT_RANGE);
  const [privateValue, setPrivateValue] = React.useState<NumberRange>(DEFAULT_RANGE);
  const [privateMin, privateMax] = privateValue;
  const [lowerBound, higherBound] = bounds;

  const valueInRange = (newValue: number) => newValue <= higherBound && newValue >= lowerBound;

  const handleMinValueChange: RangeInputProps['onBlur'] = (e, newMinValue) => {
    const newValue = orderRangeASC([newMinValue, privateMax]);
    setPrivateValue(newValue);
  };

  const handleMaxValueChange: RangeInputProps['onBlur'] = (e, newMaxValue) => {
    const newValue = orderRangeASC([privateMin, newMaxValue]);
    setPrivateValue(newValue);
  };

  const calcInitialBounds = (): NumberRange => {
    const [minVal, maxVal] = orderRangeASC(value);
    const initialBounds: NumberRange = [min || minVal, max || maxVal];
    return initialBounds;
  };

  React.useEffect(() => {
    const initialBounds = calcInitialBounds();
    const initialPrivateValue = orderRangeASC(value) || initialBounds;

    setBounds(initialBounds);
    setPrivateValue(initialPrivateValue);
  }, []);

  React.useEffect(() => {
    if (isMounted) {
      setPrivateValue(value);
    }
  }, [value]);

  React.useEffect(() => {
    if (isMounted) {
      setBounds([min ?? lowerBound, max ?? higherBound]);
    }
  }, [min, max]);

  return (
    <Box>
      <FieldLabel sx={{ letterSpacing: '0.04em', mb: 1 }}>{label}</FieldLabel>
      <InputContainer>
        <RangeInput
          value={privateMin}
          onBlur={handleMinValueChange}
          newValueIsValid={valueInRange}
        />
        <Typography>to</Typography>
        <RangeInput
          value={privateMax}
          onBlur={handleMaxValueChange}
          newValueIsValid={valueInRange}
        />
      </InputContainer>
      <Box sx={{ mx: 3 }}>
        <Slider
          value={privateValue}
          min={lowerBound}
          max={higherBound}
          onChange={(_, newValue) => setPrivateValue(newValue as NumberRange)}
          onChangeCommitted={
            onChangeCommitted && ((e, val) => onChangeCommitted(e, val as NumberRange))
          }
        />
      </Box>
    </Box>
  );
};

export default RangeField;
