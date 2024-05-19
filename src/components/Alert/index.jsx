import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { IoMdClose } from 'react-icons/io';
import { IoAlertCircleOutline } from 'react-icons/io5';
import { useState } from 'react';
import { ButtonPrimary } from '../ButtonPrimary';

const Alert = ({ isOpen, closeAlert, domRef, handleConfirm, handleCancel }) => {
  const [loading, setLoading] = useState(false);
  if (!isOpen) return null;

  const handleConfirmButton = async () => {
    try {
      setLoading(true);
      if (handleConfirm) await handleConfirm();
    } finally {
      setLoading(false);
      closeAlert();
    }
  };

  const handleCancelButton = () => {
    if (handleCancel) handleCancel();
    closeAlert();
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative p-4 w-full max-w-md max-h-full" ref={domRef}>
        <div className="relative bg-white rounded-lg shadow dark:bg-secondary-800">
          <button
            className="absolute top-3 end-2.5 text-secondary-400 bg-transparent hover:bg-secondary-200 hover:text-secondary-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-secondary-600 dark:hover:text-white"
            onClick={closeAlert}
          >
            <IoMdClose size={20} />
          </button>
          <div className="p-4 md:p-5 text-center">
            <div className="flex justify-center py-4">
              <IoAlertCircleOutline
                className="dark:text-secondary-100"
                size={72}
              />
            </div>
            <h3 className="mb-5 text-lg font-normal text-secondary-500 dark:text-secondary-400">
              ¿Estás seguro de que deseas eliminar este registro?
            </h3>
            <div className="flex justify-center gap-4">
              <ButtonPrimary
                color="Red"
                disabled={loading}
                onClick={handleConfirmButton}
              >
                {loading ? 'Eliminando...' : 'Si, estoy seguro'}
              </ButtonPrimary>
              <ButtonPrimary color="LightSwitch" onClick={handleCancelButton}>
                No, cancelar
              </ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('portal')
  );
};

Alert.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeAlert: PropTypes.func.isRequired,
  domRef: PropTypes.object.isRequired,
  handleConfirm: PropTypes.func,
  handleCancel: PropTypes.func
};

export { Alert };
