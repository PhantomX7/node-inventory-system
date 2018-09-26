/**
 *
 * Asynchronously loads the component for CustomerPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
