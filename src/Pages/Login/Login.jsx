import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import { AuthContext } from '../../Providers/AuthProviders';
import img from '../../assets/login.svg';

const Login = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/";

    const handleLogin = async (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        try {
            const result = await signIn(email, password);
            const user = result.user;
            Swal.fire({
                title: 'Login Successful!',
                text: `Welcome back, ${user.email}!`,
                icon: 'success',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
            navigate(from, { replace: true });
        } catch (error) {
            Swal.fire({
                title: 'Login Failed!',
                text: error.message,
                icon: 'error',
                showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                },
                hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                }
            });
        }
    };

    return (
        <div className="hero min-h-screen bg-gray-100 flex items-center justify-center">

            <div className="hero-content flex-col md:flex-row-reverse w-full max-w-4xl bg-white shadow-lg rounded-lg">
                <div className="text-center md:w-1/2 lg:text-left p-8">
                    <img src={img} alt="Login Illustration" />
                </div>
                <div className="md:w-1/2 p-8">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <h1 className="text-4xl font-bold">Login to Your Account</h1>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="Enter your email" className="input input-bordered w-full" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-lg font-medium">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="Enter your password" className="input input-bordered w-full" required />
                            <label className="label">
                                <Link to="/forgot-password" className="label-text-alt link link-hover text-blue-600">Forgot password?</Link>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-primary w-full" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className="text-center mt-4">
                        <small>New here? <Link to="/signup" className="text-blue-600 hover:underline">Create an account</Link></small>
                    </p>
                    <div className="mt-6">
                        <SocialLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
