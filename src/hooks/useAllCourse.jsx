import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import useAxiosPublic from "../hooks/useAxiosPublic";
import CourseCard from "./components/CourseCard";  // Optional: if you create a separate component

const AllCourse = () => {
    const [searchData, setSearchData] = useState("");
    const axiosPublic = useAxiosPublic();
    const [blogCourses, setBlogCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [count, setCount] = useState(0);
    const [loader, setLoader] = useState(false);

    const countCourses = async () => {
        const res = await axiosPublic.get("/countBlogCourses");
        setCount(res?.data?.count);
    };

    useEffect(() => {
        countCourses();
    }, []);

    const numberOfPages = Math.ceil(count / 6);

    useEffect(() => {
        handleData();
    }, [searchData, currentPage]);

    const pages = Array.from({ length: numberOfPages }, (_, index) => index + 1);

    const handleData = async () => {
        setLoader(true);
        let res;
        if (searchData) {
            res = await axiosPublic.get(`/searchBlogCourses?searchValue=${searchData}`);
            setBlogCourses(res?.data);
        } else {
            res = await axiosPublic.get(`/pagiBlogCourses?page=${currentPage}`);
            setBlogCourses(res?.data);
        }
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

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-8 mt-28">All Blog Courses</h1>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-10">
                    <fieldset className="space-y-1 dark:text-gray-800">
                        <label className="block text-sm font-medium">Search Here</label>
                        <div className="flex">
                            <input
                                onChange={(e) => setSearchData(e.target.value)}
                                type="text"
                                placeholder="Search by course name"
                                className="p-3 border-2 text-black sm:text-sm rounded-lg focus:ring-inset dark:border-gray-300 dark:text-gray-800 dark:bg-gray-100 focus:dark:ring-violet-600"
                            />
                        </div>
                    </fieldset>
                </div>
                <hr className="mb-10" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {loader ? <Skeleton /> : blogCourses?.map((course) => (
                        <CourseCard
                            key={course.id}
                            image={course.image}
                            courseName={course.courseName}
                            description={course.description}
                            instructorName={course.instructorName}
                        />
                    ))}
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
                        className={`${currentPage === numberOfPages
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

export default AllCourse;
