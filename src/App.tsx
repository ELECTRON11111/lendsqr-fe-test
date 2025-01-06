// import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import DashboardRoutes from './pages/dashboard/layout';
import PageNotFound from './pages/404';
// import Users from './pages/dashboard/pages/users';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path="/dashboard/*" element={<DashboardRoutes />} />
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
