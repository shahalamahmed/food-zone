import { useState } from "react";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../../hooks/useAxiosPublic";

const Newsletter = () => {
    const axiosPublic = useAxiosPublic();
    const [formData, setFormData] = useState({
        name: '',
        email: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosPublic.post('/subscribe', formData);
            console.log(response.data);

            // Show success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Subscribed!',
                text: 'You have successfully subscribed to our newsletter and earned a $20 discount on your first order.'
            });

            // Clear form fields
            setFormData({
                name: '',
                email: ''
            });
        } catch (error) {
            console.error('Error subscribing to newsletter:', error);

            // Show error message using SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong. Please try again later.'
            });
        }
    };

    return (
        <section className="bg-gray-200 py-12">
            <div className="container mx-auto px-6 lg:px-20">
                <h2 className="text-3xl font-bold text-center mb-8">Join Our Newsletter</h2>
                <p className="text-center mb-4 text-lg text-gray-700">
                    Join our email subscription now to get updates on promotions and coupons. <br />
                    <span className="font-semibold text-blue-500">$20 discount</span> for your first order!
                </p>
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700">Name:</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md" required />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700">Your email address:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full px-4 py-2 mt-2 border rounded-md" required />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300">Subscribe Now</button>
                </form>
            </div>
        </section>
    );
};

export default Newsletter;
