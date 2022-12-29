import { FC, ReactNode, useState } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from '../../components/Navbar';
import { SnackbarProvider } from 'notistack';

import "./styles.scss";
import LoadingContext from '../../context/LoadingContext';
import { LinearProgress } from '@mui/material';
import { BuildingsProvider } from '../../context/BuildingsProvider';
import { ProductLinesProvider } from '../../context/ProductLinesProvider';

type propTypes = {
  Sidebar: ReactNode
  children: ReactNode
}

const Layout : FC<propTypes> = (props) => {
  const {Sidebar, children} = props;
  const [loading, setLoading] = useState<boolean>(false);
    
  return (
    <div className="container">
      <ProSidebarProvider>
        <SnackbarProvider maxSnack={3}>
        <LoadingContext.Provider value={{ loading, setLoading }}>

            {Sidebar}
            <main>
              <Navbar />
              {loading && <LinearProgress />}
              <div className="homeContainer">
                
                {children}
              </div>
            </main>
        </LoadingContext.Provider>
        </SnackbarProvider>
      </ProSidebarProvider>
    </div>
  );
};

Layout.propTypes = {
    
};

export default Layout;