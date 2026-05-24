import { motion } from 'framer-motion'

const reasons = [
    {
        icon: '📅',
        title: 'Easy Booking',
        desc: 'Book your desired car in just a few clicks. Simple, fast, and hassle-free process anytime, anywhere.',
    },
    {
        icon: '💰',
        title: 'Affordable Rates',
        desc: 'Get the most competitive daily rental prices with no hidden charges or surprise fees.',
    },
    {
        icon: '🛡️',
        title: 'Trusted Providers',
        desc: 'All car providers are verified and reviewed by our team to ensure your safety and satisfaction.',
    },
    {
        icon: '🕐',
        title: '24/7 Support',
        desc: 'Our support team is available round the clock to assist you with any issues or queries.',
    },
]

const WhyRentWithUs = () => {
    return (
        <section className="py-20 px-6 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Why Choose Us</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">Why Rent With <span className="text-orange-400">RentWheels</span>?</h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">We make car rental simple, affordable, and trustworthy for everyone.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {reasons.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-gray-800 rounded-2xl p-6 text-center hover:border hover:border-orange-400/40 transition group"
                        >
                            <div className="text-4xl mb-4">{item.icon}</div>
                            <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-orange-400 transition">{item.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default WhyRentWithUs