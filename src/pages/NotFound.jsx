import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-6 text-center">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <p className="text-8xl mb-6">🚗</p>
                <h1 className="text-9xl font-extrabold text-orange-400 mb-2">404</h1>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                    Oops! Page Not Found
                </h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto mb-8">
                    The page you are looking for does not exist or has been moved. Let us take you back on the road!
                </p>
                <Link
                    to="/cars"
                    className="inline-block mt-3 border border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition text-sm ml-3"
                >
                    Browse Cars
                </Link>
            </motion.div>
        </div>
    )
}

export default NotFound