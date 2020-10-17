import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Todos from './components/Todos';
import Header from './components/layout/Header';
import AddTodo from './components/AddTodo';
import About from './components/pages/About';
// import { v4 as uuid } from 'uuid';
import Axios from 'axios';

import './App.css';

class App extends Component {
  // Estados de nuestro componente, mediante un objeto de js
  state = {
    todos: [],
  };

  // Clase del Lifecycle. La primera vez que se recargue la pagina haremos una solicitud get a
  // JSONPlaceholder para usarlo como un servicio de backend y traer 13 todo items mediante una
  // promesa, y la seteamos en nuestro objeto de estados
  componentDidMount() {
    Axios.get(
      'https://jsonplaceholder.typicode.com/todos?_limit=13'
    ).then((r) => this.setState({ todos: r.data }));
  }

  // Recibimos el id del item que fue presionado desde TodoItem, que hemos
  // bindeado desde TodoItem y que estuvimos escalando a traves de los props
  // hasta aqui: App.js
  markComplete = (id) => {
    this.setState({
      todos: this.state.todos.map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      }),
    });
  };
  /**
   * markComplete:
   * Lo que estamos haciendo es cambiar o setear el estado de nuestro componente
   * cada que hay un clic en nuestro checkbox del componente TodoItem, del cual
   * escalamos su id hasta este componente para saber a que ToDo cambiarle el estado.
   * Primero mapeamos nuestros todos, para aplicar una condicional sobre cada todo y
   * verificar el valor del id de cada uno de los todos, y cuando el id de uno coincida
   * con el id que hemos recibido como senial de cambio desde TodoItem, lo que hacemos
   * es cambiar su valor complete (todo.complete) al contrario del que tiene (!todo.complete)
   * y luego regresamos justamente regresamos ese estado que coincidio como return de nuestra
   * funcion map, que es justamente el valor seteado para nuestro todo dentro de la funcion
   * setState( )
   */

  //Delete Todo function
  // Traemos el id del TodoItem presionado desde el componente TodoItem
  // Hacemos uso de la libreria axios para realizar un HTTP Request de tipo delete,
  // para mandar una solicitud al backend y eliminar el todo con el id mandado en la URI
  // Esto se realiza mediante una promesa, por lo tanto, de llevarse a cabo exitosamente,
  // seteamos el state obteniendo todos los states y aplicando una funcion filter donde
  // nos traiga todos los id de los todo cuando sean distintos al id pasado como parametro
  delTodo = (id) => {
    Axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`).then((r) =>
      this.setState({
        todos: [...this.state.todos.filter((todo) => todo.id !== id)],
      })
    );
  };
  /**
   * delTodo:
   * Vamos a cambiar o setear el estado de nuestro componente, trabajando nuestro array todos
   * donde traeremos todos los todos menos aquel que coincida con el id traido desde TodoItem.
   * Esto lo logramos con un metodo filter, donde nos va a traer todos los elementos del array
   * que sean distintos al array traido. Por eso hacemos que todos sea el nuevo arreglo donde
   * agregamos todos los todos con nuestro spread operatos pero aplicandoles el metodo filter
   * que nos filtrara el arreglo trayendo aquellos que no coinciden con el id traido.
   */

  // Add Todo
  /**
   * Hacemos un setState donde le setearemos todos los estados ya existentes con nuestro spread op
   * y le agregaremos un nuevo estado que crearemos anteriormente en la variable newTodo y la agregamos
   * al arreglo de estados. El title lo tomamos desde el propio prop que lo recibe como parametro.
   *
   * Haciendo uso de HTTP Request a nuestro back con axios, realizamos una solicitud post para editar el back
   * y agregar un nuevo todo con el titulo obtenido como parametro y el valor completed en false. El id lo asigna
   * por defecto nuestro back, y una vez que hemos agregago el todo al back, nos traemos la respuesta del back
   * y usamos su propiedad data para setear los estados de nuevo en nuestro front y mostrarlo al usuario
   */
  addTodo = (title) => {
    Axios.post('https://jsonplaceholder.typicode.com/todos', {
      title: title,
      completed: false,
    }).then((r) => this.setState({ todos: [...this.state.todos, r.data] }));
  };

  // Le pasamos a nuestro componente Todos los estados mediante props
  render() {
    return (
      <Router>
        <div className='App'>
          <div className='container'>
            <Header />
            <Route
              exact
              path='/'
              render={(props) => (
                <React.Fragment>
                  <AddTodo addTodo={this.addTodo} />
                  <Todos
                    todos={this.state.todos}
                    markComplete={this.markComplete}
                    delTodo={this.delTodo}
                  />
                </React.Fragment>
              )}
            />
            <Route path='/about' component={About} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
