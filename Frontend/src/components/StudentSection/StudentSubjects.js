import StudentHeader from './StudentHeader';
import { Container,Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const StudentSubjects = () => {

    const studentregNo = JSON.parse(sessionStorage.getItem('studentregNo'))

    const [regNo] = useState(studentregNo);

    const [sem, setsem] = useState();
    const [branch, setbranch] = useState();
    const [subjects, setsubjects] = useState();

    const [errormessage, seterrormessage] = useState();

    useEffect(() => {
        axios.get(`https://collegemanage.herokuapp.com/student/studentbyid/${regNo}`)
            .then((res) => {
                setsem(res.data.sem);
                setbranch(res.data.branch)
            })
    }, []);

    // find my Subjects
    const findSubjects = () => {
        const details = {
            branch: branch,
            sem: parseInt(sem)
        }
        axios.post('https://collegemanage.herokuapp.com/student/subjectlist', details)
            .then((res) => {
                seterrormessage('');
                setsubjects(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }

    // display subjects
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
            <StudentHeader />
            <Container>
                <div style={{ margin: "1rem" }}>
                    <center>
                        <h1 style={{ color: 'white' }}>My Subjects</h1>
                        <h3 style={{ color: "red" }}>{errormessage}</h3>
                    </center>
                </div>

                <div className="studentinfo">
                    <div className="studentflex1">
                        <Button onClick={findSubjects}>Find My Subjects</Button>
                    </div>
                    <div className="studentflex2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: 'white' }}>SLNO</th>
                                    <th style={{ color: 'white' }}>Subject Name</th>
                                    <th style={{ color: 'white' }}>Subject Code</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displaySubjects(subjects)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default StudentSubjects;