import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const MyListings = () => {
    const { user } = useAuth()
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [editCar, setEditCar] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const fetchCars = () => {
        axios.get(`${import.meta.env.VITE_API_URL}/my-cars?email=${user.email}`)
            .then(res => {
                setCars(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }

    useEffect(() => {
        fetchCars()
    }, [user.email])

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This car will be permanently deleted!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#fb923c',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, delete it!',
            background: '#111827',
            color: '#fff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios.delete(`${import.meta.env.VITE_API_URL}/cars/${id}`)
                setCars(cars.filter(car => car._id !== id))
                toast.success('Car deleted successfully!')
            }
        })
    }

    const handleUpdate = async (e) => {
        e.preventDefault()
        setUpdateLoading(true)
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/cars/${editCar._id}`, editCar)
            toast.success('Car updated successfully!')
            setEditCar(null)
            fetchCars()
        } catch {
            toast.error('Update failed. Try again.')
        } finally {
            setUpdateLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 py-16 px-6">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-10">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Provider Dashboard</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">My <span className="text-orange-400">Listings</span></h2>
                    <p className="text-gray-400 mt-3 text-sm">Manage all the cars you have listed for rent.</p>
                </div>

                {cars.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-5xl mb-4">🚗</p>
                        <p className="text-lg">You have not listed any cars yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-gray-800">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Car</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Rent Price</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {cars.map(car => (
                                    <tr key={car._id} className="bg-gray-900 hover:bg-gray-800 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={car.imageURL} alt={car.carName} className="w-12 h-12 rounded-xl object-cover" />
                                                <span className="text-white font-medium">{car.carName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{car.category}</td>
                                        <td className="px-6 py-4 text-orange-400 font-semibold">৳{car.rentPrice}/day</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${car.status === 'available' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                                {car.status === 'available' ? 'Available' : 'Booked'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => setEditCar(car)}
                                                    className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                                                >
                                                    Update
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(car._id)}
                                                    className="bg-red-500/20 text-red-400 hover:bg-red-500/30 px-3 py-1.5 rounded-lg text-xs font-semibold transition"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {/* Update Modal */}
            {editCar && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
                    <div className="bg-gray-900 rounded-2xl p-8 w-full max-w-lg shadow-2xl">
                        <h3 className="text-white font-bold text-xl mb-6">Update Car</h3>
                        <form onSubmit={handleUpdate} className="space-y-4">
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Car Name</label>
                                <input
                                    type="text"
                                    value={editCar.carName}
                                    onChange={e => setEditCar({ ...editCar, carName: e.target.value })}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                                <textarea
                                    value={editCar.description}
                                    onChange={e => setEditCar({ ...editCar, description: e.target.value })}
                                    rows={3}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm resize-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Rent Price</label>
                                    <input
                                        type="number"
                                        value={editCar.rentPrice}
                                        onChange={e => setEditCar({ ...editCar, rentPrice: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-400 mb-1 block">Location</label>
                                    <input
                                        type="text"
                                        value={editCar.location}
                                        onChange={e => setEditCar({ ...editCar, location: e.target.value })}
                                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm text-gray-400 mb-1 block">Image URL</label>
                                <input
                                    type="url"
                                    value={editCar.imageURL}
                                    onChange={e => setEditCar({ ...editCar, imageURL: e.target.value })}
                                    className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={updateLoading}
                                    className="flex-1 bg-orange-400 hover:bg-orange-500 text-white font-semibold py-3 rounded-xl transition text-sm disabled:opacity-60"
                                >
                                    {updateLoading ? 'Updating...' : 'Update Car'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setEditCar(null)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyListings