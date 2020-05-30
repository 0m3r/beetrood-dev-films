import React from "react";
import {Route} from "react-router-dom"

// const AdminRoute = props => BaseComponent => {
//     return (props.user.role === 'admin') && (<BaseComponent {...props} />)
// }
const AdminRoute = (props) => {
    return (props.user.role === 'admin') && (<Route {...props} />)
}

export default AdminRoute;