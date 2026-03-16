import prisma from "@/lib/prisma";
import TodoApp from "@/app/components/TodoApp";


export default async function complatedTodos() {
  const completed = await prisma.todo.findMany({
    where: { completed: true },
  });

  return <TodoApp initialTodos={ completed } filterType="completed"/>
}
