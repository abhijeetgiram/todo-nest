"use client";

import { useEffect, useState } from "react";
import TodoItem from "@/components/TodoItem";
import TodoForm from "@/components/TodoForm";
import TodoDelete from "@/components/TodoDelete";

export class Todo {
  _id!: string;
  title!: string;
  description!: string;
  status!: string;
  userEmail!: string;
  createdAt!: string;
  updatedAt!: string;
  __v!: number;
}

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState<Todo | null>(null);

  useEffect(() => {
    async function fetchTodos() {
      const res = await fetch("/api/todos");
      const data = await res.json();
      setTodos(data);
    }

    fetchTodos();
  }, []);

  // Open edit modal with selected todo
  const handleEditClick = (todo: Todo) => {
    setTodoToEdit(todo);
    setShowModal(true);
  };

  // Open delete confirmation modal
  const handleDeleteClick = (todo: Todo) => {
    setTodoToDelete(todo);
    setShowDeleteModal(true);
  };

  // Handle add or update
  const handleAddOrUpdate = async (todo: Todo) => {
    if (todoToEdit) {
      setTodos((prev) => prev.map((t) => (t?._id === todo?._id ? todo : t)));
    } else {
      setTodos((prev) => [todo, ...prev]);
    }
    setShowModal(false);
    setTodoToEdit(null);
  };

  // Handle delete confirm
  const handleDeleteConfirm = async () => {
    if (!todoToDelete) return;
    const res = await fetch(`/api/todos/${todoToDelete._id}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTodos((prev) => prev.filter((t) => t?._id !== todoToDelete?._id));
    }
    setShowDeleteModal(false);
    setTodoToDelete(null);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your TODOs</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => {
            setShowModal(true);
            setTodoToEdit(null);
          }}
        >
          + Add TODO
        </button>
      </div>

      {todos?.length === 0 ? (
        <p>No TODOs yet.</p>
      ) : (
        todos?.map((todo: Todo) => (
          <TodoItem
            key={todo?._id}
            todo={todo}
            onEdit={() => handleEditClick(todo)}
            onDelete={() => handleDeleteClick(todo)}
          />
        ))
      )}

      {showModal && (
        <TodoForm
          todo={todoToEdit}
          onClose={() => {
            setShowModal(false);
            setTodoToEdit(null);
          }}
          onAdd={handleAddOrUpdate}
        />
      )}

      {showDeleteModal && todoToDelete && (
        <TodoDelete
          todo={todoToDelete}
          onCancel={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
