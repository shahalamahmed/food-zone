import Banner from "../Banner/Banner";
import FeaturedCourses from "../FeaturedCourse/FeaturedCourse";
import LatestBlogs from "../LatestBlogs/LatestBlogs";
import Newsletter from "../NewsLetter/NewsLetter";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedCourses></FeaturedCourses>
            <LatestBlogs></LatestBlogs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;