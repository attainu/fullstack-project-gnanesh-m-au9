import FacultyHeader from './FacultyHeader';
import { Form, Container,Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
import '../AdminSection/profileAdmin.css'

const MarkAttendance = () => {
    const facultyregNo = JSON.parse(sessionStorage.getItem('facultyregNo'))

    const [regNo] = useState(facultyregNo);

    const [sem, setsem] = useState();
    const [branch, setbranch] = useState();
    const [subjects, setsubjects] = useState();
    // all students in the given sem and branch
    const [students, setstudents] = useState();
    // students who present
    const [presentstudents, setpresentstudents] = useState([]);

    const [errormessage, seterrormessage] = useState();


    const [selectedsubjectcode, setselectedsubjectcode] = useState();


    useEffect(() => {
        axios.get(`https://collegemanage.herokuapp.com/faculty/facultybyid/${regNo}`)
            .then((res) => {
                setbranch(res.data.branch)
            })
    }, []);

    // Display Subjects
    const displaySubjects = (subjects) => {
        if (subjects) {
            return subjects.map((item) => {
                return (
                    <option value={item.subCode}>
                        {item.subCode} || {item.subName}
                    </option>
                )
            })
        }
    }

    // Find Subjects
    const findSubjects = (value) => {
        if (value == 1 && branch != "GEN") {
            setsubjects(null)
        }
        if (value !== 1 && branch != "GEN") {
            seterrormessage(null)
        }
        const details = {
            branch: branch,
            sem: value
        }
        setsem(value)

        axios.post('https://collegemanage.herokuapp.com/subject/subjectlist', details)
            .then((res) => {
                setsubjects(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    // Find Students
    const findStudents = async () => {
        if (typeof (sem) == 'undefined' || typeof (selectedsubjectcode) == 'undefined') {
            seterrormessage("Please fill all fields");
            return;
        }
        seterrormessage(null)
        const details = {
            branch: branch,
            sem: sem
        }
        await axios.post('https://collegemanage.herokuapp.com/faculty/facultystudentslist', details)
            .then((res) => {
                setstudents(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    // find present students
    const presentStudentslist = (e, item) => {
        if (e.target.checked) {
            setpresentstudents(presentStudents => [...presentStudents, item])
        } else {
            setpresentstudents(presentstudents.filter(student => student !== item));
        }
    }

    // save Students
    // const saveStudents=(regNo,value)=>{
    //     if(attendedStudentsArray.includes(regNo)){
    //         const valueIndex = attendedStudentsArray.indexOf(regNo);
    //             if (valueIndex > -1) {
    //                 attendedStudentsArray.splice(valueIndex, 1);
    //                 return;
    //             }
    //     }
    //     attendedStudentsArray.push(regNo)
    //     console.log(attendedStudentsArray)
    // }

    // save All Students
    const saveAllStudents = async () => {
        if (typeof (students) == 'undefined') {
            seterrormessage("Please Find The Students First");
            return;
        }
        let studentDetails = {
            "branch": branch,
            "sem": sem,
            "subjectCode": selectedsubjectcode,
            "studentsAttended": presentstudents
        }
        // console.log("presentstudents>>>>>>>>",presentstudents);
        axios.post('https://collegemanage.herokuapp.com/faculty/markattendance', studentDetails)
            .then((res) => {
                alert('Attendance marked succesfully')
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })

    }


    // Display Students
    const displayStudents = (students) => {
        if (students) {
            return students.map((item) => {
                return (
                    <tr value={item._id}>
                        <td style={{ color: 'white' }}>{item.regNo}</td>
                        <td style={{ color: 'white' }}>{item.name}</td>
                        <td>
                            <Form.Group>
                                <Form.Label></Form.Label>
                                <Form.Control type="checkbox" value="present" onChange={(e) => { presentStudentslist(e, item) }} />
                            </Form.Group>
                        </td>
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
                            <select className="form-control" id="sem" onChange={(e) => findSubjects(parseInt(e.target.value))}>
                                <option>----SELECT SEM-----</option>
                                <option value="1">1</option>
                                <option value="3">3</option>
                                <option value="5">5</option>
                                <option value="7">7</option>
                            </select>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Branch</Form.Label>
                            <Form.Control type="text" value={branch} readOnly />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }} >Select Subject:</Form.Label>
                            <select className="form-control" id="subject" onChange={(e) => setselectedsubjectcode(e.target.value)}>
                                <option>----SELECT SUBJECTS-----</option>
                                {displaySubjects(subjects)}
                            </select>
                        </Form.Group>
                        {/* <Button onClick={submitValues}>Find Students</Button> */}
                        <Button onClick={findStudents}>Find Students</Button>
                    </Form>
                    <div className="studentflex2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: 'white' }}>Registration Number</th>
                                    <th style={{ color: 'white' }}>Student Name</th>
                                    <th style={{ color: 'white' }}>Attendance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayStudents(students)}
                            </tbody>
                        </Table>
                    </div>
                    {/* </Col>
            </Row> */}
                </div>
                <center><Button onClick={saveAllStudents}>Submit Attendance</Button> </center>

            </Container>
        </div>
    )
}
export default MarkAttendance;