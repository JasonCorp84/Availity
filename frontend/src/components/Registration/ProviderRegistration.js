import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
  CssBaseline,
  FormGroup,
  Typography, 
  Container, 
  TextField,
} from '@material-ui/core/';
import { SignUpButton } from '../shared/buttons'
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      boxShadow: '15px'
    },
  },
  formHeader: {
    display: 'flex',
    height: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    border: '2px sold red'
  },
  form: {
    margin: theme.spacing(2),
    borderRadius: '3px',
    minWidth: 360,
    minHeight: '60%',
    maxHeight: '60%',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
  },
  textField: {
    alignSelf: 'center',
    width: '96%',
    margin: theme.spacing(1),
    borderColor: '#28a745'
  },
  inputForm: {
    borderRadius: '5px',
    height: '80vh', 
    width: '100%',
    boxShadow: '-1px 0 7px #4D4F53'
  },
  inputHeader: {
    fontWeight: 'bold',
    fontFamiliy: 'Arial,Helvetica,sans-serif',
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
    backgroundColor: '#4D4F53', color: 'white',
    borderBottom: '1px solid darkorange'
  },
  registerButtonWrapper: {
    width: '100%',
    display: 'flex', 
    height: '5vh', justifyContent:'center', alignItems:'center'
  }
}));


  const defaultInputState = {
    firstName: '',
    lastName: '',
    npiNumber: '',
    businessAddress: '',
    telephoneNumber: '',
    emailAddress: ''
  }

  const inputFields = [
    {  name: 'firstName', label: 'First Name'},
    {  name: 'lastName', label: 'Last Name'},
    {  name: 'npiNumber', label: 'NPI number'},
    {  name: 'businessAddress', label: 'Business Address'},
    {  name: 'telephoneNumber', label: 'Telephone Number'},
    {  name: 'emailAddress', label: 'Email Address'}
  ]

  let schema = yup.object().shape({
    firstName: yup.string()
      .min(2, 'Too short')
      .max(50, 'Too long')
      .required('first name required'),
    lastName: yup.string()
      .min(2, 'Too short')
      .max(50, 'Too long')
      .required('last name required'),
    npiNumber: yup.number().min(8, 'must be at least 8 digit long').required('please provide your NPI number'),
    emailAddress: yup.string().email().required('email must contain "@" and domain name ` '),
    businessAddress: yup.string().required('plese provide your business address')
  });

const ProviderRegistration = () => {

  const [registrationStatus, setRegistrationStatus] = React.useState('');
 
  const URL = '	http://dummy.restapiexample.com/api/v1/create';

  
   


  const callApi = (values) => {
    axios.post(URL, values)
      .then(res => {
        setRegistrationStatus('Registration successful');
      })
      .catch(err => {
        setRegistrationStatus('Registration failed');
      });
  }

  const validateEmail = (value) => {
    let error;
    if (!value) {
      error = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = 'Invalid email address';
    }
    return error;
  }


  const classes = useStyles();
  return (
    <>
    <Formik
      validationSchema={schema}
      initialValues={defaultInputState}
      // formik has it's own state called values
      onSubmit={(values, { setSubmitting, resetForm }) => {
        callApi(values);
        resetForm(defaultInputState);
      }}
    >
    {({
      handleChange,
      values,
      handleSubmit,
      errors, 
      touched}) => (
      <>
        <CssBaseline />
        <Container maxWidth="sm">
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography component="div" className={classes.inputForm}>
          <div className={classes.inputHeader}>
          <Typography variant="h5" className={classes.formHeader}>
                      New Provider Registration
          </Typography>
                  
          </div>
          <FormGroup onSubmit={()=> {
            handleSubmit()
            }}>
            {inputFields.map(inputField => {
              const {id, label, name} = inputField;
              return (
                <>
                <TextField className={classes.textField}
                  key={id}
                  label={label}
                  name={name}
                  onChange={handleChange}
                  value={values[name]}
                  validate={values[name] === 'emailAddress' ? validateEmail : ()=>{}}
                />
                  {errors[name] && touched[name] ? (
              <div className={classes.textField} style={{color: 'red'}}>{errors[name]}</div>
            ) : null}
                </>)
                }
              )
            } 
          <div className={classes.textField}>{registrationStatus}</div>
          </FormGroup>
          <div className={classes.registerButtonWrapper}>
            <SignUpButton>Register</SignUpButton>
          </div>
          </Typography>
          </form>
        </Container>
      </>
      )}
  </Formik>
    </>
  );
}

export default ProviderRegistration;