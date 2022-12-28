import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RequiredAuth from './components/RequiredAuth';
import { AuthProvider } from './context/AuthProvider';
import { RoleSchema } from './data/enums/RoleSchema';
import { Admin, Login, Missing, Unauthorized } from './pages';
import Distributor from './pages/Distributor';
import Factory from './pages/Factory';
import ServiceCenter from './pages/ServiceCenter';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/login" element={<Login />}/>
						<Route element={<RequiredAuth allowedRole={RoleSchema.Administrator}/>}>
							<Route path="/admin/*" element={<Admin />}/>
							<Route path="*" element={<Missing />}/>
							<Route path="/unauthorized" element={<Unauthorized />}/>
						</Route>
						<Route element={<RequiredAuth allowedRole={RoleSchema.Factory}/>}>
							<Route path="/factory/*" element={<Factory />}/>
							<Route path="*" element={<Missing />}/>
							<Route path="/unauthorized" element={<Unauthorized />}/>
						</Route>
						<Route element={<RequiredAuth allowedRole={RoleSchema.Distributor}/>}>
							<Route path="/distributor/*" element={<Distributor />}/>
							<Route path="*" element={<Missing />}/>
							<Route path="/unauthorized" element={<Unauthorized />}/>
						</Route>  
						<Route element={<RequiredAuth allowedRole={RoleSchema.ServiceCenter}/>}>
							<Route path="/serviceCenter/*" element={<ServiceCenter />}/>
							<Route path="*" element={<Missing />}/>
							<Route path="/unauthorized" element={<Unauthorized />}/>
						</Route>
				</Routes> 
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
