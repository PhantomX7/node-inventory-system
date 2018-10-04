/**
 *
 * Asynchronously loads the component for InvoiceDetailPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
