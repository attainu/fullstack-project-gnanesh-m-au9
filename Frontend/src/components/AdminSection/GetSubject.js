import AdminHeader from './AdminHeader';
import { Form, Container,Button, Table } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

const GetSubject = () => {
    const [sem, setsem] = useState();
    const [branch, setbranch] = useState();
    const [subjects, setsubjects] = useState();
    const [errormessage, seterrormessage] = useState();

    const submitValues = () => {
        const details = {
            branch: branch,
            sem: sem
        }
        axios.post('https://collegemanage.herokuapp.com/admin/subjectlist', details, {
            headers: {
                'x-access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then((res) => {
                seterrormessage('');
                setsubjects(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    // Delete Subject
    const deleteSubject = async (subCode) => {
        if (window.confirm('Are you sure you want to Delete this Subject')) {

            // axios delete should follow below order
            await axios.delete('https://collegemanage.herokuapp.com/admin/deletesubject', {
                headers: {
                    'x-access-token': sessionStorage.getItem('admintoken')
                },
                data: {
                    subCode
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


    const displaySubjects = (subjects) => {
        if (subjects) {
            return subjects.map((item) => {
                return (
                    <tr>
                        <td style={{ color: 'white' }}>{item.subName}</td>
                        <td style={{ color: 'white' }}
                        >{item.subCode}</td>
                        <td>
                            <Button onClick={() => deleteSubject(item.subCode)} variant="warning">Delete Subject</Button>
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
                {/* <Row>
                <Col sm={3}> */}
                <div className="studentinfo">
                    <Form className="studentflex1">
                        <Form.Group>
                            <Form.Label style={{ color: "white" }} >Select Semester:</Form.Label>
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
                            <Form.Label style={{ color: "white" }} >Select Branch:</Form.Label>
                            <select className="form-control" id="branch" onChange={(e) => setbranch(e.target.value)}>
                                <option>----SELECT BRANCH-----</option>
                                <option value="GEN">GEN</option>
                                <option value="CSE">CSE</option>
                                <option value="MECH">MECH</option>
                                <option value="CIVIL">CIVIL</option>
                                <option value="EC">ECE</option>
                            </select>
                        </Form.Group>
                        <Button onClick={submitValues}>Find Subjects</Button>
                    </Form>
                    {/* </Col>
                <Col sm={8}> */}
                    <div className="studentflex2">
                        <center><h1 style={{ color: "lightyellow" }} >Subject Details</h1></center>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: "skyblue" }} >Subject Name</th>
                                    <th style={{ color: "skyblue" }} >Subject Code</th>
                                    <th style={{ color: "skyblue" }} >Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displaySubjects(subjects)}
                            </tbody>
                        </Table>
                    </div>
                    {/* </Col>
            </Row> */}
                </div>
            </Container>
        </div >
    )
}
export default GetSubject;