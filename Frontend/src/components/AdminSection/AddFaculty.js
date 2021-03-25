import AdminHeader from './AdminHeader';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddFaculty = () => {
    const [name, setname] = useState();
    const [dob, setdob] = useState();
    const [gender, setgender] = useState();
    const [doj, setdoj] = useState();
    const [branch, setbranch] = useState();
    const [regNo, setregNo] = useState();
    const [collegeCode, setcollegeCode] = useState();
    const [errormessage, seterrormessage] = useState();

    let history = useHistory();

    const submitHandler = async (event) => {
        event.preventDefault();
        const facultydetails = {
            name: name,
            dob: dob,
            gender: gender,
            doj: doj,
            branch: branch,
            regNo: regNo,
            collegeCode: collegeCode
        }
        // console.log(studentdetails)
        await axios.post('https://collegemanage.herokuapp.com/admin/addfaculty', facultydetails, {
            headers: {
                'x-access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then((res) => {
                alert('New Faculty Added Succesfuly');
                history.goBack()
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    return (
        <div className="addstudentdata">
            <AdminHeader />
            <Container>
                <center><h1 style={{ color: 'lightyellow' }}>Add Faculty</h1></center>
                <br />
                <h2 style={{ color: "red" }}>{errormessage}</h2>
                <Form onSubmit={submitHandler}>
                    <div className='studentinfo'>
                        <div className="studentflex">
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Faculty Name</Form.Label>
                                <Form.Control type="text" placeholder="Faculty Name" onChange={(e) => setname(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Faculty DOB</Form.Label>
                                <Form.Control type="date" placeholder="Faculty DOB" onChange={(e) => setdob(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Select Gender:</Form.Label>
                                {/* by default values from option will be string, we use parseInt to convert to Integer */}
                                <select className="form-control" id="sem" onChange={(e) => setgender(e.target.value)}>
                                    <option>----SELECT GENDER-----</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </select>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Date Of Join</Form.Label>
                                <Form.Control type="date" placeholder="Date of Join" onChange={(e) => setdoj(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="studentflex">
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Select Branch:</Form.Label>
                                <select className="form-control" onChange={(e) => setbranch(e.target.value)}>
                                    <option>----SELECT BRANCH-----</option>
                                    <option value="CSE">CSE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                    <option value="EC">ECE</option>
                                </select>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Registration Number</Form.Label>
                                <Form.Control type="text" placeholder="Registration Number" onChange={(e) => setregNo(e.target.value)} />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>College Code:</Form.Label>
                                {/* by default values from option will be string, we use parseInt to convert to Integer */}
                                <select className="form-control" id="sem" onChange={(e) => setcollegeCode(e.target.value)}>
                                    <option>----SELECT COLLEGE CODE-----</option>
                                    <option value="ATT">ATT</option>
                                </select>
                            </Form.Group>

                        </div>
                    </div>
                    <center><Button type="submit">Add Student</Button></center>
                </Form>
            </Container>
        </div>
    )
}
export default AddFaculty;