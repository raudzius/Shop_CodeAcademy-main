import { Link, Typography, TypographyProps } from '@mui/material';
import React from 'react';

type CopyrightProps = TypographyProps;

const Copyright: React.FC<CopyrightProps> = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'Copyright © '}
    <Link color="inherit" href="https://mui.com/">
      Your Website
    </Link>
    {' '}
    {new Date().getFullYear()}
    .
  </Typography>
);

export default Copyright;
