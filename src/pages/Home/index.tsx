import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Logo from '../../assets/images/logo.png';
import { ComboBox } from '../../components/ComboBox';
import { Input } from '../../components/Input';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    home: {
      background: theme.palette.background.default,
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      background: 'white',
      borderRadius: '8px',
      width: '300px',
      position: 'relative',
      padding: '60px 20px 20px 20px',
    },
    cardImage: {
      width: '100%',
      position: 'absolute',
      top: '-180px',
      right: '50%',
      left: '0',
    },
    cardBody: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
    },
    cardSubtitle: {
      color: theme.palette.primary.light,
      fontSize: '15px',
    },
    cardButton: {
      margin: '10px 0',
    },
  })
);

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
];

export const Home = () => {
  const classes = useStyle();

  return (
    <div className={classes.home}>
      <div className={classes.card}>
        <img src={Logo} alt={Logo} className={classes.cardImage} />
        <h3>
          Registra a tu Socio Maestro de <span>Adelca</span>
        </h3>
        <div className={classes.cardBody}>
          <p className={classes.cardSubtitle}>
            Por favor selecciona tu establecimiento y resuelve el Catpcha
          </p>
          <ComboBox options={top100Films} placeholder={'Establecimiento'} />
          <Button
            variant="contained"
            color="primary"
            className={classes.cardButton}
          >
            Siguiente
          </Button>
        </div>
        {/* <div className={classes.cardBody}>
          <Input label="Cédula" type={'number'} />
          <Input label="Nombre" type={'text'} />
          <Input label="Apellido" type={'text'} />
          <Input label="Correo (Opcional)" type={'text'} />
          <ComboBox options={top100Films} placeholder={'Ciudad'} />
          <Button
            variant="contained"
            color="primary"
            className={classes.cardButton}
          >
            Guardar
          </Button>
        </div> */}
      </div>
    </div>
  );
};
