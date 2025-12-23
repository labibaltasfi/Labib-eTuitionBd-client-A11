import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const TuitionDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role } = useRole();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();


  const { data: tuition = {}, isLoading } = useQuery({
    queryKey: ["tuition-details", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tuitionlist/${id}`);
      console.log(res.data[0])
      return res.data;
    },
  });

  const checkApplicationStatus = async (email, tuitionId) => {
    if (!email || !tuitionId) return null;
    const { data } = await axiosSecure.get(`/applications/check?email=${email}&tuitionId=${tuitionId}`);
    return data;
  };

  const { data: appStatus } = useQuery({
    queryKey: ['application', tuition._id, user?.email],
    queryFn: () => checkApplicationStatus(user?.email, tuition._id),
    enabled: !!user?.email && !!tuition._id,
  });

  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }



  const handleApply = async (data) => {
    const application = {
      tuitionId: id,
      tutorName: user?.displayName,
      tutorEmail: user?.email,
      StudentName: tuition?.studentName,
      NameOfclass: tuition?.NameOfclass,
      subjectName: tuition?.subjectName,
      tutorPhoto: user?.photoURL,
      qualifications: data.qualifications,
      experience: data.experience,
      expectedSalary: data.expectedSalary,
      status: "pending",
    };
    console.log(application)
    try {
      const res = await axiosSecure.post("/applications", application);

      if (res.data.insertedId) {
        document.getElementById("apply_modal").close();
        reset();
        Swal.fire("Success", "Application submitted!", "success");
      }
    } catch (error) {
      document.getElementById("apply_modal").close();
      Swal.fire("Error", "You have already applied for this tuition post!", "error");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-6 space-y-4 border">
        <h2 className="text-3xl font-bold text-center text-[#192489]">
          Tuition Details
        </h2>

        <div className="border-b pb-4 space-y-2">
          <p>
            <strong>Student Name:</strong> {tuition.studentName}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <p><strong>Class:</strong> {tuition.NameOfclass}</p>
          <p><strong>Subject:</strong> {tuition.subjectName}</p>
          <p><strong>Budget:</strong> ৳{tuition.budget}</p>
          <p><strong>Schedule:</strong> {tuition.selectedHour}</p>
          <p><strong>Days:</strong> {tuition.selectedDays}</p>
        </div>

        <div className="border-t pt-4 space-y-2 text-sm">
          <p><strong>Region:</strong> {tuition.tuitionRegion}</p>
          <p><strong>District:</strong> {tuition.tuitionDistrict}</p>
          <p><strong>Address:</strong> {tuition.streetAddress}</p>
        </div>

        {role === 'tutor' && (
          appStatus?.applied ? (
            <div className="w-full mt-4 py-4 bg-gray-100 text-gray-500 rounded-xl font-bold text-center border-2 border-dashed">
              Applied 
            </div>
          ) : (
            <button
              onClick={() => document.getElementById("apply_modal").showModal()}
              className="w-full mt-4 py-4 bg-[#192489] text-white rounded-xl font-bold hover:bg-[#141d6f] transition"
            >
              Apply for Tuition
            </button>
          )
        )}

      </div>


      <dialog id="apply_modal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box max-w-md bg-white rounded-2xl">
          <h3 className="text-2xl font-bold mb-6 text-[#192489]">
            Apply for Tuition
          </h3>

          <form
            onSubmit={handleSubmit(handleApply)}
            className="space-y-4"
          >
            <div>
              <label className="font-semibold text-sm">Name</label>
              <input
                type="text"
                value={user?.displayName || ""}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Email */}
            <div>
              <label className="font-semibold text-sm">Email</label>
              <input
                type="email"
                value={user?.email || ""}
                readOnly
                className="w-full p-3 border rounded-lg bg-gray-100"
              />
            </div>

            {/* Qualifications */}
            <div>
              <label className="font-semibold text-sm">Qualifications</label>
              <textarea
                {...register("qualifications", {
                  required: "Qualifications are required",
                })}
                placeholder="Your academic background"
                className="w-full p-3 border rounded-lg"
              />
              {errors.qualifications && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.qualifications.message}
                </p>
              )}
            </div>

            {/* Experience & Expected Salary */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="font-semibold text-sm">Experience</label>
                <input
                  {...register("experience", {
                    required: "Experience is required",
                  })}
                  placeholder="e.g. 2 years"
                  className="w-full p-3 border rounded-lg"
                />
                {errors.experience && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.experience.message}
                  </p>
                )}
              </div>

              <div>
                <label className="font-semibold text-sm">Expected Salary</label>
                <input
                  type="number"
                  {...register("expectedSalary", {
                    required: "Expected salary is required",
                    min: { value: 1, message: "Invalid salary" },
                  })}
                  placeholder={`e.g. ${tuition?.budget || ""}`}
                  className="w-full p-3 border rounded-lg"
                />
                {errors.expectedSalary && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.expectedSalary.message}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col md:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 py-3 bg-[#192489] text-white rounded-xl font-bold disabled:opacity-50"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>

              <button
                type="button"
                onClick={() =>
                  document.getElementById("apply_modal")?.close()
                }
                className="flex-1 py-3 border rounded-xl font-bold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default TuitionDetails;
