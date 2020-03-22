import React from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from "@material-ui/core/styles";
import buttonStyles from '../../Styles/buttonStyles'

const SignUpButton = ({ classes }) => {

  return (
    <div > 
      <Button className={classes.button}>
        Sign Up
      </Button>
    </div>
  );
}

export default withStyles(buttonStyles, { withTheme: true })(SignUpButton);
