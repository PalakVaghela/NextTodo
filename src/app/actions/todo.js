'use server'

import prisma from '@/lib/prisma'
import { getCurrentUser } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import Completed from '../dashboard/completed/page'

export async function getTodos () {
  const user = await getCurrentUser()

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  })

  return todos
}

export async function addTodo (formData) {
  const user = await getCurrentUser()

  const title = formData.get('title')
  const note = formData.get('note')

  await prisma.todo.create({
    data: {
      userId: user.id,
      title,
      note: note?.trim() || null
    }
  })
  revalidatePath('/todo')
}

export async function deleteTodo (id) {
  const user = await getCurrentUser()
  await prisma.todo.deleteMany({
    where: {
      id,
      userId: user.id
    }
  })
  revalidatePath('/todo')
}

export async function updateTodo (id, title, note) {
  const user = await getCurrentUser()
  await prisma.todo.updateMany({
    where: {
      id,
      userId: user.id
    },
    data: {
      title,
      note
    }
  })
  revalidatePath('/todo')
}

export async function togglecompletedTodo (id) {
  const todo = await prisma.todo.findUnique({
    where: { id }
  })
  console.log(todo, 'todo')
  await prisma.todo.update({
    where: { id },
    data: {
      completed: !todo.completed
    }
  })
}

export async function toggleImpTodo (id) {
  console.log('111')
  const todo = await prisma.todo.findUnique({
    where: { id }
  })
  console.log(todo, 'todo......')
  await prisma.todo.update({
    where: { id },
    data: {
      important: !todo.important
    }
  })
  revalidatePath('/todo')
}

// in our prisma we have named our table Todo so, prima will convert this table name into lower case internaly, so in prima table name will be todo. so to access the todo we have to write in lower case prisma.todo. like that.