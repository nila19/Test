import React from 'react';

import FilterLink from '../container/FilterLink.jsx';

const Filters = () => (
  <div>Show :&nbsp;
    <FilterLink option={'SHOW_ALL'} text={'All'} />&nbsp;|&nbsp;
    <FilterLink option={'SHOW_OPEN'} text={'Open'} />&nbsp;|&nbsp;
    <FilterLink option={'SHOW_COMPLETED'} text={'Completed'} />
  </div>
);

export default Filters;
