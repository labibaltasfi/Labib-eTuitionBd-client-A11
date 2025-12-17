import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";

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

    const handleRegistration = (data) => {
        console.log('after register', data.photo[0]);
        const profileImg = data.photo[0];
        createUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
               
                const formData = new FormData();
                formData.append('image', profileImg);

               
                const image_API_URL = `https://api.imgbb.com/1/upload?expiration=600&key=${import.meta.env.local.VITE_image_host_key}`
                axios.post(image_API_URL, formData)
                    .then(res => {
                        const photoURL = res.data.data.url;
                        console.log('after image upload', res.data.data.url);


                        
                        const userInfo = {
                            email: data.email,
                            displayName: data.name,
                            role: data.role,
                            mobile: data.mobile,
                            photoURL: photoURL
                        }
                        axiosSecure.post('/users', userInfo)
                            .then(res => {
                                if (res.data.insertedId) {
                                    console.log('user created in the database');
                                }
                            })

                       
                        const userProfile = {
                            displayName: data.name,
                            photoURL: photoURL
                        }

                        updateUser(userProfile)
                            .then(() => {
                                console.log('user profile updated done.')
                                navigate(location.state || '/');
                            })
                            .catch(error => console.log(error))


                    })
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl">
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
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
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
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
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
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
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
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#192489] file:text-white hover:file:bg-[#141d6f]" />
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
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
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
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
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
                            className="w-full py-3 rounded-xl bg-[#192489] text-white font-semibold hover:bg-[#141d6f] transition"
                        >
                            Register
                        </button>
                    </fieldset>
                </form>

                <p className="pt-4 text-center text-gray-600">
                    Already have an account?
                    <Link to="/login" className="text-[#192489] font-semibold ml-1">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
