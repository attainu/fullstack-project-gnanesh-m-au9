import {Route} from 'react-router-dom';
import AdminHome from './AdminSection/AdminHome';
import AdminProfile from './AdminSection/AdminProfile';
import AddFaculty from './AdminSection/AddFaculty';
import AddSubject from './AdminSection/AddSubject';
import AddStudent from './AdminSection/AddStudent';
import GetFaculty from './AdminSection/GetFaculty';
import GetStudent from './AdminSection/GetStudent';
import GetSubject from './AdminSection/GetSubject';

const Routing = ()=>{   
    return(
        <>
        <Route exact path="/" component={AdminHome}/>
        <Route path="/adminprofile" component={AdminProfile}/>
        <Route path="/addfaculty" component={AddFaculty}/>
        <Route path="/getfaculty" component={GetFaculty}/>
        <Route path="/getstudent" component={GetStudent}/>
        <Route path="/addstudent" component={AddStudent}/>
        <Route path="/addsubject" component={AddSubject}/>
        <Route path="/getsubject" component={GetSubject}/>
        </>
    )
}
export default Routing;