import { useEffect, useState } from 'react'
import { Box } from '@mui/material';
import CTable from './components/CTable';
import backend from '../../../../backend';
import { Building } from './components/types';
import { RoleSchema } from '../../../../data/enums/RoleSchema';
import useLoading from '../../../../hooks/useLoading';

/*
let rows1 : Building[] = [
  {id: '1', name: 'building 1', address:'address 1', type: RoleSchema.Distributor},
  {id: '2', name: 'building 2', address:'address 2', type: RoleSchema.Distributor},
  {id: '3', name: 'building 3', address:'address 3', type: RoleSchema.Factory},
  {id: '4', name: 'building 4', address:'address 4', type: RoleSchema.Factory},
  {id: '5', name: 'building 5', address:'address 5', type: RoleSchema.ServiceCenter},
  {id: '6', name: 'building 6', address:'address 6', type: RoleSchema.ServiceCenter},
  {id: '7', name: 'building 7', address:'address 7', type: RoleSchema.Distributor},
  {id: '8', name: 'building 8', address:'address 8', type: RoleSchema.Distributor},
];
*/

const BuildingView = () => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const { setLoading } = useLoading();

  useEffect(() => {
    var bs: Building[] = [];
    setLoading(true);
    backend.buildings.getBuildings()
    .then(result => {
      result.factories.forEach(f => bs.push({...f, type: RoleSchema.Factory}));
      result.distributors.forEach(f => bs.push({...f, type: RoleSchema.Distributor}));
      result.serviceCenters.forEach(f => bs.push({...f, type: RoleSchema.ServiceCenter}));
      setBuildings(bs);
      setLoading(false);
    }).catch(() => setLoading(false))
  }, [])

  return (
    <div className='mainContent'>
      <div className='header'>
        <div className='title'>Cơ sở</div>
      </div>
      <Box sx={{ border: '1px solid lightgrey', borderRadius: 2 , boxShadow: 3}}>
        <div className='table'>
          <CTable rows={buildings} setRows={setBuildings}/>
        </div>      
      </Box>
    </div>
  );
};

export default BuildingView;
