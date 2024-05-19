import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFilter } from '../../hooks/useFilter.hook';
import { ModuleLayout } from '../../layouts/ModuleLayout';
import { DataTable } from '../../components/DataTable';
import { Modal } from '../../components/Modal';
import { useModal } from '../../hooks/useModal.hook';
import { useForm } from '../../hooks/useForm.hook';
import { FormData } from '../../components/FormData';
import { FormCategories } from './FormCategories';
import { toast } from 'sonner';
import {
  index,
  destroy,
  show,
  store,
  update
} from '../../store/slices/category.slice';

const Categories = () => {
  const dispatch = useDispatch();
  const ModalCreate = useModal();
  const ModalUpdate = useModal();
  const FormCreate = useForm({ isEnabled: true });
  const FormUpdate = useForm();
  const { filter, setPage, setSearch } = useFilter();
  const category = useSelector(state => state.category.data);
  const meta = useSelector(state => state.category.meta);

  useEffect(() => {
    dispatch(index(filter));
    // eslint-disable-next-line
  }, [filter]);

  const breadcrumb = [{ label: 'Categorías', url: '' }];

  const structure = [
    {
      label: 'Nombre',
      attr: 'name',
      type: 'text'
    },
    {
      label: 'Fecha de creación',
      attr: 'createdAt',
      type: 'date'
    }
  ];

  const data = category.map(item => {
    return {
      ...item
    };
  });

  const handleDelete = async id => {
    try {
      await dispatch(destroy(id));
    } finally {
      dispatch(index(filter));
    }
  };

  const handleUpdate = async id => {
    if (!id) return;
    FormUpdate.reset();
    ModalUpdate.openModal();
    const response = await dispatch(show(id));

    if (response) {
      FormUpdate.setForm({
        ...response,
        photo: response.photo?._id,
        _photo: response.photo?.url
      });
    } else {
      toast.error(
        'Lo sentimos, ha ocurrido un problema al intentar cargar la información.'
      );
      FormUpdate.closeModal();
    }
  };

  FormCreate.registerSubmit(async data => {
    const response = await dispatch(store(data));
    if (response) {
      toast.success(
        '¡Registro exitoso! Su información ha sido procesada correctamente.'
      );
      FormCreate.reset();
      ModalCreate.closeModal();
    } else {
      toast.error(
        '¡Ups! Parece que ocurrió un error al procesar su información.'
      );
    }
  });

  FormUpdate.registerSubmit(async data => {
    const response = await dispatch(update(data.id, data));
    if (response) {
      toast.success(
        '¡Actualización exitosa! Su información ha sido procesada correctamente.'
      );
      ModalUpdate.closeModal();
      FormUpdate.closeModal();
    } else {
      toast.error(
        '¡Ups! Parece que ocurrió un error al procesar su información.'
      );
    }
  });

  return (
    <ModuleLayout title="Categorías" breadcrumb={breadcrumb}>
      <DataTable
        structure={structure}
        data={data}
        filter={filter}
        pagination={meta.pagination}
        setPage={setPage}
        setSearch={setSearch}
        handleCreate={ModalCreate.openModal}
        handleUpdate={handleUpdate}
        handleDelete={handleDelete}
      />
      {/* MODAL CREATE */}
      <Modal title="Agregar categoría" {...ModalCreate.register}>
        <FormData form={FormCreate} handleCancel={ModalCreate.closeModal} modal>
          <FormCategories form={FormCreate} />
        </FormData>
      </Modal>
      {/* MODAL UPDATE */}
      <Modal title="Editar categoría" {...ModalUpdate.register}>
        <FormData form={FormUpdate} handleCancel={ModalUpdate.closeModal} modal>
          <FormCategories form={FormUpdate} />
        </FormData>
      </Modal>
    </ModuleLayout>
  );
};

export default Categories;
