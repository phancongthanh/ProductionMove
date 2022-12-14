import { useLocation, Navigate, Outlet } from "react-router-dom"
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
    
    return (
        auth?.user.role === allowedRole
            ? <Outlet />
                : auth?.user
                ? <Navigate to="/unauthorized" state={{from: location}} replace/>
                    : <Navigate to="/login" state={{from: location}} replace/>
    )
}

export default RequiredAuth