import React, {useState} from 'react'
import FAQs from './FAQs';
import SettingsPrivacyPolicy from './SettingsPrivacyPolicy';
import SettingsTermsConditions from './SettingsTermsConditions';
import SettingsAboutUsGym from './SettingsAboutUsGym';
import { SlArrowDown, SlArrowUp } from "react-icons/sl";
import SettingsAddFAQ from './SettingsAddFAQ';
import SettingsAddPrivacy from './SettingsAddPrivacy';
import SettingsAddTerms from './SettingsAddTerms';
import SettingsAddAbout from './SettingsAddAbout';
const DashboardSettings = () => {


    

    const [settingsFaqNav, setSettingsFaqNav] = useState(false);
    const [settingsPrivacyPolicyNav, setSettingsPrivacyPolicyNav] = useState(false);
    const [settingsTermsCondtionNav, setSettingsTermsConditionNav] = useState(false);
    const [settingAboutUsGymNav, setSettingsAboutUsGym] = useState(false);
    const handleFaqNav = () => {
        setSettingsFaqNav(!settingsFaqNav);
        setSettingsPrivacyPolicyNav(false);
        setSettingsTermsConditionNav(false);
        setSettingsAboutUsGym(false);
        setSettingsUpdateFaq(false);
        setSettingsUpdatePrivacyPolicy(false);
        setSettingsUpdateAbout(false);
        setSettingsUpdateTerms(false);
    }
    const handlePrivacyPolicyNav = () => {
        setSettingsPrivacyPolicyNav(!settingsPrivacyPolicyNav);
        setSettingsFaqNav(false);
        setSettingsTermsConditionNav(false);
        setSettingsAboutUsGym(false);
        setSettingsUpdateFaq(false);
        setSettingsUpdatePrivacyPolicy(false);
        setSettingsUpdateAbout(false);
        setSettingsUpdateTerms(false);
    }
    const handleTermsConditionNav = () => {
        setSettingsTermsConditionNav(!settingsTermsCondtionNav);
        setSettingsFaqNav(false);
        setSettingsPrivacyPolicyNav(false);
        setSettingsAboutUsGym(false);
        setSettingsUpdateFaq(false);
        setSettingsUpdatePrivacyPolicy(false);
        setSettingsUpdateAbout(false);
        setSettingsUpdateTerms(false);
    }
    const handleAboutUsGymNav = () => {
        setSettingsAboutUsGym(!settingAboutUsGymNav);
        setSettingsFaqNav(false);
        setSettingsPrivacyPolicyNav(false);
        setSettingsTermsConditionNav(false);
        setSettingsUpdateFaq(false);
        setSettingsUpdatePrivacyPolicy(false);
        setSettingsUpdateAbout(false);
        setSettingsUpdateTerms(false);
    }

    const [settingsUpdateFaq, setSettingsUpdateFaq] = useState(false);
    const [settingsUpdatePrivacyPolicy, setSettingsUpdatePrivacyPolicy] = useState(false);
    const [settingsUpdateTerms, setSettingsUpdateTerms] = useState(false);
    const [settingsUpdateAbout, setSettingsUpdateAbout] = useState(false);
    const [Modal, setAddModal] = useState(false);

    const handleAddModal = () => {
        setAddModal(!Modal);
        setSettingsUpdateFaq(false);
        setSettingsUpdatePrivacyPolicy(false);
        setSettingsUpdateTerms(false);
        setSettingsUpdateAbout(false);
    }
    const handleUpdateFaq = () => {
        setSettingsUpdateFaq(!settingsUpdateFaq);
    }
    const handleUpdatePrivacyPolicy = () => {
        setSettingsUpdatePrivacyPolicy(!settingsUpdatePrivacyPolicy);
    }
    const handleUpdateTerms = () => {
        setSettingsUpdateTerms(!settingsUpdateTerms);
    }
    const handleUpdateAbout = () => {
        setSettingsUpdateAbout(!settingsUpdateAbout);
    }
  return (
    <div className='mx-[50px] mt-[90px] text-white'>
        <h1 className='text-[30px] md:text-[35px] font-light text-[#93F4D3]'>Settings</h1>

        <div className='rounded-md md:ml-[50px] mt-[50px]'>
            {/* <ReactQuill className='mt-[20px] bg-white text-black rounded-md'
            value={editorContent}
            onChange={setEditorContent}
            /> */}
            <div>
                <div className='cursor-pointer blocked justify-between bg-[#93F4D3] hover:bg-[#263f36] text-black hover:text-white flex items-center rounded-md my-[40px] ease-in-out duration-300' onClick={handleFaqNav}>
                    <h1 className='text-extralight md:text-[25px] my-[20px] cursor-pointer py-[0px] pl-[70px]' >FAQ's</h1>
                    <div className='mr-[30px] md:mr-[70px]'>
                        {!settingsFaqNav ? <SlArrowDown className='md:text-[30px]'/> : <SlArrowUp className='md:text-[30px]'/>}
                    </div>
                </div>
                { settingsFaqNav && 
                <div className='flex mb-[20px]'>
                    <div className='ml-[30px]'>
                        <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleAddModal}>Add</button>
                    </div>
                        { Modal && <SettingsAddFAQ onClose={handleAddModal}/>}
                    <div className='mx-[20px]'>
                        <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleUpdateFaq}>Update</button>
                    </div>
                </div>
                }
                { settingsUpdateFaq && <FAQs/> }
            </div>
            <div>
                <div className='cursor-pointer blocked justify-between bg-[#93F4D3] hover:bg-[#263f36] text-black hover:text-white flex items-center rounded-md my-[40px] ease-in-out duration-300' onClick={handlePrivacyPolicyNav}>
                    <h1 className='text-extralight md:text-[25px] my-[20px] cursor-pointer py-[0px] pl-[70px]' >Privacy Policy</h1>
                    <div className='mr-[30px] md:mr-[70px]'>
                        {!settingsPrivacyPolicyNav ? <SlArrowDown className='md:text-[30px]'/> : <SlArrowUp className='md:text-[30px]'/>}
                    </div>
                </div>
                { settingsPrivacyPolicyNav &&
                    <div className='flex mb-[20px]'>
                    <div className='ml-[30px]'>
                        <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleAddModal}>Add</button>
                    </div>
                        { Modal && <SettingsAddPrivacy onClose={handleAddModal}/>}
                    <div className='mx-[20px]'>
                        <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleUpdatePrivacyPolicy}>Update</button>
                    </div>
                </div>
                }
                { settingsUpdatePrivacyPolicy && <SettingsPrivacyPolicy/>}
            </div>
            <div>
                <div className='cursor-pointer blocked justify-between bg-[#93F4D3] hover:bg-[#263f36] text-black hover:text-white flex items-center rounded-md my-[40px] ease-in-out duration-300' onClick={handleTermsConditionNav}>
                    <h1 className='text-extralight md:text-[25px] my-[20px] cursor-pointer py-[0px] pl-[70px]' >Terms and Conditions</h1>
                    <div className='mr-[30px] md:mr-[70px]'>
                        {!settingsTermsCondtionNav ? <SlArrowDown className='md:text-[30px]'/> : <SlArrowUp className='md:text-[30px]'/>}
                    </div>
                </div>
                { settingsTermsCondtionNav &&
                    <div className='flex mb-[20px]'>
                    <div className='ml-[30px]'>
                        <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleAddModal}>Add</button>
                    </div>
                        { Modal && <SettingsAddTerms onClose={handleAddModal}/>}
                    <div className='mx-[20px]'>
                        <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleUpdateTerms}>Update</button>
                    </div>
                </div>
                }
                { settingsUpdateTerms && <SettingsTermsConditions/>}
            </div>
            <div>
                <div className='cursor-pointer blocked justify-between bg-[#93F4D3] hover:bg-[#263f36] text-black hover:text-white flex items-center rounded-md my-[40px] ease-in-out duration-300' onClick={handleAboutUsGymNav}>
                    <h1 className='text-extralight md:text-[25px] my-[20px] cursor-pointer py-[0px] pl-[70px]' >About Us (Gym Info)</h1>
                    <div className='mr-[30px] md:mr-[70px]'>
                        {!settingAboutUsGymNav ? <SlArrowDown className='md:text-[30px]'/> : <SlArrowUp className='md:text-[30px]'/>}
                    </div>
                </div>
                { settingAboutUsGymNav &&
                        <div className='flex mb-[20px]'>
                        <div className='ml-[30px]'>
                            <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleAddModal}>Add</button>
                        </div>
                            { Modal && <SettingsAddAbout onClose={handleAddModal}/>}
                        <div className='mx-[20px]'>
                            <button className='py-[10px] px-[50px] rounded-md bg-white text-black ease-in-out duration-300 hover:bg-gray-500' onClick={handleUpdateAbout}>Update</button>
                        </div>
                    </div>
                }
                    { settingsUpdateAbout && <SettingsAboutUsGym/>}
            </div>
        </div>

    </div>
  )
}

export default DashboardSettings