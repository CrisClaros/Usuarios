import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import React, { useState } from 'react'
import Axios from 'axios'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [title, setTitle] = useState('')
  const [todo, setTodo] = useState('')
  const [password, setPassword] = useState('') // Nuevo campo de contraseña

  const handleSubmit = () => {
    const todoObj = {
      title: title,
      todo: todo,
      password: password, // Agregar la contraseña al objeto de datos
    }
    console.log(todoObj)
    Axios.post('/api/newTodo', todoObj)
      .then(() => {
        alert('Todo added')
      })
  }

  return (
    <>
      <div className='container'>
        <h1>Create new User</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Email</label>
            <input type="text" className="form-control" id="title" aria-describedby="emailHelp" onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="todo" className="form-label">Credentials</label>
            <input type="text" className="form-control" id="todo" aria-describedby="emailHelp" onChange={(event) => setTodo(event.target.value)} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" onChange={(event) => setPassword(event.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </>
  )
}
