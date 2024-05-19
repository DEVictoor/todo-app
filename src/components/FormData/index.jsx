import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { ButtonPrimary } from '../ButtonPrimary';
import clsx from 'clsx';

const FormData = ({ children, className, form, handleCancel, modal }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (handleCancel) handleCancel();
    else navigate(-1, { replace: true });
  };

  return (
    <>
      <div
        className={clsx(
          `scroll-container flex flex-col gap-4 p-4 max-h-[calc(100vh_-_255px)] overflow-auto ${
            modal && 'max-h-[calc(100vh_-_220px)]'
          }`,
          className
        )}
      >
        {children}
      </div>
      <form
        className="flex justify-between p-4 border-t border-secondary-200 dark:border-secondary-600"
        onSubmit={form.handleSubmit}
      >
        <ButtonPrimary color="LightSwitch" onClick={handleBack}>
          Cancelar
        </ButtonPrimary>
        <ButtonPrimary type="submit" disabled={form.pending}>
          {form.pending ? 'Guardando...' : 'Guardar'}
        </ButtonPrimary>
      </form>
    </>
  );
};

FormData.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  form: PropTypes.object.isRequired,
  handleCancel: PropTypes.func,
  modal: PropTypes.bool
};

export { FormData };
