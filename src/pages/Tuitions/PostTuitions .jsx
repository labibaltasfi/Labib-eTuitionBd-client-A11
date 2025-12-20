import React from 'react';
import useAuth from '../../hooks/useAuth';
import { useForm, useWatch } from 'react-hook-form';
import { useLoaderData, useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';



const PostTuitions = () => {
    const {
        register,
        handleSubmit,
        control,
        // formState: { errors } 
    } = useForm({
        defaultValues: {
            selectedDays: []
        }
    });

    const watchedDays = useWatch({ control, name: 'selectedDays' });
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();

    const tuitionArea = useLoaderData();
    const regionsDuplicate = tuitionArea.map(c => c.region);

    const regions = [...new Set(regionsDuplicate)];
    console.log(regions)


    const tuitionRegion = useWatch({ control, name: 'tuitionRegion' })

    const districtsByRegion = (region) => {
        const regionDistricts = tuitionArea.filter(c => c.region === region);
        const districts = regionDistricts.map(d => d.district);
        return districts;
    }

    const NameOfclass = [
        "One", "Two", "Three", "Four", "Five", "Six",
        "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve"
    ];

    const amHours = [...Array(7)].map((_, i) => `${i + 6} AM`);
    const pmHours = [...Array(10)].map((_, i) => `${i + 1} PM`);
    const allHours = [...amHours, ...pmHours];


    const handlePostTuitions = (data) => {

        const formattedDays = data.selectedDays.join(', ');


        const finalData = {
            ...data,
            selectedDays: formattedDays
        };
        console.log(finalData)
        axiosSecure.post('/tuitionlist', finalData)
            .then(res => {
                console.log('after saving', res.data);
                if (res.data.insertedId) {
                    navigate('')
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Tuition Post",
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            })
    }







    return (
        <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-50">
            <div className="card bg-white text-gray-800 py-8 px-6 w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl rounded-3xl shadow-2xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
                    Post Tuitions
                </h2>

                <form onSubmit={handleSubmit(handlePostTuitions)} className="space-y-4 sm:space-y-6">

                    {/* Class Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Class</label>
                        <select
                            {...register('NameOfclass')}
                            defaultValue="select class"
                            className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489] bg-white"
                        >
                            <option disabled value="select class">Select Class</option>
                            {NameOfclass.map((word, index) => (
                                <option key={index} value={word}>{word}</option>
                            ))}
                        </select>
                    </div>

                    {/* Subject Name */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Subject Name</label>
                        <input
                            type="text"
                            {...register('subjectName')}
                            placeholder="e.g. Mathematics"
                            className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
                        />
                    </div>

                    {/* Budget */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Budget (Monthly)</label>
                        <input
                            type="text"
                            {...register('budget')}
                            placeholder="Amount"
                            className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
                        />
                    </div>

                    {/* Region and District  */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Tuition Region</label>
                            <select
                                {...register('tuitionRegion')}
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489] bg-white"
                            >
                                <option disabled selected>Pick a region</option>
                                {regions.map((r, i) => <option key={i} value={r}>{r}</option>)}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-1 font-medium">Tuition District</label>
                            <select
                                {...register('tuitionDistrict')}
                                className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489] bg-white"
                            >
                                <option disabled selected>Pick a district</option>
                                {districtsByRegion(tuitionRegion).map((d, i) => <option key={i} value={d}>{d}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Street Address */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Street Address</label>
                        <input
                            type="text"
                            {...register('streetAddress', { required: "Street address is required" })}
                            className="p-3 rounded-xl border border-[#192489] focus:ring-2 focus:ring-[#192489]"
                            placeholder="Subdistrict, Village, Road no, House no"
                        />
                    </div>

                    {/* Student Email (Read Only) */}
                    <div className="flex flex-col">
                        <label className="mb-1 font-medium">Student Email</label>
                        <input
                            type="text"
                            {...register('studentEmail')}
                            defaultValue={user?.email}
                            readOnly
                            className="p-3 rounded-xl border border-gray-300 bg-gray-100 cursor-not-allowed opacity-70"
                        />
                    </div>

                    {/* Schedule Section */}
                    <label className="mb-1 font-medium">Schedule</label>
                    <div className="p-5 rounded-2xl bg-blue-50 border border-blue-100">
                        <div className="flex flex-col mb-4">
                            <label className="mb-2 font-bold text-[#192489]">Select Tuition Hour</label>
                            <select
                                {...register('selectedHour')}
                                className="p-3 rounded-xl border border-[#192489] font-bold"
                            >
                                <option disabled selected>Pick a time</option>
                                {allHours.map((hour, index) => (
                                    <option key={index} value={hour}>{hour}</option>
                                ))}
                            </select>
                        </div>

                        <label className="mb-2 block font-bold text-[#192489]">Select Days</label>
                        <div className="flex flex-wrap gap-2">
                            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, index) => (
                                <label key={index} className="cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        value={day}
                                        {...register('selectedDays')}
                                        className="hidden peer"
                                    />
                                    <div className="w-12 h-10 border-2 border-[#192489] rounded-lg flex items-center justify-center font-bold transition-all peer-checked:bg-[#192489] peer-checked:text-white group-hover:scale-105">
                                        {day}
                                    </div>
                                </label>
                            ))}
                        </div>
                        {watchedDays.length > 0 && (
                            <div className="mt-3 text-xs font-semibold text-blue-700 italic">
                                Selected: {watchedDays.join(', ')} ({watchedDays.length} days/week)
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-[#192489] text-white font-bold text-lg hover:bg-[#141d6f] transition shadow-lg"
                    >
                        Post Tuition
                    </button>
                </form>
            </div>
        </div>
    );
};

export default PostTuitions;