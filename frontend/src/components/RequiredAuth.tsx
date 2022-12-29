import { useLocation, Navigate, Outlet, useNavigate } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import { RoleSchema } from "../data/enums/RoleSchema";
import { FC } from "react";

type propTypes = {
    allowedRole: RoleSchema;
};

const RequiredAuth: FC<propTypes> = (props)=> {
    const {allowedRole} = props;
    const {auth}  = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const navigateOnRole = (role: RoleSchema) => {
        if(role === RoleSchema.Administrator) return navigate('/admin/statistics', {replace : true})
        if(role === RoleSchema.Distributor) return navigate('/distributor/statistics', {replace : true})
        if(role === RoleSchema.Factory) return navigate('/factory/statistics', {replace : true})
        if(role === RoleSchema.ServiceCenter) return navigate('/service/statistics', {replace : true})
        return navigate('/Missing', {replace : true})
      }
  
    
    return (
        auth?.user.role === allowedRole
            ? <Outlet />
                : auth?.user
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                    // : auth
                    // ? navigateOnRole(auth?.user.role)
                    : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequiredAuth