import { useEffect } from 'react';
// import { getAll as getAllRole } from '../../../api/roles';
import PropTypes from 'prop-types';
import { InputText } from '../../../components/InputText';
import { InputSelect } from '../../../components/InputSelect';
import { InputTags } from '../../../components/InputTags';
import { InputPassword } from '../../../components/InputPassword';
import { InputCheck } from '../../../components/InputCheck';
import { InputImage } from '../../../components/InputImage';

const FormUser = ({ form, passRequired = false }) => {
  // const [optionsRoles, setOptionsRoles] = useState([]);

  const roles = [
    { value: '1', label: 'Administrador' },
    { value: '2', label: 'Veterinario' },
    { value: '3', label: 'Asistente Veterinario' },
    { value: '4', label: 'Recepcionista' },
    { value: '5', label: 'Pelutquero(a) Canino' },
    { value: '6', label: 'Estilista Felino' },
    { value: '7', label: 'Auxiliar de Peluquería' },
    { value: '8', label: 'Servicios Generales' }
  ];
  useEffect(() => {
    // fetchData();
    // eslint-disable-next-line
  }, []);

  // const fetchData = async () => {
  //   const response = await getAllRole();
  //   if (!response || !response.data) return;
  //   setOptionsRoles(
  //     response.data.map(role => ({
  //       value: role._id,
  //       label: role.name
  //     }))
  //   );
  // };

  return (
    <form onKeyDown={form.handleAssistant}>
      <div className="grid grid-cols-12 gap-4">
        <InputImage
          className="col-span-12"
          label="Foto de producto"
          name="photo"
          width={150}
          height={150}
          accept={['jpg', 'png', 'jpeg']}
          register={form.register}
        />
        <InputText
          className="col-span-12 sm:col-span-6"
          label="Nombres"
          name="firstName"
          placeholder="Jhon"
          uppercase
          register={form.register}
          required
          minLength={2}
        />
        <InputText
          className="col-span-12 sm:col-span-6"
          label="Apellidos"
          name="lastName"
          placeholder="Doe"
          uppercase
          register={form.register}
          minLength={2}
        />
        <InputTags
          className="col-span-12"
          label="Números de contacto"
          name="phones"
          placeholder="+51 999 999 999"
          register={form.register}
        />
        <InputText
          className="col-span-12"
          label="Correo electrónico"
          name="email"
          placeholder="example@example.com"
          register={form.register}
          required
          minLength={2}
          isEmail
        />
        <InputText
          className="col-span-12"
          label="Ocupación"
          name="ocupation"
          placeholder="example@example.com"
          register={form.register}
          minLength={2}
        />
        <InputPassword
          className="col-span-12 sm:col-span-6"
          label="Contraseña"
          name="password"
          placeholder="••••••••"
          register={form.register}
          required={passRequired}
          minLength={2}
        />
        <InputSelect
          className="col-span-12 sm:col-span-6"
          label="Rol"
          name="role"
          options={roles}
          register={form.register}
        />
        <InputCheck
          label="Estado"
          labelCheck="Activo"
          name="isEnabled"
          register={form.register}
        />
      </div>
    </form>
  );
};

FormUser.propTypes = {
  form: PropTypes.object.isRequired,
  passRequired: PropTypes.bool
};

export { FormUser };
