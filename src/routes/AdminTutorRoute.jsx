import useAuth from '../hooks/useAuth';
import useRole from '../hooks/useRole';
import Loading from '../components/Loading/Loading';
import Forbidden from '../components/Forbidden/Forbidden';

const AdminTutorRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();

  if (loading || roleLoading) {
    return <Loading></Loading>;
  }

  if (!user || (role !== 'admin' && role !== 'tutor')) {
    return <Forbidden></Forbidden>;
  }

  return children;
};

export default AdminTutorRoute;
