import { Link } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="bg-[#5F0F40]  ">
            <div className="h-[7vh] mx-auto hidden sm:flex sm:justify-between sm:items-center text-white sm:max-w-lg md:max-2-xl lg:max-w-5xl ">
                <div>logo</div>
                <div>
                    <Link to='/restaurants'>All Restaurants</Link>
                </div>
                <div>Search</div>
                <div className="flex  items-center gap-x-5">
                    <div>Notifications </div>
                    <div>
                        <Link to="/login">
                            <button className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700">
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
