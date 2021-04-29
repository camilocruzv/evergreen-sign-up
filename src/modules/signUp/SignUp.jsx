import React, { useState } from 'react';
import {
  TextField, Button, FormControl,
  InputLabel, Select, MenuItem
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import Swal from 'sweetalert2';

import './SignUp.css';
import useStyles from './styles';

export const tipoUsuario = [
  { value: 'Admin' }, { value: 'Financiero' }, { value: 'Invitado' },
];

const SignUp = () => {
  const classes = useStyles();
  const {
    handleSubmit, register, formState: { errors }, control,
  } = useForm();
  const [tipoDeUsuario, setTipoDeUsuario] = useState('');

  const handleSignUp = async (data) => {
    const params = {
      userId: {
        email: data.correo,
        username: data.usuario,
        password: data.contraseña,
        first_name: data.nombres,
        last_name: data.apellidos,
      },
      userType: data.tipoUsuario,
    };

    const [error] = await axios.post(process.env.REACT_APP_BACKEND_URL, params)
      .then((response) => [null, response])
      .catch((err) => [err, err]);

    if (error) {
      Swal.fire('Hubo un error en el proceso de creación!', '', 'error');
    } else {
      Swal.fire('La cuenta se ha creado exitosamente!', '', 'success')
        .then((result) => {
          if (result.isConfirmed) {
            window.location.href = "http://ec2-34-207-119-94.compute-1.amazonaws.com:3000/";
          }
        })
    }
  };

  return (
    <div className="sign-up-form">
      <h2 className="sign-up-title">Registro</h2>
      <form onSubmit={handleSubmit(handleSignUp)}>
        <div className="sign-up-inputs">
          <div className="sign-up-row">
            <TextField
              name="usuario"
              className={classes.root}
              type="text"
              {...register("usuario", { required: true })}
              InputProps={{
                classes: {
                  root: classes.root
                }
              }}
              error={!!errors && !!errors.usuario}
              helperText={errors.usuario ? errors.usuario.message : null}
              label="Usuario *"
              variant="outlined"
            />
            <FormControl className={classes.root} variant="outlined" error={!!errors.tipoUsuario}>
              <InputLabel className={classes.field}>Tipo de usuario *</InputLabel>
              <Controller
                render={({
                  field: { onChange, value, name },
                }) => (

                  <Select
                    name={name}
                    value={value}
                    style={{ textAlign: 'left' }}
                    label="tipoUsuario"
                    onChange={(e) => {
                      onChange(e.target.value);
                      setTipoDeUsuario(e.target.value);
                    }}
                  >
                    {tipoUsuario.map((item, index) => (
                      <MenuItem value={item.value} key={`id-${index + 1}`}>{item.value}</MenuItem>
                    ))}
                  </Select>
                )}
                name="tipoUsuario"
                control={control}
                defaultValue={tipoDeUsuario}
                rules={{ required: true }}
              />
            </FormControl>
          </div>
          <div className="sign-up-row">
            <TextField
              name="nombres"
              className={classes.root}
              type="text"
              {...register("nombres", { required: true })}
              InputProps={{
                classes: {
                  root: classes.root
                }
              }}
              error={!!errors && !!errors.nombres}
              helperText={errors.nombres ? errors.nombres.message : null}
              label="Nombres *"
              variant="outlined"
            />
            <TextField
              name="apellidos"
              className={classes.root}
              type="text"
              {...register("apellidos", { required: true })}
              InputProps={{
                classes: {
                  root: classes.root
                }
              }}
              error={!!errors && !!errors.apellidos}
              helperText={errors.apellidos ? errors.apellidos.message : null}
              label="Apellidos *"
              variant="outlined"
            />
          </div>
          <TextField
            name="correo"
            className={classes.root}
            type="text"
            {...register("correo", {
              required: true, pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Enter a valid email',
              },
            })}
            InputProps={{
              classes: {
                root: classes.root
              }
            }}
            error={!!errors && !!errors.correo}
            helperText={errors.correo ? errors.correo.message : null}
            label="Correo *"
            variant="outlined"
          />
          <TextField
            name="contraseña"
            className={classes.root}
            type="password"
            {...register("contraseña", {
              required: true,
            })}
            InputProps={{
              classes: {
                root: classes.root
              }
            }}
            error={!!errors && !!errors.contraseña}
            helperText={errors.contraseña ? errors.contraseña.message : null}
            label="Contraseña *"
            variant="outlined"
          />
        </div>
        <div className="form-group">
          <Button className={classes.addButton} type="submit" color="primary" variant="contained">Crear Cuenta</Button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
