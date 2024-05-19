import PropTypes from 'prop-types';
import { InputText } from '../../../components/InputText';

const FormCategories = ({ form }) => (
  <form onKeyDown={form.handleAssistant}>
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 grid grid-cols-12 gap-4 h-min">
        <InputText
          className="col-span-12 "
          label="Nombre del dueño"
          name="name"
          placeholder="Sin descripción"
          register={form.register}
          minLength={2}
        />
      </div>
    </div>
  </form>
);

FormCategories.propTypes = {
  form: PropTypes.object.isRequired
};

export { FormCategories };
