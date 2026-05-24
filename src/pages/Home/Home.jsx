import HeroBanner from './HeroBanner'
import WhyRentWithUs from './WhyRentWithUs'
import FeaturedCars from './FeaturedCars'
import Testimonials from './Testimonials'
import HowItWorks from './HowItWorks'

const Home = () => {
    return (
        <div className="bg-gray-950">
            <HeroBanner />
            <WhyRentWithUs />
            <FeaturedCars />
            <HowItWorks />
            <Testimonials />
        </div>
    )
}

export default Home