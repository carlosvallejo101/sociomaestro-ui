import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type InputProps = {
  label: string;
  type: string;
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '5px 0',
    },
  })
);

export const Input = ({ label, type }: InputProps) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      label={label}
      type={type}
      className={classes.root}
    />
  );
};
