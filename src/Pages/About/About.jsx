import { useState, useEffect } from 'react';
import { FaSpinner, FaPen, FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAuth from '../../hooks/useAuth';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const About = () => {
    const { updateUserProfile, user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewPhoto, setViewPhoto] = useState(false);

    // Ensure cover photo and user information are updated when user object changes
    useEffect(() => {
        if (user?.coverPhoto) {
            // Handle user updates if needed
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const form = new FormData(e.currentTarget);
        const displayName = form.get('name');
        const photoURL = form.get('photo');

        try {
            await updateUserProfile(displayName, photoURL); // Pass existing cover photo
            e.target.reset();
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error(error);
            setError(error.message);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
            setIsModalOpen(false);
        }
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-8">
            <div className="max-w-6xl mx-auto p-8">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden relative">
                    <div className="relative">
                        <img
                            src={user.photoURL || 'https://via.placeholder.com/1200x400'}
                            alt="Cover"
                            className="w-full h-80 object-cover"
                        />
                    </div>
                    <div className="p-6">
                        <div className="flex items-center space-x-4">
                            <img
                                className="h-32 w-32 rounded-full object-cover border-4 border-white -mt-20 shadow-lg cursor-pointer"
                                src={user.photoURL}
                                alt="User profile"
                                onClick={() => setViewPhoto(true)}
                                style={{
                                    position: 'relative',
                                    zIndex: 1,
                                }}
                            />
                            <div className="flex flex-col">
                                <h1 className="text-4xl font-bold text-gray-900">{user.displayName}</h1>
                                <p className="text-gray-600">{user.email}</p>
                                <p className="text-gray-600">{user.phoneNumber || 'No phone number provided'}</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(true)}
                                className="ml-auto bg-purple-500 text-white p-3 rounded-full shadow-md hover:bg-purple-700 transition duration-300"
                            >
                                <FaPen />
                            </button>
                        </div>
                        <div className="mt-8">
                            <h2 className="text-2xl font-semibold text-gray-700">About Me</h2>
                            <p className="mt-4 text-gray-600 text-lg">
                                This is where you can add a short bio or additional information about the user.
                                It can include hobbies, interests, or any other relevant information that the user might want to share.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for updating profile */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
            >
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full relative">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-2 right-2 text-gray-700 hover:text-gray-900"
                    >
                        <FaTimes size={24} />
                    </button>
                    <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
                    <form onSubmit={handleUpdate}>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Your Name</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Enter your name"
                                className="input input-bordered w-full"
                                required
                                defaultValue={user.displayName}
                            />
                        </div>
                        <div className="form-control mb-4">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input
                                type="text"
                                name="photo"
                                placeholder="Photo URL"
                                className="input input-bordered w-full"
                                required
                                defaultValue={user.photoURL}
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button
                                type="submit"
                                className="btn btn-primary w-full"
                                disabled={isLoading}
                            >
                                {isLoading ? <FaSpinner className="animate-spin mr-2" /> : 'Update'}
                            </button>
                        </div>
                        {error && <p className="text-red-600 mt-4">{error}</p>}
                    </form>
                </div>
            </Modal>

            {/* Modal for viewing profile photo */}
            {viewPhoto && (
                <Modal
                    isOpen={viewPhoto}
                    onRequestClose={() => setViewPhoto(false)}
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-40"
                >
                    <div className="relative">
                        <button
                            onClick={() => setViewPhoto(false)}
                            className="absolute top-4 left-4 text-white hover:text-gray-400"
                        >
                            <FaTimes size={24} />
                        </button>
                        <img
                            src={user.photoURL}
                            alt="Full size profile"
                            className="max-w-full max-h-full rounded-lg shadow-lg"
                        />
                    </div>
                </Modal>
            )}

            <ToastContainer />
        </div>
    );
};

export default About;
