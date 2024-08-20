import { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import moment from "moment";
// import useAdmin from "../../../hooks/useAdmin";
import { AuthContext } from "../../../Providers/AuthProviders";

const AddBlog = () => {
    const axiosPublic = useAxiosPublic();
    const { user } = useContext(AuthContext);
    const [currentDate, setCurrentDate] = useState();
    // const [isAdmin] = useAdmin();
    // console.log(isAdmin)
    useEffect(() => {
        const data = moment().format('YYYY/MM/DD')
        setCurrentDate(data)
    }, [])

    const author = user?.displayName || user?.email || "";

    const handleAddBlog = async (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.title.value;
        const description = form.description.value;
        const image = form.image.value;
        const date = currentDate;
        // const role = isAdmin ? "Admin" : "Trainer"
        const newBlog = {
            title,
            description,
            image,
            date,
            author,
            // role,
        };

        const res = await axiosPublic.post("/blogs", newBlog);

        if (res?.data?.acknowledged) {
            Swal.fire({
                title: "Success",
                text: "Blog Posted successfully",
                icon: "success",
                confirmButtonText: "Done",
            }).then(() => {
                form.reset();
            });
        }
        console.log(res?.data?.acknowledged);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 rounded-md shadow-md">
            <h2 className="text-2xl font-bold mb-4">Add Blog</h2>
            <form onSubmit={handleAddBlog} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-semibold mb-1">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block font-semibold mb-1">
                        Description:
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        rows="5"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        required
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="imageLink" className="block font-semibold mb-1">
                        Image:
                    </label>
                    <input
                        type="text"
                        id="imageLink"
                        name="image"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        placeholder="Paste image link here"
                    />
                </div>

                <div className="flex justify-between">
                    <div>
                        <label htmlFor="userName" className="block font-semibold mb-1">
                            User Name:
                        </label>
                        <input
                            type="text"
                            id="userName"
                            name="userName"
                            value={author}
                            disabled
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="role" className="block font-semibold mb-1">
                            Role:
                        </label>
                        {/* {
                            isAdmin ? <h1>Admin</h1> : <h1>Trainer</h1>
                        } */}
                    </div>
                </div>

                <div>
                    <label htmlFor="date" className="block font-semibold mb-1">
                        Date:
                    </label>
                    {/* <input
            type="date"
            id="date"
            name="date"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            value={currentDate}
            disabled
          /> */}
                    {
                        currentDate
                    }
                </div>

                <div>
                    <button
                        type="submit"
                        className="w-full bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
                    >
                        Add Blog
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddBlog;