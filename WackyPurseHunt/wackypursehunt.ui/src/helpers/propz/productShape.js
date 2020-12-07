import PropTypes from 'prop-types';

const productShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  productThemeId: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  dateAdded: PropTypes.number.isRequired,
  avgStarRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
});

export default productShape;
