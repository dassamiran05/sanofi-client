import React, {useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../register/register.scss';
import openinfo from '../assets/images/Icon-open-info.svg';
import rightbg from '../assets/images/Path_1.svg';
import leftbg from '../assets/images/leftBG.svg';
import avatar from '../assets/images/avatar.jpg';
import bannerleft from '../assets/images/bannerLeft.png';
import logo from '../assets/images/logo.svg';
import mask from '../assets/images/Mask-group2.svg';
import image4 from '../assets/images/Image4.svg';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';   
import {
    Link, useLocation, useNavigate
  } from "react-router-dom"; 
import toast from 'react-hot-toast'; 

const Login = () => {

    const initialvalues = { email: "", password: "" };
    const [formValues, setFormValues] = useState(initialvalues);
    const [token, setToken] = useState('');
    const [formError, setFormError] = useState({});
    const [mobilelogin, setMobilelogin]= useState(false);
    const [mobileInput, setMobileInput] = useState("");
    const [mobileError, setMobileError] = useState("");


    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/profile';


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    useEffect(() => {
        if(token){
            setTimeout(() => {navigate(from, {replace: true})}, 3000);
        }
    }, [token, navigate, from]);

    const handleSignin = event => {
        event.preventDefault();

        setFormError({});

        const error = validate(formValues);
        setFormError(error);

        if (Object.keys(error).length === 0) {
            // const {userEmail, userPass} = formValues;
            // https://sanofi-backend.vercel.app/

            fetch("https://sanofi-backend.vercel.app/api/auth/login",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(formValues)
            })
            .then((res) => { return res.json() })
            .then((data) => {
                if(data.message === "Login successful"){
                    const token = data.userInfo.accessToken;
                    localStorage.setItem('userInfo', JSON.stringify(data.userInfo));
                    setToken(token);
                    toast.success(data.message);
                }else if(data.message === 'Wrong Email'){        
                    toast.error(data.message);
                }else if(data.message === 'Wrong password'){
                    toast.error(data.message);
                }
                setFormValues(initialvalues);              
            }).catch((err) => toast.error(err));
        }
    } 
    
    const handleMobileSignin = event =>{
        event.preventDefault();

        if(!mobileInput){
            setMobileError("Enter your number");
        }else if(mobileInput.length !== 10){
            setMobileError("Not a valid number");
        }

        if(mobileInput && mobileInput.length === 10){
            setMobileError("");

            fetch("https://sanofi-backend.vercel.app/api/auth/mobilelogin",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(mobileInput)
            })
            .then((res) => {console.log(res)})
            .catch((err) =>{console.log(err)})
        }
    }

    const validate = values => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;


        if (!values.email) {
            errors.email = 'Enter your email';
        } else if (!regex.test(values.email)) {
            errors.email = 'This is not a valid email';
        }
        if (!values.password) {
            errors.password = 'Enter your password';
        } else if (values.password.length !== 6) {
            errors.password = 'Password length should be 6';
        }

        return errors;

    }
    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={6} lg={8} style={{paddingRight:'0'}}>
                        <div className='left'>
                            <div className='left-content'>
                                <div className="header-content">
                                    <div className="logo-section">
                                        <Row>
                                            <Col xs={12} sm={6} className="d-flex align-items-top justify-content-start">
                                                <div className="logo-div">
                                                    <img src={logo} alt="" />
                                                </div>    
                                            </Col>
                                            <Col xs={12} sm={6} className="d-flex align-items-top justify-content-end">
                                                <div className='mask-div'>
                                                    <img src={mask} alt="" />
                                                </div>   
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="content-section">
                                        <p>tune in to listen to the expert on</p>
                                        <span className='effects'>pleiotropic effects of vitamin d</span>
                                        <span className="date">2nd November 2022 | 7:30pm to 8:30pm</span>
                                    </div>
                                </div>
                                <div className="doctor-section my-5">
                                    <Row className='d-flex align-items-center justify-content-center mb-5'>
                                        <Col xs={12} sm={6} lg={6}  className='d-flex align-items-center justify-content-center'>
                                            <div className="doctor-image">
                                                <img src={avatar} alt="" />
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6} lg={6}>
                                            <div className="doctor-contnet">
                                                <div className='speaker'>
                                                    <p>Speaker</p>
                                                </div>
                                                <h4 className="mt-4 mb-2">Dr. Michael F Holick</h4>
                                                <p>Professor of medicine, Physiology and biophysics, director of the general clinical research unit</p>
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs={12} sm={6} lg={6} className='d-flex align-items-center justify-content-center'>
                                            <div className="doctor-contnet2">
                                                <div className='speaker'>
                                                    <p>Moderator</p>
                                                </div>
                                                <h4 className="mt-4 mb-2">Dr. Michael F Holick</h4>
                                                <p>Professor of medicine, Physiology and biophysics, director of the general clinical research unit</p>
                                            </div>
                                        </Col>
                                        <Col xs={12} sm={6} lg={6} className='d-flex align-items-center justify-content-center'>
                                            <div className="doctor-image2">
                                                <img src={avatar} alt="" />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                                <div className="footer-section">
                                    <span className="mat">MAT-in 232334244234 VOL-1 3553</span>
                                    <p className='disclamer'>Disclamer</p>
                                    <p className='desc'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                                    <div>
                                        <Row>
                                            <Col sm={6} md={6} lg={6}   className="d-flex align-items-start flex-column justify-content-start">
                                                <img src={mask} alt="" />
                                                <p className='address mt-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                                            </Col>
                                            <Col sm={6} md={6} lg={6} className="d-flex align-items-center justify-content-end">
                                                <div>
                                                    <img src={image4} alt="" />
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </div>
                           
                            {/* <div className="curve"> */}
                                <img className="left-curve" src={leftbg} alt="" />
                                <img className="right-curve" src={rightbg}  alt="" />
                            {/* </div> */}
                            
                            <img src={bannerleft} className="banner" alt="" />
                        </div>
                    </Col>
                    <Col xs={12} md={6} lg={4} style={{paddingLeft:'0'}}>
                        <div className="form-div">
                            <div className="info">
                                <span className="icon"><img src={openinfo} alt="" /></span>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                            </div>
                            <div className="form">
                                {
                                    mobilelogin ? 
                                    <Form onSubmit={handleMobileSignin}>
                                        <InputGroup className="mb-3">
                                            <Button variant="outline-secondary" id="button-addon1" className="bg-white code">
                                                91+   
                                            </Button>
                                            <Form.Control type="number" name="mobile" placeholder="Mobile No" onChange={(e) => setMobileInput(e.target.value)} value={mobileInput}/>
                                        </InputGroup>
                                        {mobileError && <p className='error-message'>{mobileError}</p>}
                                        <Button className='submit' type="submit">
                                            Login
                                        </Button>
                                    </Form>
                                    :
                                    <Form onSubmit={handleSignin}>
                                    
                                        <Form.Group className="mb-3">
                                            <Form.Control type="email" name="email" placeholder="Enter ID" onChange={handleChangeInput} value={formValues.email}/>
                                            {formError.email && <p className='error-message'>{formError.email}</p>}
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Control type="password" name="password" placeholder="Password" onChange={handleChangeInput} value={formValues.password}/>
                                            {formError.password && <p className='error-message'>{formError.password}</p>}
                                        </Form.Group>
                                        <Button className='submit' type="submit">
                                            Login
                                        </Button>
                                    </Form>

                                }
                                
                                { !mobilelogin && <div className='submit2' onClick={() => setMobilelogin(true)}><span>Login with mobile</span></div>}
                                <div className='already my-3'>
                                    <span>New Visitor <Link to="/"><span>Click here</span></Link></span>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Login;