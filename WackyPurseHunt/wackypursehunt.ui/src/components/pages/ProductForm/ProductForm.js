import React from 'react';
import productsData from '../../../helpers/data/productsData';

class ProductForm extends React.Component {
  state = {
    title: '',
    imageUrl: '',
    productThemeId: '',
    price: '',
    description: '',
    dateAdded: new Date(),
    avgStarRating: '',
    color: '',
    size: '',
    isActive: '',
  }

  titleChange = (e) => {
    e.preventDefault();
    this.setState({ title: e.target.value });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    this.setState({ imageUrl: e.target.value });
  }

  productThemeIdChange = (e) => {
    e.preventDefault();
    this.setState({ productThemeId: e.target.value });
  }

  priceChange = (e) => {
    e.preventDefault();
    this.setState({ price: e.target.value });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    this.setState({ description: e.target.value });
  }

  avgStarRatingChange = (e) => {
    e.preventDefault();
    this.setState({ avgStarRating: e.target.value });
  }

  colorChange = (e) => {
    e.preventDefault();
    this.setState({ color: e.target.value });
  }

  sizeChange = (e) => {
    e.preventDefault();
    this.setState({ size: e.target.value });
  }

  isActiveChange = (e) => {
    e.preventDefault();
    this.setState({ isActive: e.target.checked });
  }

  saveNewProduct = (e) => {
    e.preventDefault();
    const {
      title,
      imageUrl,
      productThemeId,
      price,
      description,
      dateAdded,
      avgStarRating,
      color,
      size,
      isActive,
    } = this.state;
    const newProduct = {
      title,
      imageUrl,
      productThemeId,
      price,
      description,
      dateAdded: this.state.dateAdded,
      avgStarRating,
      color,
      size,
      isActive,
    };
    productsData.createNewProduct(newProduct)
      .then(() => this.props.history.push('/home'))
      .catch((err) => console.error('unable to save new product:', err));
  }

  render() {
    const {
      title,
      imageUrl,
      productThemeId,
      price,
      description,
      dateAdded,
      avgStarRating,
      color,
      size,
      isActive,
    } = this.state;
    return (
      <div className="ProductForm col-12">
      <h1>Add New Product</h1>
    <form className="col-6 offset-3 text-left">
      <div className="form-group">
        <label htmlFor="product-title">Title</label>
        <input
          type="text"
          className="form-control"
          id="product-title"
          value={title}
          onChange={this.titleChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-imageUrl">Add Product Image</label>
        <input
          type="text"
          className="form-control"
          id="product-imageUrl"
          value={imageUrl}
          onChange={this.imageUrlChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-theme">Add Product Theme</label>
        <input
          type="text"
          className="form-control"
          id="product-theme"
          value={productThemeId}
          onChange={this.productThemeIdChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-price">Add Price</label>
        <input
          type="text"
          className="form-control"
          id="product-price"
          value={price}
          onChange={this.priceChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-description">Add Product Description</label>
        <input
          type="text"
          className="form-control"
          id="product-description"
          value={description}
          onChange={this.descriptionChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-starRating">Star Rating</label>
        <input
          type="text"
          className="form-control"
          id="product-starRating"
          value={avgStarRating}
          onChange={this.avgStarRatingChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-color">Add Product Color</label>
        <input
          type="text"
          className="form-control"
          id="product-color"
          value={color}
          onChange={this.colorChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-size">Add Product Size</label>
        <input
          type="text"
          className="form-control"
          id="product-size"
          value={size}
          onChange={this.sizeChange}
        />
        </div>
        <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="product-isActive"
              checked={isActive}
              onChange={this.isActiveChange}
              />
              <label className="form-check-label" htmlFor="product-active">Is this Product Active?</label>
              </div>
         <button className="btn btn-primary" onClick={this.saveNewProduct}>Save Product</button>
            </form>
          </div>
    );
  }
}
export default ProductForm;
