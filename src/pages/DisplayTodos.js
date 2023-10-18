import React, { useState } from 'react';
import Axios from 'axios';
import { prisma } from "@prisma/client";

export async function getStaticProps() {
  const { PrismaClient } = require('@prisma/client');
  const prisma = new PrismaClient();

  const todos = await prisma.todo.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });

  return {
    props: {
      todos: JSON.parse(JSON.stringify(todos)),
    },
  };
}

const DisplayTodos = ({ todos }) => {
  const [visibility, setVisibility] = useState(false);
  const [title, setTitle] = useState('');
  const [todo, setTodo] = useState('');
  const [password, setPassword] = useState(''); // Nuevo campo de contraseña
  const [todoId, setTodoId] = useState('');

  const editForm = (title, todo, todoId) => {
    setVisibility(!visibility);
    setTitle(title);
    setTodo(todo);
    setTodoId(todoId);
  };

  const updateTodo = async (todoId) => {
    const todoObj = {
      title: title,
      todo: todo,
      password: password, // Agregar la contraseña al objeto de datos
    };
    console.log(todoObj);
    await Axios.put(`/api/updateTodo?id=${todoId}`, todoObj).then(() => {
      window.location.reload(false);
    });
  };

  const deleteTodo = (todoId) => {
    Axios.delete(`/api/deleteTodo?id=${todoId}`).then(() => {
      window.location.reload(false);
    });
  };

  return (
    <>
      <div className="container">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name or Email</th>
              <th scope="col">Credentials</th>
              <th scope="col">Password</th> {/* Nuevo encabezado para la contraseña */}
              <th scope="col">Options</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.title}</td>
                  <td>{element.todo}</td>
                  <td>{element.password}</td> {/* Nuevo campo para mostrar la contraseña */}
                  <td>
                    <button className="btn btn-danger" onClick={() => deleteTodo(element.id)}>Delete</button>
                    <button className="btn btn-primary" onClick={() => editForm(element.title, element.todo, element.id)}>Edit</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {visibility && (
        <div className="container">
          <h1>Update User</h1>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Name or Email</label>
              <input
                type="text"
                className="form-control"
                id="title"
                aria-describedby="emailHelp"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="todo" className="form-label">Credentials</label>
              <input
                type="text"
                className="form-control"
                id="todo"
                value={todo}
                aria-describedby="emailHelp"
                onChange={(event) => setTodo(event.target.value)}
              />
            </div>
            <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input
      type="password"
      className="form-control"
      id="password"
      onChange={(event) => setPassword(event.target.value)}
    />
  </div>
            <button type="submit" className="btn btn-primary" onClick={() => updateTodo(todoId)}>Submit</button>
            <button className="btn btn-danger" onClick={() => setVisibility(!visibility)}>Cancel</button>
          </form>
        </div>
      )}
    </>
  );
};

export default DisplayTodos;
