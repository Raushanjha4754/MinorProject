import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import UserList from './features/users/UserList';
import UserCreate from './features/users/UserCreate';
import Login from './features/auth/Login';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<UserList />} />
            <Route path="users" element={<UserList />} />
            <Route path="users/create" element={<UserCreate />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;