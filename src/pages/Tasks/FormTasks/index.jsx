import PropTypes from 'prop-types';
import { InputText } from '../../../components/InputText';
import { InputSelect } from '../../../components/InputSelect';
import { useEffect, useState } from 'react';
import { getAll } from '../../../api/categories';

const FormTasks = ({ form }) => {
  const [categories, setCategories] = useState();
  useEffect(() => {
    getCategories();
  }, []);
  const getCategories = async () => {
    const response = await getAll();
    if (response && response.data) {
      setCategories(
        response.data.map(item => ({
          label: item.name,
          value: item._id
        }))
      );
    }
  };

  return (
    <form onKeyDown={form.handleAssistant}>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 grid grid-cols-12 gap-4 h-min">
          <InputText
            className="col-span-12"
            label="Tarea"
            name="title"
            placeholder="Sin descripción"
            register={form.register}
            minLength={2}
          />
          <InputSelect
            className="col-span-12"
            label="Categoria"
            name="category"
            options={categories}
            placeholder="Jhon Doe"
            register={form.register}
            required
            // callback={callbackType}
          />
        </div>
      </div>
    </form>
  );
};

FormTasks.propTypes = {
  form: PropTypes.object.isRequired
};

export { FormTasks };
