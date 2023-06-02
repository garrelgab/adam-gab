import axios from 'axios';
import React, { useEffect, useState } from 'react'

const PrivacyPolicyContent = () => {
  const [privacy, setPrivacy] = useState([]);
  const fetchPrivacy = () => {
    axios.get('http://localhost:3001/api/privacy-policy')
    .then(response => {
      setPrivacy(response.data);
    })
    .catch(error => {
      console.log(error);
    })
  };
  useEffect(() => {
    fetchPrivacy();
  }, []);
  return (
    <div className='bg-[#d3d3d3] flex flex-col justify-center items-center py-[50px] drop-shadow-md'>
        {/* <h1 className='text-[30px] text-white'>ADAM Fitness Center</h1> */}
        <h1 className='flex md:flex md:text-[50px] text-[30px] md:mt-[50px] font-extrabold '>ADAM<p className='text-[#1ca350] px-[5px]'>FITNESS</p>CENTER</h1>
        
        <div className='flex flex-col mx-[40px] md:w-[1240px] mt-[40px]'>
            <h1 className='text-justify'>ADAM Fitness Center respect your privacy. This privacy policy explains how ADAM Fitness Center through its website, may collect, use, and share information about you. Since this policy may change over time as we modify or expand our services, we suggest that you check from time to time in order to understand how we treat your personal information. Your use of this website and its services constitute your agreement to Crunch using information about you in accordance with this privacy policy.</h1>            
            <h1 className='mt-[50px] text-[30px] md:text-[35px] font-extrabold'>Privacy Policy</h1>
            {privacy.map(priv => (
              <div key={priv.privacy_id} className='mx-[20px] text-justify'>
              <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>{priv.name}</h1>
              {/* <p className='mt-[10px]'>{term.description.replace(/<[^>]+>/g, '')}</p> */}
              <p className='mt-[10px]' dangerouslySetInnerHTML={{__html: priv.description.replace(/(\. )(?=[A-Z])/g, '.\n\n')}}></p>

            </div>
            ))}
        </div>
    </div>
  )
}
{/* <div className='ml-[50px] mt-[50px] text-justify'>
                <h1 className='text-[20px] text-[#1ca350]'>Purpose of Privacy Policy</h1>
                <p className='mt-[10px]'>This Privacy Policy is designed to assist you as User to understand how we collect, use, disclose or otherwise process personal information you provide to us in accordance with the relevant data privacy laws and to make informed decisions when you are using our website or any other means through which you disclose your personal data to us.</p>
                <p className='mt-[20px]'>Our policy applies to personal data in our possession or under our control, including personal data in the possession of entities which we have engaged to collect, use, disclose or process personal data for our purposes.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>Who we are</h1>
                <p className='mt-[10px]'>This Site is published and maintained by or on behalf of ADAM Fitness Center located at 146 M. L. Quezon Ave, Antipolo, 1870 Rizal. Any questions about your data privacy or this privacy policy, please send us an email at adamfitnesscenter@gmail.com.</p>

                <div className='ml-[50px]'>
                    <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>Third Party Links</h1>
                    <p className='mt-[10px]'>This website may not include links to third-party websites, plug-ins, and applications. We do not control these third-party websites and are not responsible for their privacy statements. When you leave our website, we encourage you to read the privacy notice of every website you visit.</p>
                </div>
                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>What information do we collect?</h1>
                <p className='mt-[10px]'>Currently, the ADAM Fitness Center gathers information from you (such as name, e-mail address, address, age, gender, and birthday) strictly for contact purposes when users opt to fill out an e-mail submission form to inquire about our company and about membership.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How do we use your information?</h1>
                <p className='mt-[10px]'>We may use your information for purposes, including, to provide and service your ADAM Fitness Center membership, to provide member support, to provide and service the ADAM Fitness Center website, to communicate special offers, promotions, and information about our company to you via email or direct to your account, and to compile usage statistics and other data regarding the use of the Web site services.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How do we use your email information?</h1>
                <p className='mt-[10px]'>ADAM Fitness Center respects your concerns about privacy. We collect email information to provide a more personalized and relevant experience. We use it to allow you to create an account and to send you a code if you forgot your password. If you give us your email address when you inquire about membership, we can direct you to this website to choose the classes you are interested in.</p>
                
                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How do we use your phone number?</h1>
                <p className='mt-[10px]'>ADAM Fitness Center respects your concerns about privacy. We collect mobile phone numbers as an optional field to provide a more personalized and relevant experience. We can use it as an alternative in case we can’t contact you.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How do we access and update your data?</h1>
                <p className='mt-[10px]'>You may access or modify your personal data by logging on the website and accessing your account details. Or you may reach out to us through our “Contact Us” page, or through an email sent to adamfitnesscenter@gmail.com.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How we protect your data?</h1>
                <p className='mt-[10px]'>Strict measures are taken with regards to the personal data we collect from our customers through the website in addition, we limit access to your personal data because the user’s password are encrypted and cannot be access by anyone.</p>
                <p className='mt-[20px]'>Any information personal information customers provide to us are processed and stored using a secured connection, and only authorized ADAM Fitness Center personnel may access your data from the website and are using it to process your concerns about orders and schedule.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>Filling Out Your Info</h1>
                <p className='mt-[10px]'>Once you have created an account, you are free to provide other personal information about yourself related to your ADAM Fitness status. This can include your address, age, birthday, and gender. By providing this information you are consenting to our processing of it. You may edit, delete, and otherwise change this information at any time.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>Making a Purchase</h1>
                <p className='mt-[10px]'>When you make a purchase on our website or elsewhere, we collect your contact information and proof of payment through G-Cash. We use this information to process payment, and for legitimate interests like preventing fraud.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>Z.com Philippines</h1>
                <p className='mt-[10px]'>Our website is hosted on Z.com Philippines so it can be accessed by anyone with an internet connection and a web browser. Once a website is hosted or stored on a server, users can simply access it by typing the domain name (web address) in their browser.</p>
                <p className='mt-[20px]'>ADAM Fitness will not allow the Z.com Philippines to collect your data, your personal data is secured and will be used for processing your order products and memberships only.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>Changes To This Policy</h1>
                <p className='mt-[10px]'>We change this Privacy Policy from time to time. We will not reduce your rights under this Privacy Policy without your explicit consent. We always indicate the date the last changes were published, and we offer access to archived versions for your review. If changes are significant, we’ll provide a more prominent notice.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>HOW TO CONTACT US.</h1>
                <p className='mt-[10px]'>If you have any questions or wish to register a complaint in relation to this Privacy Notice or the manner in which your personal data is used by us, please contact us by any of the following means:</p>
                <p className='mt-[20px]'>Email: adamfitnesscenter@gmail.com </p>
                <p>Facebook: https://www.facebook.com/people/ADAM-FitnessCenter/100066718838043/</p>
                <p>Contact Number: +63 995 353 5799</p>
            </div> */}
export default PrivacyPolicyContent