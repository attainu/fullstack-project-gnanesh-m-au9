import {Table} from 'react-bootstrap';
const FacultyDisplay = (props)  => {
    const displayFaculty=({facultyList})=>{
        if(facultyList){
            return facultyList.map((item)=>{
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.dob}</td>
                        <td>{item.gender}</td>
                        <td>{item.doj}</td>
                        <td>{item.regNo}</td>
                    </tr>
                )
            })
        }

    }
    return(
        <>
        <h1>Faculty Display</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Joined Date</th>
                <th>Reg No</th>
                </tr>
            </thead>
            <tbody>
            {displayFaculty(props)}
            </tbody>
        </Table>
        </>
    )
}
export default FacultyDisplay;