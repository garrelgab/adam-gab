import React, { useEffect, useState } from 'react'
import PosTabs from './PosTabs';
import CustomerPersonalInformation from './CustomerPersonalInformation';
import CustomerChangePassword from './CustomerChangePassword';
import axios from 'axios';
import { Buffer } from 'buffer';
const CustomerAccount = (props) => {
    const userID = props.id;

  const [modalImageData, setModalImageData] = useState(null);
  const [name, setName] = useState(null);
    const fetchQRCode = () => {
        axios.get('http://localhost:3001/api/fetch-qr-code', {
            params: {
                accID: userID,
            }
        })
        .then(response => {
            setModalImageData(bufferToBase64(Buffer.from(response.data[0].qrcode)));
            setName(response.data[0].name);
        })
        .catch(error => {
            console.log(error);
        });
    };

    useEffect(() => {
        fetchQRCode();
    },[]);
    const bufferToBase64 = (buffer) => {
        // const base64String = Buffer.from(buffer).toString('base64');
        // return `data:image/png;base64,${base64String}`;
        const fileHeader = buffer.slice(0, 4).toString('hex');
        let mimeType = '';
    
        if (fileHeader.startsWith('89504e47')) {
          mimeType = 'image/png';
        } else if (fileHeader.startsWith('ffd8ff')) {
          mimeType = 'image/jpeg';
        } else {
          // Unsupported file type
          return null;
        }
    
        const base64String = buffer.toString('base64');
        return `data:${mimeType};base64,${base64String}`;
    };
    
    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = modalImageData;
        link.download = `${name}.jpg`;
        link.click();
    };
    const tabs = [
        {
            title: 'Personal Information',
            content: <CustomerPersonalInformation id={userID}/>
        },
        {
            title: 'Change Password',
            content: <CustomerChangePassword id={userID}/>
        },
        {
            title: 'QR-Code',
            content: 
            <div className='flex justify-center flex-col items-center my-[90px]'>
                <div className='flex flex-col justify-center items-center'>
                    {modalImageData ? (
                    <div>
                        <img
                        src={modalImageData}
                        alt="Image Modal"
                        // style={{ width: '40%', height: 'auto'}}
                        className='w-[100%] h-auto rounded-md shadow-md'
                        />
                        <h1 className='text-center font-bold my-[20px] text-xl'>{name}</h1>
                        <div className='flex justify-center'>
                            <button className='w-[350px] p-3 text-xl font-bold ease-in-out duration-300 rounded-xl bg-white hover:bg-gray-500 text-[#1ca350] hover:text-white mb-[50px] shadow-lg hover:shadow-xl' onClick={handleDownload}>Download</button>
                        </div>                    
                    </div>

                    ) : <h1 className='text-[30px] text-[#1ca350] font-extrabold'>QR-Code Not Available</h1>}
                </div>
            </div>
        }
    ];
  return (
    <div className='mt-[90px] mx-[50px]'>
        <h1 className='text-[30px] text-[#1ca350] font-extrabold'>Account</h1>
        <div>
            <PosTabs tabs={tabs}/>
        </div>
    </div>
  )
}

export default CustomerAccount