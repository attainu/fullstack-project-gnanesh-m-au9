import AdminHeader from './AdminHeader';
import {Form,Container,Row,Col,Button} from 'react-bootstrap';
import {useState} from 'react';
import FacultyDisplay from './FacultyDisplay';
import axios from 'axios';

const GetStudent = () => {
    const [branch,setbranch]=useState();
    const [faculty,setfaculty]=useState();
    const [errormessage,seterrormessage]=useState();

    const submitValues=()=>{
        const details={
            branch:branch,
        }
        // console.log(branch)
        axios.post('http://localhost:5000/admin/facultylist', {data:details},{
            headers:{
                'x-access-token':sessionStorage.getItem('token')
            }
        })
        .then((res)=>{
            setfaculty(res.data)
        })
        .catch((err)=>{
            seterrormessage(err.response.data.message)
        })
    }
    return(
        <>
       <AdminHeader/>
       <br/>
       <Container>
           <h3 style={{color:"red"}}>{errormessage}</h3>
            <Row>
                <Col sm={3}>
                    <Form>
                        <Form.Group>
                                <Form.Label>Select Branch:</Form.Label>
                                    <select className="form-control" id="branch" onChange={(e)=>setbranch(e.target.value)}>
                                        <option>----SELECT BRANCH-----</option>
                                        <option value="CSE">CSE</option>
                                        <option value="MECH">MECH</option>
                                        <option value="CIVIL">CIVIL</option>
                                        <option value="EC">ECE</option>
                                    </select>
                        </Form.Group>
                        <Button onClick={submitValues}>Find Faculties</Button>
                    </Form>
                </Col>
                <Col sm={8}>
                    <FacultyDisplay facultyList={faculty}/>
                </Col>
            </Row>
       </Container>  
        </>
    )
}
export default GetStudent;