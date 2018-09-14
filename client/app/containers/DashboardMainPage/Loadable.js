/**
 *
 * Asynchronously loads the component for DashboardMainPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
