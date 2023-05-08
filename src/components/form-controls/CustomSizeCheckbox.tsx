import Checkbox, { CheckboxProps } from '@mui/material/Checkbox';
import { Theme } from '@mui/material/styles';
import styled, { StyledComponent } from '@emotion/styled';

const CustomSizeCheckbox = styled(Checkbox, {
  shouldForwardProp: (propName) => propName !== 'size',
})(({ size = 24 }) => ({
  svg: {
    height: size,
    width: size,
  },
})) as StyledComponent<
  Omit<CheckboxProps, 'size'> & { theme?: Theme | undefined },
  { size?: number },
  {}
>;

export default CustomSizeCheckbox;
