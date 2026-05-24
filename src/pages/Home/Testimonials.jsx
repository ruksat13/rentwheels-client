import { motion } from 'framer-motion'

const testimonials = [
    {
        name: 'Rafiul Islam',
        location: 'Dhaka, Bangladesh',
        photo: 'https://randomuser.me/api/portraits/men/32.jpg',
        rating: 5,
        review: 'RentWheels made my trip so easy! The booking process was smooth and the car was in perfect condition. Highly recommended!',
    },
    {
        name: 'Nusrat Jahan',
        location: 'Chittagong, Bangladesh',
        photo: 'https://randomuser.me/api/portraits/women/44.jpg',
        rating: 5,
        review: 'Amazing experience! Found a great car at an affordable price. The provider was very professional and helpful.',
    },
    {
        name: 'Tanvir Ahmed',
        location: 'Sylhet, Bangladesh',
        photo: 'https://randomuser.me/api/portraits/men/56.jpg',
        rating: 4,
        review: 'Very convenient platform. I was able to book a car within minutes. Will definitely use RentWheels again for my next trip.',
    },
    {
        name: 'Sabrina Sultana',
        location: 'Rajshahi, Bangladesh',
        photo: 'https://randomuser.me/api/portraits/women/68.jpg',
        rating: 5,
        review: 'Excellent service! The 24/7 support team helped me when I had a question. Great platform for car rentals.',
    },
]

const Testimonials = () => {
    return (
        <section className="py-20 px-6 bg-gray-950">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Customer Reviews</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">What Our <span className="text-orange-400">Customers</span> Say</h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">Thousands of happy customers trust RentWheels for their car rental needs.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {testimonials.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-2xl p-6 flex flex-col gap-4 hover:border hover:border-orange-400/40 transition"
                        >
                            {/* Stars */}
                            <div className="flex gap-1">
                                {Array.from({ length: item.rating }).map((_, i) => (
                                    <span key={i} className="text-orange-400 text-sm">★</span>
                                ))}
                                {Array.from({ length: 5 - item.rating }).map((_, i) => (
                                    <span key={i} className="text-gray-600 text-sm">★</span>
                                ))}
                            </div>

                            {/* Review */}
                            <p className="text-gray-400 text-sm leading-relaxed flex-grow">"{item.review}"</p>

                            {/* User */}
                            <div className="flex items-center gap-3 mt-2">
                                <img src={item.photo} alt={item.name} className="w-10 h-10 rounded-full object-cover border-2 border-orange-400" />
                                <div>
                                    <p className="text-white font-semibold text-sm">{item.name}</p>
                                    <p className="text-gray-500 text-xs">{item.location}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Testimonials