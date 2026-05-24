import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const CarDetails = () => {
    const { id } = useParams()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [car, setCar] = useState(null)
    const [loading, setLoading] = useState(true)
    const [bookingLoading, setBookingLoading] = useState(false)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/cars/${id}`)
            .then(res => {
                setCar(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    const handleBooking = async () => {
        if (!user) {
            navigate('/login')
            return
        }

        Swal.fire({
            title: 'Confirm Booking',
            text: `Book ${car.carName} for ৳${car.rentPrice}/day?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#fb923c',
            cancelButtonColor: '#374151',
            confirmButtonText: 'Yes, Book Now!',
            background: '#111827',
            color: '#fff',
        }).then(async (result) => {
            if (result.isConfirmed) {
                setBookingLoading(true)
                try {
                    const bookingData = {
                        carId: car._id,
                        carName: car.carName,
                        carImage: car.imageURL,
                        rentPrice: car.rentPrice,
                        category: car.category,
                        location: car.location,
                        providerName: car.providerName,
                        providerEmail: car.providerEmail,
                        userEmail: user.email,
                        userName: user.displayName,
                        bookedAt: new Date().toISOString(),
                    }
                    const res = await axios.post(`${import.meta.env.VITE_API_URL}/bookings`, bookingData)
                    if (res.data.alreadyBooked) {
                        toast.error('This car is already booked!')
                    } else {
                        toast.success('Car booked successfully!')
                        setCar({ ...car, status: 'booked' })
                    }
                } catch {
                    toast.error('Booking failed. Try again.')
                } finally {
                    setBookingLoading(false)
                }
            }
        })
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center">
                <div className="w-12 h-12 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!car) {
        return (
            <div className="min-h-screen bg-gray-950 flex items-center justify-center text-white">
                <p>Car not found.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 py-16 px-6">
            <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Image */}
                    <div className="relative rounded-2xl overflow-hidden h-80 lg:h-full">
                        <img
                            src={car.imageURL}
                            alt={car.carName}
                            className="w-full h-full object-cover"
                        />
                        <span className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1.5 rounded-full ${car.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                            {car.status === 'available' ? '✓ Available' : '✗ Booked'}
                        </span>
                    </div>

                    {/* Details */}
                    <div className="flex flex-col justify-center">
                        <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest mb-2">{car.category}</span>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{car.carName}</h1>
                        <p className="text-orange-400 text-2xl font-bold mb-4">৳{car.rentPrice}<span className="text-gray-400 text-sm font-normal">/day</span></p>

                        <p className="text-gray-400 text-sm leading-relaxed mb-6">{car.description}</p>

                        <div className="grid grid-cols-2 gap-3 mb-6">
                            <div className="bg-gray-800 rounded-xl p-4">
                                <p className="text-gray-500 text-xs mb-1">Location</p>
                                <p className="text-white font-medium text-sm">📍 {car.location}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4">
                                <p className="text-gray-500 text-xs mb-1">Category</p>
                                <p className="text-white font-medium text-sm">🚗 {car.category}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4">
                                <p className="text-gray-500 text-xs mb-1">Provider</p>
                                <p className="text-white font-medium text-sm">👤 {car.providerName}</p>
                            </div>
                            <div className="bg-gray-800 rounded-xl p-4">
                                <p className="text-gray-500 text-xs mb-1">Provider Email</p>
                                <p className="text-white font-medium text-sm truncate">✉️ {car.providerEmail}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleBooking}
                            disabled={car.status === 'booked' || bookingLoading}
                            className={`w-full py-4 rounded-xl font-semibold text-sm transition ${car.status === 'available' ? 'bg-orange-400 hover:bg-orange-500 text-white shadow-lg shadow-orange-400/30' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                        >
                            {bookingLoading ? 'Booking...' : car.status === 'available' ? 'Book Now' : 'Already Booked'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CarDetails