import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm.hook';
import { useAuth } from '../../hooks/useAuth.hook';
import { InputText } from '../../components/InputText';
import { InputPassword } from '../../components/InputPassword';
import { ButtonPrimary } from '../../components/ButtonPrimary/index';

const Login = () => {
  const auth = useAuth();
  const initialForm = {
    email: 'admin@undefined.com',
    password: '1234ABCDC'
  };
  const FormLogin = useForm(initialForm);

  FormLogin.registerSubmit(async data => {
    await auth.login(data);
  });

  return (
    <section className="bg-secondary-50 dark:bg-secondary-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link
          className="flex items-center mb-6 text-2xl font-semibold text-secondary-900 dark:text-white"
          to="/login"
        >
          Undefined
        </Link>
        <div className="w-full bg-white rounded-lg shadow-3xl dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-secondary-800 dark:border-secondary-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary-900 md:text-2xl dark:text-white">
              Iniciar sesión en su cuenta
            </h1>
            <form
              className="space-y-2 md:space-y-4"
              onSubmit={FormLogin.handleSubmit}
            >
              <InputText
                label="Correo electrónico"
                name="email"
                placeholder="ejemplo@ejemplo.com"
                register={FormLogin.register}
                required
                minLength={2}
                maxLength={80}
                isEmail
              />
              <InputPassword
                label="Contraseña"
                name="password"
                placeholder="••••••••"
                register={FormLogin.register}
                required
                minLength={2}
                maxLength={80}
              />
              <div className="h-1"></div>
              <ButtonPrimary
                type="submit"
                disabled={FormLogin.pending}
                isFull={true}
              >
                {FormLogin.pending ? 'Cargando...' : 'Iniciar sesión'}
              </ButtonPrimary>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
