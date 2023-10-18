import { PrismaClient } from '@prisma/client';
import React, { useState } from 'react';
import Axios from 'axios';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {
    const { title, todo, password } = req.body; // Agrega password aquí

    // No es necesario conectar explícitamente con Prisma, ya que Prisma administra la conexión automáticamente.

    const newTodo = await prisma.todo.create({
      data: {
        title: title,
        todo: todo,
        password: password,
      },
    });

    console.log(newTodo);

    res.status(200).json(newTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
