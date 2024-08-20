// components/FeaturedCourses.jsx
import useAllCourse from "../../../hooks/useAllCourse";

const FeaturedCourses = () => {
    const { courses, loading } = useAllCourse();

    if (loading) {
        return <div className="text-center mt-8">Loading...</div>;
    }
    
    // Assuming the first 6 courses are featured
    const topCourses = courses.slice(0, 6);

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-8">Featured Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topCourses.map((course) => (
                    <div key={course._id} className="bg-white shadow-md rounded-lg overflow-hidden">
                        <img 
                            src={course.image || '/default-course-image.jpg'} // Fallback image if course image is missing
                            alt={course.courseName} 
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
                            <p className="text-gray-600 mb-4">
                                {course.description.length > 100
                                    ? `${course.description.slice(0, 100)}...`
                                    : course.description}
                            </p>
                            <p className="text-gray-800 font-bold">Total Enrollments: {course.totalEnrollments}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FeaturedCourses;
