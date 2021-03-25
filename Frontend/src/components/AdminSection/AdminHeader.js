import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

const AdminHeader = () => {

  let history = useHistory();

  const logout = () => {
    sessionStorage.removeItem('admintoken')
    sessionStorage.removeItem('adminregNo')
    history.push('/');
  }

  return (
    <>
      <Navbar collapseOnSelect expand="lg"  variant="dark">
        <Navbar.Brand as={Link} to="/adminprofile">Admin</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Link to="/addstudent"  className="nav-link" style={{color:"whitesmoke"}}>Add Student</Link>
            <Link to="/getstudent" className="nav-link" style={{color:"whitesmoke"}}>Get Student</Link>
            <Link to="/addfaculty" className="nav-link" style={{color:"whitesmoke"}}>Add Faculty</Link>
            <Link to="/getfaculty" className="nav-link" style={{color:"whitesmoke"}}>Get Faculty</Link>
            <Link to="/addsubject" className="nav-link" style={{color:"whitesmoke"}}>Add Subject</Link>
            <Link to="/getsubject" className="nav-link" style={{color:"whitesmoke"}}>Get Subject</Link>
            <Link to="/addadmin" className="nav-link" style={{color:"whitesmoke"}}>Add Admin</Link>
            <Link to="/getadmin" className="nav-link" style={{color:"whitesmoke"}}>Get Admin</Link>
          </Nav>
          <Nav>
            <Link onClick={logout} style={{color:"whitesmoke"}}>Log out</Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}
export default AdminHeader;