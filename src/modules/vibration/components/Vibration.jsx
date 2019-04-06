import Base from 'modules/common/components/Base.jsx';
import React from 'react';

class Vibration extends Base {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    duration: 200,
    interval: 400,
  };

  timeout = null;

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    this.tick = this.start.bind(this);
  }

  handleStart = () => {
    this.start();
  };

  handleStop = () => {
    this.stop();
  };

  renderSupport() {
    return (
      <div>
        <button onClick={this.handleStart}>Start</button>
        {' '}
        <button onClick={this.handleStop}>Stop</button>
      </div>
    );
  }

  support = !!navigator.vibrate;

  title = 'Vibration';

  start() {
    this.stop();
    this.process();
    this.timeout = setTimeout(this.tick, this.props.interval);
  }

  stop() {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  process() {
    navigator.vibrate(this.props.duration);
  }

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    this.stop();
  }
}

export default Vibration;
