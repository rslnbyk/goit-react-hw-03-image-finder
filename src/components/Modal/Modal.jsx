import { ModalDiv, ModalImg, ModalOverlay } from './Modal.styled';
import PropTypes from 'prop-types';

export const Modal = ({ imageLink, closeModal }) => {
  return (
    <ModalOverlay onClick={() => closeModal()}>
      <ModalDiv>
        <ModalImg src={imageLink} alt="Fullsize" />
      </ModalDiv>
    </ModalOverlay>
  );
};

Modal.propTypes = {
  imageLink: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
