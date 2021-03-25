import AdminHeader from './AdminHeader';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import axios from 'axios';

const GetAdmin = () => {
    const [admins, setadmins] = useState();
    const [errormessage, seterrormessage] = useState();

    useEffect(() => {
        axios.get('https://collegemanage.herokuapp.com/admin/adminslist', {
            headers: {
                'x-access-token': sessionStorage.getItem('admintoken')
            }
        })
            .then((res) => {
                setadmins(res.data)
            })
            .catch((err) => {
                seterrormessage(err.response.data.message)
            })
    }, []);


    // Delete Admin
    const deleteAdmin = async (regNo) => {
        if (window.confirm('Are you sure you want to Delete this Admin')) {

            // axios delete should follow below order
            await axios.delete('https://collegemanage.herokuapp.com/admin/deleteadmin', {
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
                    window.location.reload();
                })
                .catch((err) => {
                    seterrormessage(err.response.data.message)
                })
        }
    }

    const displayAdmins = (admins) => {
        if (admins) {
            return admins.map((item) => {
                return (
                    <tr>
                        <td style={{ color: 'white' }}>{item.name}</td>
                        <td style={{ color: 'white' }}>{item.regNo}</td>
                        <td style={{ color: 'white' }}>{item.dob}</td>
                        <td style={{ color: 'white' }}>{item.branch}</td>
                        <td style={{ color: 'white' }}>{item.collegeCode}</td>
                        <td>
                            <Button onClick={() => deleteAdmin(item.regNo)} variant="warning">Delete Admin</Button>
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
                <Row className='trial'>
                    <h3 style={{ color: "red" }}>{errormessage}</h3>
                    <Col sm={10}>
                        <h1 style={{ color: "lightyellow" }}>Admin Details</h1>
                        <br></br>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th style={{ color: "skyblue" }}>Name</th>
                                    <th style={{ color: "skyblue" }}>Reg Number</th>
                                    <th style={{ color: "skyblue" }}>DOB</th>
                                    <th style={{ color: "skyblue" }}>Branch</th>
                                    <th style={{ color: "skyblue" }}>College Code</th>
                                    <th style={{ color: "skyblue" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayAdmins(admins)}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
export default GetAdmin;