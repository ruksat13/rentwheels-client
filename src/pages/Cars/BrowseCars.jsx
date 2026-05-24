import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'

const BrowseCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)
    const [search, setSearch] = useState('')
    const location = useLocation()

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        const q = params.get('search')
        if (q) setSearch(q)
    }, [location.search])

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/cars`)
            .then(res => {
                setCars(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    const filtered = cars.filter(car =>
        car.carName.toLowerCase().includes(search.toLowerCase())
    )

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
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">All Listings</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Browse <span className="text-orange-400">Cars</span></h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">Find your perfect car from our wide selection of verified listings.</p>
                </div>

                {/* Search */}
                <div className="max-w-md mx-auto mb-10">
                    <input
                        type="text"
                        placeholder="Search cars by name..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full bg-gray-800 text-white px-5 py-3 rounded-xl border border-gray-700 focus:outline-none focus:border-orange-400 transition text-sm"
                    />
                </div>

                {filtered.length === 0 ? (
                    <div className="text-center text-gray-400 py-20">
                        <p className="text-5xl mb-4">🚗</p>
                        <p className="text-lg">No cars found matching your search.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filtered.map((car, index) => (
                            <motion.div
                                key={car._id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true }}
                                className="bg-gray-800 rounded-2xl overflow-hidden group hover:border hover:border-orange-400/40 transition border border-transparent"
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={car.imageURL}
                                        alt={car.carName}
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <span className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full ${car.status === 'available' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {car.status === 'available' ? '✓ Available' : '✗ Booked'}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-white font-semibold text-lg">{car.carName}</h3>
                                        <span className="text-orange-400 font-bold text-sm">৳{car.rentPrice}/day</span>
                                    </div>
                                    <div className="flex gap-2 mb-3">
                                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-lg">{car.category}</span>
                                        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-lg">📍 {car.location}</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mb-4">Provider: {car.providerName}</p>
                                    <Link
                                        to={`/cars/${car._id}`}
                                        className="block w-full text-center bg-orange-400 hover:bg-orange-500 text-white text-sm font-semibold py-2.5 rounded-xl transition"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default BrowseCars