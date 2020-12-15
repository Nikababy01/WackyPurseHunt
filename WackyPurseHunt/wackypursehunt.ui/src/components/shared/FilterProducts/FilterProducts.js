import React from 'react';

class FilterProducts extends React.Component {
  state = {
    theme: '',
    sortColor: '',
    sortSize: '',
  }

  handleChangetheme = (e) => {
    this.setState({ theme: e.target.value });
    this.props.handleChangetheme(e);
  };

  handleChangesortColor = (e) => {
    this.setState({ sortColor: e.target.value });
    this.props.handleChangesortColor(e);
  };

  handleChangesortSize = (e) => {
    this.setState({ sortSize: e.target.value });
    this.props.handleChangesortSize(e);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-3">
            {this.props.count} Products found
          </div>
          <div className="col-md-3">
            <label>Sort by Theme</label>
            <select className="form-control" value={this.state.theme}
            onChange={this.handleChangetheme}>
              <option value="">Select A Theme</option>
              <option value="2">Coach</option>
              <option value="3">Michael Kors</option>
              <option value="4">Betsey Johnson</option>
              <option value="5">Unique One of A Kind</option>
            </select>
          </div>
          <div className="col-md-3">
          <label>Sort by Color</label>
            <select className="form-control" value={this.props.sortColor}
            onChange={this.handleChangesortColor}>
              <option value="">Select A Color</option>
              <option value="black">Styles in Black</option>
              <option value="red">Styles in Red</option>
              <option value="multi-colored">Multi-Colored</option>
              <option value="animal print">Animal Print</option>
              <option value="gold">Styles in Gold</option>
            </select>
          </div>
          <div className="col-md-3">
          <label>Sort by Size</label>
            <select className="form-control" value={this.props.sortSize}
            onChange={this.handleChangesortSize}>
              <option value="">Select by Size</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}
export default FilterProducts;
