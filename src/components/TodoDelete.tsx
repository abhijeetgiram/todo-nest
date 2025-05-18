import { Todo } from "./Todo";

interface TodoDeleteProps {
  todo: Todo;
  onClose: () => void;
  onConfirm: () => void;
}

export default function TodoDelete({
  todo,
  onClose,
  onConfirm,
}: TodoDeleteProps) {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background dim */}
      <div
        className="absolute inset-0 bg-opacity-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-black-50 border border-gray-200 p-8 rounded-2xl shadow-2xl w-full max-w-md z-10">
        <h2 className="text-xl mb-4">Delete TODO</h2>
        <p>
          Are you sure you want to delete <b>{todo.title}</b>?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => onClose()}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => onConfirm()}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
