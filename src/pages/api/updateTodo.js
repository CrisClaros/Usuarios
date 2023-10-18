import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'PUT') {
    return res.status(405).end();
  }

  const { id } = req.query;
  const { title, todo, password } = req.body;

  try {
    // No es necesario conectar explícitamente con Prisma, ya que Prisma administra la conexión automáticamente.

    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id, 10) },
      data: {
        title: title,
        todo: todo,
        password: password, // Agrega la actualización del campo password
      },
    });

    console.log(updatedTodo);

    res.status(200).json(updatedTodo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'No se pudo actualizar' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
