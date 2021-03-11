import AdminHeader from './AdminHeader';
import {Container,Row,Col} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import AdminDisplay from './AdminDisplay';
import axios from 'axios';

const GetAdmin = () => {
    const [admins,setadmins]=useState();

    useEffect(()=>{
        axios.get('http://localhost:5000/admin/adminslist')
        .then((res)=>{
            console.log(res.data)
            setadmins(res.data)
        })
    },[]);

    return(
        <>
       <AdminHeader/>
       <br/>
       <Container>
            <Row>
                <Col sm={3}>
                </Col>
                <Col sm={8}>
                    <AdminDisplay adminList={admins}/>
                </Col>
            </Row>
       </Container>  
        </>
    )
}
export default GetAdmin;