import React from 'react';

class Equipment extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="equipment">
        <div className="armor"></div>
        <div className="helmet"></div>
        <div className="neck"></div>
        <div className="gloves"></div>
        <div className="cape"></div>
        <div className="weapon"></div>
        <div className="special"></div>
        <div className="shield"></div>
        <div className="pants"></div>
        <div className="belt"></div>
        <div className="ring1"></div>
        <div className="ring2"></div>
        <div className="boots"></div>
        <div className="empty"></div>
        <div className="middle"></div>
      </div>
    );
  }
}

export {Equipment};
