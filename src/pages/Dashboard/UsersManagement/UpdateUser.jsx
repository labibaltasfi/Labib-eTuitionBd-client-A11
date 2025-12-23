import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import axios from "axios";

import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase/firebase.init";

const UpdateUser = () => {
  const axiosSecure = useAxiosSecure();
  const { user: authUser } = useAuth(); 
  const navigate = useNavigate();

  const userEmail = authUser?.email;

  const {
    data: dbUser,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-by-email", userEmail],
    enabled: !!userEmail,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/users/by-email?email=${userEmail}`
      );
      return res.data;
    },
  });

  /* =========================
     React Hook Form
  ========================== */
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // 🔥 reset form when data arrives
  useEffect(() => {
    if (dbUser) {
      reset({
        name: dbUser.displayName || "",
        mobile: dbUser.mobile || "",
      });
    }
  }, [dbUser, reset]);

  /* =========================
     Update handler
  ========================== */
  const handleUpdateUser = async (data) => {
  try {
    let photoURL = dbUser.photoURL;

    /* =========================
       Upload image if changed
    ========================== */
    if (data.photo?.length > 0) {
      const formData = new FormData();
      formData.append("image", data.photo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`,
        formData
      );

      photoURL = imgRes.data.data.url;
    }

    /* =========================
       1️⃣ Update Firebase Auth
    ========================== */
    await updateProfile(auth.currentUser, {
      displayName: data.name,
      photoURL: photoURL,
    });

    /* =========================
       2️⃣ Update Database
    ========================== */
    const updatedUser = {
      displayName: data.name,
      mobile: data.mobile,
      photoURL,
    };

    const res = await axiosSecure.patch(
      `/updateUser/${dbUser._id}`,
      updatedUser
    );

    if (res.data.modifiedCount > 0) {
      Swal.fire({
        icon: "success",
        title: "Profile updated successfully",
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


  /* =========================
     UI States
  ========================== */
  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-10 text-red-500">Failed to load user</div>;
  }

  /* =========================
     JSX
  ========================== */
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

export default UpdateUser;
