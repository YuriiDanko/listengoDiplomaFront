import { Navigate, Route, Router, Routes } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { Auth } from '../../screens/auth';
import { useAuth } from '../../hooks/auth';
import { Button } from '@mantine/core';
import Home from '../../screens/Home';

const AppRouter = () => {
  const { user, logout } = useAuth();

  // Define routes accessible only to authenticated users
  return (
    <Routes>
      {/* Public Routes */}
      {!user?.token && (
        <>
          <Route path='/register' element={<Auth isLogin={false} />} />
          <Route path='/login' element={<Auth isLogin={true} />} />
        </>
      )}

      {/* Protected Routes */}
      {user?.token && (
        <Route path='/' element={<ProtectedRoute />}>
          <Route path='/' element={<Home />} />
          <Route path='/profile' element={<div>User Profile</div>} />
          <Route path='/logout' element={<Button onClick={logout}>LogOut</Button>} />
        </Route>
      )}

      {/* Fallback Route */}
      <Route path='*' element={<Navigate to={user?.token ? '/' : '/login'} replace />} />
    </Routes>
  );
};

export default AppRouter;
