import { Box, colors } from '@mui/material';
import React, { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const CenterContainer = ({ children }: Props) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: colors.blueGrey['300'],
      }}
    >
      {children}
    </Box>
  );
};

export default CenterContainer;
