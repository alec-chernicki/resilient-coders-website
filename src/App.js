import './App.scss';
import React, { PropTypes } from 'react';
import Navigation from './components/Navigation/Navigation';
import Footer from './components/Footer/Footer';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import objectFitImages from 'object-fit-images';

class App extends React.Component {
  componentDidMount() {
    objectFitImages();
  }
  render() {
    const { children, location } = this.props;
    return (
      <div className="app">
        <Navigation />

        {React.cloneElement(children, { key: location.pathname })}
        <Footer />
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
