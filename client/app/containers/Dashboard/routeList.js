import DashboardIcon from '@material-ui/icons/Dashboard';
import ProductIcon from '@material-ui/icons/BorderAll';
import InvoiceIcon from '@material-ui/icons/EventNote';
import CustomerIcon from '@material-ui/icons/Person';
import OrderInvoiceIcon from '@material-ui/icons/NoteAdd';

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
  {
    path: 'orderinvoice',
    sidebarName: 'Order Invoice',
    Icon: OrderInvoiceIcon,
  },
];
