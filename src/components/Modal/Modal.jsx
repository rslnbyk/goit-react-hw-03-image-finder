import { ModalDiv, ModalImg, ModalOverlay } from './Modal.styled';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === 27) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <ModalOverlay onClick={() => this.props.closeModal()}>
        <ModalDiv>
          <ModalImg src={this.props.imageLink} alt="Fullsize" />
        </ModalDiv>
      </ModalOverlay>
    );
  }
}

Modal.propTypes = {
  imageLink: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};
