import DashboardIcon from '@material-ui/icons/Dashboard';
import ProductIcon from '@material-ui/icons/BorderAll';
import InvoiceIcon from '@material-ui/icons/EventNote';
import CustomerIcon from '@material-ui/icons/Person';

export default [
  {
    path: 'dashboard',
    sidebarName: 'Dashboard',
    Icon: DashboardIcon,
  },
  {
    path: 'customer',
    sidebarName: 'Customer',
    Icon: CustomerIcon,
  },
  {
    path: 'product',
    sidebarName: 'Product',
    Icon: ProductIcon,
  },
  {
    path: 'invoice',
    sidebarName: 'Invoice',
    Icon: InvoiceIcon,
  },
];
