import AdminHeader from './AdminHeader';
import {Container,Row,Col} from 'react-bootstrap';
import {useState,useEffect} from 'react';

const AdminProfile = () => {
    return(
        <>
       <AdminHeader/>
       <Container>
           <Row>
               <Col sm={5}>
                    {/* <AdminImage/> */}
               </Col>
           </Row>
       </Container>
        </>
    )
}
export default AdminProfile;