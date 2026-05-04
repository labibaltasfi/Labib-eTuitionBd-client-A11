import { useQuery } from '@tanstack/react-query';
import useAxios from '../../hooks/useAxios';
import { FaEnvelope, FaPhone, FaStar, FaUserGraduate, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router';

const LatestTutors = ({ limit = 6 }) => {
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const palette = [
    { bar: 'from-secondary to-accent', chip: 'badge-secondary' },
    { bar: 'from-primary to-info', chip: 'badge-primary' },
    { bar: 'from-accent to-warning', chip: 'badge-accent' },
  ];
  
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
  
  if (isLoading) {
    return (
      <section className="py-16 px-4 bg-base-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold text-center mb-4 bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
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
          <h2 className="text-5xl font-bold text-center mb-4 bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
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
          <h2 className="text-5xl font-bold text-center mb-4 bg-linear-to-r from-secondary to-accent bg-clip-text text-transparent">
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
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-6 sm:mb-8">
              Latest Tutors
            </h2>
            <p className="text-lg opacity-70 max-w-2xl mx-auto">
              Meet our newest qualified tutors ready to help you achieve your learning goals
            </p>
          </div>
        </div>
        
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tutors.map((tutor) => (
            
            <div
              key={tutor._id}
              className="rounded-3xl bg-base-100 shadow-xl border border-base-300/70 overflow-hidden group hover:shadow-secondary/20 transition-all"
            >
              <div className={`h-2 w-full bg-linear-to-r ${palette[tutor.displayName?.length % 3]?.bar || 'from-secondary to-accent'}`}></div>

              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-2xl bg-base-200 border border-base-300 overflow-hidden flex items-center justify-center font-bold text-lg">
                      {tutor.photoURL ? (
                        <img
                          src={tutor.photoURL}
                          alt={tutor.displayName || 'Tutor'}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <span>{tutor.displayName?.charAt(0)?.toUpperCase() || 'T'}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-xl font-bold truncate group-hover:text-secondary transition-colors">
                        {tutor.displayName || 'Tutor'}
                      </h3>
                      <p className="text-sm opacity-70">Tutor Spotlight</p>
                    </div>
                  </div>

                  <div className={`badge gap-1 ${palette[tutor.displayName?.length % 3]?.chip || 'badge-secondary'}`}>
                    <FaStar className="text-xs" />
                    New
                  </div>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="rounded-xl bg-base-200/60 border border-base-300 px-3 py-2 flex items-center gap-2">
                    <FaEnvelope className="text-secondary shrink-0" />
                    <span className="text-sm truncate">{tutor.email}</span>
                  </div>

                  <div className="rounded-xl bg-base-200/60 border border-base-300 px-3 py-2 flex items-center gap-2">
                    <FaPhone className="text-accent shrink-0" />
                    <span className="text-sm">{tutor.mobile || 'Phone not added yet'}</span>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-2">
                  <div className="rounded-xl border border-base-300 px-3 py-2 text-center">
                    <p className="text-xs opacity-60 uppercase tracking-wide">Status</p>
                    <p className="font-semibold">Available</p>
                  </div>
                  <div className="rounded-xl border border-base-300 px-3 py-2 text-center">
                    <p className="text-xs opacity-60 uppercase tracking-wide">Type</p>
                    <p className="font-semibold flex items-center justify-center gap-1">
                      <FaUserGraduate className="text-sm" /> Tutor
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <button className="btn btn-primary btn-sm gap-2 group-hover:gap-3 transition-all">
                    View Profile
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/register')}
            className="btn btn-outline btn-primary btn-lg gap-2"
          >
            Become a Tutor
            <FaArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestTutors;
