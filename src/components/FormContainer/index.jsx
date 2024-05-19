import PropTypes from 'prop-types';
import { Breadcrumb } from '../Breadcrumb';
import { Card } from '../Card';
import { BaseLayout } from '../../layouts/BaseLayout';

const FormContainer = ({ children, title, breadcrumb }) => {
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

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  breadcrumb: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired
    })
  ).isRequired
};

export { FormContainer };
