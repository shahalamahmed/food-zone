import { useState } from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Select from "react-select";

const AddNewCourse = () => {
    const axiosPublic = useAxiosPublic();
    const [courseName, setCourseName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [loader, setLoader] = useState(false);

    // Example options for categories - in a real scenario, these should be fetched from an API
    const categoryOptions = [
        { value: "web-development", label: "Web Development" },
        { value: "design", label: "Design" },
        { value: "marketing", label: "Marketing" },
        // Add more categories here
    ];

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Validate form fields
        if (!courseName || !image || !description || selectedCategories.length === 0) {
            Swal.fire({
                title: "Error!",
                text: "All fields are required and at least one category must be selected.",
                icon: "error",
                confirmButtonText: "OK",
            });
            return;
        }

        setLoader(true);

        const newCourse = {
            courseName,
            image,
            description,
            categories: selectedCategories.map(category => ({
                categoryId: category.value,
                categoryName: category.label,
            })),
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

            // Reset form fields
            setCourseName("");
            setImage("");
            setDescription("");
            setSelectedCategories([]);
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
                        Image URL
                    </label>
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Image URL"
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
