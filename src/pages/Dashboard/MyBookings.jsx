import { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'

const MyBookings = () => {
    const { user } = useAuth()
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/bookings?email=${user.email}`)
            .then(res => {
                setBookings(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [user.email])

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
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Dashboard</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">My <span className="text-orange-400">Bookings</span></h2>
                    <p className="text-gray-400 mt-3 text-sm">All the cars you have booked through RentWheels.</p>
                </div>

                {bookings.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-5xl mb-4">📋</p>
                        <p className="text-lg">You have not booked any cars yet.</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto rounded-2xl border border-gray-800">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-gray-800 text-gray-400 uppercase text-xs">
                                <tr>
                                    <th className="px-6 py-4">Car</th>
                                    <th className="px-6 py-4">Category</th>
                                    <th className="px-6 py-4">Rent Price</th>
                                    <th className="px-6 py-4">Location</th>
                                    <th className="px-6 py-4">Provider</th>
                                    <th className="px-6 py-4">Booked At</th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                                {bookings.map(booking => (
                                    <tr key={booking._id} className="bg-gray-900 hover:bg-gray-800 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img src={booking.carImage} alt={booking.carName} className="w-12 h-12 rounded-xl object-cover" />
                                                <span className="text-white font-medium">{booking.carName}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{booking.category}</td>
                                        <td className="px-6 py-4 text-orange-400 font-semibold">৳{booking.rentPrice}/day</td>
                                        <td className="px-6 py-4 text-gray-400">📍 {booking.location}</td>
                                        <td className="px-6 py-4 text-gray-400">{booking.providerName}</td>
                                        <td className="px-6 py-4 text-gray-400">
                                            {new Date(booking.bookedAt).toLocaleDateString('en-BD', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                                                Confirmed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    )
}

export default MyBookings