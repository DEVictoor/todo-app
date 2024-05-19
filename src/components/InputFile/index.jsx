import { useEffect, useId, useState } from 'react';
import PropTypes from 'prop-types';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { post as postFile, put, remove as removeFile } from '../../api/files';
import { InputContainer } from '../InputContainer';
import { File } from './File';

const InputFile = ({
  className,
  label,
  name,
  accept,
  multiple,
  register,
  required
  // ...params
}) => {
  const inputFile = register(name, { required });
  const urlFile = register('_' + name);
  const domId = useId();
  const [waiting, setWaiting] = useState([]);
  const [progress, setProgress] = useState();
  const [isOver, setIsOver] = useState(false);

  useEffect(() => {
    if (waiting.length === 0 || progress) return;
    const file = waiting[waiting.length - 1];
    setWaiting(waiting.filter((_, index) => waiting.length - 1 !== index));
    setProgress({ name: file.name, progress: 0, loaded: 0, total: file.size });
    postData(file);
    // eslint-disable-next-line
  }, [waiting, progress]);

  const postData = async file => {
    const formData = new FormData();
    formData.append('name', file.name);
    formData.append('file', file);
    const response = await postFile(formData, setProgress);
    if (inputFile.value)
      inputFile.handleChange([...inputFile.value, response.data._id]);
    else inputFile.handleChange([response.data._id]);
    if (urlFile.value) urlFile.handleChange([...urlFile.value, response.data]);
    else urlFile.handleChange([response.data]);
    setProgress(null);
  };

  const handleUpload = selectedFiles => {
    if (!selectedFiles) return;
    setWaiting(prev => [...prev, ...selectedFiles]);
  };

  const handleSelect = e => handleUpload(e.target.files);

  const handleDragOver = e => e.preventDefault();

  const handleDragEnter = () => !isOver && setIsOver(true);

  const handleDragLeave = () => isOver && setIsOver(false);

  const handleDrop = e => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files);
    setIsOver(false);
  };

  const handleDelete = id => {
    inputFile.handleChange(inputFile.value.filter(objeto => objeto !== id));
    urlFile.handleChange(urlFile.value.filter(objeto => objeto._id !== id));
    removeFile(id);
  };

  const handleUpdate = async (id, data, index) => {
    const value = [...urlFile.value];
    value[index].name = data?.name;
    urlFile.handleChange(value);
    await put(id, data);
  };
  const handleUnlink = async id => {
    inputFile.handleChange(inputFile.value.filter(objeto => objeto !== id));
    urlFile.handleChange(urlFile.value.filter(objeto => objeto._id !== id));
  };

  const handleOpen = url => {
    window.open(url, '_blank');
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={inputFile.errors[name]?.message}
    >
      {(multiple ||
        !inputFile.value ||
        (inputFile.value.length === 0 && !progress)) && (
        <label
          className={`flex justify-center w-full mt-2 p-5 text-center border-2 border-dashed cursor-pointer rounded-xl text-secondary-500 border-secondary-300 dark:text-secondary-400 dark:border-secondary-700 ${
            isOver ? 'bg-secondary-100 dark:bg-secondary-900' : ''
          }`}
          htmlFor={domId}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
        >
          <div className="flex flex-col items-center pointer-events-none">
            <IoCloudUploadOutline size={32} />
            <h2 className="mt-1 font-medium tracking-wide text-secondary-700 dark:text-secondary-200">
              {isOver
                ? 'Suelta tus archivo aquí'
                : 'Selecciona o arrastra tu archivos aquí'}
            </h2>
            <p className="mt-2 text-xs tracking-wide text-secondary-500 dark:text-secondary-400">
              {accept
                ? [...accept]
                    .slice(0, -1)
                    .map(elem => elem.toUpperCase())
                    .join(', ') +
                  ' o ' +
                  accept[accept.length - 1].toUpperCase()
                : 'Todos los tipos de archivos son aceptados'}
            </p>
          </div>
          <input
            className="hidden"
            id={domId}
            type="file"
            onChange={handleSelect}
            multiple={multiple}
          />
        </label>
      )}
      <div className="flex flex-col mt-4 gap-4">
        {progress && (
          <File
            name={progress.name}
            loaded={progress.loaded}
            total={progress.total}
            progress={progress.progress}
          />
        )}
        {waiting.map((item, index) => (
          <File
            key={index}
            name={item.name}
            progress={0}
            loaded={0}
            total={item.size}
          />
        ))}
        {inputFile.value?.map((_, index) => (
          <File
            key={index}
            name={urlFile.value?.[index].name}
            url={urlFile.value?.[index].url}
            total={urlFile.value?.[index].size}
            id={urlFile.value?.[index]._id}
            handleDelete={() => handleDelete(urlFile.value?.[index]._id)}
            handleUpdate={data =>
              handleUpdate(urlFile.value?.[index]._id, data, index)
            }
            handleOpen={() => handleOpen(urlFile.value?.[index].url)}
            handleUnlink={() => handleUnlink(urlFile.value?.[index]._id)}
          />
        ))}
      </div>
    </InputContainer>
  );
};

InputFile.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.array,
  multiple: PropTypes.bool,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export { InputFile };
