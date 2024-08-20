// hooks/useAllCourse.js
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useAllCourse = (page = 1, pageSize = 6) => {
    const axiosPublic = useAxiosPublic();

    const {
        data = {},
        isLoading: loading,
        refetch,
    } = useQuery({
        queryKey: ["courses", page, pageSize],
        queryFn: async () => {
            const res = await axiosPublic.get("/courses", {
                params: { page, pageSize },
            });
            return res.data;
        },
        keepPreviousData: true,
    });

    const { courses = [], totalPages = 1 } = data;
    return { courses, totalPages, loading, refetch };
};

export default useAllCourse;
