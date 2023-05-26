import React from 'react'
import PosTabs from './PosTabs';
import PosProducts from './PosProducts';
import PosWorkOut from './PosWorkOut';
import PosLocker from './PosLocker';

const DashboardPos = () => {
  const tabs = [
    // {
    //   title: 'Products',
    //   content: <PosProducts/>,
    // },
    {
      title: 'Workout',
      content: <PosWorkOut/>,
    },
    {
      title: 'Locker Rent',
      content: <PosLocker/>,
    },
  ];
  return (
    <div className='px-[50px] bg-[#d3d3d3] py-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-extrabold text-[#1ca350]'>Window Payment (Walk-ins)</h1>
        <div>
          <PosTabs tabs={tabs}/>
        </div>
    </div>
  )
}

export default DashboardPos