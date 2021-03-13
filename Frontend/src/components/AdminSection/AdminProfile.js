import AdminHeader from './AdminHeader';
import {Container,Row,Col,Card,Button,Table,Form,Modal} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import axios from 'axios';

const AdminProfile = () => {

    const adminInfo = JSON.parse(sessionStorage.getItem('userdata'))
    
    const [userData]=useState(adminInfo);
    const [regNo]=useState(adminInfo.regNo);
    const [name,setname]=useState(adminInfo.name);
    const[dob,setdob]=useState(adminInfo.dob);
    const[branch,setbranch]=useState(adminInfo.branch);
    const[collegeCode,setcollegeCode]=useState(adminInfo.collegeCode);
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const handleShow = (regNo) =>{
        setShow(true);
    }
    const handleSubmit=(event)=>{
        event.preventDefault();
        const adminUpdatedDetails={
            regNo:regNo,
            name:name,
            dob:dob,
            branch:branch,
            collegeCode:collegeCode
        }
        axios.put('http://localhost:5000/admin/updateadmin',adminUpdatedDetails)
        .then((res)=>{
            window.location.reload()
        })
    }

    return(
        <>
       <AdminHeader/>
            <Container>
            <br/>
            <br/>
                <center>
                 <Row>
                     <Col sm={5} style={{marginLeft:'4rem'}} >
                         <center>
                             <Card border="primary" style={{ width: '18rem',backgroundColor:'skyblue' }}>
                                 <Card.Header>Profile Picture</Card.Header>
                                 <Card.Body>
                                     <img src="/assets/images/avatar.png" alt="avatar"/>
                                 </Card.Body>
                                 <Card.Footer>
                                     <Form>
                                     <Form.Label>Upload Image</Form.Label>
                                         <input type="file" name="avatar" style={{cursor:"pointer"}}/>
                                     </Form>
                                 </Card.Footer>
                             </Card>
                         </center>
                     </Col>
                     <Col sm={6} style={{marginRight:'1.2rem'}} >
                         <Table striped  variant="dark">
                             <tbody>
                                 <tr>
                                     <td colSpan="2">Name</td>
                                     <td>{userData.name}</td>
                                 </tr>

                                 <tr>
                                     <td colSpan="2">Reg Number</td>
                                     <td>{userData.regNo}</td>
                                 </tr>
                                 <tr>
                                     <td colSpan="2">DOB</td>
                                     <td>{userData.dob}</td>
                                 </tr>
                                 <tr>
                                     <td colSpan="2">Branch</td>
                                     <td>{userData.branch}</td>
                                 </tr>
                                 <tr>
                                     <td colSpan="2">College Code</td>
                                     <td>{userData.collegeCode}</td>
                                 </tr>
                                 <center>
                                     <Button style={{margin:"1.5rem"}} variant="primary" onClick={()=>{handleShow(userData.regNo)}}>Update Profile</Button>&nbsp;
                                 </center>
                             </tbody>
                         </Table>
                     </Col>
                 </Row>
                </center>
                <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                 <Modal.Title>Update Profile Info</Modal.Title>
                 </Modal.Header>

                 <Modal.Body>
                     <Form onSubmit={handleSubmit}>
                         <Form.Group>
                             <Form.Label>Admin Reg Number</Form.Label>
                             <Form.Control type="text" value={regNo} readOnly />
                         </Form.Group> 

                         <Form.Group>
                             <Form.Label>Name</Form.Label>
                             <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e)=>setname(e.target.value)}/>
                         </Form.Group>                    

                         <Form.Group>
                             <Form.Label>DOB</Form.Label>
                             <Form.Control type="date" value={dob} onChange={(e)=>setdob(e.target.value)}/>
                         </Form.Group>

                         <Form.Group>
                             <Form.Label>Branch</Form.Label>
                             <Form.Control type="text" value={branch} onChange={(e)=>setbranch(e.target.value)}/>
                         </Form.Group>

                         <Form.Group>
                             <Form.Label>College Code</Form.Label>
                             <Form.Control type="text" value={collegeCode} onChange={(e)=>setcollegeCode(e.target.value)}/>
                         </Form.Group>

                         <Button type="submit" variant="success">
                             Update
                         </Button>&nbsp;
                         <Button variant="danger" onClick={handleClose}>
                             Close
                         </Button>
                     </Form>  
                 </Modal.Body>
             </Modal>
            </Container>
         </>
    )
}
export default AdminProfile;