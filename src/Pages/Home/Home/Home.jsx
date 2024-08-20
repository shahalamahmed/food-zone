import Banner from "../Banner/Banner";
import LatestBlogs from "../LatestBlogs/LatestBlogs";
import Newsletter from "../NewsLetter/NewsLetter";


const Home = () => {
    return (
        <div>
            <h1> this is home section</h1>
            <Banner></Banner>
            <LatestBlogs></LatestBlogs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;