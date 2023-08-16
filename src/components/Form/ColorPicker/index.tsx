import { useTheme, Theme, makeStyles } from '@material-ui/core';
import ColorPicker from 'material-ui-color-picker';
import React, { FC } from 'react';
import { colors, StyleProps } from '../../../styles';

interface Props extends StyleProps {
  value?: string;
  title?: string;
  onChange?: (value: string) => void;
}

export const FormColorPicker: FC<Props> = ({ value = '#000', title, style, onChange }) => {
  const theme: Theme = useTheme()
  const classes = useStyles(theme)

  const handleChange = (newValue: string) => {
    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <div className={classes.container}>
      {title && (
        <div className={classes.title}>
          {title}
        </div>
      )}
      <ColorPicker
        className={classes.colorPicker}
        name="color"
        value={value}
        onChange={handleChange}
        InputProps={{
          value: value,
        }}
      />
    </div>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    flexShrink: 0,
  },
  colorPicker: {
    position: 'relative',
  },
  pickerAdornment: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'transparent',
    left: -1,
  },
  title: {
    color: colors.primary,
    textTransform: 'uppercase',
    fontSize: 14,
    fontWeight: 500,
    marginBottom: 10,
  },
}))

export type FormColorPickerProps = Props;
export default FormColorPicker
