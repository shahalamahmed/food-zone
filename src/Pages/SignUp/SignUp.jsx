import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { AuthContext } from "../../Providers/AuthProviders";
import img from '../../assets/login.svg';

const SignUp = () => {
    const axiosPublic = useAxiosPublic();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                updateUserProfile(data.name, data.photoURL)
                    .then(() => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            photoURL: data.photoURL // Make sure to include photoURL
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('User added to the database');
                                    reset();
                                    Swal.fire({
                                        position: 'top-end',
                                        icon: 'success',
                                        title: 'User created successfully.',
                                        showConfirmButton: false,
                                        timer: 1500
                                    });
                                    navigate('/');
                                }
                            })
                            .catch(error => {
                                console.error('Error adding user to the database:', error);
                            });

                    })
                    .catch(error => {
                        console.error('Error updating user profile:', error);
                    });
            })
            .catch(error => {
                console.error('Error creating user:', error);
            });
    };

    return (
        <div className="hero min-h-screen bg-gray-100 flex items-center justify-center">


            <div className="hero-content flex-col md:flex-row-reverse w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <div className="text-center md:w-1/2 lg:text-left p-8">
                    <img src={img} alt="Sign Up Illustration" />
                </div>
                <div className="md:w-1/2 p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <h1 className="text-4xl font-bold">Sign Up for an Account</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Name</span>
                            </label>
                            <input type="text" {...register("name", { required: true })} name="name" placeholder="Enter your name" className="input input-bordered w-full" />
                            {errors.name && <span className="text-red-600">Name is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Photo URL</span>
                            </label>
                            <input type="text" {...register("photoURL", { required: true })} placeholder="Enter your photo URL" className="input input-bordered w-full" />
                            {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Email</span>
                            </label>
                            <input type="email" {...register("email", { required: true })} name="email" placeholder="Enter your email" className="input input-bordered w-full" />
                            {errors.email && <span className="text-red-600">Email is required</span>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Password</span>
                            </label>
                            <input type="password" {...register("password", {
                                required: true,
                                minLength: 6,
                                maxLength: 20,
                                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                            })} placeholder="Enter your password" className="input input-bordered w-full" />
                            {errors.password?.type === 'required' && <p className="text-red-600">Password is required</p>}
                            {errors.password?.type === 'minLength' && <p className="text-red-600">Password must be at least 6 characters</p>}
                            {errors.password?.type === 'maxLength' && <p className="text-red-600">Password must be less than 20 characters</p>}
                            {errors.password?.type === 'pattern' && <p className="text-red-600">Password must have one uppercase, one lowercase, one number, and one special character.</p>}
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary w-full" type="submit" value="Sign Up" />
                        </div>
                    </form>
                    <p className="text-center mt-4">
                        <small>Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></small>
                    </p>
                    <div className="mt-6">
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
