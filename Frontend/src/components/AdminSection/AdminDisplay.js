import {Table} from 'react-bootstrap';
const AdminDisplay = (props)  => {
    const displayAdmins=({adminList})=>{
        if(adminList){
            return adminList.map((item)=>{
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.regNo}</td>
                        <td>{item.dob}</td>
                        <td>{item.branch}</td>
                        <td>{item.collegeCode}</td>
                    </tr>
                )
            })
        }
    }
    return(
        <>
        <h1>Admin Display</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>Reg Number</th>
                <th>DOB</th>
                <th>Branch</th>
                <th>College Code</th>
                </tr>
            </thead>
            <tbody>
            {displayAdmins(props)}
            </tbody>
        </Table>
        </>
    )
}
export default AdminDisplay;