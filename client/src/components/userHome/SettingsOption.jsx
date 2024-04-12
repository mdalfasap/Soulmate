import React, { useState } from 'react'
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom'

function SettingsOption() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const linkStyles = {
    cursor: 'pointer',
    fontSize: '1.25vw',
    padding: '0',
    maxWidth: '100%',
  };

  const logout = () => {
    setModalIsOpen(true);
  };

  const confirmLogout = () => {
    setModalIsOpen(false);
    localStorage.removeItem('token')
    navigate('/');
  };

  const cancelLogout = () => {
 
    setModalIsOpen(false);
  };

  return (
    <div className='ms-5 text-light' >
  <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999, // Set a high zIndex value
          },
          content: {
            width: "300px",
            margin: "auto",
            textAlign: "center",
            paddingTop: "20px",
            borderRadius: "8px",
            border:'2px solid red',
            color:'black',
            maxHeight:'25vh'
          },
        }}
      >
        <p className=' pb-2 '>Are you sure you want to logout?</p>
        <button className=' p-2 ps-4 pe-4' onClick={confirmLogout}>Yes</button>
        <button className='ms-3 p-2 ps-4 pe-4' onClick={cancelLogout}>No</button>
      </Modal>
      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Pause my profile
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Push notification
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Activity Log
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Verify Account
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Privacy and security
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Help center
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Privacy policy
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Terms of service
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Cookies policy
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Unsubscribe
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Have a code?
      </motion.p>

      <motion.p
        className='mt-3'
        style={{ ...linkStyles, color: 'red' }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
        onClick={logout}
      >
        Logout
      </motion.p>

      <motion.p
        className='mt-3 '
        style={{ ...linkStyles }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.3 }}
      >
        Delete my account
      </motion.p>

    </div>
  )
}

export default SettingsOption