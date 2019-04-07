import Base from 'modules/common/components/Base.jsx';
import If from 'modules/common/components/If.jsx';
import React from 'react';

class BatteryStatus extends Base {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
    // static defaultProps = {};

  state = {
    charging: undefined,
    chargingTime: undefined,
    dischargingTime: undefined,
    level: undefined,
  };

  battery = undefined;

  support = !!navigator.getBattery;

  title = 'Battery Status';

  /**
   * Конструктор компонента.
   // * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  // constructor(props) {
  //   super(props);
  // }

  renderSupport() {
    const {charging, chargingTime, dischargingTime, level} = this.state;
    const levelPercent = level * 100 || undefined;
    return (
      <div>
        <div>
          <If condition={true === charging}>
            Battery is charging during {chargingTime} seconds.
          </If>
          <If condition={false === charging}>
            Battery is discharging during {dischargingTime} seconds.
          </If>
        </div>
        <div>
          Battery level is {levelPercent}%
        </div>
        <div style={{
          backgroundColor: 'lightgray',
          height: 20,
          position: 'relative',
          textAlign: 'center',
          width: 100,
        }}>
          <div style={{
            backgroundColor: 'lightgreen',
            height: 20,
            position: 'absolute',
            textAlign: 'center',
            top: 0,
            width: levelPercent || 0,
          }} />
          <div style={{
            position: 'relative',
          }}>
            {levelPercent}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Компонент примонтировался.
   * В данный момент у нас есть возможность использовать refs,
   * а следовательно это то самое место, где мы хотели бы указать установку фокуса.
   * Так же, таймауты, ajax-запросы и взаимодействие с другими библиотеками стоит обрабатывать здесь.
   * @return {undefined}
   */
  componentDidMount() {
    if (this.support) {
      navigator.getBattery().then(this.handleBattery);
    }
  }

  handleBattery = (battery) => {
    this.battery = battery;
    this.setState({
      charging: battery.charging,
      chargingTime: battery.chargingTime,
      dischargingTime: battery.chargingTime,
      level: battery.level,
    });

    battery.addEventListener('chargingchange', this.handleChargingChange);
    battery.addEventListener('chargingtimechange', this.handleChargingTimeChange);
    battery.addEventListener('dischargingtimechange', this.handleDischargingTimeChange);
    battery.addEventListener('levelchange', this.handleLevelChange);
  };

  handleChargingChange = () => {
    this.setState({
      charging: this.battery.charging,
    });
  };

  handleChargingTimeChange = () => {
    this.setState({
      chargingTime: this.battery.chargingTime,
    });
  };

  handleDischargingTimeChange = () => {
    this.setState({
      dischargingTime: this.battery.dischargingTime,
    });
  };

  handleLevelChange = () => {
    this.setState({
      level: this.battery.level,
    });
  };

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  componentWillUnmount() {
    if (this.battery) {
      this.battery.removeEventListener('chargingchange', this.handleChargingChange);
      this.battery.removeEventListener('chargingtimechange', this.handleChargingTimeChange);
      this.battery.removeEventListener('dischargingtimechange', this.handleDischargingTimeChange);
      this.battery.removeEventListener('levelchange', this.handleLevelChange);
    }
  }
}

export default BatteryStatus;
