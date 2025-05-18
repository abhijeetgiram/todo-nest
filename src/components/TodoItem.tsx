import { Todo } from "./Todo";

interface TodoItemProps {
  todo: Todo;
  onEdit: (todo: Todo) => void;
  onDelete: (todo: Todo) => void;
  onCheck: (todo: Todo) => void;
}

export default function TodoItem({
  todo,
  onEdit,
  onDelete,
  onCheck,
}: TodoItemProps) {
  if (!todo) return null;

  const isCompleted = todo.status === "completed";

  const getToDoStatus = () => {
    if (todo.status === "completed") {
      return "Completed";
    } else if (todo.status === "pending") {
      return "Pending";
    } else {
      return "In Progress";
    }
  };

  return (
    <div
      key={todo._id}
      className={`flex items-center justify-between p-4 border rounded mb-3 shadow transition hover:shadow-lg ${
        isCompleted ? "opacity-70" : ""
      } bg-black-50`}
    >
      <div className="flex items-start gap-3 w-full">
        {/* Checkbox */}
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => onCheck(todo)}
          className="accent-blue-600 w-5 h-5 mt-1 cursor-pointer"
          aria-label="Mark as completed"
        />
        <div className="flex-1">
          <h3
            className={`font-semibold text-lg ${
              isCompleted ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.title}
          </h3>
          <p className={isCompleted ? "line-through text-gray-400" : ""}>
            {todo.description}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Status:{" "}
            <span
              className={`font-medium ${
                isCompleted ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {getToDoStatus()}
            </span>
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-2 ml-4">
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
          onClick={() => onEdit(todo)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
          onClick={() => onDelete(todo)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
