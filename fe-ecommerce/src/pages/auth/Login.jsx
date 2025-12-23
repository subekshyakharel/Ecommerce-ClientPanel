import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import CustomInput from "../../component/customInput/CustomInput.jsx";
import { signupInput } from "../../component/input/SignUpInput.js";
import useForm from "../../hooks/useForm.js";
import { loginUserApi } from "../../services/authapi.js";
import { loginInput } from "../../component/input/LoginInput.js";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { autoLoginUser, fetchUserAction } from "../../features/user/UserAction.js";
import { useEffect, useRef } from "react";

const initialState = {
  fName:"",
  lName:"",
  email:"",
  phone:"",
  password:"",
  confirmPassword:""
}

const Login = () => {
  const {form, setForm, handleOnChange} = useForm(initialState);
  const dispatch = useDispatch();
  const {user }= useSelector((state)=> state.userInfo)
  const navigate = useNavigate();
  const location = useLocation();
  const showLoaderRef = useRef(true)

  const path = location?.state?.from ?? "/user";

  useEffect(()=>{
    user?._id ? navigate(path) : dispatch(autoLoginUser())

    if(sessionStorage.getItem("accessJWT") || localStorage.getItem("refreshJWT")){
      setTimeout(()=> {
showLoaderRef.current = false
      }, 2000)
    } else {
      showLoaderRef.current = false
    }
  }, [user._id, navigate, dispatch])

  const handleOnSubmit = async(e)=>{
    e.preventDefault();
    if(form.email && form.password){
          const {payload} = await loginUserApi(form);
          sessionStorage.setItem("accessJWT", payload.accessJWT)
          localStorage.setItem("refreshJWT", payload.refreshJWT)
          console.log(payload)

          dispatch(fetchUserAction());
    } else {
      alert("Both input must be provided")
    }


    status=="success" && setForm(initialState)
  }

  return (
    <div className="main mt-5">
      <Container className="d-flex justify-content-center">
        <Row className="border p-3 rounded align-items-center" style={{width:"400px"}}>
          <Col xs={12} md={12} className="mb-3">
            <Form onSubmit={ handleOnSubmit}>
              <h1 className="text-center mb-4">Login!</h1>
              {loginInput.map((input, i) => (
                <CustomInput value={form[input.name] || ""} onChange={handleOnChange} key={i} {...input} />
              ))}
              <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Login</Button>
              </div>
            </Form>
            <p className="text-center mt-3">Don't have an account? <span className="text-primary"><Link to="/signup">Signup</Link></span></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
