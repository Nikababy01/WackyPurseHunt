import React from 'react';
import productsData from '../../../helpers/data/productsData';

class ProductForm extends React.Component {
  state = {
    newProduct: {
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
    },
  }

  titleChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.title = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  imageUrlChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.imageUrl = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  productThemeIdChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.productThemeId = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  priceChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.price = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  descriptionChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.description = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  avgStarRatingChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.avgStarRating = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  colorChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.color = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  sizeChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.size = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  isActiveChange = (e) => {
    e.preventDefault();
    const tempProduct = { ...this.state.newProduct };
    tempProduct.isActive = e.target.value;
    this.setState({ newProduct: tempProduct });
  }

  saveNewProduct = (e) => {
    e.preventDefault();

    const newProduct = this.state;
    e.preventDefault();
    productsData.createNewProduct(newProduct)
      .then(() => {
        this.props.history.push('/home');
      })

      .catch((err) => console.error('unable to save new product:', err));
  }

  render() {
    const { newProduct } = this.state;

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
          value={newProduct.title}
          onChange={this.titleChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-imageUrl">Add Product Image</label>
        <input
          type="text"
          className="form-control"
          id="product-imageUrl"
          value={ this.state.newProduct.imageUrl}
          onChange={this.imageUrlChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-theme">Add Product Theme</label>
        <input
          type="text"
          className="form-control"
          id="product-theme"
          value={ this.state.newProduct.productThemeId}
          onChange={this.productThemeIdChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-price">Add Price</label>
        <input
          type="text"
          className="form-control"
          id="product-price"
          value={ this.state.newProduct.price}
          onChange={this.priceChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-description">Add Product Description</label>
        <input
          type="text"
          className="form-control"
          id="product-description"
          value={ this.state.newProduct.description}
          onChange={this.descriptionChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-starRating">Star Rating</label>
        <input
          type="text"
          className="form-control"
          id="product-starRating"
          value={ this.state.newProduct.avgStarRating}
          onChange={this.avgStarRatingChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-color">Add Product Color</label>
        <input
          type="text"
          className="form-control"
          id="product-color"
          value={ this.state.newProduct.color}
          onChange={this.colorChange}
        />
        </div>
        <div className="form-group">
        <label htmlFor="product-size">Add Product Size</label>
        <input
          type="text"
          className="form-control"
          id="product-size"
          value={ this.state.newProduct.size}
          onChange={this.sizeChange}
        />
        </div>
        <div className="form-group form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="product-isActive"
              checked={ this.state.newProduct.isActive}
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
