import {Route} from 'react-router-dom';
import AdminHome from './AdminSection/AdminHome';
import AdminProfile from './AdminSection/AdminProfile';
import AddFaculty from './AdminSection/AddFaculty';
import AddSubject from './AdminSection/AddSubject';
import AddStudent from './AdminSection/AddStudent';
import AddAdmin from './AdminSection/AddAdmin';
import GetFaculty from './AdminSection/GetFaculty';
import GetStudent from './AdminSection/GetStudent';
import GetSubject from './AdminSection/GetSubject';
import GetAdmin from './AdminSection/GetAdmin';

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
        <Route path="/addadmin" component={AddAdmin}/>
        <Route path="/getadmin" component={GetAdmin}/>
        </>
    )
}
export default Routing;