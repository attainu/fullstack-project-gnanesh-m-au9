import StudentHeader from './StudentHeader';
import { Container,Button, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';
const GetAttendance = () => {

    // while getting values from session storage parse it
    const studentregNo = JSON.parse(sessionStorage.getItem('studentregNo'))

    const [regNo] = useState(studentregNo);
    const [studentid, setstudentid] = useState();

    // attendace details of the student
    const [attendancedetails, setattendancedetails] = useState();

    const [errormessage, seterrormessage] = useState();

    // using student regNo, we are finding student ID
    useEffect(() => {
        axios.get(`https://collegemanage.herokuapp.com/student/studentbyid/${regNo}`)
            .then((res) => {
                setstudentid(res.data._id)
            })
            .catch((err) => {
                seterrormessage('cannot find student information');
            })
    }, []);

    // On clicking the button we are finding his attendance details
    const findmyattendance = async () => {
        let studentdata = {
            studentid: studentid
        }
        await axios.post('https://collegemanage.herokuapp.com/student/getattendance', studentdata)
            .then((res) => {
                // console.log(res.data.attendanceData)
                setattendancedetails(res.data.attendanceData);
                seterrormessage('')
            })
            .catch((err) => {
                seterrormessage(err.response.data.message);
                // seterrormessage('cannot find student information');
            })
    }

    // display student attendance
    const displayAttendance = (attendancedetails) => {

        if (attendancedetails) {
            return attendancedetails.map((item, idx) => {
                let attendancePercentage = ((item.classesAttendedByStudent / item.totalClassesByFaculty) * 100).toFixed(2)

                return (
                    <tr>
                        <td style={{ color: 'white' }}>{idx}</td>
                        <td style={{ color: 'white' }}>{item.subject.subName}</td>
                        <td style={{ color: 'white' }}>{item.subject.subCode}</td>
                        <td style={{ color: 'white' }}>{item.totalClassesByFaculty}</td>
                        <td style={{ color: 'white' }}>{item.classesAttendedByStudent}</td>
                        <td style={{ color: 'white' }}>{attendancePercentage} %</td>
                    </tr>
                )
            })
        }
    }
    // console.log("regNo>>>>>>>",regNo)
    // console.log("studentid>>>>",studentid)
    // console.log("attendancedetails>>>>>",attendancedetails)

    return (
        <div className='admincontainer'>
            <StudentHeader />
            <Container>
                <div style={{ margin: "1rem" }}>
                    <center>
                        <h1 style={{ color: 'white' }}>My Attendance</h1>
                        <h3 style={{ color: "red" }}>{errormessage}</h3>
                    </center>
                </div>

                <div className="studentinfo">
                    <div className="studentflex1">
                        <Button onClick={findmyattendance}>check My Attendance</Button>
                    </div>
                    <div className="studentflex2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: 'white' }}>SLNO</th>
                                    <th style={{ color: 'white' }}>Subject Name</th>
                                    <th style={{ color: 'white' }}>Subject Code</th>
                                    <th style={{ color: 'white' }}>Total Classes</th>
                                    <th style={{ color: 'white' }}>Attended Classes</th>
                                    <th style={{ color: 'white' }}>Attendence Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayAttendance(attendancedetails)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default GetAttendance;