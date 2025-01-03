import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './Authcontext';

export const PrivateRoute = ({ children }) => {
  
  const { user, loading } = useContext(AuthContext);
  console.log(user)
  if (loading) {
    return <div>Loading...</div>;
  }
  if(user!==null){
  return user._id ? children : <Navigate to="/login" />;
  }else {
    return <Navigate to="/login"/>
  }
};