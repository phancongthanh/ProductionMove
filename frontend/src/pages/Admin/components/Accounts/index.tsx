import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import CTable from './components/CTable';
import User from '../../../../data/models/User';
import useLoading from '../../../../hooks/useLoading';
import backend from '../../../../backend';

/*
let rows1 : User[] = [
  {userId: '1' , userName : 'userName 1', password: 'password 1', name: 'name 1', email:'adolphus48@yahoo.com', phone:'485872892', role: RoleSchema.Distributor, building: 'building 1'},
  {userId: '2' , userName : 'userName 2', password: 'password 2', name: 'name 2', email:'email 2', phone:'phone 2', role: RoleSchema.Distributor, building: 'building 2'},
  {userId: '3' , userName : 'userName 3', password: 'password 3', name: 'name 3', email:'email 3', phone:'phone 3', role: RoleSchema.Distributor, building: 'building 3'},
  {userId: '4' , userName : 'userName 4', password: 'password 4', name: 'name 4', email:'email 4', phone:'phone 4', role: RoleSchema.Distributor, building: 'building 4'},
  {userId: '5' , userName : 'userName 5', password: 'password 5', name: 'name 5', email:'email 5', phone:'phone 5', role: RoleSchema.Distributor, building: 'building 5'},
];
*/

const Accounts = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(true);
    backend.users.getUsers()
    .then(us => {
      setLoading(false);
      setUsers(us);
    }).catch(() => setLoading(false));
  }, [])

  return (
    <div className='mainContent'>
    <div className='header'>
      <div className='title'>Cơ sở</div>
    </div>
    <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3}}>
      <div className='search'>Search</div>
      <div className='filter'>Filter</div>
      <div className='table'>
        <CTable rows={users} setRows={setUsers} />
      </div>      
    </Box>
  </div>
  )
}

Accounts.propTypes = {}

export default Accounts