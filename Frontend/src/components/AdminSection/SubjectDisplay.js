import {Table} from 'react-bootstrap';
const SubjectDisplay = (props)  => {
    const displaySubjects=({subjectList})=>{
        if(subjectList){
            return subjectList.map((item)=>{
                return(
                    <tr>
                        <td>{item.subName}</td>
                        <td>{item.subCode}</td>
                    </tr>
                )
            })
        }
    }
    return(
        <>
        <h1>Subject Display</h1>
        <Table striped bordered hover>
            <thead>
                <tr>
                <th>Subject Name</th>
                <th>Subject Code</th>
                </tr>
            </thead>
            <tbody>
            {displaySubjects(props)}
            </tbody>
        </Table>
        </>
    )
}
export default SubjectDisplay;