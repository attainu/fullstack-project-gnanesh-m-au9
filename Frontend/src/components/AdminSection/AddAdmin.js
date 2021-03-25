import AdminHeader from './AdminHeader';
import { Form, Container,Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const AddAdmin = () => {
    const [name, setname] = useState();
    const [regNo, setregNo] = useState();
    const [dob, setdob] = useState();
    const [branch, setbranch] = useState();
    const [collegeCode, setcollegeCode] = useState();
    const [errormessage, seterrormessage] = useState();

    let history = useHistory();

    const submitHandler = async (event) => {
        event.preventDefault();
        const admindetails = {
            name: name,
            regNo: regNo,
            dob: dob,
            branch: branch,
            collegeCode: collegeCode
        }
        // console.log(studentdetails)
        await axios.post('https://collegemanage.herokuapp.com/admin/addadmin', admindetails, {
            headers: {
                'x-access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then((res) => {
                alert('New Admin Added Succesfuly');
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
                <center><h1 style={{ color: 'lightyellow' }}>Add Admin</h1></center>
                <br />
                <h2 style={{ color: "red" }}>{errormessage}</h2>
                <Form onSubmit={submitHandler}>
                    <div className='studentinfo'>
                        <div className="studentflex">
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Admin Name</Form.Label>
                                <Form.Control type="text" placeholder="Admin Name" onChange={(e) => setname(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Enter Registration Number</Form.Label>
                                <Form.Control type="text" placeholder="Subject Name" onChange={(e) => setregNo(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Enter DOB</Form.Label>
                                <Form.Control type="date" onChange={(e) => setdob(e.target.value)} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label style={{ color: 'white' }}>Select Branch:</Form.Label>
                                <select className="form-control" onChange={(e) => setbranch(e.target.value)}>
                                    <option>----SELECT BRANCH-----</option>
                                    <option value="GEN">GEN</option>
                                    <option value="CSE">CSE</option>
                                    <option value="MECH">MECH</option>
                                    <option value="CIVIL">CIVIL</option>
                                    <option value="EC">ECE</option>
                                </select>
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
                    <center><Button type="submit">Add Admin</Button></center>
                </Form>
            </Container>
        </div>
    )
}
export default AddAdmin;