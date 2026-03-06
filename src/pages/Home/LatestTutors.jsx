import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { FaEnvelope, FaPhone, FaStar, FaUserGraduate, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const LatestTutors = ({ limit = 6 }) => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  
  const { data: tutors = [], isLoading, isError, error } = useQuery({
    queryKey: ['latest-tutors', limit],
    queryFn: async () => {
      const res = await axiosInstance.get('/users', {
        params: { role: 'tutor' }
      });
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
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };
  
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Latest Tutors
          </h2>
          <div className="text-center text-lg opacity-70">Loading tutors...</div>
        </div>
      </section>
    );
  }

  if (isError) {
    console.error('Error fetching tutors:', error);
    return (
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Latest Tutors
          </h2>
          <div className="text-center text-error text-lg">Failed to load tutors. Please try again later.</div>
        </div>
      </section>
    );
  }

  if (!tutors || tutors.length === 0) {
    return (
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Latest Tutors
          </h2>
          <div className="text-center text-lg opacity-70">No tutors available at the moment.</div>
        </div>
      </section>
    );
  }
  
  return (
    <section className="py-16 px-4 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              Latest Tutors
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Meet our newest qualified tutors ready to help you achieve your learning goals
            </p>
          </motion.div>
        </div>
        
        <motion.div
          className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {tutors.map((tutor) => (
            <motion.div
              key={tutor._id}
              variants={cardVariants}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="card bg-base-100 shadow-2xl border border-base-300 overflow-hidden group hover:shadow-secondary/20"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-secondary to-accent"></div>
              
              <figure className="px-8 pt-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/20 to-accent/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
                  <img 
                    src={tutor.photoURL} 
                    alt={tutor.displayName}
                    className="rounded-full w-32 h-32 object-cover border-4 border-base-300 group-hover:border-secondary transition-colors relative z-10"
                    loading="lazy"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-secondary text-secondary-content rounded-full p-2 z-20">
                    <FaUserGraduate className="text-xl" />
                  </div>
                </div>
              </figure>
              
              <div className="card-body items-center text-center p-6">
                <div className="badge badge-secondary badge-sm gap-1 mb-2">
                  <FaStar className="text-xs" />
                  New Tutor
                </div>
                
                <h3 className="card-title text-2xl mb-3 group-hover:text-secondary transition-colors">
                  {tutor.displayName}
                </h3>
                
                <div className="space-y-2 w-full">
                  <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                    <FaEnvelope className="text-secondary flex-shrink-0" />
                    <span className="truncate">{tutor.email}</span>
                  </div>
                  
                  {tutor.mobile && (
                    <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                      <FaPhone className="text-accent flex-shrink-0" />
                      <span>{tutor.mobile}</span>
                    </div>
                  )}
                </div>
                
                <div className="card-actions justify-center mt-4 w-full">
                  <button className="btn btn-secondary btn-sm btn-block gap-2 group-hover:gap-3 transition-all">
                    View Profile
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
            onClick={() => navigate('/register')}
            className="btn btn-outline btn-secondary btn-lg gap-2"
          >
            Become a Tutor
            <FaArrowRight />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTutors;
