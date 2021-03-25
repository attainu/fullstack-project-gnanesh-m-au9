import FacultyHeader from './FacultyHeader';
import { Form, Container,Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminSection/profileAdmin.css'

const FacultySubjects = () => {
    const facultyregNo = JSON.parse(sessionStorage.getItem('facultyregNo'))

    const [regNo] = useState(facultyregNo);

    const [sem, setsem] = useState();

    const [branch, setbranch] = useState();

    const [subjects, setsubjects] = useState();

    const [errormessage, seterrormessage] = useState();

    useEffect(() => {
        axios.get(`https://collegemanage.herokuapp.com/faculty/facultybyid/${regNo}`)
            .then((res) => {
                setbranch(res.data.branch)
            })
    }, []);

    // find subjects
    const findSubjects = () => {
        const details = {
            branch: branch,
            sem: sem
        }
        axios.post('https://collegemanage.herokuapp.com/faculty/subjectlist', details)
            .then((res) => {
                seterrormessage('');
                setsubjects(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    // Display Subjects
    const displaySubjects = (subjects) => {
        if (subjects) {
            return subjects.map((item, idx) => {
                return (
                    <tr>
                        <td style={{ color: 'white' }}>{idx}</td>
                        <td style={{ color: 'white' }}>{item.subName}</td>
                        <td style={{ color: 'white' }}>{item.subCode}</td>
                    </tr>
                )
            })
        }
    }


    return (
        <div className="addstudentdata">
            <FacultyHeader />
            <br />
            <Container>
                <h3 style={{ color: "red" }}>{errormessage}</h3>
                <div className="studentinfo">
                    <Form className="studentflex1">
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Select Semester:</Form.Label>
                            {/* by default values from option will be string, we use parseInt to convert to Integer */}
                            <select className="form-control" id="sem" onChange={(e) => setsem(parseInt(e.target.value))}>
                                <option>----SELECT SEM-----</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Branch</Form.Label>
                            <Form.Control type="text" value={branch} readOnly />
                        </Form.Group>
                        <Button onClick={findSubjects}>Find Subjects</Button>
                    </Form>
                    <div className="studentflex2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: 'white' }}>SL NO</th>
                                    <th style={{ color: 'white' }}>Subject Name</th>
                                    <th style={{ color: 'white' }}>Subject Code</th>
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
        </div>
    )
}
export default FacultySubjects;