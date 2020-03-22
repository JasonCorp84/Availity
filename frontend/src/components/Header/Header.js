import React from 'react';
import { useHistory } from "react-router-dom";
import { AppBar, Toolbar } from '@material-ui/core'
import { RegisterButton } from '../shared/buttons';
import { AvailityText } from './HeaderStyle';
import AvailityLogo from './logo';

const Header = () => {
  const history = useHistory();

  const navigateTo = path => {
      history.push(path)
  }

  return (
       <AppBar color="initial" position="static">
        <Toolbar>
          <div style={{height: '100%', width: '15%'}}>
            <div style={{width: '125px'}}>  
              <AvailityLogo/>
            </div>
          </div>
          <div style={{height: '100%', width: '85%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center'}}>
            <AvailityText edge="end" variant="headline">AVAILITY PORTAL</AvailityText>
            <RegisterButton onClick={() =>navigateTo("/provider-registration")} edge="end">REGISTER</RegisterButton>
          </div>
        </Toolbar>
      </AppBar>
    
  )
}

export default Header;