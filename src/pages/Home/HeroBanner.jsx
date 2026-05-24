import { useState, useEffect } from 'react'
import { useTypewriter, Cursor } from 'react-simple-typewriter'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const slides = [
    {
        id: 1,
        title: 'Find Your Perfect Ride',
        subtitle: 'Browse hundreds of cars from trusted local providers across Bangladesh.',
        bg: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80',
    },
    {
        id: 2,
        title: 'Affordable Daily Rentals',
        subtitle: 'Get the best rates with no hidden charges. Book in minutes.',
        bg: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80',
    },
    {
        id: 3,
        title: 'Drive With Confidence',
        subtitle: 'All our cars are verified, insured, and ready for your journey.',
        bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1600&q=80',
    },
]

const HeroBanner = () => {
    const [currentSlide, setCurrentSlide] = useState(0)

    const [text] = useTypewriter({
        words: ['Perfect Ride', 'Best Deal', 'Dream Car', 'Next Adventure'],
        loop: true,
        delaySpeed: 2000,
    })

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 4000)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative h-[90vh] overflow-hidden">
            {/* Background Slides */}
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                >
                    <img src={slide.bg} alt={slide.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/60"></div>
                </div>
            ))}

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="bg-orange-400/20 text-orange-400 border border-orange-400/40 text-xs font-semibold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block">
                        #1 Car Rental Platform in Bangladesh
                    </span>
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-4">
                        Find Your{' '}
                        <span className="text-orange-400">
                            {text}
                            <Cursor cursorColor="#fb923c" />
                        </span>
                    </h1>
                    <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
                        {slides[currentSlide].subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/cars"
                            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-3.5 rounded-xl transition text-sm shadow-lg shadow-orange-400/30"
                        >
                            Browse Cars →
                        </Link>
                        <Link
                            to="/register"
                            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-3.5 rounded-xl border border-white/20 transition text-sm backdrop-blur-sm"
                        >
                            List Your Car
                        </Link>
                    </div>
                </motion.div>

                {/* Slide Dots */}
                <div className="absolute bottom-8 flex gap-2">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-2.5 h-2.5 rounded-full transition-all ${index === currentSlide ? 'bg-orange-400 w-6' : 'bg-white/40'}`}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HeroBanner