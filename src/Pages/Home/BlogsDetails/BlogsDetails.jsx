import { useLoaderData, useParams } from "react-router-dom";
import { useState } from "react";

const BlogsDetails = () => {
    const { _id } = useParams();
    const blog = useLoaderData();
    const [wordMeaning, setWordMeaning] = useState({});
    const [clickedWord, setClickedWord] = useState("");

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

    const handleWordClick = async (word) => {
        const meaning = await fetchWordMeaning(word);
        setWordMeaning({ [word]: meaning });
        setClickedWord(word);
    };

    const highlightWords = (text) => {
        const words = text.split(" ");
        return words.map((word, idx) => (
            <span
                key={idx}
                className="underline text-blue-500 cursor-pointer"
                onClick={() => handleWordClick(word)}
                style={{ textDecoration: 'none', color: 'inherit' }}
            >
                {word}{" "}
            </span>
        ));
    };

    if (!blog) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">{blog.title}</h1>
                <p className="text-sm text-gray-500">By {blog.author} on {new Date(blog.date).toLocaleDateString()}</p>
            </header>
            <div className="mb-8">
                <img src={blog.image} alt={blog.title} className="w-full h-auto rounded-lg" />
            </div>
            <article className="text-lg text-gray-700 leading-relaxed space-y-6">
                {blog.description ? (
                    blog.description.split('\n').map((paragraph, idx) => (
                        <p key={idx} className="mb-4">
                            {highlightWords(paragraph)}
                        </p>
                    ))
                ) : (
                    <p>No description available.</p>
                )}
            </article>
            {clickedWord && (
                <div className="mt-4 p-4 bg-gray-100 border border-gray-300 rounded-lg">
                    <strong className="text-lg text-gray-800">{clickedWord}:</strong>
                    <p className="text-gray-700">{wordMeaning[clickedWord]}</p>
                </div>
            )}
            <footer className="mt-12 pt-6 border-t border-gray-200 flex flex-col space-y-6">
                <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Tags:</h4>
                    <ul className="flex flex-wrap gap-2">
                        {blog.tags && blog.tags.length > 0 ? (
                            blog.tags.map((tag, idx) => (
                                <li key={idx} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-md text-sm">{tag}</li>
                            ))
                        ) : (
                            <li className="text-gray-500">No tags available.</li>
                        )}
                    </ul>
                </div>
                <div className="text-right">
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">Share this post:</h4>
                    <div className="flex space-x-4">
                        <a href="#" className="text-blue-500 hover:text-blue-700 transition">Facebook</a>
                        <a href="#" className="text-blue-400 hover:text-blue-600 transition">Twitter</a>
                        <a href="#" className="text-blue-600 hover:text-blue-800 transition">LinkedIn</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default BlogsDetails;
