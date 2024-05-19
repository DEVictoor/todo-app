import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaHome, FaTasks, FaUser } from 'react-icons/fa';
import { Navbar } from '../components/Navbar';
import { Sidebar } from '../components/Sidebar';
import { MdCategory } from 'react-icons/md';

const BaseLayout = ({ children }) => {
  const [isCollapse, setIsCollapse] = useState(true);
  const options = [
    {
      label: 'Inicio',
      path: '/',
      icon: <FaHome />
    },
    {
      label: 'Tareas',
      path: '/tasks',
      icon: <FaTasks />
    },
    {
      label: 'Categorías',
      path: '/categories',
      icon: <MdCategory />
    },
    {
      label: 'Usuarios',
      path: '/users',
      icon: <FaUser />
    }
    // {
    //   label: 'Configuración',
    //   path: '/config',
    //   icon: <IoSettingsSharp />
    // }
    // {
    //   label: 'Transportes',
    //   path: '/transports',
    //   icon: <FaTasks  />
    // },
    // {
    //   label: 'Contabilidad',
    //   path: '/accounting',
    //   icon: <BiSolidBank />
    // },
    // {
    //   label: 'Kardex',
    //   path: '/kardex',
    //   icon: <RiFileExcel2Fill />
    // },
    // {
    //   label: 'Registro diario',
    //   path: '/daily',
    //   icon: <FaBook />
    // },
    // {
    //   label: 'Almacenamiento',
    //   path: '/folder',
    //   icon: <MdSdStorage />
    // }
  ];

  return (
    <div className="flex flex-col h-screen dark:bg-secondary-900">
      <Navbar isCollapse={isCollapse} setIsCollapse={setIsCollapse} />
      <div>
        <Sidebar
          options={options}
          isCollapse={isCollapse}
          setIsCollapse={setIsCollapse}
        />
        <div
          className={`${
            isCollapse ? 'lg:ml-16' : 'lg:ml-64'
          } p-4 transition-all duration-300 mt-16`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

BaseLayout.propTypes = {
  children: PropTypes.node
};

export { BaseLayout };
