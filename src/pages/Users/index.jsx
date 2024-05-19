import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { toast } from 'sonner';
import {
  index as indexUser,
  show as showUser,
  store as storeUser,
  update as updateUser,
  destroy as destroyUser
} from '../../store/slices/user.slice';
import { useFilter } from '../../hooks/useFilter.hook';
import { useModal } from '../../hooks/useModal.hook';
import { useForm } from '../../hooks/useForm.hook';
import { ModuleLayout } from '../../layouts/ModuleLayout';
import { DataTable } from '../../components/DataTable';
import { FormData } from '../../components/FormData';
import { Modal } from '../../components/Modal';
import { FormUser } from './FormUser';

const Users = () => {
  const dispatch = useDispatch();
  const ModalCreate = useModal();
  const ModalUpdate = useModal();
  const FormCreate = useForm({ isEnabled: true });
  const FormUpdate = useForm();
  const { filter, setPage, setSearch } = useFilter();
  const users = useSelector(state => state.user.data, shallowEqual);
  const meta = useSelector(state => state.user.meta, shallowEqual);

  useEffect(() => {
    dispatch(indexUser(filter));
    // eslint-disable-next-line
  }, [filter]);

  const breadcrumb = [{ label: 'Usuarios', url: '/users' }];

  const structure = [
    {
      label: 'Nombre completo',
      attr: 'user',
      type: 'idCard'
    },
    {
      label: 'Ocupaciónn',
      attr: 'ocupation',
      type: 'text'
    },
    {
      label: 'Número de contacto',
      attr: 'phones',
      type: 'tags'
    },
    {
      label: 'Rol',
      attr: 'role',
      type: 'text'
    },
    {
      label: 'Estado',
      attr: 'isEnabled',
      type: 'status'
    },
    {
      label: 'Fecha de creación',
      attr: 'createdAt',
      type: 'date'
    }
  ];

  const data = users?.map(item => {
    return {
      id: item.id,
      user: {
        photo: item.photo?.url,
        fullName: item.firstName
          ? item.lastName
            ? item.firstName + ' ' + item.lastName
            : item.firstName
          : null,
        email: item.email
      },
      phones: item.phones,
      ocupation: item.ocupation,
      role:
        item.role === 1
          ? 'Administrador'
          : item.role === 2
          ? 'Veterinario'
          : item.role === 3
          ? 'Asistente Veterinario'
          : item.role === 4
          ? 'Recepcionista'
          : item.role === 5
          ? 'Pelutquero(a) Canino'
          : item.role === 6
          ? 'Estilista Felino'
          : item.role === 7
          ? 'Auxiliar de Peluquería'
          : item.role === 8
          ? 'Servicios Generales'
          : 'Rol no especificado',
      isEnabled: item.isEnabled,
      createdAt: item.createdAt
    };
  });

  const handleUpdate = async id => {
    if (!id) return;
    FormUpdate.reset();
    ModalUpdate.openModal();

    const selected = users.filter(user => user.id === id)[0];
    if (selected) FormUpdate.setForm(selected);
    const data = await dispatch(showUser(id));

    if (data) {
      FormUpdate.setForm({
        ...data,
        photo: data.photo?._id,
        _photo: data.photo?.url,
        role: data.role.toString()
      });
    } else {
      toast.error(
        'Lo sentimos, ha ocurrido un problema al intentar cargar la información.'
      );
      FormUpdate.closeModal();
    }
  };

  const handleDelete = async id => {
    try {
      await dispatch(destroyUser(id));
    } finally {
      dispatch(indexUser(filter));
    }
  };

  FormCreate.registerSubmit(async data => {
    const response = await dispatch(storeUser(data));
    if (response) {
      toast.success(
        '¡Registro exitoso! Su información ha sido procesada correctamente.'
      );
      dispatch(indexUser(filter));
      ModalCreate.closeModal();
      FormCreate.reset();
    } else {
      toast.error(
        '¡Ups! Parece que ocurrió un error al procesar su información.'
      );
    }
  });

  FormUpdate.registerSubmit(async data => {
    const response = await dispatch(updateUser(data.id, data));
    if (response) {
      toast.success(
        '¡Actualización exitosa! Su información ha sido procesada correctamente.'
      );
      dispatch(indexUser(filter));
      ModalUpdate.closeModal();
      FormUpdate.reset();
    } else {
      toast.error(
        '¡Ups! Parece que ocurrió un error al procesar su información.'
      );
    }
  });

  return (
    <ModuleLayout title="Usuarios" breadcrumb={breadcrumb}>
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
      <Modal title="Crear usuario" {...ModalCreate.register}>
        <FormData form={FormCreate} handleCancel={ModalCreate.closeModal} modal>
          <FormUser form={FormCreate} passRequired />
        </FormData>
      </Modal>
      {/* MODAL UPDATE */}
      <Modal title="Editar usuario" {...ModalUpdate.register}>
        <FormData form={FormUpdate} handleCancel={ModalUpdate.closeModal} modal>
          <FormUser form={FormUpdate} />
        </FormData>
      </Modal>
    </ModuleLayout>
  );
};

export default Users;
