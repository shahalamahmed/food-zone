import { useState, useEffect } from "react";
import { useParams, useNavigate, useLoaderData } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";

// Image hosting API key and endpoint
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const UpdateCourse = () => {
    const { _id } = useParams(); // Get course ID from URL parameters
    const navigate = useNavigate(); // Initialize navigate
    const axiosPublic = useAxiosPublic();
    const course = useLoaderData(); // Get course data from loader

    const [loader, setLoader] = useState(false);

    // Form handling with react-hook-form
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            courseName: course.courseName || "",
            image: "",
            description: course.description || "",
            category: course.category || "",
            price: course.price || "",
            rating: course.rating || ""
        }
    });

    useEffect(() => {
        // Set form values when course data is loaded
        setValue('courseName', course.courseName);
        setValue('description', course.description);
        setValue('category', course.category);
        setValue('price', course.price);
        setValue('rating', course.rating);
    }, [course, setValue]);

    // Handle form submission
    const onSubmit = async (data) => {
        setLoader(true);

        try {
            let imageUrl = course.image; // Preserve existing image if no new image is uploaded
            if (data.image.length > 0) {
                // Prepare FormData for image upload
                const formData = new FormData();
                formData.append('image', data.image[0]);

                const imageUploadRes = await axiosPublic.post(image_hosting_api, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });

                if (imageUploadRes.data.success) {
                    imageUrl = imageUploadRes.data.data.display_url;
                } else {
                    throw new Error("Image upload failed");
                }
            }

            // Prepare course data
            const updatedCourse = {
                courseName: data.courseName,
                image: imageUrl,
                description: data.description,
                price: data.price, // Add price to the updated data
                rating: data.rating // Add rating to the updated data
            };

            // Update course data
            const res = await axiosPublic.put(`/courses/${course._id}`, updatedCourse);
            if (res.status === 200) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Course updated successfully.',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
                navigate("/allCourse"); // Navigate to /allCourses after update
            } else {
                throw new Error("Failed to update the course");
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message || 'Failed to update the course.',
                icon: 'error',
                confirmButtonText: 'Try Again'
            });
        } finally {
            setLoader(false);
        }
    };

    if (!course) {
        return <div>Loading...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-28">
            <h1 className="text-3xl font-bold text-center mb-8">Update Course</h1>
            {loader ? (
                <div className="text-center">Loading...</div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course Name</label>
                            <input
                                type="text"
                                {...register('courseName', { required: true })}
                                className="mt-1 block w-full p-3 border-2 rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image</label>
                            <input
                                type="file"
                                {...register('image')}
                                className="mt-1 block w-full p-3 border-2 rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Price</label>
                            <input
                                type="number"
                                step="0.01"
                                {...register('price', { required: true })}
                                className="mt-1 block w-full p-3 border-2 rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rating</label>
                            <input
                                type="number"
                                step="0.1"
                                min="0"
                                max="5"
                                {...register('rating', { required: true })}
                                className="mt-1 block w-full p-3 border-2 rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Description</label>
                        <textarea
                            {...register('description')}
                            rows="4"
                            className="mt-1 block w-full p-3 border-2 rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                        />
                    </div>
                    <div>
                        {course.categories && course.categories.length > 0 && (
                            <div className="text-sm font-medium text-gray-600 mb-2">
                                Category: {course.categories[0].categoryName}
                            </div>
                        )}
                    </div>
                    <div className="flex justify-center">
                        <button
                            type="submit"
                            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
                        >
                            Update Course
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default UpdateCourse;
