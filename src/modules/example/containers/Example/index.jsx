import ExampleList from 'modules/example/components/ExampleList/index.jsx';
import {exampleActionListGet} from 'modules/example/ducks/index.js';
import {exampleSelectorList} from 'modules/example/selectors/index.js';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {compose} from 'redux';

class Example extends React.Component {
  /**
   * Значения свойств по-умолчанию.
   * https://facebook.github.io/react/docs/typechecking-with-proptypes.html
   */
  static defaultProps = {
    exampleList: [],
  };

  /**
   * Конструктор компонента.
   * @param {*} props Свойства переданые в компонент.
   * @return {undefined}
   */
  constructor(props) {
    super(props);
    props.exampleActionListGet();
  }

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div>
        <ExampleList list={this.props.exampleList} />
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
  // componentDidMount() {}

  /**
   * Должен ли компонент обновиться?
   * На самом деле, обычно реакт сам отлично разбирается.
   * Но иногда ручное управление позволяет существенно ускорить работу в "узких местах".
   * @param {*} props Новые свойства.
   * @param {*} state Новое состояние.
   * @return {boolean} Должен ли компонент обновиться?
   */
  // shouldComponentUpdate(props, state) {}

  /**
   * Вызывается сразу после render.
   * Не вызывается в момент первого render'а компонента.
   * @param {*} props Предыдущие свойства.
   * @param {*} state Предыдущее состояние.
   * @return {undefined}
   */
  // componentDidUpdate(props, state) {}

  /**
   * Вызывается сразу перед тем, как компонент будет удален из DOM.
   * @return {undefined}
   */
  // componentWillUnmount() {}
}

export default compose(
  withRouter,
  connect(
    (state) => ({
      exampleList: exampleSelectorList(state),
    }),
    {
      exampleActionListGet,
    }
  )
)(Example);
