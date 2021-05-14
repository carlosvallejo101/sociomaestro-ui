import React, { useState, useEffect } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import Swal from 'sweetalert2';

import { config } from '../../config';
import Logo from '../../assets/images/logo.png';
import AlbanilSVG from '../../assets/svgs/ALBANIL_LADRILLO.svg';
import FondoSVG from '../../assets/svgs/FONDO.svg';
import LogoAdelca from '../../assets/svgs/LOGO_ADELCA.svg';
import { ComboBox } from '../../components/ComboBox';
import { Input, EventType } from '../../components/Input';
import { Participant, Participants } from './participant.types';
import { Citie, Cities } from './cities.types';
import { Builder } from './builder.types';
import { Options } from '../../components/ComboBox';

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    home: {
      backgroundImage: `url(${FondoSVG})`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      [theme.breakpoints.up('xs')]: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
      },
    },
    hero: {
      [theme.breakpoints.up('xs')]: {
        position: 'absolute',
        height: '70%',
        right: '0',
        top: '0',
      },
      [theme.breakpoints.up('sm')]: {
        height: '100%',
      },
      [theme.breakpoints.up('md')]: {
        right: '0px',
      },
    },
    footer: {
      position: 'absolute',
      bottom: '0',
      [theme.breakpoints.up('xs')]: {
        width: '200px',
      },
      [theme.breakpoints.up('sm')]: {
        width: '300px',
        left: '10px',
      },
    },
    card: {
      background: 'white',
      borderRadius: '8px',
      width: '300px',
      padding: '20px 20px 20px 20px',
    },
    cardImage: {
      width: '100%',
      right: '50%',
      left: '0',
    },
    cardBody: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignContent: 'center',
    },
    cardWarning: {
      color: '#d5bf00',
      margin: '13px 0',
      fontSize: '14px',
      textAlign: 'center',
    },
    cardSubtitle: {
      color: theme.palette.primary.light,
      fontSize: '15px',
    },
    cardButton: {
      margin: '10px 0',
    },
    back: {
      margin: '0 auto',
      textDecoration: 'underline',
      fontSize: '13px',
      color: theme.palette.primary.light,
      cursor: 'pointer',
    },
  })
);

export const Home = () => {
  const classes = useStyle();
  const [captcha, setCaptcha] = useState();
  const [participantsOptions, setParticipantsOptions] = useState<Options[]>([]);
  const [citiesOptions, setCitiesOptions] = useState<Options[]>([]);
  const [steps, setSteps] = useState<number>(1);
  const [isValidated, setIsValidated] = useState(false);
  const [state, setState] = useState<Builder>({
    participantId: null,
    identification: '',
    names: '',
    lastNames: '',
    phoneNumber: '',
    email: '',
    citieId: null,
  });

  useEffect(() => {
    (async () => {
      let response: any = await axios.get(
        `${config.backend.url}/participants/program/26`
      );
      const participants: Participants = response.data;
      let options: Options[] = participants.map((participant: Participant) => ({
        id: participant.id,
        value: `${participant.name} ${participant.last_name}`,
      }));
      setParticipantsOptions(options);

      response = await axios.get(`${config.backend.url}/cities`);
      const cities: Cities = response.data;
      options = cities.map((citie: Citie) => ({
        id: citie.id,
        value: citie.name,
      }));
      setCitiesOptions(options);
    })();
  }, []);

  useEffect(() => {
    validateForm();
    // eslint-disable-next-line
  }, [state]);

  const validateForm = () => {
    const validationProps = {
      participantId: false,
      identification: false,
      names: false,
      lastNames: false,
      phoneNumber: false,
      citieId: false,
    };
    if (state.participantId !== null) {
      validationProps.participantId = true;
    }
    if (state.citieId !== null) {
      validationProps.citieId = true;
    }
    if (state.identification?.length === 10) {
      validationProps.identification = true;
    }
    if (state.names.trim() !== '') {
      validationProps.names = true;
    }
    if (state.lastNames.trim() !== '') {
      validationProps.lastNames = true;
    }
    if (state.phoneNumber.trim() !== '') {
      validationProps.phoneNumber = true;
    }

    setIsValidated(
      validationProps.participantId &&
        validationProps.identification &&
        validationProps.names &&
        validationProps.lastNames &&
        validationProps.phoneNumber &&
        validationProps.citieId
    );
  };

  const handleChange = ({ target }: EventType) => {
    setState({
      ...state,
      [target.name]: target.value,
    });
  };

  const handleSubmit = async () => {
    if (isValidated) {
      const { status } = await axios.post(
        `${config.backend.url}/builders`,
        state
      );
      if (status === 201) {
        Swal.fire(
          '¡Genial!',
          'Has registrado exitosamente a tu Socio Maestro',
          'success'
        ).then(() => {
          setSteps(1);
          setState({
            participantId: null,
            identification: '',
            names: '',
            lastNames: '',
            phoneNumber: '',
            email: '',
            citieId: null,
          });
        });
      }
    }
  };

  const onChange = (value: any) => {
    setCaptcha(value);
  };

  return (
    <div className={classes.home}>
      <img src={AlbanilSVG} alt="logo-apuntate" className={classes.hero} />
      <div className={classes.card} style={{ zIndex: 999 }}>
        <img src={Logo} alt={Logo} className={classes.cardImage} />
        <h3>
          Registra a tu Socio Maestro de <span>Adelca</span>
        </h3>
        {steps === 1 && (
          <div className={classes.cardBody}>
            <p className={classes.cardSubtitle}>
              Por favor selecciona tu establecimiento y resuelve el Catpcha
            </p>
            <p className={classes.cardWarning}>
              Recuerda que en Socio Maestro solo participan Albañiles
            </p>
            <ComboBox
              options={participantsOptions}
              placeholder={'Establecimiento'}
              name={'participantId'}
              onChange={handleChange}
            />
            <ReCAPTCHA sitekey={config.captcha.siteKey} onChange={onChange} />
            {captcha && (
              <Button
                variant="contained"
                color="primary"
                className={classes.cardButton}
                onClick={() => state.participantId && setSteps(2)}
              >
                Siguiente
              </Button>
            )}
          </div>
        )}
        {steps === 2 && (
          <div className={classes.cardBody}>
            <Input
              label="Cédula"
              type={'tel'}
              name={'identification'}
              onChange={handleChange}
              maxLength={10}
            />
            <Input
              label="Nombre"
              type={'text'}
              name={'names'}
              onChange={handleChange}
            />
            <Input
              label="Apellido"
              type={'text'}
              name={'lastNames'}
              onChange={handleChange}
            />
            <Input
              label="Celular"
              type={'number'}
              name={'phoneNumber'}
              onChange={handleChange}
              maxLength={10}
            />
            <Input
              label="Correo (Opcional)"
              type={'text'}
              name={'email'}
              onChange={handleChange}
            />
            <ComboBox
              options={citiesOptions}
              placeholder={'Ciudad'}
              name="citieId"
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color={isValidated ? 'primary' : 'secondary'}
              className={classes.cardButton}
              onClick={handleSubmit}
            >
              Guardar
            </Button>
            <p className={classes.back} onClick={() => setSteps(1)}>
              Atrás
            </p>
          </div>
        )}
      </div>
      <img src={LogoAdelca} alt="logo-adelca" className={classes.footer} />
    </div>
  );
};
