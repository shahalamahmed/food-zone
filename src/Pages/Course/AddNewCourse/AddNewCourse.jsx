import React, { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Select from "react-select";

const AddNewCourse = () => {
    const axiosPublic = useAxiosPublic();
    const [courseName, setCourseName] = useState("");
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [loader, setLoader] = useState(false);

    const categoryOptions = [
        { value: "web-development", label: "Web Development" },
        { value: "graphic-design", label: "Graphic Design" },
        { value: "digital-marketing", label: "Digital Marketing" },
        { value: "data-science", label: "Data Science" },
        { value: "cybersecurity", label: "Cybersecurity" },
    ];

    const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
    const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

    const handleImageUpload = async () => {
        const formData = new FormData();
        formData.append('image', image);

        try {
            const res = await axiosPublic.post(image_hosting_api, formData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            });

            if (res.data.success) {
                return res.data.data.display_url;
            } else {
                throw new Error('Image upload failed');
            }
        } catch (error) {
            console.error("Image upload error:", error);
            Swal.fire({
                title: "Error!",
                text: "Failed to upload image.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return null;
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!courseName || !image || !description || selectedCategories.length === 0 || !price || !rating) {
            Swal.fire({
                title: "Error!",
                text: "All fields are required and at least one category must be selected.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        setLoader(true);

        const imageUrl = await handleImageUpload();
        if (!imageUrl) {
            setLoader(false);
            return;
        }

        const newCourse = {
            courseName,
            image: imageUrl,
            description,
            categories: selectedCategories.map(category => ({
                categoryId: category.value,
                categoryName: category.label,
            })),
            price: parseFloat(price), // Ensure price is a number
            rating: parseFloat(rating) // Ensure rating is a number
        };

        try {
            const response = await axiosPublic.post("/courses", newCourse);
            setLoader(false);

            Swal.fire({
                title: "Success!",
                text: "Course added successfully",
                icon: "success",
                confirmButtonText: "OK",
            });

            setCourseName("");
            setImage(null);
            setDescription("");
            setSelectedCategories([]);
            setPrice("");
            setRating("");
            event.target.reset();
        } catch (error) {
            console.error("There was an error adding the course!", error);
            setLoader(false);

            Swal.fire({
                title: "Error!",
                text: "There was an error adding the course",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add New Course</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Course Name
                    </label>
                    <input
                        type="text"
                        value={courseName}
                        onChange={(e) => setCourseName(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Course Name"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Upload Image
                    </label>
                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Course Description"
                        required
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Price ($)
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Price"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Rating (1-5)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="5"
                        step="0.1"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Rating"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Select Categories
                    </label>
                    <Select
                        isMulti
                        options={categoryOptions}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedCategories}
                        onChange={setSelectedCategories}
                        placeholder="Select categories"
                    />
                </div>
                <div className="mb-4">
                    <button
                        type="submit"
                        className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${loader ? "cursor-not-allowed opacity-50" : ""}`}
                        disabled={loader}
                    >
                        {loader ? "Adding..." : "Add New Course"}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddNewCourse;
