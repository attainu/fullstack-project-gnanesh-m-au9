import {Table} from 'react-bootstrap';
const StudentDisplay = (props)  => {
    const displayStudents=({studentList})=>{
        if(studentList){
            return studentList.map((item)=>{
                return(
                    <tr>
                        <td>{item.name}</td>
                        <td>{item.dob}</td>
                        <td>{item.branch}</td>
                        <td>{item.gender}</td>
                        <td>{item.regNo}</td>
                        <td>{item.admissionYear}</td>
                        <td>{item.sem}</td>
                    </tr>
                )
            })
        }

    }
    return(
        <>
        <h1>Student Display</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Name</th>
                <th>DOB</th>
                <th>Branch</th>
                <th>Gender</th>
                <th>Reg Number</th>
                <th>Admission year</th>
                <th>Sem</th>
                </tr>
            </thead>
            <tbody>
            {displayStudents(props)}
            </tbody>
        </Table>
        </>
    )
}
export default StudentDisplay;