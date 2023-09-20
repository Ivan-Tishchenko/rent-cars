import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import Layout from './Layout/Layout';
import HomePage from './pages/HomePage/HomePage';
import CarsPage from './pages/CarsPage/CarsPage';
import Liked from './pages/Liked/Liked';
import { FavoritesProvider } from '../context/FavoriteContex';

const App = () => {
  return (
    <FavoritesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/catalog" element={<CarsPage />} />
          <Route path="/favorites" element={<Liked />} />
          <Route path="/*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </FavoritesProvider>
  );
};

export default App;
