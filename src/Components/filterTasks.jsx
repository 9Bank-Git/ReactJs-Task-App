export function filterTasks(tasks, filter) {
  return tasks.filter((task) => {
    switch (filter) {
      case 'pending':
        return !task.completed;
      case 'completed':
        return task.completed;
      default:
        return true;
    }
  });
}
