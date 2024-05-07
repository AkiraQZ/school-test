import {useState} from 'react';
import Modal from 'react-modal';
import BaseButton from './BaseButton';
import MinimalButton from './MinimalButton';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default function BaseModal({children}) {
  const [modalIsOpen, setIsOpen] = useState(true);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div style={{textAlign: 'end'}}>
      <MinimalButton onClick={openModal}>Инструкция по выполнению</MinimalButton>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        {children}
        <BaseButton onClick={closeModal}>Закрыть</BaseButton>
      </Modal>
    </div>
  );
}