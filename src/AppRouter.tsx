import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

import Discover from '@screens/Discover/Discover';

import { AppRoutes } from '@constants/index';

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route path={AppRoutes.DISCOVER} element={<Discover />} />
    </Routes>
  );
};

export default AppRouter;
