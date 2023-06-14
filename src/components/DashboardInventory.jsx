import React from 'react'
import PosTabs from './PosTabs';
import InventoryAddProducts from './InventoryAddProducts';
import InventoryUpdateProducts from './InventoryUpdateProducts';

const DashboardInventory = () => {
    const tabs = [
        {
          title: 'Add Products',
          content: <InventoryAddProducts/>,
        },
        {
          title: 'Update Products',
          content: <InventoryUpdateProducts/>,
        },
    ];
  return (
    <div className='mt-[90px] mx-[50px]'>
        <h1 className='text-[30px] md:text-[35px] font-light text-[#93F4D3]'>Inventory Management</h1>
        <div>
          <PosTabs tabs={tabs}/>
        </div>
    </div>
  )
}

export default DashboardInventory