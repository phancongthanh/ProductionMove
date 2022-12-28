import React, { FC, ReactElement, ReactNode, useState } from 'react';
import PropTypes from 'prop-types';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import { ProSidebarProvider } from 'react-pro-sidebar';
import Navbar from '../../components/Navbar';
import "./styles.scss";
import { LinearProgress } from '@mui/material';
import { SnackbarProvider } from 'notistack';

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