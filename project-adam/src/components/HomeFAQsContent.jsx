import React from 'react'

const HomeFAQsContent = () => {
  return (
    <div className='bg-[#d3d3d3] flex flex-col justify-center items-center py-[50px] drop-shadow-md'>
        {/* <h1 className='text-[30px] text-white'>ADAM Fitness Center</h1> */}
        <h1 className='flex md:flex md:text-[50px] text-[30px] md:mt-[50px] font-extrabold '>ADAM<p className='text-[#1ca350] px-[5px]'>FITNESS</p>CENTER</h1>
        <div className='flex flex-col mx-[40px] md:w-[1240px] mt-[40px]'>
            <h1 className='mt-[50px] text-[30px] md:text-[35px] font-extrabold'>FAQ's</h1>

            <div className='ml-[50px] mt-[50px] text-justify'>
                <h1 className='text-[20px] text-[#1ca350]'>How can I create my own account?</h1>
                <p className='mt-[10px]'>You can create your account by clicking the “Create Account” button on the website and by giving the required information. Once registered, you can make an online reservation on the website and pay online by scanning the G-cash QR-Code of our G-Cash that is provided.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>What if I forgot my password?</h1>
                <p className='mt-[10px]'>You can reset your password by clicking on the "Forgot Password" button on the login page. You will be prompted to enter the email address used to register for your account. The system will then prompt you to reset your password.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How much does it cost a membership plan?</h1>
                <p className='mt-[10px]'>Rates vary based on amenities, and membership type. Because there are often offers, discounts, promotions and programs that are happening that may affect your membership price, for the most accurate information, please contact our admin staff or to our website for direct purchasing. We're looking forward to meeting you!</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>What does my membership include?</h1>
                <p className='mt-[10px]'>Our gym offers different classes, you can check it on our website or Facebook Page. Not to mention, we’ve got the best personal trainers at an affordable rate.
ADAM Fitness also provides a free parking area, Wi-Fi access, unlimited use of the shower room, and a rent locker for our dear customers.
</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How can I cancel my membership plan?</h1>
                <p className='mt-[10px]'>You can cancel your order if your order is not yet approved by the staff of ADAM Fitness
Please contact to the gym admin directly for more information or please send us an email at adamfitnesscenter@gmail.com</p>
                
                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>How can I change my order?</h1>
                <p className='mt-[10px]'>You may make changes to your order during the checkout process; however, once your order has been submitted, it cannot be altered.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>What are your online reservation and scheduling rules?</h1>
                <p className='mt-[10px]'>The gym will allow the users to set an online reservation but the number of it is limited. The employee will provide an expiration date for the user's slot reservation.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>What is your mode of payment?</h1>
                <p className='mt-[10px]'>We accept payments through G-Cash only and cash if you go directly to the gym.</p>

                <h1 className='text-[20px] text-[#1ca350] mt-[30px]'>What will happen if I don’t show up for a class?</h1>
                <p className='mt-[20px]'>Unlike many gyms, we don’t currently penalize members for being absent or not showing up. We know plans change, we may request that you inform the staff that you will not be able to attend the class so we will be able to give to other members your time slot for that time and day.</p>
            </div>
        </div>
    </div>
  )
}

export default HomeFAQsContent