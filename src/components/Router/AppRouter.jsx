import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Auth } from '../../screens/auth';
import { useAuth } from '../../hooks/auth';
import { Button } from '@mantine/core';
import { Recommendations } from '../../screens/Recommendations';
import SearchPage from '../../screens/SearchPage';
import HomePage from '../../screens/HomePage';
import AlbumPage from '../../screens/AlbumPage';
import ArtistPage from '../../screens/ArtistPage';
import PlaylistPage from '../../screens/PlaylistPage';

const AppRouter = () => {
  const { user, logout } = useAuth();

  return (
    <Routes>
      {!user?.token && (
        <>
          <Route path='/register' element={<Auth isLogin={false} />} />
          <Route path='/login' element={<Auth isLogin={true} />} />
        </>
      )}

      {user?.token && (
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/recommendations' element={<Recommendations />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/' element={<HomePage />} />
          <Route path='/album' element={<AlbumPage />} />
          <Route path='/artist' element={<ArtistPage />} />
          <Route path='/playlist' element={<PlaylistPage />} />
        </Route>
      )}

      <Route path='*' element={<Navigate to={user?.token ? '/' : '/login'} replace />} />
    </Routes>
  );
};

export default AppRouter;
