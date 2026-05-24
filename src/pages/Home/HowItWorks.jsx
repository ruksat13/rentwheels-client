import { motion } from 'framer-motion'

const steps = [
    {
        step: '01',
        icon: '🔍',
        title: 'Browse Cars',
        desc: 'Search and filter from hundreds of available cars based on your location, budget, and preference.',
    },
    {
        step: '02',
        icon: '📋',
        title: 'Choose & Book',
        desc: 'Select your perfect car, check availability, and book it instantly with just a few clicks.',
    },
    {
        step: '03',
        icon: '🔑',
        title: 'Pick Up & Drive',
        desc: 'Meet the provider, collect your keys, and hit the road. It\'s that simple!',
    },
    {
        step: '04',
        icon: '⭐',
        title: 'Return & Review',
        desc: 'Return the car on time and leave a review to help other renters make better choices.',
    },
]

const HowItWorks = () => {
    return (
        <section className="py-20 px-6 bg-gray-900">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-14">
                    <span className="text-orange-400 text-sm font-semibold uppercase tracking-widest">Simple Process</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">How It <span className="text-orange-400">Works</span></h2>
                    <p className="text-gray-400 mt-3 max-w-xl mx-auto text-sm">Renting a car with RentWheels is quick and straightforward in just 4 easy steps.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="relative bg-gray-800 rounded-2xl p-6 text-center group hover:border hover:border-orange-400/40 transition"
                        >
                            <span className="absolute top-4 right-4 text-orange-400/20 font-extrabold text-4xl">{item.step}</span>
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

export default HowItWorks