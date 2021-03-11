import AdminHeader from './AdminHeader';
import {Form,Container,Row,Col,Button} from 'react-bootstrap';
import {useState} from 'react';
import StudentDisplay from './StudentDisplay';
import axios from 'axios';

const GetStudent = () => {
    const [sem,setsem]=useState();
    const [branch,setbranch]=useState();
    const [students,setstudents]=useState();

    const submitValues=()=>{
        const details={
            branch:branch,
            sem:sem
        }
        axios.post('http://localhost:5000/admin/studentslist', {data:details})
        .then((res)=>{
            // console.log(res.data)
            setstudents(res.data)
        })
    }
    return(
        <>
       <AdminHeader/>
       <br/>
       <Container>
            <Row>
                <Col sm={3}>
                    <Form>
                        <Form.Group>
                            <Form.Label>Select Semester:</Form.Label>
                                {/* by default values from option will be string, we use parseInt to convert to Integer */}
                                <select className="form-control" id="sem" onChange={(e)=>setsem(parseInt(e.target.value))}>
                                    <option>----SELECT SEM-----</option>
                                    <option value="1">1</option>
                                    <option value="3">3</option>
                                    <option value="5">5</option>
                                    <option value="7">7</option>
                                </select>
                        </Form.Group>
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
                        <Button onClick={submitValues}>Find Students</Button>
                    </Form>
                </Col>
                <Col sm={8}>
                    <StudentDisplay studentList={students}/>
                </Col>
            </Row>
       </Container>  
        </>
    )
}
export default GetStudent;