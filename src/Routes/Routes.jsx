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
import Search from '../Dashboard/Search';
import HideRoute from '../Providers/HideRoute';

const router = createBrowserRouter([
    {
    path: '/',
    element: <App/>,
    errorElement: '',
    children:[
        {
            path:'/',
            element: <HideRoute><Login/></HideRoute>
        },
        {
            path:'/signup',
            element: <HideRoute><Signup/></HideRoute>
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
            {
                path:'search',
                element: <Search/>
            },
        ]
    },
    
])

export default router;