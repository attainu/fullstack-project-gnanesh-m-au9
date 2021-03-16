import AdminHeader from './AdminHeader';
import {Container,Row,Col} from 'react-bootstrap';
import {useEffect,useState} from 'react';
import AdminDisplay from './AdminDisplay';
import axios from 'axios';

const GetAdmin = () => {
    const [admins,setadmins]=useState();
    const[errormessage,seterrormessage]=useState();

    useEffect(()=>{
        axios.get('http://localhost:5000/admin/adminslist',{
            headers:{
                'x-access-token':sessionStorage.getItem('token')
            }
        })
        .then((res)=>{
            console.log(res.data)
            setadmins(res.data)
        })
        .catch((err)=>{
            seterrormessage(err.response.data.message)
        })
    },[]);

    return(
        <>
       <AdminHeader/>
       <br/>
       <Container>
            <Row>
            <h3 style={{color:"red"}}>{errormessage}</h3>
                <Col sm={10}>
                    <AdminDisplay adminList={admins}/>
                </Col>
            </Row>
       </Container>  
        </>
    )
}
export default GetAdmin;