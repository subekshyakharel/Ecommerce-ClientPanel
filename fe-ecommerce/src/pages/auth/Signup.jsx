import { Button, Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import CustomInput from "../../component/customInput/CustomInput.jsx";
import { signupInput } from "../../component/input/SignUpInput.js";
import useForm from "../../hooks/useForm.js";
import { signupNewUserApi } from "../../services/authapi.js";
import { Link } from "react-router-dom";

const initialState = {
  fName:"",
  lName:"",
  email:"",
  phone:"",
  password:"",
  confirmPassword:""
}

const Signup = () => {
  const {form, setForm, handleOnChange, passwordErrors} = useForm(initialState);

  const handleOnSubmit = async(e)=>{
    e.preventDefault();

    const {confirmPassword, ...rest} = form;
    if(confirmPassword != rest.password) return alert("Password donot match")
    console.log(form);

    const {status, message} = await signupNewUserApi(rest);

    status=="success" && setForm(initialState)
  }
  // console.log(passwordErrors)

  return (
    <div className="main mt-5">
      <Container className="d-flex justify-content-center">
        <Row className="border p-3 rounded align-items-center" style={{width:"400px"}}>
          <Col xs={12} md={12} className="mb-3">
            <Form onSubmit={ handleOnSubmit}>
              <h1 className="text-center mb-4">Signup!</h1>
              {signupInput.map((input, i) => (
                <CustomInput value={form[input.name] || ""} onChange={handleOnChange} key={i} {...input} />
              ))}
              <div className="d-grid mt-3">
                <Button variant="dark" type="submit">Signup</Button>
              </div>
            </Form>
            <p className="text-center mt-3">Already have an account? <span className="text-primary"><Link to="/login">Login</Link></span></p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Signup;
