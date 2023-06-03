import Modal from '@mui/material/Modal';
import React, { useEffect, useState } from 'react';

const ImageModal = ({ open, onClose, imageData }) => {
  const [base64Image, setBase64Image] = useState('');

  useEffect(() => {
    if (imageData) {
      setBase64Image(imageData);
      // console.log(imageData);
    } else {
      setBase64Image('');
    }
  }, [imageData]);
  return (
    <Modal open={open} onClose={onClose}>
      <div className='flex justify-center items-center h-[100%]' onClick={onClose}>
        {base64Image ? (
          <img
            src={base64Image}
            alt="Image Modal"
            // style={{ width: '40%', height: 'auto'}}
            className='w-[40%] h-auto rounded-md'
          />
        ) : <h1>No Image</h1>}
      </div>
    </Modal>
  );
};

export default ImageModal;
