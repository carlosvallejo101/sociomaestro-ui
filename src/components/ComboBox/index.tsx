import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import { EventType } from '../Input';

export type ComboBoxProps = {
  options: Options[];
  placeholder: string;
  name: string;
  onChange: (e: EventType) => void;
};

export type Options = {
  value: string;
  id: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '5px 0',
    },
  })
);

export const ComboBox = ({
  options,
  placeholder,
  name,
  onChange,
}: ComboBoxProps) => {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.root}
      options={options}
      getOptionLabel={(option) => option.value}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} variant="outlined" />
      )}
      onChange={(e, newValue) =>
        onChange({ target: { name, value: newValue?.id } })
      }
    />
  );
};
