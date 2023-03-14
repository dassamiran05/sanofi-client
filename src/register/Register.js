import React, { useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './register.scss';
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
    Link, useNavigate
  } from "react-router-dom"; 
import toast from 'react-hot-toast';                            

const Register = () => {
    const initialvalues = { name: "", mobile: "", email: "", password: "" };
    const [formValues, setFormValues] = useState(initialvalues);
    const [formError, setFormError] = useState({});
    const [condition, setCondition] = useState(false);
    // const [token, setToken] = useState('');
    // const [regsisteredEmail, setRegisteredEmail] = useState('');

    const navigate = useNavigate();

    // useEffect(() => {
    //     if(token){
    //         setTimeout(() => { navigate('/profile') }, 2000);
    //     }
    // }, [token, navigate]);


    const handleChangeInput = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    }

    const handleSignup = event => {
        event.preventDefault();

        setFormError({});

        const error = validate(formValues);
        setFormError(error);

        if(Object.keys(error).length === 0){

            fetch("https://sanofi-backend.vercel.app/api/auth/register",{
                method:'POST',
                headers:{'content-type':'application/json'},
                body:JSON.stringify(formValues)
            }).then((res) => res.json())
            .then((data => {
                if(data.success === true){
                    // localStorage.setItem("accessToken", JSON.stringify(data.registeredUser));
                    toast.success('Registration done successfuly');
                    setTimeout(() => { navigate('/profile') }, 2000);
                    // setToken(data.registeredUser.accessToken);
                    // setRegisteredEmail(data.registeredUser._doc.email);
                }else{
                    toast.error('There is an error');
                } 
                setFormValues(initialvalues);  
            }))
            .catch((err) => toast.error(err));
        }
    }


    const validate = values => {
        const errors = {};
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

        if (!values.name) {
            errors.name = 'Enter your name';
        }
        if (!values.email) {
            errors.email = 'Enter your email';
        } else if (!regex.test(values.email)) {
            errors.email = 'This is not a valid email';
        }
        if (!values.password) {
            errors.password = 'Enter your password';
        } else if (values.password.length !== 6) {
            errors.password = 'Password length sholud be 6';
        }

        if (!values.mobile) {
            errors.mobile = 'Enter your mobile number';
        } else if (values.mobile.length !== 10) {
            errors.mobile = "mobile must be 10 digit"
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
                                <Form onSubmit={handleSignup}>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" name="name" placeholder="Dr. Full Name" onChange={handleChangeInput} value={formValues.name}/>
                                        {formError.name && <p className='error-message'>{formError.name}</p>}
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Control type="email" name="email" placeholder="Enter ID" onChange={handleChangeInput} value={formValues.email}/>
                                        {formError.email && <p className='error-message'>{formError.email}</p>}
                                    </Form.Group>
                                    <InputGroup className="mb-3">
                                        <Button variant="outline-secondary" id="button-addon1" className="bg-white code">
                                            91+   
                                        </Button>
                                        <Form.Control type="number" name="mobile" placeholder="Mobile No" onChange={handleChangeInput} value={formValues.mobile}/>
                                    </InputGroup>
                                    {formError.mobile && <p className='error-message'>{formError.mobile}</p>}

                                    <Form.Group className="mb-3">
                                        <Form.Control type="password" name="password" placeholder="Password" onChange={handleChangeInput} value={formValues.password}/>
                                        {formError.password && <p className='error-message'>{formError.password}</p>}
                                    </Form.Group>
                                    <Button className='submit' type="submit" disabled={!condition}>
                                        Join the Program
                                    </Button>
                                </Form>
                                <div className='already my-3'>
                                    <span>Already Registered <Link to="/login"><span>Click here</span></Link></span>
                                </div>
                                <div className='check'>
                                    <input type="checkbox" onClick={() => setCondition(!condition)}/>
                                    <span>I agree to the Term and Conditions</span>
                                </div>
                                
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Register;