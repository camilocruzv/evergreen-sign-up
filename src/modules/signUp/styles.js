import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        borderColor: '#F30000',
      },
    },
  },
  addButton: {
    width: '100px',
    height: '45px',
    alignSelf: 'center',
    textTransform: 'unset',
    lineHeight: '21px',
    backgroundColor: '#F30000',
    marginTop: '40px',
    fontSize: '14px',
    fontWeight: 700,
    '&:hover': {
      backgroundColor: '#F30000',
    },
  },
}));

export default useStyles;
