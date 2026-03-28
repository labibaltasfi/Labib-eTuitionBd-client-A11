import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';
import useAxios from '../../hooks/useAxios';
import { FaBook, FaMapMarkerAlt, FaGraduationCap, FaArrowRight } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/useRole';

const LatestTuitionPosts = ({ limit = 6 }) => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { role } = useRole();

  const handleViewAllTuitions = () => {
    if (role === 'admin' || role === 'tutor') {
      navigate('/tuition-list');
      return;
    }

    if (!user) {
      Swal.fire({
        icon: 'info',
        title: 'Login Required',
        text: 'Please login as an approved tutor or admin to view all tuitions.',
      });
      return;
    }

    Swal.fire({
      icon: 'warning',
      title: 'Become a tutor first',
      text: 'Apply and wait until the admin approves your request.',
    });
  };
  
  const { data: tuitions = [], isLoading, isError, error } = useQuery({
    queryKey: ['latest-tuitions', limit],
    queryFn: async () => {
      const res = await axiosInstance.get('/tuitionlist');
      const sorted = res.data.sort((a, b) => 
        new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
      );
      return sorted.slice(0, limit);
    },
    staleTime: 5 * 60 * 1000,
  });
  
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
  
  if (isLoading) {
    return (
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Latest Tuition Posts</h2>
        <div className="text-center">Loading tuition posts...</div>
      </section>
    );
  }

  if (isError) {
    console.error('Error fetching tuitions:', error);
    return (
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Latest Tuition Posts</h2>
        <div className="text-center text-error">Failed to load tuition posts. Please try again later.</div>
      </section>
    );
  }

  if (!tuitions || tuitions.length === 0) {
    return (
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Latest Tuition Posts</h2>
        <div className="text-center">No tuition posts available at the moment.</div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-4 bg-gradient-to-b from-base-100 to-base-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Latest Tuition Posts
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Discover the newest tutoring opportunities and find the perfect match for your learning needs
            </p>
          </motion.div>
        </div>
        
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tuitions.map((tuition) => (
            <motion.div
              key={tuition._id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="card bg-base-100 shadow-2xl cursor-pointer hover:shadow-primary/20 border border-base-300 overflow-hidden group"
              onClick={() => navigate(`/tuition-details/${tuition._id}`)}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              
              <div className="card-body p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="badge badge-primary badge-lg gap-2">
                    <FaGraduationCap />
                    New
                  </div>
                </div>
                
                <h3 className="card-title text-2xl mb-4 group-hover:text-primary transition-colors">
                  {tuition.NameOfclass}
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-base">
                    <FaBook className="text-primary flex-shrink-0" />
                    <span className="font-medium">Subject:</span>
                    <span className="opacity-80">{tuition.subjectName}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-base">
                    <FaMapMarkerAlt className="text-secondary flex-shrink-0" />
                    <span className="font-medium">District:</span>
                    <span className="opacity-80">{tuition.tuitionDistrict}</span>
                  </div>
                </div>
                
                <div className="card-actions justify-end mt-6">
                  <button className="btn btn-primary btn-sm gap-2 group-hover:gap-3 transition-all">
                    View Details
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <button 
            onClick={handleViewAllTuitions}
            className="btn btn-outline btn-primary btn-lg gap-2"
          >
            View All Tuitions
            <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTuitionPosts;