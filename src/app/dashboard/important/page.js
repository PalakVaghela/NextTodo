import TodoApp from "@/app/components/TodoApp";
import prisma from "@/lib/prisma";

export default async function ImpTodos() {

  const imptodos = await prisma.todo.findMany({
    where: { important: true}
  })

  return <TodoApp initialTodos={ imptodos } filterType="important"/>
}
