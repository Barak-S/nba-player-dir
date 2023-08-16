import { red } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';
import { colors } from '../../styles/colors';

const mainFont = 'Rubik, sans-serif';

export default createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: colors.primary,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: colors.grey,
    },
  },
  typography: {
    fontFamily: '"Rubik", sans-serif',
  },
  overrides: {
    MuiInputBase: {
      root: {
        height: '100%',
        borderRadius: 6,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        '&.Mui-focused > .MuiInputBase-input': {
          background: colors.white,
          color: colors.black,
          border: `1px solid ${colors.grey}`,
        },
        '&.Mui-focused.Mui-error > .MuiInputBase-input': {
          color: colors.error,
        },
        '&.Mui-focused > .MuiInputAdornment-positionStart': {
          borderColor: colors.grey,
        },
      },
      input: {
        border: `1px solid transparent`,
        boxSizing: 'border-box',
        fontSize: 14,
        borderRadius: 6,
        height: 32,
        width: 144,
        display: 'flex',
        alignItems: 'center',
        color: colors.primary,
        fontFamily: mainFont,
        background: colors.grey,
        paddingLeft: 10,
        boxShadow: 'none',
        WebkitAppearance: 'none',
      },
    },
    MuiInput: {
      underline: {
        '&:before, &:after': {
          content: 'none',
        },
      },
    },
    MuiInputLabel: {
      formControl: {
        transform: 'translate(15px, 20px) scale(1)',
        textTransform: 'capitalize',
        zIndex: 1,
        fontSize: 14,
      },
      root: {
        '&.Mui-focused:not(.Mui-error)': {
          color: colors.primary,
        },
        '&.Mui-focused:not(.Mui-error) + .MuiInputBase-root > .MuiInputBase-input': {
          border: `1px solid ${colors.grey}`,
        },
        '& + .MuiInput-formControl': {
          marginTop: 0,
        },
      },
      shrink: {
        transform: 'translate(0, -18px) scale(.75)',
      },
    },
  },
});
