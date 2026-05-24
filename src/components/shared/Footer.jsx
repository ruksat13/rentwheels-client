import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-12 pb-6 mt-auto">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">

                {/* Logo & About */}
                <div>
                    <Link to="/" className="flex items-center gap-2 mb-4">
                        <span className="text-orange-400 text-2xl">🚗</span>
                        <span className="text-xl font-bold text-white">Rent<span className="text-orange-400">Wheels</span></span>
                    </Link>
                    <p className="text-sm leading-relaxed text-gray-400">
                        RentWheels connects you with trusted local car providers for affordable and hassle-free rentals.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/" className="hover:text-orange-400 transition">Home</Link></li>
                        <li><Link to="/cars" className="hover:text-orange-400 transition">Browse Cars</Link></li>
                        <li><Link to="/add-car" className="hover:text-orange-400 transition">Add Car</Link></li>
                        <li><Link to="/my-bookings" className="hover:text-orange-400 transition">My Bookings</Link></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h3>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/terms" className="hover:text-orange-400 transition">Terms & Conditions</Link></li>
                        <li><Link to="/privacy" className="hover:text-orange-400 transition">Privacy Policy</Link></li>
                        <li><Link to="/refund" className="hover:text-orange-400 transition">Refund Policy</Link></li>
                    </ul>
                </div>

                {/* Contact & Social */}
                <div>
                    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
                    <ul className="space-y-2 text-sm text-gray-400">
                        <li>📧 support@rentwheels.com</li>
                        <li>📞 +880 1700-000000</li>
                        <li>📍 Dhaka, Bangladesh</li>
                    </ul>
                    <div className="flex gap-4 mt-4 text-xl">
                        <a href="https://facebook.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">📘</a>
                        <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">🐦</a>
                        <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:text-orange-400 transition">📸</a>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-700 mt-8 pt-4 text-center text-xs text-gray-500">
                © {new Date().getFullYear()} RentWheels. All rights reserved.
            </div>
        </footer>
    )
}

export default Footer