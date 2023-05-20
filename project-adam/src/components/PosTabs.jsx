import React, {useState} from 'react'

const PosTabs = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="mt-4">
      <div className="flex">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-10 mr-4 rounded-md ${
              activeTab === index ? 'bg-[#93F4D3] text-black' : 'bg-gray-300 text-black hover:text-white ease-in-out duration-300 hover:bg-gray-500'
            }`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs[activeTab].content}</div>
    </div>

  )
}

export default PosTabs