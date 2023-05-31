import React, { useState, useEffect } from 'react';
import { Route, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkTokenValidity = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }

        // Make an API request to validate the token
        const response = await fetch('https://ventia.atpldhaka.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
            navigate('/login'); // Redirect to login if token is invalid
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error validating token:', error);
        setIsLoading(false);
      }
    };

    checkTokenValidity();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Add your loading indicator or component here
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <div>Not Authorized</div>
      }
    />
  );
};

export default PrivateRoute;
