import AdminHeader from './AdminHeader';
import { Form, Container,Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const GetStudent = () => {
    const [branch, setbranch] = useState();
    const [faculty, setfaculty] = useState();
    const [errormessage, seterrormessage] = useState();

    const submitValues = async () => {
        const details = {
            branch: branch,
        }
        await axios.post('https://collegemanage.herokuapp.com/admin/facultylist', details, {
            headers: {
                'x-access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then((res) => {
                setfaculty(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }


    // Delete Student
    const deleteFaculty = async (regNo) => {
        if (window.confirm('Are you sure you want to Delete this Faculty')) {

            // axios delete should follow below order
            await axios.delete('https://collegemanage.herokuapp.com/admin/deletefaculty', {
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

    const displayFaculty = (faculty) => {
        if (faculty) {
            return faculty.map((item) => {
                return (
                    <tr>
                        <td style={{ color: 'white' }}>{item.name}</td>
                        <td style={{ color: 'white' }}>{item.dob}</td>
                        <td style={{ color: 'white' }}>{item.gender}</td>
                        <td style={{ color: 'white' }}>{item.doj}</td>
                        <td style={{ color: 'white' }}>{item.regNo}</td>
                        <td>
                            <Button onClick={() => deleteFaculty(item.regNo)} variant="warning">Delete Faculty</Button>
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
                    {/* <Row>
                <Col sm={3}> */}
                    <Form className="studentflex1">

                        <Form.Group>
                            <Form.Label style={{ color: "white" }} >Select Branch:</Form.Label>
                            <select className="form-control" id="branch" onChange={(e) => setbranch(e.target.value)}>
                                <option>---SELECT BRANCH---</option>
                                <option value="CSE">CSE</option>
                                <option value="MECH">MECH</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="EC">ECE</option>
                            </select>
                        </Form.Group>
                        <Button onClick={submitValues}>Find Faculties</Button>
                    </Form>
                    {/* </Col>
                <Col sm={9}> */}
                    <div className="studentflex2">
                        <center><h1 style={{ color: "lightyellow" }}>Faculty Details</h1></center>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: "skyblue" }} >Name</th>
                                    <th style={{ color: "skyblue" }}>DOB</th>
                                    <th style={{ color: "skyblue" }}>Gender</th>
                                    <th style={{ color: "skyblue" }}>Joined Date</th>
                                    <th style={{ color: "skyblue" }}>Reg No</th>
                                    <th style={{ color: "skyblue" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayFaculty(faculty)}
                            </tbody>
                        </Table>
                        {/* </Col>
            </Row> */}
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default GetStudent;