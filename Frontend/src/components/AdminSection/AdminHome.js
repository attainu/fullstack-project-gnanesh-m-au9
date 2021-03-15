import {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AdminHome = () => {
    const [regNo,setregNo]=useState();
    const [password,setpassword]=useState();
    const [errormessage,seterrormessage]=useState();

    let history = useHistory()

    const handleSubmit= async (event)=>{
        event.preventDefault();
        const user={
            regNo:regNo,
            password:password
        }
        // console.log(user)
       await axios.post('http://localhost:5000/admin/login',{data:user}) 
       .then((res)=>{
           sessionStorage.setItem('token',res.data.token);
		   const adminRegNumber = res.data.admindata.regNo
		   sessionStorage.setItem('adminregNo',JSON.stringify(adminRegNumber));
           history.push('/adminprofile');
       })
	   .catch((err)=>{
		   if(err){
				seterrormessage(err.response.data)
		   }
		   return;
	   })
    }
    return(
        <div className="limiter">
		<div className="container-login100">
			<div className="wrap-login100">
				<form className="login100-form validate-form" onSubmit={handleSubmit}>
                    {/* if login fails, we can show message here */}
                    <h3 style={{color:'red'}}>{errormessage}</h3>
					<span className="login100-form-title p-b-34">
						Admin Login
					</span>
					
					<div className="wrap-input100 rs1-wrap-input100 validate-input m-b-20" data-validate="Type user name">
						<input id="first-name" className="input100" type="text" name="username" placeholder="Register Number" onChange={(e)=>{setregNo(e.target.value)}}/>
						<span className="focus-input100"></span>
					</div>
					<div className="wrap-input100 rs2-wrap-input100 validate-input m-b-20" data-validate="Type password">
						<input className="input100" type="password" name="pass" placeholder="Password" 
                        onChange={(e)=>setpassword(e.target.value)}/>
						<span className="focus-input100"></span>
					</div>
					
					<div className="container-login100-form-btn">
						<button type="submit" className="login100-form-btn">
							Log in
						</button>
					</div>

					<div className="w-full text-center p-t-27 p-b-239">
						<span className="txt1">
							Forgot
						</span>

						<a href="#" className="txt2">
							User name / password?
						</a>
					</div>

					<div className="w-full text-center">
						<a href="#" className="txt3">
							Sign Up
						</a>
					</div>
				</form>

				<div className="login100-more" style={{backgroundImage: "url('assets/images/bg-01.jpg')"}}></div>
			</div>
		</div>
	</div>
    )
}
export default AdminHome;