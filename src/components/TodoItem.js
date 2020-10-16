import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {
  // Function que nos da estilos a nuestro TodoItem y que dependiendo
  // de si el estado complete = true, nos agrega un line-through como
  // text decoration y ninguna decoracion en caso de ser negativo
  getStyle = () => {
    /** Forma larga:
    if (this.props.todo.completed) {
      return {
        textDecoration: 'line-through',
      };
    } else {
      return {
        textDecoration: 'none',
      };
    }
     */
    return {
      background: '#f4f4f4',
      padding: '10px',
      borderBottom: '1px #ccc dotted',
      textDecoration: this.props.todo.completed ? 'line-through' : 'none',
    };
  };

  render() {
    // Deestructuramos nuestro props.todo para ya no tener que pasar por
    // para acceder a los valores de los props
    const { id, title } = this.props.todo;

    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type='checkbox'
            onChange={this.props.markComplete.bind(this, id)}
          />{' '}
          {title}
          <button onClick={this.props.delTodo.bind(this, id)} style={btnStyle}>
            X
          </button>
        </p>
      </div>
    );
  }
}
// Con el bind dentro de nuestro onChange, lo que hacemos es bindear o pegar
// los valores de nuestro objeto TodoItem a traves de los props y ademas el
// id del Item que esta siendo presionado, para subirlo o treparlo hasta App.js

// Declaramos sus PropTypes
TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
};

// En JSX podemos definir estilos mediante una variable, una funcion o de manera lineal
// y directa en el atributo style del elemento. En este caso definiremos sus estilos mediante
// una variable btnStyle que contiene todos los estilos que queremos aplicar
const btnStyle = {
  backgroundColor: '#D7395E',
  color: '#fff',
  border: 'none',
  padding: '5px 9px',
  borderRadius: '50%',
  cursor: 'pointer',
  float: 'right',
};

export default TodoItem;
