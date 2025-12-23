import React from "react";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import axios from "axios";

const UpdateUserByAdmin = () => {
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

   
    const user = useLoaderData();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            mobile: user?.mobile || "",
        },
    });

 
    React.useEffect(() => {
        reset({
            name: user?.displayName || "",
            mobile: user?.mobile || "",
        });
    }, [user, reset]);

    const handleUpdateUser = async (data) => {
        try {
            let photoURL = user.photoURL;

           
            if (data.photo && data.photo.length > 0) {
                const formData = new FormData();
                formData.append("image", data.photo[0]);

                const imageAPI = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;

                const imgRes = await axios.post(imageAPI, formData);
                photoURL = imgRes.data.data.url;
            }

            const updatedUser = {
                displayName: data.name,
                mobile: data.mobile,
                photoURL,
            };

            const res = await axiosSecure.patch(
                `/updateUser/${user._id}`,
                updatedUser
            );

            if (res.data.modifiedCount > 0) {
                Swal.fire({
                    icon: "success",
                    title: "User updated successfully",
                    timer: 2000,
                    showConfirmButton: false,
                });

                navigate(-1);
            } else {
                Swal.fire("No changes detected");
            }
        } catch (error) {
            console.error(error);
            Swal.fire("Update failed");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10">
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-xl rounded-3xl shadow-2xl">
                <h2 className="text-3xl font-bold text-center mb-8">
                    Update User Details
                </h2>

                <form onSubmit={handleSubmit(handleUpdateUser)} className="space-y-6">
                    {/* Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Name</label>
                        <input
                            type="text"
                            defaultValue={user?.displayName || ""}
                            {...register("name", { required: true })}
                            className="p-3 rounded-xl border border-[#192489]"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">Name is required</p>
                        )}
                    </div>

                    {/* Photo */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Photo</label>
                        <input
                            type="file"
                            {...register("photo")}
                            className="p-3 rounded-xl border border-[#192489]
                file:mr-4 file:py-2 file:px-4 file:rounded-lg
                file:border-0 file:text-sm file:font-semibold
                file:bg-[#192489] file:text-white hover:file:bg-[#141d6f]"
                        />
                    </div>

                    {/* Mobile */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Mobile Number</label>
                        <input
                            type="tel"
                            defaultValue={user?.mobile || ""}
                            {...register("mobile", {
                                required: true,
                                pattern: /^01[3-9]\d{8}$/,
                            })}
                            className="p-3 rounded-xl border border-[#192489]"
                        />
                        {errors.mobile?.type === "required" && (
                            <p className="text-red-500 text-sm">Mobile is required</p>
                        )}
                        {errors.mobile?.type === "pattern" && (
                            <p className="text-red-500 text-sm">
                                Enter a valid Bangladeshi number
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-3 rounded-xl bg-[#192489] text-white font-semibold hover:bg-[#141d6f]"
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserByAdmin;
