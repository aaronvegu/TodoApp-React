import React, { Component } from 'react';

export class AddTodo extends Component {
  state = {
    title: '',
  };

  /**
   * Enviamos el valor del input text a nuestro setState mediante el evento, y hacemos
   * que el valor del input sea igual al estado que acabamos de setear
   */
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // Enviamos el valor de nuestro form mediante una prop al componente App.js
  onSubmit = (e) => {
    // Evitamos que el evento sea enviado o ejecutado para no recargar la pagina
    e.preventDefault();
    // Mandamos nuestro state title mediante nuestro prop addTodo
    this.props.addTodo(this.state.title);
    // Y limpiamos nuestro estado para borrar la info seteado previamente mediente onChange()
    this.setState({title: ''});
  }

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: 'flex' }}>
        <input
          type='text'
          name='title'
          placeholder='Add Taks'
          style={{ flex: '10', padding: '5px' }}
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type='submit'
          value='submit'
          className='btn'
          style={{ flex: '1' }}
        />
      </form>
    );
  }
}

export default AddTodo;
