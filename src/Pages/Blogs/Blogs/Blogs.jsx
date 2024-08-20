import { useState, useContext } from "react";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";
import usePaginatedBlogs from "../../../hooks/usePaginatedBlogs";
import { AuthContext } from "../../../Providers/AuthProviders";

const Blogs = () => {
    const { user } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 6;

    const { blogs, totalPages, loading } = usePaginatedBlogs(currentPage, pageSize);
    const [votes, setVotes] = useState({});
    const [expandedPost, setExpandedPost] = useState(null);

    const handleVote = (blogId, voteType) => {
        if (!user) {
            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: "You must log in before voting",
                showConfirmButton: false,
                timer: 1500,
            });
            return;
        }

        setVotes((prevVotes) => {
            const currentVote = prevVotes[blogId];

            if (currentVote === voteType) {
                return prevVotes;
            }

            const newVotes = { ...prevVotes };

            newVotes[blogId] = voteType === "up" ? 1 : -1;

            return newVotes;
        });
    };

    const handleShowMore = (blogId) => {
        setExpandedPost(expandedPost === blogId ? null : blogId);
    };

    if (loading) return <Skeleton count={10} />;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-center text-4xl font-extrabold mt-16 mb-8 text-gray-900">
                Our Blogs and Forums
            </h1>
            <div className="flex justify-center mb-12">
                <Link to='/addBlog'>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                        Create New Blog
                    </button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{blog.title}</h2>
                        <h3 className="text-gray-600 mb-2">By: {blog.author || 'Unknown'}</h3>
                        <p className="text-gray-500 mb-4">
                            Published on: {new Date(blog.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-700 mb-4">
                            {expandedPost === blog._id
                                ? blog.description
                                : blog.description.split(' ').length > 30
                                    ? `${blog.description.split(' ').slice(0, 30).join(' ')}...`
                                    : blog.description}
                        </p>
                        {blog.description.split(' ').length > 30 && (
                            <button
                                className="text-blue-500 hover:underline"
                                onClick={() => handleShowMore(blog._id)}
                            >
                                {expandedPost === blog._id ? "Show Less" : "Show More"}
                            </button>
                        )}
                        <div className="flex justify-between items-center mt-4">
                            <div className="flex items-center space-x-2">
                                <button
                                    className={`rounded-full p-2 ${votes[blog._id] === 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                    onClick={() => handleVote(blog._id, "up")}
                                >
                                    &#9650;
                                </button>
                                <span className="font-semibold text-lg">{votes[blog._id] || 0}</span>
                                <button
                                    className={`rounded-full p-2 ${votes[blog._id] === -1
                                        ? "bg-red-600 text-white"
                                        : "bg-gray-200 text-gray-800"
                                        }`}
                                    onClick={() => handleVote(blog._id, "down")}
                                >
                                    &#9660;
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-center items-center mt-12 mb-8 space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`${currentPage === 1
                        ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        } rounded-full px-4 py-2 transition-colors duration-300 ease-in-out`}
                >
                    Previous
                </button>
                <span className="text-lg mx-2 font-semibold">{currentPage}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`${currentPage === totalPages
                        ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        } rounded-full px-4 py-2 transition-colors duration-300 ease-in-out`}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default Blogs;
