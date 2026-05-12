import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import {
  FaEnvelope,
  FaPhone,
  FaStar,
  FaUserGraduate,
  FaArrowRight,
  FaCheckCircle,
  FaUser,
} from 'react-icons/fa';
import { useNavigate } from 'react-router';

const LatestTutors = ({ limit = 6 }) => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const { data: tutors = [], isLoading, isError, error } = useQuery({
    queryKey: ['latest-tutors', limit],
    queryFn: async () => {
      const res = await axiosInstance.get('/users', {
        params: { role: 'tutor' },
      });

      const sorted = res.data.sort(
        (a, b) =>
          new Date(b.createdAt || 0).getTime() -
          new Date(a.createdAt || 0).getTime()
      );

      return sorted.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Latest Tutors</h2>
          <p>Loading tutors...</p>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error(error);

    return (
      <section className="py-16 px-4 bg-[#f5f5f5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Latest Tutors</h2>
          <p className="text-red-500">
            Failed to load tutors. Please try again later.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 px-4 bg-[#f3f3f3]">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-black">
            Latest Tutors
          </h2>

          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Meet our newest qualified tutors ready to help students achieve
            their learning goals.
          </p>
        </div>

        {/* Cards */}
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tutors.map((tutor) => (
            <motion.div
              key={tutor._id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-3xl p-4 shadow-lg hover:shadow-primary/20 cursor-pointer border border-base-300 overflow-hidden group"
            >
              {/* Gradient Border Top */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              
              {/* Photo */}
              <div className="relative overflow-hidden rounded-2xl">
                {tutor.photoURL ? (
                  <img
                    src={tutor.photoURL}
                    alt={tutor.displayName}
                    className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-56 bg-gray-200 flex items-center justify-center text-4xl font-bold text-gray-500">
                    {tutor.displayName?.charAt(0)?.toUpperCase() || 'T'}
                  </div>
                )}

                {/* Tutor Badge */}
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-black text-xs font-semibold px-3 py-1 rounded-full shadow">
                  Tutor
                </span>
              </div>

              {/* Info */}
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-black truncate group-hover:text-primary transition-colors">
                  {tutor.displayName || 'Tutor'}
                </h3>

                <p className="text-sm text-gray-500 truncate mt-1">
                  {tutor.email}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <div className="text-center mt-14">
          <button
            onClick={() => navigate('/register')}
            className="btn btn-outline btn-primary btn-lg gap-2"
          >
            Become a Tutor
            <FaUserGraduate />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestTutors;