import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";
import Swal from "sweetalert2";

const Register = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { createUser, updateUser } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();

    const handleRegistration = async (data) => {
        try {
            console.log('after register', data.photo[0]);
            const profileImg = data.photo[0];

           
            const result = await createUser(data.email, data.password);
            console.log(result.user);

            // Upload profile image
            const formData = new FormData();
            formData.append('image', profileImg);

            const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.VITE_image_host_key}`;
            const imgRes = await axios.post(image_API_URL, formData);
            const photoURL = imgRes.data.data.url;
            console.log('after image upload', photoURL);

            
            const userInfo = {
                email: data.email,
                displayName: data.name,
                role: data.role || 'student',
                mobile: data.mobile || '',
                photoURL
            };

            
            const res = await axiosSecure.post('/users', userInfo);
            if (res.data.insertedId) {
                console.log('user created in the database');
            }

            
            await updateUser({ displayName: data.name, photoURL });
            console.log('user profile updated done.');

            
            navigate(location.state || '/');
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Registration failed',
                text: error.message
            });
        }
    };


    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="card bg-base-200 text-base-content py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl transition-colors duration-300">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
                    Register your account
                </h2>

                <form
                    onSubmit={handleSubmit(handleRegistration)}
                    className="space-y-4 sm:space-y-6"
                >
                    <fieldset className="fieldset">
                        {/* Name */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Name</label>
                            <input
                                type="text"
                                placeholder="Your Name"
                                {...register("name", { required: true })}
                                className="p-3 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm">Name is required</p>
                            )}
                        </div>

                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Email</label>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email", { required: true })}
                                className="p-3 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">Email is required</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    pattern:
                                        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/,
                                })}
                                className="p-3 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
                            />
                            {errors.password?.type === "required" && (
                                <p className="text-red-500 text-sm">Password is required</p>
                            )}
                            {errors.password?.type === "minLength" && (
                                <p className="text-red-500 text-sm">
                                    Minimum 6 characters required
                                </p>
                            )}
                            {errors.password?.type === "pattern" && (
                                <p className="text-red-500 text-sm">
                                    Must include uppercase, lowercase, number & special character
                                </p>
                            )}
                        </div>

                        {/* photo image field */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Photo</label>

                            <input
                                type="file"
                                {...register("photo", { required: true })}
                                className="p-3 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-primary-content hover:file:brightness-110" />
                            {errors.photo && (
                                <p className="text-red-500 text-sm">Photo is required</p>
                            )}
                        </div>

                        {/* Role */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Register as</label>
                            <select
                                {...register("role", { required: true })}
                                defaultValue=""
                                className="p-3 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
                            >
                                <option value="" disabled>
                                    Select Role
                                </option>
                                <option value="Student">Student</option>
                                <option value="Tutor">Tutor</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm">Role is required</p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Mobile Number</label>
                            <input
                                type="tel"
                                placeholder="01XXXXXXXXX"
                                {...register("mobile", {
                                    required: true,
                                    pattern: /^01[3-9]\d{8}$/,
                                })}
                                className="p-3 rounded-xl border border-primary/40 bg-base-100 focus:ring-2 focus:ring-primary"
                            />
                            {errors.mobile?.type === "required" && (
                                <p className="text-red-500 text-sm">
                                    Mobile number is required
                                </p>
                            )}
                            {errors.mobile?.type === "pattern" && (
                                <p className="text-red-500 text-sm">
                                    Enter a valid number
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-xl bg-primary text-primary-content font-semibold hover:brightness-110 transition"
                        >
                            Register
                        </button>
                    </fieldset>
                </form>

                <p className="pt-4 text-center text-base-content/75">
                    Already have an account?
                    <Link to="/login" className="text-primary font-semibold ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
