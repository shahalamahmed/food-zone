import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';

const About = () => {
    const { updateUserProfile, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = new FormData(e.currentTarget);
        const displayName = form.get('name');
        const photoURL = form.get('photo');

        try {
            await updateUserProfile(displayName, photoURL);
            e.target.reset();
            toast.success('Update Profile successfully!');
            // Reload user data to reflect changes
            window.location.reload();
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <div>Loading...</div>; // Replace this with a loading spinner or message
    }

    return (
        <div className="bg-gray-100 min-h-screen py-8">
            <div className="max-w-4xl mx-auto p-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-cover bg-center h-56 p-4" style={{ backgroundImage: `url(${user.photoURL})` }}>
                        <div className="flex justify-end">
                            <svg className="h-6 w-6 text-white fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M15 12c2.761 0 5-2.239 5-5s-2.239-5-5-5-5 2.239-5 5 2.239 5 5 5zm0 2c-2.671 0-8 1.337-8 4v2h16v-2c0-2.663-5.329-4-8-4zm-9.002-6c0-2.967-2.665-5-5.998-5-3.33 0-6 2.034-6 5 0 2.966 2.67 5 6 5 3.333 0 5.998-2.033 5.998-5zm-5.998 7c-3.334 0-10 1.664-10 5v2h20v-2c0-3.336-6.668-5-10-5z" />
                            </svg>
                        </div>
                    </div>
                    <div className="p-4 md:p-6">
                        <div className="flex items-center space-x-4">
                            <img className="h-24 w-24 rounded-full object-cover border-4 border-white -mt-16" src={user.photoURL} alt="User profile" />
                            <div className="flex flex-col">
                                <h1 className="text-3xl font-bold text-gray-900">{user.displayName}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-gray-600">{user.phoneNumber || 'No phone number provided'}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-700">About Me</h2>
                            <p className="mt-2 text-gray-600">
                                This is where you can add a short bio or additional information about the user. It can include hobbies, interests, or any other relevant information that the user might want to share.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="animate__animated animate__fadeInUpBig">
                <h2 className="text-3xl text-center mb-5 font-bold">Update Your Profile</h2>
                <form onSubmit={handleUpdate} className="md:w-3/4 lg:w-1/2 mx-auto border-2 border-purple-500 rounded-xl p-8 bg-white shadow-lg">
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Your Name</span>
                        </label>
                        <input type="text" name="name" placeholder="Enter Your name" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mb-4">
                        <label className="label">
                            <span className="label-text">Photo URL</span>
                        </label>
                        <input type="text" name="photo" placeholder="Photo URL" className="input input-bordered w-full" required />
                    </div>
                    <div className="form-control mt-6">
                        <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
                            {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Update'}
                        </button>
                    </div>
                    {error && <p className="text-red-600 mt-4">{error}</p>}
                </form>
            </div>
            <ToastContainer />
        </div>
    );
};

export default About;