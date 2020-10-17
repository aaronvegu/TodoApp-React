import React, { Component } from 'react';
import TodoItem from './TodoItem';
import PropTypes from 'prop-types';
// PropTypes para declarar los props de nuestro componente

class Todos extends Component {
  // En nuestro componente haremos uso de la funcion map para iterar sobre
  // cada elementos de nuestro array de props y traer su titulo

  render() {
    return this.props.todos.map((todo) => (
      <TodoItem
        key={todo.id}
        todo={todo}
        markComplete={this.props.markComplete}
        delTodo={this.props.delTodo}
      />
    ));
  }
}

// PropTypes
// Es un objeto en el cual definimos los props que el objeto debe tener
// y donde se valida el tipo de prop y si es obligatorio o no pasarle ese
// prop al objeto
Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTodo: PropTypes.func.isRequired,
};

export default Todos;
