import React, {useState} from 'react'

const PosTabs = ({tabs}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="mt-4">
      <div className="flex justify-center md:justify-start">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={`py-2 px-6 mx-2 rounded-md ${
              activeTab === index ? 'bg-[#1ca350] text-white' : 'bg-[#fffdfa] text-black hover:text-white ease-in-out duration-300 hover:bg-gray-500'
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