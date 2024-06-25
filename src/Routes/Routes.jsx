import {createBrowserRouter} from 'react-router-dom'
import Login from '../Home/Login';
import App from '../App';
import Dashboard from '../Dashboard/Dashboard';
import Today from '../Dashboard/Today';

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
            path:'/dashboard',
            element: <Dashboard/>,
            children: [
                {
                    path:'today',
                    element: <Today/>
                }
            ]
        },
    ]
    },
    
])

export default router;