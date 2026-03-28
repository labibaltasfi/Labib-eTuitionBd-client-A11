import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { FaCircleUser } from 'react-icons/fa6';
import { useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAuth from '../../hooks/useAuth';

const ScrollButtons = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

   const DEMO_EMAIL = 'demo@demo.com'; 

  // Scroll functions
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
  };

  // Fetch full user data by email
  const { data: userData, isLoading } = useQuery({
    queryKey: ['user', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get('/users/by-email', {
        params: { email: user.email },
      });
      return res.data; // full user object
    },
  });

  return (
    <div>
      {/* Scroll buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <button
          onClick={scrollToTop}
          className="w-12 h-12 rounded-full bg-base-200 text-base-content shadow-lg border border-base-content/10 flex items-center justify-center hover:bg-base-300 transition-colors"
        >
          <FaArrowUp />
        </button>

        <button
          onClick={scrollToBottom}
          className="w-12 h-12 rounded-full bg-base-200 text-base-content shadow-lg border border-base-content/10 flex items-center justify-center hover:bg-base-300 transition-colors"
        >
          <FaArrowDown />
        </button>
      </div>

      {/* Demo User button */}
      <div className="fixed top-25 right-6 flex flex-col gap-3 z-10">
        {!isLoading && userData?.email === DEMO_EMAIL && (
          <button
            onClick={() => navigate('demo-user')}
            className="btn rounded-xl py-5 btn-secondary w-full flex items-center gap-2"
          >
            <FaCircleUser />
            Demo User
          </button>
        )}
      </div>
    </div>
  );
};

export default ScrollButtons;
