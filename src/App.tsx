import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import DashboardLayout from './pages/dashboard/layout';
import PageNotFound from './pages/404';
// import Users from './pages/dashboard/pages/users';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />}/>
          <Route path="dashboard" element={<DashboardLayout />}>
            {/* <Route index element={<Users />} /> */}
            {/* <Route path="/:id" element={<Users />} /> */}
          </Route>
          <Route path='*' element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
