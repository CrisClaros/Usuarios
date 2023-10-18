import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function handler(req, res) {
  if (req.method !== 'DELETE') {
    return res.status(405).end();
  }

  const { id } = req.query;

  try {
    // No es necesario conectar explícitamente con Prisma, ya que Prisma administra la conexión automáticamente.

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: parseInt(id, 10),
      },
    });

    if (deletedTodo) {
      console.log('Registro eliminado:', deletedTodo);
      res.status(200).end();
    } else {
      res.status(404).json({ error: 'Registro no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error interno' });
  } finally {
    await prisma.$disconnect(); // Cierra la conexión con la base de datos después de la operación.
  }
}

export default handler;
