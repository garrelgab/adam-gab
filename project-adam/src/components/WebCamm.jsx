import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import QrReader from 'react-qr-reader';
import QrScanner from 'react-qr-scanner';
const WebCamm = (props) => {
    const webcamRef = useRef(null);
    const [qrCodeData, setQrCodeData] = useState([]);
    const videoRef = useRef(null);
    const currentTime = new Date().toTimeString().slice(0, 8);
    const handleScan = (data) => {
        if (data) {
            console.log('QR Code data:', data);
            // Do something with the scanned data
            const lines = data.text.split('\n');
            let membershipID;
            let membershipName;
            for (let i = 0; i < lines.length; i++) {
                if (lines[i].startsWith('Name:')) {
                    membershipName = lines[i].substring(lines[i].indexOf(':') + 1).trim();
                    break;
                }
            }
            if (membershipName) {
                setQrCodeData(membershipName);
                axios.post('http://localhost:3001/membership-attendance', {
                    accountName: membershipName,
                })
                .then(response => {
                })
                .catch(error => {
                    console.log(error);
                })
                props.onClose(false);
                props.fetchData();
            } else {
            console.log('Membership ID not found in QR code data');
            }
        }
    };
    
    const handleError = (error) => {
        console.error('QR Code scanning error:', error);
    };
    
    const startScan = () => {
        if (webcamRef.current) {
        webcamRef.current.video.play();
        }
    };
    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.focus();
          }
    }, []);
  return (
    <div className='fixed flex flex-col items-center align-middle justify-center top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-white flex flex-col items-center justify-center mx-[30px] mt-[0px] bg-[#1ca350] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            <div className='m-5'>
                <QrScanner
                onScan={handleScan}
                onError={handleError}
                className='w-[100%] rounded-md' // Adjust the style as needed
                // videoRef={videoRef}
                />
            </div>
            <p>Scanned QR Code Data: {qrCodeData} {currentTime}</p>
            {/* {qrCodeData && qrCodeData.text && (
                <div>
                {qrCodeData.text.split('\n').map((line, index) => (
                    <p key={index}>{line}</p>
                ))}
                </div>
            )} */}
        </div>
    </div>
  )
}

export default WebCamm