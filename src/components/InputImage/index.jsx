import { useId, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { post as postImage } from '../../api/images';
import { InputContainer } from '../InputContainer';

const InputImage = ({
  className,
  label,
  name,
  width = 200,
  height = 200,
  accept,
  register,
  required
}) => {
  const inputImage = register(name, { required });
  const urlImage = register('_' + name);
  const domId = useId();
  const [tempImage, setTempImage] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isReady, setIsReady] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const handleUpload = selectedFile => {
    if (!selectedFile) return;
    const reader = new FileReader();
    const formData = new FormData();

    formData.append('name', selectedFile.name);
    formData.append('file', selectedFile);

    reader.onload = async () => {
      setTempImage(reader.result);

      const response = await postImage(formData, setProgress, width, height);
      if (!response || !response.data) return;
      inputImage.handleChange(response.data._id);
      urlImage.handleChange(response.data.url);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleSelect = e => handleUpload(e.target.files[0]);

  const handleDragOver = e => e.preventDefault();

  const handleDragEnter = () => !isOver && setIsOver(true);

  const handleDragLeave = () => isOver && setIsOver(false);

  const handleDrop = e => {
    e.preventDefault();
    handleUpload(e.dataTransfer.files[0]);
    setIsOver(false);
  };

  const handleRemove = () => {
    inputImage.handleChange(null);
    urlImage.handleChange(null);
    setTempImage(null);
    setProgress(null);
    setIsReady(false);
  };

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={inputImage.errors[name]?.message}
    >
      {!inputImage.value && !tempImage && (
        <label
          className={`flex items-center justify-center w-full h-[200px] mt-2 p-5 text-center border-2 border-dashed cursor-pointer rounded-xl text-secondary-500 border-secondary-300 dark:text-secondary-400 dark:border-secondary-700 ${
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
                ? 'Suelta tu imagen aquí'
                : 'Selecciona o arrastra tu imagen aquí'}
            </h2>
            <p className="mt-2 text-xs tracking-wide text-secondary-500 dark:text-secondary-400">
              {accept
                ? [...accept]
                    .slice(0, -1)
                    .map(elem => elem.toUpperCase())
                    .join(', ') +
                  ' o ' +
                  accept[accept.length - 1].toUpperCase()
                : 'Todos los tipos de imagenes son aceptados'}
            </p>
          </div>
          <input
            className="hidden"
            id={domId}
            type="file"
            onChange={handleSelect}
          />
        </label>
      )}
      {(inputImage.value || tempImage) && (
        <div className="relative flex items-center justify-center h-[200px]">
          <div className="absolute w-[200px] h-[200px]">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                className="stroke-current text-secondary-200 dark:text-secondary-700"
                strokeWidth="2"
                cx="50"
                cy="50"
                r="48"
                fill="transparent"
              ></circle>
              <circle
                className={`stroke-current transform -rotate-90 origin-center ${
                  progress && !isReady
                    ? 'text-blue-500'
                    : 'text-secondary-200 dark:text-secondary-700'
                }`}
                strokeWidth="2"
                strokeLinecap="round"
                cx="50"
                cy="50"
                r="48"
                fill="transparent"
                strokeDasharray="301.6"
                strokeDashoffset={`calc(301.6 - (301.6 * ${
                  progress ? Math.round(progress.progress * 100) : 100
                }) / 100)`}
              ></circle>
            </svg>
          </div>
          <div className="flex items-center justify-center">
            {tempImage && !isReady && (
              <div className="w-[180px] h-[180px] rounded-full overflow-hidden">
                <div
                  className="flex flex-col justify-end w-[180px] h-[180px] rounded-full overflow-hidden bg-cover bg-center blur"
                  style={{
                    backgroundImage: `url(${tempImage})`
                  }}
                ></div>
              </div>
            )}
            <div
              className={`w-[180px] h-[180px] rounded-full overflow-hidden bg-secondary-200 dark:bg-secondary-900 ${
                tempImage ? (isReady ? 'flex' : 'hidden') : 'flex'
              }`}
            >
              <img
                className={isReady ? 'flex' : 'hidden'}
                src={urlImage.value}
                onLoad={() => setIsReady(true)}
              />
            </div>
          </div>
          <button
            className="absolute top-0 right-0 text-secondary-400 hover:text-black dark:text-secondary-400 darkhover:text-white"
            type="button"
            onClick={handleRemove}
          >
            <IoIosClose size={32} />
          </button>
        </div>
      )}
    </InputContainer>
  );
};

InputImage.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export { InputImage };
