import React from 'react';
import NavBar from '../Components/NavBar';
import LogOutButton from '../Components/LogOutButton';
import CustomBreadcrumb from '../Components/CustomBreadcrumb';
function Insights() {
  return (
    <React.Fragment>
      <NavBar active={'insights'} />
      <CustomBreadcrumb title={'Insights'} />
      <div className='site-layout-content'>
        <LogOutButton />
      </div>
    </React.Fragment>
  );
}

export default Insights;
