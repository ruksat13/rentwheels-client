import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const categories = ['Sedan', 'SUV', 'Hatchback', 'Luxury', 'Electric']

const AddCar = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        carName: '',
        description: '',
        category: 'Sedan',
        rentPrice: '',
        location: '',
        imageURL: '',
    })

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            const carData = {
                ...formData,
                rentPrice: Number(formData.rentPrice),
                providerName: user.displayName,
                providerEmail: user.email,
                status: 'available',
                createdAt: new Date().toISOString(),
            }
            await axios.post(`${import.meta.env.VITE_API_URL}/cars`, carData)
            toast.success('Car added successfully!')
            navigate('/my-listings')
        } catch (err) {
            toast.error('Failed to add car. Try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-950 py-16 px-6">
            <div className="max-w-2xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Provider</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Add Your <span className="text-orange-400">Car</span></h2>
                    <p className="text-gray-400 mt-3 text-sm">Fill in the details below to list your car for rent.</p>
                </div>

                <div className="bg-gray-900 rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Car Name</label>
                            <input
                                type="text"
                                name="carName"
                                value={formData.carName}
                                onChange={handleChange}
                                placeholder="e.g. Toyota Camry"
                                required
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe your car, its condition, features, etc."
                                required
                                rows={4}
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Category</label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Rent Price (per day ৳)</label>
                                <input
                                    type="number"
                                    name="rentPrice"
                                    value={formData.rentPrice}
                                    onChange={handleChange}
                                    placeholder="e.g. 3500"
                                    required
                                    min="1"
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. Dhaka, Chittagong"
                                required
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
                            <input
                                type="url"
                                name="imageURL"
                                value={formData.imageURL}
                                onChange={handleChange}
                                placeholder="https://images.unsplash.com/..."
                                required
                                className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                            />
                        </div>

                        {/* Read-only fields */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Provider Name</label>
                                <input
                                    type="text"
                                    value={user?.displayName || ''}
                                    readOnly
                                    className="w-full bg-gray-800/50 text-gray-500 px-4 py-3 rounded-xl border border-gray-700 text-sm cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Provider Email</label>
                                <input
                                    type="text"
                                    value={user?.email || ''}
                                    readOnly
                                    className="w-full bg-gray-800/50 text-gray-500 px-4 py-3 rounded-xl border border-gray-700 text-sm cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition text-sm disabled:opacity-60 mt-2"
                        >
                            {loading ? 'Adding Car...' : 'Add Car'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddCar