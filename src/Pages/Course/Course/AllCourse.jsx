import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const AllCourses = () => {
    const axiosPublic = useAxiosPublic();
    const [courses, setCourses] = useState([]);
    const [searchData, setSearchData] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);
    const [sortOrder, setSortOrder] = useState("asc");
    const [expandedCourse, setExpandedCourse] = useState(null);

    const countCourses = async () => {
        const res = await axiosPublic.get("/countCourses");
        setCount(res?.data?.count);
    };

    useEffect(() => {
        countCourses();
    }, []);

    const numberOfPages = Math.ceil(count / 6);

    useEffect(() => {
        handleData();
    }, [searchData, currentPage, sortOrder]);

    const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    const handleData = async () => {
        setLoader(true);
        let res;
        if (searchData) {
            res = await axiosPublic.get(`/searchCourses?searchValue=${searchData}&sortOrder=${sortOrder}`);
        } else {
            res = await axiosPublic.get(`/pagiCourses?page=${currentPage}&sortOrder=${sortOrder}`);
        }
        setCourses(res?.data);
        setLoader(false);
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < pages.length) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    const toggleDescription = (courseId) => {
        setExpandedCourse(expandedCourse === courseId ? null : courseId);
    };

    const handleDelete = async (courseId) => {
        try {
            const result = await Swal.fire({
                title: 'Are you sure?',
                text: "This course will be permanently deleted.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            });

            if (result.isConfirmed) {
                const deleteResponse = await axiosPublic.delete(`/courses/${courseId}`);
                if (deleteResponse.data.deletedCount === 1) {
                    Swal.fire(
                        'Deleted!',
                        'The course has been deleted.',
                        'success'
                    );
                    // Remove the deleted course from the state
                    setCourses(courses.filter(course => course._id !== courseId));
                } else {
                    Swal.fire(
                        'Error!',
                        'The course could not be deleted.',
                        'error'
                    );
                }
            }
        } catch (error) {
            Swal.fire(
                'Error!',
                'Failed to delete the course.',
                'error'
            );
        }
    };

    const renderStars = (rating) => {
        if (rating === undefined || rating === null || isNaN(rating)) {
            rating = 0;
        }
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (rating >= i) {
                stars.push(<FaStar key={i} className="text-yellow-500" />);
            } else if (rating >= i - 0.5) {
                stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
            } else {
                stars.push(<FaRegStar key={i} className="text-yellow-500" />);
            }
        }
        return stars;
    };

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 mt-28">All Courses</h1>
            <div className="flex justify-center mb-12">
                <Link to='/addCourse'>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300">
                        Create New Course
                    </button>
                </Link>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10 flex justify-between items-center">
                    <div className="flex w-1/2 space-x-4">
                        <fieldset className="w-1/2 space-y-1 dark:text-gray-800">
                            <label className="block text-sm font-medium">Search Here</label>
                            <input
                                onChange={(e) => setSearchData(e.target.value)}
                                type="text"
                                placeholder="Search by course name"
                                className="p-3 border-2 text-black sm:text-sm rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600 w-full"
                            />
                        </fieldset>
                        <select
                            value={sortOrder}
                            onChange={handleSortChange}
                            className="p-3 border-2 text-black sm:text-sm rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600 w-1/2"
                        >
                            <option value="asc">Sort by Name (Ascending)</option>
                            <option value="desc">Sort by Name (Descending)</option>
                        </select>
                    </div>
                </div>
                <hr className="mb-10" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {
                        loader ? <Skeleton count={10} /> : courses?.map((course) => (
                            <div
                                key={course._id}
                                className="bg-base-200 shadow-md rounded-lg flex flex-col md:flex-row"
                            >
                                <img
                                    src={course.image}
                                    alt={course.courseName}
                                    className="w-full h-[250px] md:w-1/3 object-cover"
                                />
                                <div className="p-6 flex flex-col justify-between">
                                    <div>
                                        {/* Display Category */}
                                        {course.categories && course.categories.length > 0 && (
                                            <div className="text-sm font-medium text-gray-600 mb-2">
                                                Category: {course.categories[0].categoryName}
                                            </div>
                                        )}
                                        <h2 className="text-2xl font-semibold mb-4">
                                            {course.courseName}
                                        </h2>
                                        <div className="flex items-center mb-4">
                                            <div className="flex space-x-1">
                                                {renderStars(Number(course.rating))}
                                            </div>
                                            <span className="ml-2 text-gray-600">
                                                {Number(course.rating).toFixed(1)}
                                            </span>
                                        </div>
                                        <p className="text-gray-700 mb-4">
                                            {
                                                course.description ?
                                                    (expandedCourse === course._id
                                                        ? course.description
                                                        : `${course.description.split(' ').slice(0, 40).join(' ')}${course.description.split(' ').length > 40 ? '...' : ''}`)
                                                    : 'No description available'
                                            }
                                        </p>
                                        {course.description && course.description.split(' ').length > 40 && (
                                            <button
                                                onClick={() => toggleDescription(course._id)}
                                                className="text-blue-600 hover:underline"
                                            >
                                                {expandedCourse === course._id ? "Show Less" : "Show More"}
                                            </button>
                                        )}
                                    </div>
                                    <div className="mt-4 flex space-x-4">
                                        <div className="text-lg font-semibold text-gray-800">
                                            ${(Number(course.price) || 0).toFixed(2)}
                                        </div>
                                        <Link to={`/updateCourse/${course._id}`}>
                                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition duration-300">
                                                Update Course
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(course._id)}
                                            className="px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 transition duration-300"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className="flex justify-center items-center mt-8 mb-10 space-x-4">
                    <button
                        onClick={handlePrevPage}
                        className={`${currentPage === 1
                            ? "bg-gray-300 text-gray-400"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            } rounded-full p-3 mx-1 transition-colors duration-300 ease-in-out`}
                    >
                        Previous
                    </button>
                    <span className="text-lg mx-2 font-semibold">{currentPage}</span>
                    <button
                        onClick={handleNextPage}
                        className={`${currentPage === pages.length
                            ? "bg-gray-300 text-gray-400"
                            : "bg-blue-500 text-white hover:bg-blue-600"
                            } rounded-full p-3 mx-1 transition-colors duration-300 ease-in-out`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllCourses;
