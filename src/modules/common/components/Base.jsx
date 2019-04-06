import React from 'react';

class Base extends React.Component {
  support = true;

  title = 'Base';

  /**
   * Вывести компонент.
   * @return {*} Представление.
   */
  render() {
    return (
      <div>
        <h1>{this.title}</h1>
        {this.renderBody()}
      </div>
    );
  }

  renderBody() {
    if (this.support) {
      return this.renderSupport();
    }

    return this.renderNotSupport();
  }

  renderSupport() {
    return (
      <div>
        {this.title} is supported. )
      </div>
    );
  }

  renderNotSupport() {
    return (
      <div>
        {this.title} is not supported. (
      </div>
    );
  }
}

export default Base;
