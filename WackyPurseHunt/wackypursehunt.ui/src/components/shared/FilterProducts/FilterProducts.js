import React from 'react';

class FilterProducts extends React.Component {
  state = {
    theme: '',
  }

  handleChangetheme = (e) => {
    this.setState({ theme: e.target.value });
    this.props.handleChangetheme(e);
  };

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-4">
            {this.props.count} Products found
          </div>
          <div className="col-md-4">
            <label>Sort by Theme</label>
            <select className="form-control" value={this.state.theme}
            onChange={this.handleChangetheme}>
              <option value="0">Select A Theme</option>
              <option value="2">Coach</option>
              <option value="3">Michael Kors</option>
              <option value="4">Betsey Johnson</option>
              <option value="5">Unique One of A Kind</option>
            </select>
          </div>
          <div className="col-md-4">
          <label>Sort by Color</label>
            <select className="form-control" value={this.props.sortColor}
            onChange={this.handleChangesortColor}>
              <option value="">Select A Color</option>
              <option value="black">Styles in Black</option>
              <option value="red">Styles in Red</option>
              <option value="multicolored">Multi-Colored</option>
              <option value="animalprint">Animal Print</option>
            </select>
          </div>

        </div>
      </div>
    );
  }
}
export default FilterProducts;
