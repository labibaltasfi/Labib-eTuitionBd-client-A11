import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import { useState } from "react";

const TuitionDetails = () => {
   const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);

  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitionlist/${id}`);
      return res.data;
    },
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

   const handleApply = async (e) => {
    e.preventDefault();

    const form = e.target;
    const application = {
      tuitionId: id,
      tutorName: user.displayName,
      tutorEmail: user.email,
      qualifications: form.qualifications.value,
      experience: form.experience.value,
      expectedSalary: form.expectedSalary.value,
      status: "pending",
    };

    try {
      const res = await axiosSecure.post("/applications", application);
      if (res.data.insertedId) {
        Swal.fire("Success", "Application submitted!", "success");
        setOpenModal(false);
      }
    } catch (error) {
      Swal.fire("Error", "Failed to apply", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-6 space-y-4">
        
        <h2 className="text-3xl font-bold text-center text-[#192489]">
          Tuition Details
        </h2>

         <div className="border-b pt-4 space-y-2">
          <p><strong>Student Name:</strong> {tuition.studentName}</p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Class:</strong> {tuition.NameOfclass}</p>
          <p><strong>Subject:</strong> {tuition.subjectName}</p>
          <p><strong>Budget:</strong> ৳{tuition.budget}</p>
          <p><strong>Schedule:</strong> {tuition.selectedHour}</p>
          <p><strong>Days:</strong> {tuition.selectedDays}</p>
        </div>

        <div className="border-t pt-4 space-y-2">
          <p><strong>Region:</strong> {tuition.tuitionRegion}</p>
          <p><strong>District:</strong> {tuition.tuitionDistrict}</p>
          <p><strong>Address:</strong> {tuition.streetAddress}</p>
        </div>

       

        <button
          onClick={() => setOpenModal(true)}
          className="w-full mt-4 px-6 py-3 bg-[#192489] text-white rounded-xl font-semibold hover:bg-[#141d6f]"
        >
         Apply for Tuition
        </button>
      </div>
      {openModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
            <h3 className="text-xl font-bold mb-4">Apply for Tuition</h3>

            <form onSubmit={handleApply} className="space-y-4">
              {/* Name */}
              <div>
                <label className="font-medium">Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
              </div>

              {/* Email */}
              <div>
                <label className="font-medium">Email</label>
                <input
                  type="email"
                  value={user.email}
                  readOnly
                  className="w-full p-3 border rounded-lg bg-gray-100"
                />
              </div>

              {/* Qualifications */}
              <div>
                <label className="font-medium">Qualifications</label>
                <textarea
                  name="qualifications"
                  required
                  className="w-full p-3 border rounded-lg"
                  placeholder="Your academic background"
                />
              </div>

              {/* Experience */}
              <div>
                <label className="font-medium">Experience</label>
                <input
                  type="text"
                  name="experience"
                  required
                  placeholder="e.g. 2 years"
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Expected Salary */}
              <div>
                <label className="font-medium">Expected Salary</label>
                <input
                  type="number"
                  name="expectedSalary"
                  required
                  placeholder="e.g. 5000"
                  className="w-full p-3 border rounded-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-[#192489] text-white rounded-xl font-semibold"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setOpenModal(false)}
                  className="flex-1 py-3 border rounded-xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
