import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BrowseCars from './pages/Cars/BrowseCars'
import AddCar from './pages/Cars/AddCar'
import CarDetails from './pages/Cars/CarDetails'
import MyListings from './pages/Dashboard/MyListings'
import MyBookings from './pages/Dashboard/MyBookings'
import NotFound from './pages/NotFound'
import PrivateRoute from './routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="cars" element={<BrowseCars />} />
          <Route
            path="cars/:id"
            element={
              <PrivateRoute>
                <CarDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="add-car"
            element={
              <PrivateRoute>
                <AddCar />
              </PrivateRoute>
            }
          />
          <Route
            path="my-listings"
            element={
              <PrivateRoute>
                <MyListings />
              </PrivateRoute>
            }
          />
          <Route
            path="my-bookings"
            element={
              <PrivateRoute>
                <MyBookings />
              </PrivateRoute>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App