import {Navbar,Nav,NavDropdown} from 'react-bootstrap';
const AdminHeader=()=>{
    return(
        <>
        {/* <Navbar  bg="dark" variant="dark">
            <Navbar.Brand href="/">Admin</Navbar.Brand>
            <Nav>
            <Nav.Link href="/addstudent">Add Student</Nav.Link>
            <Nav.Link href="/getstudent">Get Student</Nav.Link>
            <Nav.Link href="/addfaculty">Add Faculty</Nav.Link>
            <Nav.Link href="/getfaculty">Get Faculty</Nav.Link>
            <Nav.Link href="/addsubject">Add Subject</Nav.Link>
            <Nav.Link href="/getsubject">Get Subject</Nav.Link>
            </Nav>
        </Navbar> */}
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="/adminprofile">Admin</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/addstudent">Add Student</Nav.Link>
      <Nav.Link href="/getstudent">Get Student</Nav.Link>
      <Nav.Link href="/addfaculty">Add Faculty</Nav.Link>
      <Nav.Link href="/getfaculty">Get Faculty</Nav.Link>
      <Nav.Link href="/addsubject">Add Subject</Nav.Link>
      <Nav.Link href="/getsubject">Get Subject</Nav.Link>
      <Nav.Link href="/addadmin">Add Admin</Nav.Link>
      <Nav.Link href="/getadmin">Get Admin</Nav.Link>
    </Nav>
    <Nav>
      <Nav.Link href="/">Log out</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
        </>
    )
}
export default AdminHeader;