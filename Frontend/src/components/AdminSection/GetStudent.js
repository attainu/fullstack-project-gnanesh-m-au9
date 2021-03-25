import AdminHeader from './AdminHeader';
import { Form, Container,Button, Table,Row,Col } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const GetStudent = () => {
    const [sem, setsem] = useState();
    const [branch, setbranch] = useState();
    const [students, setstudents] = useState();
    const [errormessage, seterrormessage] = useState();

    // Find Stundents
    const submitValues = async () => {
        const details = {
            branch: branch,
            sem: sem
        }
        await axios.post('https://collegemanage.herokuapp.com/admin/studentslist', details, {
            headers: {
                'x-access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then((res) => {
                setstudents(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    // Delete Student
    const deleteStudent = async (regNo) => {
        if (window.confirm('Are you sure you want to Delete this Student')) {

            // axios delete should follow below order
            await axios.delete('https://collegemanage.herokuapp.com/admin/deletestudent', {
                headers: {
                    'x-access-token': sessionStorage.getItem('admintoken')
                },
                data: {
                    regNo
                }
            })
                .then((res) => {
                    // when the delete is success, based on the values of branch, and sem which is already stored in useState()
                    // we fetch students again using below function and setstudents here
                    submitValues()
                })
                .catch((err) => {
                    seterrormessage(err.response.data.message)
                })
        }
    }

    // Display Students
    const displayStudents = (students) => {
        if (students) {
            return students.map((item) => {
                return (
                    <tr>
                        <td style={{ color: 'white' }}>{item.name}</td>
                        <td style={{ color: 'white' }}>{item.dob}</td>
                        <td style={{ color: 'white' }}>{item.branch}</td>
                        <td style={{ color: 'white' }}>{item.gender}</td>
                        <td style={{ color: 'white' }}>{item.regNo}</td>
                        <td style={{ color: 'white' }}>{item.admissionYear}</td>
                        <td style={{ color: 'white' }}>{item.sem}</td>
                        <td>
                            <Button onClick={() => deleteStudent(item.regNo)} variant="warning">Delete Student</Button>
                        </td>
                    </tr>
                )
            })
        }
    }
    return (
        <div className="addstudentdata">
            <AdminHeader />
            <br />
            <Container>
                <h3 style={{ color: "red" }}>{errormessage}</h3>

                <div className="studentinfo">
                    <Row>
                    <Col sm={3}>
                    <Form className="studentflex1">
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Select Semester:</Form.Label>
                            {/* by default values from option will be string, we use parseInt to convert to Integer */}
                            <select className="form-control" id="sem" onChange={(e) => setsem(parseInt(e.target.value))}>
                                <option>----SELECT SEM-----</option>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Select Branch:</Form.Label>
                            <select className="form-control" id="branch" onChange={(e) => setbranch(e.target.value)}>
                                <option>----SELECT BRANCH-----</option>
                                <option value="CSE">CSE</option>
                                <option value="MECH">MECH</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="EC">ECE</option>
                            </select>
                        </Form.Group>
                        <br></br>
                        <Button onClick={submitValues}>Find Students</Button>
                    </Form>
                    </Col>
                    <Col sm={8}>
                    <div className="studentflex2">
                        <center><h1 style={{ color: 'lightyellow' }}>Student Details</h1></center>
                        <br></br>
                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: 'skyblue' }}>Name</th>
                                    <th style={{ color: 'skyblue' }}>DOB</th>
                                    <th style={{ color: 'skyblue' }}>Branch</th>
                                    <th style={{ color: 'skyblue' }}>Gender</th>
                                    <th style={{ color: 'skyblue' }}>Reg Number</th>
                                    <th style={{ color: 'skyblue' }}>year</th>
                                    <th style={{ color: 'skyblue' }}>Sem</th>
                                    <th style={{ color: 'skyblue' }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayStudents(students)}
                            </tbody>
                        </Table>
                    </div>
                    </Col>
                </Row>
                </div>
            </Container>
        </div>
    )
}
export default GetStudent;