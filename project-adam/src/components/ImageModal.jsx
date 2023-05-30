import Modal from '@mui/material/Modal';


// import React from 'react'

// const ImageModal = () => {
//   return (
//     <div>ImageModal</div>
//   )
// }

const ImageModal = ({ open, onClose, imageData }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <div>
        {imageData && (
          <img
            src={`data:image/png;base64,${imageData}`}
            alt="Proof of Payment"
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
    </Modal>
  );
}

export default ImageModal

