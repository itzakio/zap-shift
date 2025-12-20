import React from 'react';
import useAuth from '../hook/useAuth';
import useRole from '../hook/useRole';
import Loader from '../components/Loader';
import Forbidden from '../components/Forbidden';

const RiderRoute = ({children}) => {
  const { userLoading } = useAuth();
  const { role, isRoleLoading } = useRole();
  if (userLoading || isRoleLoading) {
    return <Loader />;
  }
  if (role?.role !== "rider") {
    return <Forbidden />;
  }
  return children;
};

export default RiderRoute;
