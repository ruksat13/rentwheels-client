import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logOut } = useAuth()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogOut = () => {
    logOut()
    setDropdownOpen(false)
  }

  const navLinks = (
    <>
      <NavLink to="/" className={({ isActive }) => isActive ? 'text-orange-400 font-semibold' : 'hover:text-orange-400 transition'}>Home</NavLink>
      <NavLink to="/cars" className={({ isActive }) => isActive ? 'text-orange-400 font-semibold' : 'hover:text-orange-400 transition'}>Browse Cars</NavLink>
      {user && <>
        <NavLink to="/add-car" className={({ isActive }) => isActive ? 'text-orange-400 font-semibold' : 'hover:text-orange-400 transition'}>Add Car</NavLink>
        <NavLink to="/my-listings" className={({ isActive }) => isActive ? 'text-orange-400 font-semibold' : 'hover:text-orange-400 transition'}>My Listings</NavLink>
        <NavLink to="/my-bookings" className={({ isActive }) => isActive ? 'text-orange-400 font-semibold' : 'hover:text-orange-400 transition'}>My Bookings</NavLink>
      </>}
    </>
  )

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-orange-400 text-2xl">🚗</span>
          <span className="text-xl font-bold tracking-wide">Rent<span className="text-orange-400">Wheels</span></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navLinks}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <img
                src={user.photoURL || 'https://i.ibb.co/6JfvkYv/default-avatar.png'}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-orange-400 object-cover"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-52 bg-white text-gray-800 rounded-xl shadow-xl p-4 z-50">
                  <p className="font-semibold text-sm truncate">{user.displayName}</p>
                  <p className="text-xs text-gray-500 truncate mb-3">{user.email}</p>
                  <button
                    onClick={handleLogOut}
                    className="w-full bg-orange-400 hover:bg-orange-500 text-white text-sm py-2 rounded-lg transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col gap-4 mt-4 px-4 pb-4 text-sm font-medium">
          {navLinks}
        </div>
      )}
    </nav>
  )
}

export default Navbar