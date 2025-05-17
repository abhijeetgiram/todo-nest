export default function TodoDelete({ todo, onCancel, onConfirm }) {
  if (!todo) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={() => onCancel()}
      ></div>
      <div className="relative bg-black border p-6 rounded shadow-lg z-10">
        <h2 className="text-xl mb-4">Delete TODO</h2>
        <p>
          Are you sure you want to delete <b>{todo.title}</b>?
        </p>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => onCancel()}
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
