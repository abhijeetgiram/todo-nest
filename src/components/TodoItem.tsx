import { Todo } from "./Todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
}

export default function TodoItem({ todo, onEdit, onDelete }: TodoItemProps) {
  if (!todo) return null;

  return (
    <div key={todo?._id} className="p-4 border rounded mb-3 shadow">
      <div>
        <h3 className="font-semibold">{todo?.title}</h3>
        <p>{todo?.description}</p>
        <p className="text-sm text-gray-500">Status: {todo?.status}</p>
      </div>
      <div className="flex justify-end mt-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 ml-2"
          onClick={() => onDelete(todo)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
