import { ButtonLoad } from './Button.styled';
import PropTypes from 'prop-types';

export const Button = ({ onLoadMore }) => {
  return (
    <ButtonLoad type="button" onClick={onLoadMore}>
      Load more
    </ButtonLoad>
  );
};

Button.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
};
