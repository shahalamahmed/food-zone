import { Link } from "react-router-dom";
import useBlogs from "../../../hooks/useBlogs";
import Skeleton from "react-loading-skeleton";
import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Providers/AuthProviders";

const LatestBlogs = () => {
    const { user } = useContext(AuthContext);
    const { allBlogs, loading } = useBlogs();
    const [votes, setVotes] = useState({});

    console.log(allBlogs)

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

    // Sort blogs by publish date in descending order
    // const sortedBlogs = blogs?.blogs?.sort(
    //   (a, b) => new Date(b.date) - new Date(a.date)
    // );

    return (
        <div className="latest-forum-posts mb-10">
            <h2 className="text-center text-4xl mt-5 font-bold">
                Latest Forum Posts
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mx-16">
                {allBlogs?.map((blog) => (
                    <div
                        key={blog._id}
                        className="mt-10 bg-base-200 p-6 rounded-lg shadow-md"
                    >
                        <h1 className="text-xl font-bold">
                            Author: {blog?.author} {blog?.role}
                        </h1>
                        <hr className="my-3" />
                        <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
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
                        <Link to="/community">
                            <button className="btn btn-outline mt-3">Explore</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LatestBlogs;