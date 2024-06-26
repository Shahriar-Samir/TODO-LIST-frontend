import {createBrowserRouter} from 'react-router-dom'
import Login from '../Home/Login';
import App from '../App';
import Dashboard from '../Dashboard/Dashboard';
import Today from '../Dashboard/Today';
import Signup from '../Home/Signup';
import Events from '../Dashboard/Events';
import AllTasksPage from '../Dashboard/AllTasksPage';
import Notifications from '../Dashboard/Notifications';
import Profile from '../Dashboard/Profile';
import PrivateRoute from '../Providers/PrivateRoute';

const router = createBrowserRouter([
    {
    path: '/',
    element: <App/>,
    errorElement: '',
    children:[
        {
            path:'/',
            element: <Login/>
        },
        {
            path:'/signup',
            element: <Signup/>
        },
    ]
    },
    {
        path:'/app',
        element: <PrivateRoute><Dashboard/></PrivateRoute>,
        children: [
            {
                path:'today',
                element: <Today/>
            },
            {
                path:'events',
                element: <Events/>
            },
            {
                path:'allTasks',
                element: <AllTasksPage/>
            },
            {
                path:'notifications',
                element: <Notifications/>
            },
            {
                path:'profile',
                element: <Profile/>
            },
        ]
    },
    
])

export default router;