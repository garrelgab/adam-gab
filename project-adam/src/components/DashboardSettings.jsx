import React, {useState} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FAQs from './FAQs';
import SettingsPrivacyPolicy from './SettingsPrivacyPolicy';
import SettingsTermsConditions from './SettingsTermsConditions';
import SettingsAboutUsGym from './SettingsAboutUsGym';

const DashboardSettings = () => {

    const [editorContent, setEditorContent] = useState('');
    const [settingsFaqNav, setSettingsFaqNav] = useState(false);
    const [settingsPrivacyPolicyNav, setSettingsPrivacyPolicyNav] = useState(false);
    const [settingsTermsCondtionNav, setSettingsTermsConditionNav] = useState(false);
    const [settingAboutUsGymNav, setSettingsAboutUsGym] = useState(false);
    const handleFaqNav = () => {
        setSettingsFaqNav(!settingsFaqNav);
        setSettingsPrivacyPolicyNav(false)
        setSettingsTermsConditionNav(false)
        setSettingsAboutUsGym(false)
    }
    const handlePrivacyPolicyNav = () => {
        setSettingsPrivacyPolicyNav(!settingsPrivacyPolicyNav);
        setSettingsFaqNav(false);
        setSettingsTermsConditionNav(false)
        setSettingsAboutUsGym(false)
    }
    const handleTermsConditionNav = () => {
        setSettingsTermsConditionNav(!settingsTermsCondtionNav);
        setSettingsFaqNav(false)
        setSettingsPrivacyPolicyNav(false)
        setSettingsAboutUsGym(false)
    }
    const handleAboutUsGymNav = () => {
        setSettingsAboutUsGym(!settingAboutUsGymNav);
        setSettingsFaqNav(false)
        setSettingsPrivacyPolicyNav(false)
        setSettingsTermsConditionNav(false)
    }
  return (
    <div className='mx-[50px] mt-[30px] text-white'>
        <h1 className='text-[30px] md:text-[35px] font-light'>Settings</h1>

        <div className='rounded-md md:ml-[50px] mt-[50px]'>
            {/* <ReactQuill className='mt-[20px] bg-white text-black rounded-md'
            value={editorContent}
            onChange={setEditorContent}
            /> */}
            <h1 className='text-extralight text-[25px] text-black my-[40px] bg-[#93F4D3] cursor-pointer hover:bg-[#263f36] hover:text-white rounded-md py-[20px] pl-[70px]' onClick={handleFaqNav}>FAQ's</h1>
                { settingsFaqNav && <FAQs/>}
            <h1 className='text-extralight text-[25px] text-black my-[40px] bg-[#93F4D3] cursor-pointer hover:bg-[#263f36] hover:text-white rounded-md py-[20px] pl-[70px]' onClick={handlePrivacyPolicyNav}>Privacy Policy</h1>
                { settingsPrivacyPolicyNav && <SettingsPrivacyPolicy/>}
            <h1 className='text-extralight text-[25px] text-black my-[40px] bg-[#93F4D3] cursor-pointer hover:bg-[#263f36] hover:text-white rounded-md py-[20px] pl-[70px]' onClick={handleTermsConditionNav}>Terms and Conditions</h1>
                { settingsTermsCondtionNav && <SettingsTermsConditions/>}
            <h1 className='text-extralight text-[25px] text-black my-[40px] bg-[#93F4D3] cursor-pointer hover:bg-[#263f36] hover:text-white rounded-md py-[20px] pl-[70px]' onClick={handleAboutUsGymNav}>About Us (Gym Info)</h1>
                { settingAboutUsGymNav && <SettingsAboutUsGym/>}
        </div>

    </div>
  )
}

export default DashboardSettings