

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-6 lg:px-20">
                {/* Band Name */}


                <div className="flex flex-wrap justify-between">
                    {/* Contact Info */}



                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <h1 className="text-4xl font-bold mb-10">Electro</h1>
                        <h3 className="text-xl font-bold mb-4">Got questions? Call us 24/7!</h3>
                        <p className="text-lg">Phone: (800) 8001-8588, (0600) 874 548</p>
                        <p className="text-lg mt-2">17 Princess Road, London, Greater London NW1 8JR, UK</p>
                    </div>

                    {/* Find it Fast */}
                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <h3 className="text-xl font-bold mb-4">Find it Fast</h3>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Laptops & Computers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Cameras & Photography</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Smart Phones & Tablets</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Video Games & Consoles</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">TV & Audio</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Gadgets</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Car Electronic & GPS</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Printers & Ink</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Software</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Office Supplies</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Computer Components</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Accessories</a></li>
                        </ul>
                    </div>

                    {/* Customer Care */}
                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <h3 className="text-xl font-bold mb-4">Customer Care</h3>
                        <ul>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">My Account</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Order Tracking</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Wish List</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Customer Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Returns / Exchange</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">FAQs</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-gray-300">Product Support</a></li>
                        </ul>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 text-center">
                    <p className="text-lg">© {new Date().getFullYear()} Electro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
