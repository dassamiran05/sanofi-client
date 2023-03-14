import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {

    
    let location = useLocation();
    const [user, setUser] = useState({});
    const navigate = useNavigate();
    
    useEffect(() => {
        const userInfo = localStorage.getItem('userInfo');
        const {accessToken, email} = JSON.parse(userInfo) || '';
        
        if(accessToken)
        {
            fetch(`https://sanofi-backend.vercel.app/api/auth/token?email=${email}`,{
                method:'GET',
                headers:{
                    authorization:`Bearer ${accessToken}`,
                    'content-type':'application/json'
                }
            }).then((res) => res.json())
            .then(data => {
                console.log(data);
                if(data.success){
                    setUser(data.user);
                }
            })
            .catch(err => console.log(err));
        }else{
            navigate('/login');
        }

    },[])
    

    if(user){
        return children;
    }
    return <Navigate to="/login" state={{from: location}} replace></Navigate>;
};

export default PrivateRoute;