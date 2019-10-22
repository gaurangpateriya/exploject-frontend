import React ,{useEffect}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';

import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {connect} from 'react-redux';
import { push } from 'react-router-redux';
import { store } from '../store';
import 'tachyons'
import {LOGOUT} from '../constants/actionTypes'
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    height:'20px',
    backgroundColor:'red'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar(props) {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  useEffect(()=>{
    console.log(props)
  },[])
  const handleChange = event => {
    setAuth(event.target.checked);
  };

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar classes={classes.root}>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
          </IconButton> */}
          <Typography variant="h6" className={classes.title}>
            ExplorJect
          </Typography>
          {auth && (
            <div className='flex'>
              <h4 className='b mr4 grow pointer' onClick ={() => store.dispatch(push(`/`))}>Home</h4>
              <h4 className='b mr4 grow pointer' onClick ={() => store.dispatch(push(`/explore`))}>Explore </h4>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                onClick={handleMenu}
                
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem  onClick={() => props.logout()}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapStateToProps =state=>({auth : state.auth})
const mapDispatchToProps = dispatch =>({logout :() =>dispatch({type : LOGOUT})})
export default connect(mapStateToProps,mapDispatchToProps)(Navbar);