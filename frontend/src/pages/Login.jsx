import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Spinner from '../components/Spinner';
import { login, reset } from '../features/auth/authSlice';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispach = useDispatch();
  const navigate = useNavigate();

  const { email, password } = formData;

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    state => state.auth
  );

  const onSubmit = e => {
    e.preventDefault();
    dispach(login({ email, password }));
  };

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  useEffect(() => {
    if (isError) {
      const messages = message.split('\n');
      messages.forEach(message => toast.error(message));
    }

    if (isSuccess || user) {
      navigate('/');
    }

    return () => dispach(reset());
  }, [user, isSuccess, isError, message, navigate, dispach]);

  return (
    <div className="col-md-6 offset-md-3 pt-5">
      <h1 className="text-center mb-5">
        Account <span className="text-primary">Login</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className="form-floating mb-3">
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Email"
            id="email"
            className="form-control"
          />
          <label htmlFor="email" className="form-label mn-1">
            Email
          </label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Password"
            id="password"
            className="form-control"
          />
          <label htmlFor="password" className="form-label mn-1">
            Password
          </label>
        </div>
        <div className="d-grid gap-2">
          <button className="btn btn-lg btn-primary shadow-lg">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
