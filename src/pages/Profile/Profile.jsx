import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { FaEdit, FaEnvelope, FaPhone, FaCalendarAlt, FaAward, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import LoadingSpinner from '../../components/Loading/LoadingSpinner';

const Profile = () => {
  const { user: authUser } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Fetch user data from database
  const { data: dbUser, isLoading, isError, error } = useQuery({
    queryKey: ['profile', authUser?.email],
    enabled: !!authUser?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/by-email?email=${authUser?.email}`);
      return res.data;
    },
  });

  // Fetch role-specific statistics
  const { data: stats = {} } = useQuery({
    queryKey: ['user-stats', dbUser?._id],
    enabled: !!dbUser?._id && !!dbUser?.role,
    queryFn: async () => {
      if (dbUser?.role === 'tutor') {
        try {
          const tutorRes = await axiosSecure.get(`/tutors/${dbUser._id}`);
          return tutorRes.data || {};
        } catch {
          return {};
        }
      }
      if (dbUser?.role === 'student') {
        try {
          const applicationsRes = await axiosSecure.get(`/applications?studentId=${dbUser._id}`);
          return { applications: applicationsRes.data?.length || 0 };
        } catch {
          return { applications: 0 };
        }
      }
      return {};
    },
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Profile</h2>
          <p className="text-gray-600">{error?.message || 'Something went wrong'}</p>
        </div>
      </div>
    );
  }

  const roleColor = {
    admin: 'bg-red-500',
    tutor: 'bg-blue-500',
    student: 'bg-green-500'
  };

  const roleEmoji = {
    admin: '👨‍💼',
    tutor: '👨‍🏫',
    student: '👨‍🎓'
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-100 to-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-center font-bold text-4xl py-10">
            My Profile
          </h1>
          <p className="text-gray-600 text-lg">Manage your account information</p>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl p-8 md:p-12 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-12">
            {/* Avatar Section */}
            <div className="flex flex-col items-center md:items-start md:flex-shrink-0">
              <div className="relative">
                <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-primary shadow-lg">
                  <img
                    src={dbUser?.photoURL || authUser?.photoURL || 'https://via.placeholder.com/160?text=Avatar'}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className={`absolute bottom-0 right-0 ${roleColor[dbUser?.role]} text-white rounded-full p-3 text-2xl border-4 border-white shadow-lg`}>
                  {roleEmoji[dbUser?.role]}
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              {/* Name and Role */}
              <div className="mb-6">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                  {dbUser?.displayName || authUser?.displayName || 'User'}
                </h2>
                <div className="inline-block">
                  <span className={`${roleColor[dbUser?.role]} text-white px-6 py-2 rounded-full font-semibold text-lg capitalize shadow-md`}>
                    {dbUser?.role || 'User'}
                  </span>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3 text-gray-700">
                  <FaEnvelope className="text-primary flex-shrink-0" size={20} />
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Email</p>
                    <p className="text-lg font-semibold">{authUser?.email || 'N/A'}</p>
                  </div>
                </div>

                {dbUser?.mobile && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaPhone className="text-secondary flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Mobile</p>
                      <p className="text-lg font-semibold">{dbUser.mobile}</p>
                    </div>
                  </div>
                )}

                {dbUser?.createdAt && (
                  <div className="flex items-center gap-3 text-gray-700">
                    <FaCalendarAlt className="text-accent flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Joined</p>
                      <p className="text-lg font-semibold">{formatDate(dbUser.createdAt)}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Edit Button */}
              <button
                onClick={() => navigate('/dashboard/profile-setting')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <FaEdit size={18} />
                Edit Profile
              </button>
            </div>
          </div>
        </motion.div>

        {/* Statistics Section */}
        {(dbUser?.role === 'tutor' || dbUser?.role === 'student' || dbUser?.role === 'admin') && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {/* Tutor Stats */}
            {dbUser?.role === 'tutor' && (
              <>
                <StatCard
                  icon={<FaAward className="text-yellow-500" size={32} />}
                  label="Rating"
                  value={stats?.avgRating ? `${stats.avgRating.toFixed(1)}/5` : 'No ratings'}
                  color="from-yellow-50 to-yellow-100"
                />
                <StatCard
                  icon={<FaGraduationCap className="text-blue-500" size={32} />}
                  label="Active Tuitions"
                  value={stats?.activeTuitions || 0}
                  color="from-blue-50 to-blue-100"
                />
                <StatCard
                  icon={<FaArrowRight className="text-green-500" size={32} />}
                  label="Total Earned"
                  value={`$${stats?.totalEarned || 0}`}
                  color="from-green-50 to-green-100"
                />
              </>
            )}

            {/* Student Stats */}
            {dbUser?.role === 'student' && (
              <>
                <StatCard
                  icon={<FaGraduationCap className="text-blue-500" size={32} />}
                  label="Applied Tutors"
                  value={stats?.applications || 0}
                  color="from-blue-50 to-blue-100"
                />
                <StatCard
                  icon={<FaAward className="text-purple-500" size={32} />}
                  label="Active Courses"
                  value="Coming Soon"
                  color="from-purple-50 to-purple-100"
                />
                <StatCard
                  icon={<FaArrowRight className="text-green-500" size={32} />}
                  label="Profile Complete"
                  value="100%"
                  color="from-green-50 to-green-100"
                />
              </>
            )}

            {/* Admin Stats */}
            {dbUser?.role === 'admin' && (
              <>
                <StatCard
                  icon={<FaGraduationCap className="text-indigo-500" size={32} />}
                  label="Total Users"
                  value="Dashboard"
                  color="from-indigo-50 to-indigo-100"
                />
                <StatCard
                  icon={<FaAward className="text-red-500" size={32} />}
                  label="Manage System"
                  value="Admin Panel"
                  color="from-red-50 to-red-100"
                />
                <StatCard
                  icon={<FaArrowRight className="text-orange-500" size={32} />}
                  label="Organization"
                  value="eTuitionBd"
                  color="from-orange-50 to-orange-100"
                />
              </>
            )}
          </motion.div>
        )}

        {/* Additional Info */}
        {dbUser?.address && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 bg-white rounded-2xl shadow-lg p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-gray-800 mb-4">Additional Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {dbUser?.district && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">District</p>
                  <p className="text-lg text-gray-800 font-semibold">{dbUser.district}</p>
                </div>
              )}
              {dbUser?.address && (
                <div>
                  <p className="text-sm text-gray-500 font-medium mb-1">Address</p>
                  <p className="text-lg text-gray-800 font-semibold">{dbUser.address}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// Reusable StatCard Component
const StatCard = ({ icon, label, value, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className={`bg-gradient-to-br ${color} rounded-2xl p-6 shadow-lg`}
  >
    <div className="flex items-center gap-4 mb-4">
      <div className="p-3 bg-white rounded-lg shadow-md">{icon}</div>
    </div>
    <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
    <p className="text-3xl font-bold text-gray-800">{value}</p>
  </motion.div>
);

export default Profile;
