import React from 'react'
import PosTabs from './PosTabs';
import PosProducts from './PosProducts';
import PosWorkOut from './PosWorkOut';

const DashboardPos = () => {
  const tabs = [
    {
      title: 'Products',
      content: <PosProducts/>,
    },
    {
      title: 'Workout',
      content: <PosWorkOut/>,
    },
    {
      title: 'Membership Plan',
      content: <div>Content for Tab 3</div>,
    },
  ];
  return (
    <div className='mx-[50px] mt-[90px]'>
        <h1 className='text-[30px] md:text-[35px] font-light text-[#93F4D3]'>Point of Sales</h1>
        <div>
          <PosTabs tabs={tabs}/>
        </div>
    </div>
  )
}

export default DashboardPos