import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

type ComboBoxProps = {
  options: Options[];
  placeholder: string;
};

type Options = {
  title: string;
  year: number;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '5px 0',
    },
  })
);

export const ComboBox = ({ options, placeholder }: ComboBoxProps) => {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.root}
      options={options}
      getOptionLabel={(option) => option.title}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label={placeholder} variant="outlined" />
      )}
    />
  );
};
