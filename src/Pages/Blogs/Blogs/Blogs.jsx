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

    const { blogs, totalPages, loading } = usePaginatedBlogs(
        currentPage,
        pageSize
    );
    const [votes, setVotes] = useState({});

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

            if (currentVote) {
                newVotes[blogId] = voteType === "up" ? 1 : -1;
            } else {
                newVotes[blogId] = voteType === "up" ? 1 : -1;
            }

            return newVotes;
        });
    };

    if (loading) return <Skeleton count={10}></Skeleton>;

    return (
        <div>
            <h1 className="text-center text-4xl font-bold ">
                Our Blogs and Forums
            </h1>
            <button className="btn"><Link to='/addBlog'><h1 className="text-stone-600 text-xl font-bold ">Create New Blog</h1></Link></button>
            <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-5 mx-10">
                {blogs.map((blog) => (
                    <div key={blog._id} className="bg-base-200 p-6 rounded-lg shadow-md">
                        <h1 className="text-xl font-bold">
                            Author: {user?.author}
                        </h1>
                        <h1>Role: {user?.role}</h1>
                        <hr className="text-black my-2" />
                        <h2 className="text-xl font-bold mb-1">{blog.title}</h2>
                        <h1 className="text-sm font-medium mb-4">
                            Published on: {blog.date}
                        </h1>
                        <p className="text-gray-700 mb-4">{blog.description}</p>
                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full h-[300px] mb-4 rounded-lg"
                        />
                        <div className="flex justify-between items-center">
                            <div className="flex items-center">
                                <button
                                    className={`rounded-full p-2 mr-2 ${votes[blog._id] === 1
                                        ? "bg-blue-600 text-white"
                                        : "bg-blue-500 text-white"
                                        }`}
                                    onClick={() => handleVote(blog._id, "up")}
                                >
                                    &#9650;
                                </button>
                                <span className="font-semibold text-lg">
                                    {votes[blog._id] || 0}
                                </span>
                                <button
                                    className={`rounded-full p-2 ml-2 ${votes[blog._id] === -1
                                        ? "bg-red-600 text-white"
                                        : "bg-red-500 text-white"
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
            <div className="flex justify-center items-center mt-8 mb-10 space-x-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`${currentPage === 1
                        ? "bg-gray-300 text-gray-400"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        } rounded-full p-3 mx-1 transition-colors duration-300 ease-in-out`}
                >
                    Previous
                </button>
                <span className="text-lg mx-2 font-semibold">{currentPage}</span>
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`${currentPage === totalPages
                        ? "bg-gray-300 text-gray-400"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                        } rounded-full p-3 mx-1 transition-colors duration-300 ease-in-out`}
                >
                    Next
                </button>

            </div>
        </div>
    );
};

export default Blogs;