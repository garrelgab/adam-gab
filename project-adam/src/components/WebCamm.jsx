import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam';
import { AiOutlineClose } from 'react-icons/ai'
import QrReader from 'react-qr-reader';
import QrScanner from 'react-qr-scanner';
const WebCamm = (props) => {

    const webcamRef = useRef(null);
    const [qrCodeData, setQrCodeData] = useState('');

    const handleScan = (data) => {
    if (data) {
        console.log('QR Code data:', data);
        // Do something with the scanned data
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
  return (
    <div className='fixed flex flex-col items-center align-middle justify-center top-0 left-0 w-[100%] h-[100%] bg-modal z-50'>
        <div className='text-white flex flex-col items-center justify-center mt-[0px] bg-[#1ca350] rounded-md shadow-xl'>
            <button className='ml-[90%] mt-[5%]' onClick={props.onClose}>
                <AiOutlineClose size={25}/>
            </button>
            {/* <Webcam
                ref={webcamRef}
                mirrored={true} // (Optional) Set to true if you want the video to be mirrored
                // style={{ width: '100%', height: 'auto' }} // Adjust the style as needed
                className='w-[90%] py-4 rounded-md'
            /> */}
            <QrScanner
            onScan={handleScan}
            onError={handleError}
            style={{ width: '100%' }} // Adjust the style as needed
            />

<p>Scanned QR Code Data: {qrCodeData}</p>
        </div>
    </div>
  )
}

export default WebCamm