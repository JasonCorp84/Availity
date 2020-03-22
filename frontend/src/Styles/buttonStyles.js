

const buttonStyles = theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  submitButton: {
    display: 'flex',
    alignSelf: 'center',
    borderRadius: '4px',
    padding: '6px 12px',
    fontWeight: '400',
    color: '#FFF',
    backgroundColor: '#2261b5',
    fontSize: '1rem',
    fontFamily: 'Helvetica Neue,Helvetica,Arial,sans-serif',
    minHeight: '100%',
  }
});

export default buttonStyles;