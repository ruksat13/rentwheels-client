import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'

const FeaturedCars = () => {
    const [cars, setCars] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/cars/featured`)
            .then(res => {
                setCars(res.data)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [])

    if (loading) {
        return (
            <section className="py-20 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-14">
                        <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Latest Listings</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured <span className="text-orange-400">Cars</span></h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="bg-gray-800 rounded-2xl overflow-hidden animate-pulse">
                                <div className="h-48 bg-gray-700"></div>
                                <div className="p-5 space-y-3">
                                    <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                                    <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                                    <div className="h-8 bg-gray-700 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        )
    }

    if (cars.length === 0) {
        return (
            <section className="py-20 px-6 bg-gray-950">
                <div className="max-w-7xl mx-auto text-center">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Latest Listings</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2 mb-4">Featured <span className="text-orange-400">Cars</span></h2>
                    <p className="text-gray-400">No cars available yet. Be the first to list your car!</p>
                    <Link to="/add-car" className="inline-block mt-6 bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3 rounded-xl transition text-sm">
                        Add Your Car
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="py-20 px-6 bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Latest Listings</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured <span className="text-orange-400">Cars</span></h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">Explore our newest and most popular cars available for rent right now.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cars.map((car, index) => (
                        <motion.div
                            key={car._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
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

                <div className="text-center mt-10">
                    <Link
                        to="/cars"
                        className="inline-block border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold px-8 py-3 rounded-xl transition text-sm"
                    >
                        View All Cars →
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default FeaturedCars