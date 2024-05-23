import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import Sidebar from '../Ui/sidebar/Sidebar';
import Player from '../Ui/player/Player';
import '../../styles/global.css';
import Search from '../Ui/search/Search';

export const ProtectedRoute = () => {
  const { user, logout } = useAuth();

  if (!user || !user.token) {
    return <Navigate to='/login' />;
  }

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div className='main-body'>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Search />
          <Outlet />
        </div>
      </div>
      <Player />
    </div>
  );
};
