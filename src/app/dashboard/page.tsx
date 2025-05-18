"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";

import TodoItem from "@/components/TodoItem";
import TodoForm from "@/components/TodoForm";
import TodoDelete from "@/components/TodoDelete";
import { Todo } from "./Todo";

export default function DashboardPage() {
  const { data: session, status } = useSession();
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

  // Handle checkbox click
  const handleOnCheck = async (todo: Todo) => {
    const updatedTodo = {
      ...todo,
      status: todo.status === "completed" ? "pending" : "completed",
    };
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTodo),
    });
    if (res.ok) {
      setTodos((prev) =>
        prev.map((t) => (t._id === todo._id ? updatedTodo : t))
      );
    }
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

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-4">Please sign in</h1>
        <p className="text-gray-600 mb-4">
          You need to be signed in to view this page.
        </p>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Sign In
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {/* Header */}
      <header className="w-full flex justify-between items-center px-6 py-4 border-b bg-white shadow-sm mb-6">
        <div className="flex items-center gap-4">
          {status === "authenticated" && session?.user?.name && (
            <span className="text-gray-700 font-medium">
              Hello, {session.user.name}
            </span>
          )}
        </div>
        {status === "authenticated" ? (
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
          >
            Sign Out
          </button>
        ) : (
          <div />
        )}
      </header>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your TODOs</h1>
        {session && status === "authenticated" && (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {
              setShowModal(true);
              setTodoToEdit(null);
            }}
          >
            + Add TODO
          </button>
        )}
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
            onCheck={() => handleOnCheck(todo)}
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
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
