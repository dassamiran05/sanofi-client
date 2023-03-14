import React, {useState} from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBTypography } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import { toast } from 'react-hot-toast';
import { Button } from 'react-bootstrap';


const Profile = () => {
    const [loggedinuser, setLoggedinuser] = useState(JSON.parse(localStorage.getItem("userInfo")));

    const navigate = useNavigate();


    const handlelogout = (event) =>{
        event.preventDefault();
        localStorage.removeItem("userInfo");
        toast.success("successfully logged out");
        setTimeout(() => {
            navigate('/login');
        }, 500);
    }

    return (
        <div className="vh-100" style={{ backgroundColor: '#eee' }}>
      <MDBContainer className="container py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="12" xl="4">
            <MDBCard style={{ borderRadius: '15px' }}>
              <MDBCardBody className="text-center">
                <div className="mt-3 mb-4">
                  <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                    className="rounded-circle" fluid style={{ width: '100px' }} />
                </div>
                <MDBTypography tag="h4">{loggedinuser?.username}</MDBTypography>
                <MDBCardText className="text-muted mb-4">
                  {loggedinuser?.mobile} <span className="mx-2">|</span> <a href="#!">{loggedinuser?.email}</a>
                </MDBCardText>
                
                <Button variant="primary" rounded size="lg" onClick={handlelogout}>
                  Logout
                </Button>
                {/* <div className="d-flex justify-content-between text-center mt-5 mb-2">
                  <div>
                    <MDBCardText className="mb-1 h5">8471</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Wallets Balance</MDBCardText>
                  </div>
                  <div className="px-3">
                    <MDBCardText className="mb-1 h5">8512</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Followers</MDBCardText>
                  </div>
                  <div>
                    <MDBCardText className="mb-1 h5">4751</MDBCardText>
                    <MDBCardText className="small text-muted mb-0">Total Transactions</MDBCardText>
                  </div>
                </div> */}
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
    );
};

export default Profile;