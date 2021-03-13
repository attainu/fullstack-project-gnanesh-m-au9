import AdminHeader from './AdminHeader';
import {Container,Row,Col,Card,Button,Table,Form,Modal} from 'react-bootstrap';
import {useState,useEffect} from 'react';
import axios from 'axios';

const AdminProfile = () => {

    const adminregNo = JSON.parse(sessionStorage.getItem('adminregNo'))
    
    const [regNo]=useState(adminregNo);
    const [name,setname]=useState();
    const[dob,setdob]=useState();
    const[branch,setbranch]=useState();
    const[collegeCode,setcollegeCode]=useState();
    const[profilepic,setprofilepic]=useState();
    
    useEffect(()=>{
        axios.get(`http://localhost:5000/admin/adminbyid/${regNo}`)
        .then((res)=>{
            setname(res.data.name)
            setdob(res.data.dob)
            setbranch(res.data.branch)
            setcollegeCode(res.data.collegeCode)
        })
    },[]);

    const [show, setShow] = useState(false);
    const handleClose = () => {
        setShow(false);
        window.location.reload();
    }

    const handleShow = (regNo) =>{
        setShow(true);
    }
    const handleSubmit=async(event)=>{
        event.preventDefault();
        const adminUpdatedDetails={
            regNo:regNo,
            name:name,
            dob:dob,
            branch:branch,
            collegeCode:collegeCode
        }
        await axios.put('http://localhost:5000/admin/updateadmin',adminUpdatedDetails)
        .then((res)=>{
            window.location.reload();
        })
    }

    const submitProfilePic = (event) => {
        event.preventDefault();
        // console.log(profilepic)
        const data = new FormData();
        data.append('profilepic',profilepic)
        axios.post('http://localhost:5000/admin/updateadminpic',data)
        .then((res)=>{
            console.log(res)
        })
        .then((err)=>{
            console.log(err)
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
                                     <Form onSubmit={submitProfilePic}>
                                        <input type="file" name="avatar" style={{cursor:"pointer"}} onChange={(e)=>setprofilepic(e.target.files[0])} />
                                        <br/><br/>
                                        <Button type="submit">Update Pic</Button>
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
                                     <td>{name}</td>
                                 </tr>

                                 <tr>
                                     <td colSpan="2">Reg Number</td>
                                     <td>{regNo}</td>
                                 </tr>
                                 <tr>
                                     <td colSpan="2">DOB</td>
                                     <td>{dob}</td>
                                 </tr>
                                 <tr>
                                     <td colSpan="2">Branch</td>
                                     <td>{branch}</td>
                                 </tr>
                                 <tr>
                                     <td colSpan="2">College Code</td>
                                     <td>{collegeCode}</td>
                                 </tr>
                                 <center>
                                     <Button style={{margin:"1.5rem"}} variant="primary" onClick={()=>{handleShow(regNo)}}>Update Profile</Button>&nbsp;
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