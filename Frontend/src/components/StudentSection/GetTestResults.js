import StudentHeader from './StudentHeader';
import { Container, Button, Form, Table } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import axios from 'axios';

const GetTestResults = () => {

    // while getting values from session storage parse it
    const studentregNo = JSON.parse(sessionStorage.getItem('studentregNo'))

    const [regNo] = useState(studentregNo);
    const [studentid, setstudentid] = useState();

    // test for which marks has to find
    const [testid, settestid] = useState();

    // marks details of the student'
    const [marksdetails, setmarksdetails] = useState();

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

    // find marks
    const findMarks = async () => {
        let studentdata = {
            studentid: studentid,
            testid: testid
        }
        await axios.post('https://collegemanage.herokuapp.com/student/gettestresults', studentdata)
            .then((res) => {
                setmarksdetails(res.data.marksData);
                seterrormessage('')
            })
            .catch((err) => {
                seterrormessage(err.response.data.message);
            })
    }

    // display Marks
    const displayMarks = (marksdetails) => {
        if (marksdetails) {
            return marksdetails.map((item, idx) => {
                var percentage = ((item.obtainedmarks / item.totalmarks) * 100).toFixed(2);
                return (
                    <tr>
                        <td style={{ color: 'white' }}>{idx}</td>
                        <td style={{ color: 'white' }}>{item.subject.subName}</td>
                        <td style={{ color: 'white' }}>{item.subject.subCode}</td>
                        <td style={{ color: 'white' }}>{item.totalmarks}</td>
                        <td style={{ color: 'white' }}>{item.obtainedmarks}</td>
                        <td style={{ color: 'white' }}>{percentage} %</td>
                    </tr>
                )
            })
        }

    }
    return (
        <div className='admincontainer'>
            <StudentHeader />
            <Container>
                <div style={{ margin: "1rem" }}>
                    <center>
                        <h1 style={{ color: 'white' }}>Test Results</h1>
                        <h3 style={{ color: "red" }}>{errormessage}</h3>
                    </center>
                </div>

                <div className="studentinfo">
                    <div className="studentflex1">
                        <Form.Group>
                            <Form.Label style={{ color: 'white' }}>Select Test:</Form.Label>
                            <select className="form-control" id="test" onChange={(e) => settestid(e.target.value)}>
                                <option>----SELECT TEST-----</option>
                                <option value="INT1">INTERNAL-1</option>
                                <option value="INT2">INTERNAL-2</option>
                                <option value="INT3">INTERNAL-3</option>
                                <option value="LAB">LAB INTERNAL</option>
                                <option value="MAINS">MAINS</option>
                            </select>
                        </Form.Group>
                        <Button onClick={findMarks}>Find Results</Button>
                    </div>
                    <div className="studentflex2">
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: 'white' }}>SLNO</th>
                                    <th style={{ color: 'white' }}>Subject Name</th>
                                    <th style={{ color: 'white' }}>Subject Code</th>
                                    <th style={{ color: 'white' }}>Total Marks</th>
                                    <th style={{ color: 'white' }}>Obtained Marks</th>
                                    <th style={{ color: 'white' }}>Total Percentage</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayMarks(marksdetails)}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Container>
        </div>
    )
}
export default GetTestResults;