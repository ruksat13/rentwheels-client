import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import BrowseCars from './pages/Cars/BrowseCars'
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
            path="add-car"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                  <h1 className="text-2xl">Add Car Page - Coming Soon</h1>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="my-listings"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                  <h1 className="text-2xl">My Listings - Coming Soon</h1>
                </div>
              </PrivateRoute>
            }
          />
          <Route
            path="my-bookings"
            element={
              <PrivateRoute>
                <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center">
                  <h1 className="text-2xl">My Bookings - Coming Soon</h1>
                </div>
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