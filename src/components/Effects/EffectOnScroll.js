import React, { PropTypes } from 'react';
import ScrollMagic from 'scrollmagic';
import CSSModules from 'react-css-modules';
import styles from './EffectOnScroll.css';
import classNames from 'classnames';

const useProps = {
  fade: 'fade',
};

class EffectOnScroll extends React.PureComponent {
  constructor(props) {
    super(props);

    this.initializeScene = this.initializeScene.bind(this);
  }
  componentWillMount() {
    this.controller = new ScrollMagic.Controller();
  }
  componentDidMount() {
    this.initializeScene();

    window.addEventListener('resize', this.handleResize);
  }
  initializeScene() {
    const { use } = this.props;
    if (!this.triggerElement || !this.targetElement) {
      return;
    }

    const effectClass = classNames({
      'effect-fade': use === useProps.fade,
    });

    this.scene = new ScrollMagic.Scene({
      duration: this.getDuration(),
      offset: 0,
      triggerHook: 0.6,
    })
      .setClassToggle(this.targetElement, effectClass)
      .addTo(this.controller)
      .triggerElement(this.triggerElement);
  }
  handleResize() {
    if (!this.scene) return;
    this.scene.duration(this.getDuration());
  }
  getDuration() {
    return this.targetElement.clientHeight;
  }
  setTargetElementRef(element) {
    this.targetElement = element;
  }
  setTriggerElementRef(element) {
    this.triggerElement = element;
  }
  componentWillUnmount() {
    this.scene.destroy(true);
    this.scene = null;
  }
  render() {
    return (
      <div styleName="wrapper" ref={this.setTriggerElementRef.bind(this)}>
        <div
          styleName="wrapper"
          className={this.props.className}
          ref={this.setTargetElementRef.bind(this)}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

EffectOnScroll.propTypes = {
  use: PropTypes.oneOf(Object.keys(useProps)).isRequired,
};

export default CSSModules(EffectOnScroll, styles);
