import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

function Dashboard() {
  const { user, isLoading } = useSelector(state => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) return <Spinner />;
  return (
    user && (
      <div>
        <h1>
          Welcome <span className="text-primary">{user.name}</span>
        </h1>
      </div>
    )
  );
}

export default Dashboard;
