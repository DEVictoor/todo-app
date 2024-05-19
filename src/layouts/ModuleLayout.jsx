import PropTypes from 'prop-types';
import { BaseLayout } from '../layouts/BaseLayout';
import { Breadcrumb } from '../components/Breadcrumb';
import { Card } from '../components/Card';

const ModuleLayout = ({ children, title, breadcrumb }) => {
  return (
    <BaseLayout>
      <div className="flex flex-col gap-4 mb-4">
        <Breadcrumb options={breadcrumb} />
        <h1 className="text-3xl font-bold dark:text-white">{title}</h1>
      </div>
      <Card>{children}</Card>
    </BaseLayout>
  );
};

ModuleLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};

export { ModuleLayout };
