import React from 'react';

import Box from '@mui/material/Box';

import { useTheme } from '@mui/material/styles';

import { CustomTypography } from '@/materials/Typography';

interface TitleProps {
  children?: React.ReactNode;
  color?: string;
  variant?:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'subtitle1'
    | 'subtitle2'
    | 'body1'
    | 'body2'
    | 'button'
    | 'caption'
    | 'overline';
  sx?: object;
}

function Title({ children, variant, color, sx }: TitleProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignSelf: 'center',
        backgroundColor: { color },
        ...sx,
      }}
    >
      <Box>
        <CustomTypography
          variant={variant}
          color={color ? color : theme.palette.primary.main}
          textAlign="center"
          gutterBottom
          sx={{
            textDecoration: 'underline',
          }}
        >
          {children}
        </CustomTypography>
      </Box>
    </Box>
  );
}

export default Title;
