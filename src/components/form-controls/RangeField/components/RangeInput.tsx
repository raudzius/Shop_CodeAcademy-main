import * as React from 'react';
import { FilledInput, FilledInputProps } from '@mui/material';

export type RangeInputProps = Omit<
  FilledInputProps,
  'size' | 'type' | 'multiline' | 'onBlur' | 'value'
> & {
  value: number;
  onBlur: (e: React.FocusEvent<HTMLInputElement>, val: number) => void;
  newValueIsValid: (val: number) => boolean;
};

const RangeInput: React.FC<RangeInputProps> = ({
  value,
  onBlur,
  newValueIsValid,
  sx = [],
  ...props
}) => {
  const [privateValue, setPrivateValue] = React.useState(value);

  const handleBlur: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    const newValue = Number(e.target.value);
    if (newValueIsValid(newValue)) {
      onBlur(e as React.FocusEvent<HTMLInputElement>, Number(e.target.value));
    } else {
      setPrivateValue(value);
    }
  };

  React.useEffect(() => setPrivateValue(value), [value]);

  return (
    <FilledInput
      size="small"
      type="number"
      multiline={false}
      sx={[
        {
          flexGrow: 1,
          '.MuiInputBase-input': { textAlign: 'center', pt: 1 },
        },
        ...(sx instanceof Array ? sx : [sx]),
      ]}
      value={privateValue}
      onChange={(e) => setPrivateValue(Number(e.target.value))}
      onBlur={handleBlur}
      {...props}
    />
  );
};

export default RangeInput;
