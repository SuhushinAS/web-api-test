import Base from 'modules/common/components/Base.jsx';
import React from 'react';

class AmbientLight extends Base {
  state = {
    value: 0,
  };

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    window.addEventListener('devicelight', this.handleDeviceLight);
  }

  handleDeviceLight = (e) => {
    this.setState({
      value: e.value,
    });
  };

  renderSupport() {
    return (
      <div>
        value: {this.state.value}
      </div>
    );
  }

  support = !!window.ondevicelight;

  title = 'AmbientLight';

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    window.removeEventListener('devicelight', this.handleDeviceLight);
  }
}

export default AmbientLight;
