import { useState } from 'react';

const useForm = (initialForm = {}) => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(initialForm);
  const [pending, setPending] = useState(false);
  const fields = [];
  const fieldsValidation = {};
  const fieldsOutput = {};
  let onSubmit = null;

  const register = (name, validations = {}, output) => {
    if (!fieldsValidation[name]) fieldsValidation[name] = validations;
    if (!fields.includes(name)) fields.push(name);
    if (!fieldsOutput[name] && output)
      fieldsOutput[name] = output.toUpperCase();
    return {
      errors,
      value: formData[name],
      handleChange: value =>
        setFormData(prev => {
          if (fieldsOutput[name]) {
            switch (fieldsOutput[name]) {
              case 'NUMBER':
                value = parseFloat(value);
                break;
              case 'BOOLEAN':
                if (value === 'true' || value === 1) value = true;
                else value = false;
                break;
              default:
                break;
            }
          }

          return { ...prev, [name]: value };
        })
    };
  };

  const reset = () => setFormData(initialForm);

  const setForm = data => setFormData(data);

  const handleSubmit = async e => {
    let haveErrors = false;
    e.preventDefault();
    e.stopPropagation();
    // const entries = Object.entries(formData);
    const data = formData;

    // for (const [key, value] of entries) {
    //   let newValue;

    //   if (typeof value === 'string') {
    //     newValue = value.trim();
    //   } else if (Array.isArray(value)) {
    //     newValue = value.filter(item => item !== null);
    //   } else {
    //     newValue = value;
    //   }

    //   if (
    //     newValue === null ||
    //     newValue === undefined ||
    //     (typeof newValue === 'string' && newValue === '') ||
    //     (Array.isArray(newValue) && newValue.length === 0)
    //   )
    //     continue;

    //   data[key] = value;
    // }

    fields.map(name => {
      if (
        fieldsValidation[name]?.required &&
        (!data[name] || data[name].length < 1)
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: { type: 'required', message: 'Este campo es requerido.' }
        }));
      } else if (
        typeof data[name] === 'number' &&
        fieldsValidation[name]?.minValue &&
        data[name] < fieldsValidation[name]?.minValue
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'minValue',
            message: `El número debe ser mayor o igual a ${fieldsValidation[name]?.minValue}.`
          }
        }));
      } else if (
        typeof data[name] === 'number' &&
        fieldsValidation[name]?.maxValue &&
        data[name] > fieldsValidation[name]?.maxValue
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'maxValue',
            message: `El número debe ser menor o igual a ${fieldsValidation[name]?.maxValue}.`
          }
        }));
      } else if (
        typeof data[name] === 'string' &&
        fieldsValidation[name]?.minLength &&
        data[name]?.length < fieldsValidation[name]?.minLength
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'minLength',
            message: `El valor debe tener al menos ${fieldsValidation[name]?.minLength} caracteres.`
          }
        }));
      } else if (
        typeof data[name] === 'string' &&
        fieldsValidation[name]?.maxLength &&
        data[name]?.length > fieldsValidation[name]?.maxLength
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'maxLength',
            message: `El valor debe tener máximo ${fieldsValidation[name]?.maxLength} caracteres.`
          }
        }));
      } else if (
        typeof data[name] === 'string' &&
        fieldsValidation[name]?.isEmail &&
        !validateEmail(data[name])
      ) {
        haveErrors = true;
        setErrors(prev => ({
          ...prev,
          [name]: {
            type: 'isEmail',
            message: 'Por favor ingrese un correo electrónico válido.'
          }
        }));
      } else {
        setErrors(prev => ({ ...prev, [name]: {} }));
      }
    });

    if (haveErrors) return;
    if (!onSubmit) return;
    setPending(true);

    try {
      await onSubmit(data);
    } finally {
      setPending(false);
    }
  };

  const validateEmail = email => {
    const [localPart, domainPart] = email.split('@');
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) return false;
    if (localPart.length > 64 || domainPart.length > 255) return false;

    return true;
  };

  const handleAssistant = async e => {
    if (e.key === 'Enter') {
      await handleSubmit(e);
    }
  };

  const registerSubmit = func => {
    onSubmit = func;
  };

  return {
    register,
    registerSubmit,
    handleSubmit,
    handleAssistant,
    reset,
    setForm,
    setFormData,
    pending,
    watch: formData,
    errors
  };
};

export { useForm };
