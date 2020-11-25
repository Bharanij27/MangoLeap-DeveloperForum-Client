import React, { useEffect, useState } from "react";
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import "./Form.css";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Form = () => {
  const [isLogin, setIsLogin] = useState(true);
  const formText = isLogin ? 'Login' : 'SignUp';

  const history = useHistory();
  const [cookies] = useCookies(['user']);
  
  useEffect(()=>{
      if(cookies && cookies.user && cookies.user.token){
          history.push('/forum')
      }
  })

  return (
      <div className="container form-bg">
        <div className="row">
            <div className="col-lg-10 col-xl-9 mx-auto">    
                <div className="card card-signin flex-row ml-5 mr-5 mt-3 mb-3">
                    <div className={formText + " card-img-left m-1 d-none d-md-flex"}>
                </div>
                <div className="card-body">
                    <h5 className="card-title text-center">{formText}</h5> 
                    {isLogin ? 
                        <Login title={formText}  setIsLogin={setIsLogin}/> : 
                        <SignUp title={formText}  setIsLogin={setIsLogin}/>}
                </div>
            </div>
        </div>
    </div>
  </div>
  );
};

export default Form;
