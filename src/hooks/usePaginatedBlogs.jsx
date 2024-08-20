import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const usePaginatedBlogs = (page, pageSize) => {
    const axiosPublic = useAxiosPublic();

    const {
        data = {},
        isLoading: loading,
        refetch,
    } = useQuery({
        queryKey: ["blogs", page, pageSize],
        queryFn: async () => {
            const res = await axiosPublic.get("/blogs", {
                params: { page, pageSize },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    const { blogs = [], totalPages = 1 } = data;

    return { blogs, totalPages, loading, refetch };
};

export default usePaginatedBlogs