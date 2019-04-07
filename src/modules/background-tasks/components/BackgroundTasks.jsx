import Base from 'modules/common/components/Base.jsx';
import React from 'react';

class BackgroundTasks extends Base {
  support = !!window.requestIdleCallback;

  timeout = 3000;

  title = 'Background Tasks';

  state = {
    debug: [],
    list: new Array(10).fill(0),
    result: [],
  };

  renderSupport() {
    const {debug, list, result} = this.state;
    return (
      <div>
        <pre>list: {JSON.stringify(list, undefined, 2)}</pre>
        <pre>result: {JSON.stringify(result, undefined, 2)}</pre>
        <pre>debug: {JSON.stringify(debug, undefined, 2)}</pre>
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
    requestIdleCallback(this.backgroundTask);
  }

  backgroundTask = (deadline) => {
    this.setState((state) => ({
      ...state,
      debug: [
        ...state.debug,
        {
          didTimeout: deadline.didTimeout,
          timeRemaining: deadline.timeRemaining(),
        },
      ],
    }));

    if (0 < deadline.timeRemaining() && 0 < this.state.list.length) {
      const [item, ...list] = this.state.list;
      this.process(item);
      this.setState({list});
    }
  };

  process(item) {
    this.setState((state) => ({
      ...state,
      result: [
        ...state.result,
        item,
      ],
    }));
  }

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props Предыдущие свойства.
   * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  componentDidUpdate(props, state) {
    if (0 < this.state.list.length) {
      requestIdleCallback(this.backgroundTask);
    }
  }
}

export default BackgroundTasks;
