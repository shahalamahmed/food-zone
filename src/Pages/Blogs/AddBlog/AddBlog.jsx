import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import moment from "moment";
import axios from "axios"; // Import axios
import { AuthContext } from "../../../Providers/AuthProviders";

const AddBlog = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [currentDate, setCurrentDate] = useState();
    const [imageUrl, setImageUrl] = useState(""); // State to store the uploaded image URL

    useEffect(() => {
        const data = moment().format("YYYY/MM/DD");
        setCurrentDate(data);
    }, []);

    const author = user?.displayName || user?.email || "";

    const handleImageUpload = async (event) => {
        const imageFile = event.target.files[0];
        const formData = new FormData();
        formData.append("image", imageFile);

        try {
            const res = await axios.post(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOSTING_KEY}`,
                formData
            );
            setImageUrl(res.data.data.display_url); // Set the uploaded image URL
       
        } catch (error) {
            console.error("Error uploading image", error);
            Swal.fire({
                title: "Error",
                text: "Failed to upload image",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    const handleAddBlog = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const date = currentDate;
        const image = imageUrl; // Use the uploaded image URL

        const newBlog = {
            title,
            description,
            image,
            date,
            author,
        };

        try {
            const res = await axiosPublic.post("/blogs", newBlog);
            if (res?.data?.acknowledged) {
                Swal.fire({
                    title: "Success",
                    text: "Blog posted successfully",
                    icon: "success",
                    confirmButtonText: "Done",
                }).then(() => {
                    form.reset();
                    setImageUrl(""); // Reset the image URL state
                });
            }
        } catch (error) {
            console.error("Error posting blog", error);
            Swal.fire({
                title: "Error",
                text: "Failed to post blog",
                icon: "error",
                confirmButtonText: "Try Again",
            });
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
            <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-semibold mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-semibold mb-1">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imageUpload" className="block font-semibold mb-1">
                        Image:
                    </label>
                    <input
                        type="file"
                        id="imageUpload"
                        name="image"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        onChange={handleImageUpload} // Image upload handler
                        required
                    />
                </div>
                {imageUrl && (
                    <div>
                        <img src={imageUrl} alt="Uploaded" className="w-full h-auto mt-2" />
                    </div>
                )}

                <div className="flex justify-between">
                    <div>
                        <label htmlFor="userName" className="block font-semibold mb-1">
                            User Name:
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={author}
                            disabled
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label htmlFor="date" className="block font-semibold mb-1">
                        Date:
                    </label>
                    <input
                        type="text"
                        id="date"
                        name="date"
                        value={currentDate}
                        disabled
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                        Add Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;
