"use client";

import { useEffect, useState } from "react";

export default function TodoForm({ todo, onClose, onAdd }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    if (todo?._id) {
      setIsEditMode(true);
    } else {
      setIsEditMode(false);
    }
  }, [todo]);

  useEffect(() => {
    if (isEditMode && todo) {
      setTitle(todo?.title);
      setDescription(todo?.description);
    }
  }, [isEditMode]);

  const handleSubmit = async (e: Event) => {
    e.preventDefault();

    if (isEditMode) {
      // Update existing todo
      const res = await fetch(`/api/todos/${todo._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      const data = await res.json();
      onAdd(data);
    } else {
      const res = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: "pending" }),
      });

      const data = await res.json();
      onAdd(data);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background dim */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-black border p-6 rounded shadow-lg w-full max-w-md z-10">
        <h2 className="text-xl mb-4">
          {isEditMode ? "Edit Todo" : "Add New Todo"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-3 p-2 border rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            className="w-full mb-3 p-2 border rounded"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border rounded cusor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cusor-pointer"
            >
              {isEditMode ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
