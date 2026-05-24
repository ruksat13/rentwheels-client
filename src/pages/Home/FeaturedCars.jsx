import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const placeholderCars = [
    {
        _id: '1',
        carName: 'Toyota Camry',
        category: 'Sedan',
        rentPrice: 3500,
        location: 'Dhaka',
        providerName: 'Rahim Auto',
        status: 'available',
        imageURL: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80',
    },
    {
        _id: '2',
        carName: 'Toyota Prado',
        category: 'SUV',
        rentPrice: 7000,
        location: 'Chittagong',
        providerName: 'Karim Rentals',
        status: 'available',
        imageURL: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80',
    },
    {
        _id: '3',
        carName: 'Honda Civic',
        category: 'Sedan',
        rentPrice: 2800,
        location: 'Sylhet',
        providerName: 'Hasan Motors',
        status: 'booked',
        imageURL: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?w=600&q=80',
    },
    {
        _id: '4',
        carName: 'BMW 5 Series',
        category: 'Luxury',
        rentPrice: 12000,
        location: 'Dhaka',
        providerName: 'Elite Cars',
        status: 'available',
        imageURL: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80',
    },
    {
        _id: '5',
        carName: 'Tesla Model 3',
        category: 'Electric',
        rentPrice: 9000,
        location: 'Dhaka',
        providerName: 'Green Drive',
        status: 'available',
        imageURL: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=600&q=80',
    },
    {
        _id: '6',
        carName: 'Toyota Vitz',
        category: 'Hatchback',
        rentPrice: 2000,
        location: 'Rajshahi',
        providerName: 'Budget Rides',
        status: 'available',
        imageURL: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=600&q=80',
    },
]

const FeaturedCars = () => {
    return (
        <section className="py-20 px-6 bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Latest Listings</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Featured <span className="text-orange-400">Cars</span></h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">Explore our newest and most popular cars available for rent right now.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {placeholderCars.map((car, index) => (
                        <motion.div
                            key={car._id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-2xl overflow-hidden group hover:border hover:border-orange-400/40 transition border border-transparent"
                        >
                            {/* Image */}
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

                            {/* Info */}
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