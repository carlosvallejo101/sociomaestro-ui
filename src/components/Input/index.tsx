import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

type InputProps = {
  label: string;
  type: string;
  name: string;
  onChange: (e: EventType) => void;
  maxLength?: number;
};

export type EventType = {
  target: {
    name: string;
    value: string | number | null | undefined;
  };
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: '5px 0',
    },
  })
);

export const Input = ({
  label,
  type,
  name,
  onChange,
  maxLength = 1000,
}: InputProps) => {
  const classes = useStyles();
  return (
    <TextField
      variant="outlined"
      label={label}
      type={type}
      className={classes.root}
      onChange={onChange}
      name={name}
      inputProps={{ maxLength }}
    />
  );
};
