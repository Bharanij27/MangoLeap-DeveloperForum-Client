import React, { Fragment, useState } from "react";
import callAPI from "../../common/callAPI";
import Input from "../Input/Input";
import Loading from "../Loading/Loading";

const SignUp = ({ title, setIsLogin }) => {
    let formDetails = { email: "", pass: "", uname: "", cpass: "" };
    const [formData, setFormData] = useState(formDetails);
    const [isLoading, setIsLoading] = useState(false);
    
    const onInputChange = (id, value) => {
      setFormData({ ...formData, [id]: value });
    };
  
    const createUser = async (e) => {
        try 
        {
            e.preventDefault();
            if (formData.pass !== formData.cpass) {
                alert("Password Should be same");
                return;
            }
            else if(formData.pass.length < 4){
                alert('The password should be a minimum of 4 characters in length')
            }
            let response = await callAPI("http://localhost:3030/newUser", {...formData,}, 'POST');
            console.log(response);
            if (response.status === 200) {
                setIsLogin(true);
                setIsLoading(false);
                alert('Account Created');
            } else {
                setIsLoading(false);
                alert(response.message)
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

  return (
    <Fragment>
      {isLoading && <Loading/>}
      <form className="form-signin" onSubmit={(e) => createUser(e)}>
        <Input id="inputEmail" type="email" placeholder="Email Address" value={formData.email} name="email" setValue={onInputChange}/>
        <Input id="inputusername" type="text" placeholder="User Name" value={formData.uname} name="uname" setValue={onInputChange}/>
        <Input type="password" id="inputPassword" placeholder="Password" value={formData.pass} name="pass" setValue={onInputChange}/>
        <Input type="password" id="inputCPassword" placeholder="Confirm Password" value={formData.cpass} name="cpass" setValue={onInputChange}/>
        <button className="btn btn-md btn-primary btn-block text-uppercase" type="submit"> {title} </button>
      </form>
      <hr className="my-4" />
      <div className="text-center">
        Have an account?
        <p className="d-block text-center mt-2 link form cursor" onClick={() => setIsLogin(true)}> Login </p>
      </div>
    </Fragment>
  );
};

export default SignUp;
