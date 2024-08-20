import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useBlogs = () => {
    const axiosPublic = useAxiosPublic();

    const {
        data: blogs = [],
        isPending: loading,
        refetch,
    } = useQuery({
        queryKey: ["blogs"],
        queryFn: async () => {
            const res = await axiosPublic.get("/allBlogs");
            return res.data;
        },
    });

    //console.log(trainers);
    console.log(blogs?.blogs)
    const allBlogs = blogs?.blogs
    return { allBlogs, loading, refetch };

};

export default useBlogs;