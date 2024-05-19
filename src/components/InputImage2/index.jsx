import { useEffect, useId, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { IoIosClose } from 'react-icons/io';
import { IoCloudUploadOutline } from 'react-icons/io5';
import { post as postImage } from '../../api/images';
import { InputContainer } from '../InputContainer';

const InputImage2 = ({
  className,
  label,
  name,
  accept,
  width = 200,
  height = 200,
  register,
  required
}) => {
  const inputImage = register(name, { required });
  const urlImage = register('_' + name);
  const domId = useId();
  const domRef = useRef(null);
  const [tempImage, setTempImage] = useState(null);

  // eslint-disable-next-line
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

  const [imageSize, setImageSize] = useState({ width, height });

  useEffect(() => {
    if (!domRef.current) return;
    // console.log(domRef.current);
    const containerWidth = domRef?.current?.offsetWidth - 80;
    const containerHeight = domRef?.current?.offsetHeight - 20;
    const imageAspectRatio = width / height;
    const containerAspectRatio = containerWidth / containerHeight;

    if (imageAspectRatio > containerAspectRatio) {
      const width = containerWidth;
      const height = containerWidth / imageAspectRatio;
      const borderWidth = width + 20;
      const borderHeight = height + 20;
      const relativeWidth = (width * height) / 100;
      const relativeHeight = 100;
      const perimeter = (relativeWidth + relativeHeight) * 2;
      setImageSize({
        width,
        height,
        relativeWidth,
        relativeHeight,
        perimeter
      });
    } else {
      const width = containerHeight * imageAspectRatio;
      const height = containerHeight;
      const borderWidth = width + 20;
      const borderHeight = height + 20;
      const relativeWidth = (100 * width) / height;
      const relativeHeight = 100;
      const perimeter = (relativeWidth + relativeHeight) * 2;
      setImageSize({
        width,
        height,
        borderWidth,
        borderHeight,
        relativeWidth,
        relativeHeight,
        perimeter
      });
    }

    // eslint-disable-next-line
  }, [domRef.current]);

  return (
    <InputContainer
      className={className}
      label={label}
      name={domId}
      error={inputImage.errors[name]?.message}
    >
      {!inputImage.value && !tempImage && (
        <label
          className={`flex items-center justify-center w-full h-[300px] mt-2 p-5 text-center border-2 border-dashed cursor-pointer rounded-xl text-secondary-500 border-secondary-300 dark:text-secondary-400 dark:border-secondary-700 ${
            isOver ? 'bg-secondary-100 dark:bg-secondary-900' : ''
          }`}
          ref={domRef}
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
        <div className="relative flex items-center justify-center w-full h-[300px]">
          {/* <div className="absolute w-[300px] h-[300px]">
            <svg
              className="w-full h-full"
              viewBox={`0 0 ${imageSize.relativeWidth} ${imageSize.relativeHeight}`}
            >
              <rect
                className="stroke-current text-secondary-200 dark:text-secondary-700"
                strokeWidth="2"
                x={0}
                y={1}
                width={imageSize.relativeWidth}
                height={imageSize.relativeHeight - 2}
                fill="transparent"
              ></rect>
              <rect
                className={`stroke-current ${
                  progress && !isReady
                    ? 'text-blue-500'
                    : 'text-secondary-200 dark:text-secondary-700'
                }`}
                strokeWidth="2"
                x={0}
                y={1}
                width={imageSize.relativeWidth}
                height={imageSize.relativeHeight - 2}
                strokeDasharray={imageSize.perimeter}
                strokeDashoffset={
                  imageSize.perimeter -
                  (imageSize.perimeter *
                    (progress ? Math.round(progress.progress * 100) : 100)) /
                    100
                }
                fill="transparent"
              ></rect>
            </svg>
          </div> */}
          <div className={`flex items-center justify-center w-full h-full`}>
            {/* {tempImage && !isReady && (
              <div className="flex items-center justify-center w-full h-[${imageSize.height}px]">
                {console.log('ENTER')}
                <div
                  className={`flex flex-col justify-end h-[${imageSize.height}px] overflow-hidden bg-cover bg-no-repeat bg-center blur`}
                  style={{
                    width: `${imageSize.width}px`,
                    backgroundImage: `url(${tempImage})`
                  }}
                ></div>
              </div>
            )} */}
            <div
              className={`flex items-center justify-center w-[${
                imageSize.relativeWidth
              }px] h-[100%] ${
                tempImage ? (isReady ? 'flex' : 'hidden') : 'flex'
              }`}
            >
              <img
                className={`${isReady ? 'flex' : 'hidden'} w-auto h-[100%]`}
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

InputImage2.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  accept: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  register: PropTypes.func.isRequired,
  required: PropTypes.bool
};

export { InputImage2 };
