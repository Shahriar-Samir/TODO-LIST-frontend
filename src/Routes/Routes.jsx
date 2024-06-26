import {createBrowserRouter} from 'react-router-dom'
import Login from '../Home/Login';
import App from '../App';
import Dashboard from '../Dashboard/Dashboard';
import Today from '../Dashboard/Today';
import Signup from '../Home/Signup';
import Task from '../Dashboard/Task';
import Events from '../Dashboard/Events';

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
        element: <Dashboard/>,
        children: [
            {
                path:'today',
                element: <Today/>
            },
            {
                path:'events',
                element: <Events/>
            },
        ]
    },
    
])

export default router;