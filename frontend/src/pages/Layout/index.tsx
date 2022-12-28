import { FC, ReactNode } from 'react';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from '../../components/Navbar';
import { SnackbarProvider } from 'notistack';

import "./styles.scss";

type propTypes = {
  Sidebar: ReactNode
  children: ReactNode
}

const Layout : FC<propTypes> = (props) => {
  const {Sidebar, children} = props;
    
  return (
    <div className="container">
      <ProSidebarProvider>
        <SnackbarProvider maxSnack={3}>
        {Sidebar}
        <main>
          <Navbar />
          {/* <LinearProgress /> */}
          <div className="homeContainer">
            {children}
          </div>
        </main>
        </SnackbarProvider>
      </ProSidebarProvider>
    </div>
  );
};

Layout.propTypes = {
    
};

export default Layout;