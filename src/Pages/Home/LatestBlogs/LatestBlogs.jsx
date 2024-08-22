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
    const [expandedPost, setExpandedPost] = useState(null);
    const [wordMeaning, setWordMeaning] = useState({});
    const [clickedWord, setClickedWord] = useState({});

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

    const handleShowMore = (blogId) => {
        setExpandedPost(expandedPost === blogId ? null : blogId);
    };

    const fetchWordMeaning = async (word) => {
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            const data = await response.json();
            return data[0]?.meanings[0]?.definitions[0]?.definition || "No definition found";
        } catch (error) {
            console.error("Error fetching word meaning:", error);
            return "Error fetching definition";
        }
    };

    const handleWordClick = async (blogId, word) => {
        const meaning = await fetchWordMeaning(word);
        setWordMeaning((prev) => ({ ...prev, [blogId]: meaning }));
        setClickedWord((prev) => ({ ...prev, [blogId]: word }));
    };

    if (loading) return <Skeleton count={10} />;

    return (
        <div className="latest-blogs py-12 bg-gray-100">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Latest Blog Posts</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allBlogs?.map((blog) => (
                        <div
                            key={blog._id}
                            className={`bg-white shadow-lg rounded-lg overflow-hidden transition-transform duration-300 ${expandedPost === blog._id ? 'transform scale-105' : 'transform scale-100'
                                }`}
                        >
                            <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
                                <p className="text-gray-600 mb-4">
                                    {expandedPost === blog._id
                                        ? blog.description.split(' ').map((word, index) => (
                                            <span
                                                key={index}
                                                className="cursor-pointer"
                                                onClick={() => handleWordClick(blog._id, word)}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {word}{" "}
                                            </span>
                                        ))
                                        : blog.description.split(' ').slice(0, 30).map((word, index) => (
                                            <span
                                                key={index}
                                                className="cursor-pointer"
                                                onClick={() => handleWordClick(blog._id, word)}
                                                style={{ textDecoration: 'none', color: 'inherit' }}
                                            >
                                                {word}{" "}
                                            </span>
                                        ))}
                                </p>
                                {clickedWord[blog._id] && (
                                    <div className="text-gray-700 mb-4">
                                        <strong>{clickedWord[blog._id]}:</strong> {wordMeaning[blog._id]}
                                    </div>
                                )}
                                {blog.description.split(' ').length > 30 && (
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => handleShowMore(blog._id)}
                                    >
                                        {expandedPost === blog._id ? "Show Less" : "Show More"}
                                    </button>
                                )}
                                <div className="flex items-center justify-between mt-4">
                                    <div className="flex items-center space-x-2">
                                        <button
                                            className={`p-2 rounded-full ${votes[blog._id] === 1 ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'}`}
                                            onClick={() => handleVote(blog._id, "up")}
                                        >
                                            &#9650;
                                        </button>
                                        <span className="font-semibold text-lg">{votes[blog._id] || 0}</span>
                                        <button
                                            className={`p-2 rounded-full ${votes[blog._id] === -1 ? 'bg-red-600 text-white' : 'bg-red-500 text-white'}`}
                                            onClick={() => handleVote(blog._id, "down")}
                                        >
                                            &#9660;
                                        </button>
                                    </div>
                                    <Link to={`/blogsDetails/${blog._id}`}>
                                        <button className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition-colors">
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LatestBlogs;
