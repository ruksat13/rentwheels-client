import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const Register = () => {
  const { createUser, googleLogin, updateUserProfile } = useAuth()
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    photoURL: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const validatePassword = (password) => {
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters.')
      return false
    }
    if (!/[A-Z]/.test(password)) {
      toast.error('Password must contain at least one uppercase letter.')
      return false
    }
    if (!/[a-z]/.test(password)) {
      toast.error('Password must contain at least one lowercase letter.')
      return false
    }
    return true
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!validatePassword(formData.password)) return
    setLoading(true)
    try {
      await createUser(formData.email, formData.password)
      await updateUserProfile(formData.name, formData.photoURL)
      toast.success('Account created successfully!')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Registration failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleLogin = async () => {
    setLoading(true)
    try {
      await googleLogin()
      toast.success('Welcome! Google login successful.')
      navigate('/')
    } catch (err) {
      toast.error(err.message || 'Google login failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl shadow-2xl p-8">

        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <span className="text-orange-400 text-3xl">🚗</span>
            <span className="text-2xl font-bold text-white">Rent<span className="text-orange-400">Wheels</span></span>
          </Link>
          <h2 className="text-white text-xl font-semibold">Create Account</h2>
          <p className="text-gray-400 text-sm mt-1">Join RentWheels today</p>
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Photo URL</label>
            <input
              type="url"
              name="photoURL"
              value={formData.photoURL}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
            />
            <p className="text-xs text-gray-500 mt-1">Min 6 chars, uppercase & lowercase required.</p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition text-sm disabled:opacity-60"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-700"></div>
          <span className="text-gray-500 text-xs">OR</span>
          <div className="flex-1 h-px bg-gray-700"></div>
        </div>

        {/* Google Login */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 rounded-xl transition text-sm disabled:opacity-60"
        >
          <img src="https://www.google.com/favicon.ico" alt="google" className="w-5 h-5" />
          Continue with Google
        </button>

        <p className="text-center text-gray-400 text-sm mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-400 hover:underline font-medium">Login here</Link>
        </p>
      </div>
    </div>
  )
}

export default Register