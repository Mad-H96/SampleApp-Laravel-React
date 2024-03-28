import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Outlet, Link} from 'react-router-dom';
import { useStore } from '../../store/rootStore';
import { observer } from 'mobx-react-lite';
import { navItems } from '../../config/Menu';
import  AuthStore  from '../../store/authStore';


const drawerWidth = 240;


const BaseLayout = (props) => {
  

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const {rootStore: {authStore}} = useStore();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };



  const authStoreInstance = new AuthStore();

  const logout = async () => {
    try {
      const resData = await authStoreInstance.logout();

  
    } catch (error) {
      console.log(error);
    }
  };


  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>

        {navItems.map((item) => (
            <ListItemButton key={item.label}  sx={{ textAlign: 'center' }} component={Link} to={item.url}>
            <ListItemText primary={item.label} />
            </ListItemButton>
        ))}

          <ListItemButton sx={{ textAlign: 'center' }} key={'logout'} onClick={logout}>
              <ListItemText primary="Logout" />
          </ListItemButton>


      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
           Sales App
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>

            {navItems.map((item) => ( 

            <Button key={item.label} sx={{ color: '#fff' }} component={Link} to={item.url} >
                {item.label}
            </Button>

            ))}

            <Button key={"logout"} sx={{ color: '#fff' }} onClick={logout} >
                Logout
            </Button>

          </Box>
        </Toolbar>
      </AppBar>

      <nav>

        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, 
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>

      </nav>

      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />

            <Outlet/>

      </Box>
     </Box>
  );
}


export default observer (BaseLayout);
