import { FC } from 'react';

import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';

const LoaderWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: 150,
}));

const Loader: FC = () => {
  return (
    <LoaderWrapper>
      <CircularProgress />
    </LoaderWrapper>
  );
};

export default Loader;
