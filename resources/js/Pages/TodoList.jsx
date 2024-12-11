import React, { useState, useEffect } from "react";
import axios from "axios";

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [editTodoId, setEditTodoId] = useState(null); // ID todo yang sedang diedit
    const [editTodoTitle, setEditTodoTitle] = useState(""); // Title todo yang sedang diedit

    // Fetch todos from API
    const fetchTodos = async () => {
        try {
            const response = await axios.get("/api/todos");
            setTodos(response.data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Add new todo
    const handleAddTodo = async () => {
        if (!newTodoTitle.trim()) {
            alert("Title is required");
            return;
        }
        try {
            const response = await axios.post("/api/todos", {
                title: newTodoTitle,
                completed: "pending",
            });
            setTodos([response.data, ...todos]);
            setNewTodoTitle("");
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // Update todo status
    const handleStatusChange = async (id, status) => {
        try {
            const response = await axios.put(`/api/todos/${id}`, {
                completed: status,
            });

            setTodos(
                todos.map((todo) => (todo.id === id ? response.data : todo))
            );

            alert("Todo status updated successfully!");
        } catch (error) {
            console.error("Error updating todo status:", error);
            alert(
                error.response?.data?.message ||
                "Failed to update status. Please try again."
            );
        }
    };

    // Delete todo
    const handleDeleteTodo = async (id) => {
        try {
            await axios.delete(`/api/todos/${id}`);
            setTodos(todos.filter((todo) => todo.id !== id));

            alert("Todo deleted successfully!");
        } catch (error) {
            console.error("Error deleting todo:", error);
            alert(
                error.response?.data?.message ||
                "Failed to delete todo. Please try again."
            );
        }
    };

    // Edit todo (initialize editing state)
    const handleEditTodo = (id, title) => {
        console.log("Editing Todo:", { id, title }); // Debugging
        setEditTodoId(id);
        setEditTodoTitle(title);
    };

    // Update todo after editing
    const handleUpdateTodo = async () => {
        if (!editTodoTitle.trim()) {
            alert("Title is required");
            return;
        }

        try {
            const response = await axios.put(`/api/todos/${editTodoId}`, {
                title: editTodoTitle,
            });

            setTodos(
                todos.map((todo) =>
                    todo.id === editTodoId ? response.data : todo
                )
            );
            setEditTodoId(null); // Reset editing state
            setEditTodoTitle("");
        } catch (error) {
            console.error("Error updating todo:", error);
            alert("Failed to update todo. Please try again.");
        }
    };

    // Fetch todos on component mount
    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <div className="p-8 min-h-screen bg-gray-100">
            <div className="bg-white max-w-4xl mx-auto rounded-lg shadow-lg p-6">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                    <h1 className="text-2xl font-semibold mb-4 sm:mb-0">
                        To Do List
                    </h1>
                    <div className="flex flex-col sm:flex-row sm:space-x-4">
                        {/* Add new todo */}
                        <div className="flex space-x-2 mb-4 sm:mb-0">
                            <input
                                type="text"
                                value={newTodoTitle}
                                onChange={(e) => setNewTodoTitle(e.target.value)}
                                placeholder="Enter new task"
                                className="flex-grow border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a3b89]"
                            />
                            <button
                                onClick={handleAddTodo}
                                className="bg-[#4a3b89] text-white px-4 py-2 rounded-lg hover:bg-[#3c2f70] transition"
                            >
                                Add
                            </button>
                        </div>
                        {/* Search todos */}
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search todos"
                            className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a3b89]"
                        />
                    </div>
                </div>

                {/* Edit Todo Form */}
                {editTodoId && (
                    <div className="mb-4">
                        <input
                            type="text"
                            value={editTodoTitle}
                            onChange={(e) => setEditTodoTitle(e.target.value)}
                            className="border border-gray-300 p-2 rounded-lg w-full"
                        />
                        <button
                            onClick={handleUpdateTodo}
                            className="mt-2 bg-[#4a3b89] text-white px-4 py-2 rounded-lg hover:bg-[#3c2f70] transition"
                        >
                            Update Todo
                        </button>
                    </div>
                )}

                {/* Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="text-left py-3 px-4">Title</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-left py-3 px-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos
                            .filter((todo) =>
                                todo.title
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                            )
                            .map((todo) => (
                                <tr
                                    key={todo.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    <td className="py-3 px-4">{todo.title}</td>
                                    <td className="py-3 px-4">
                                        <select
                                            value={todo.completed}
                                            onChange={(e) =>
                                                handleStatusChange(
                                                    todo.id,
                                                    e.target.value
                                                )
                                            }
                                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4a3b89]"
                                        >
                                            <option value="completed">
                                                Completed
                                            </option>
                                            <option value="pending">
                                                Pending
                                            </option>
                                            <option value="overdue">
                                                Overdue
                                            </option>
                                        </select>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={() =>
                                                    handleEditTodo(
                                                        todo.id,
                                                        todo.title
                                                    )
                                                }
                                                className="text-blue-600 hover:text-blue-800 transition"
                                            >
                                                ✏️ Edit
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteTodo(todo.id)
                                                }
                                                className="text-red-600 hover:text-red-800 transition"
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>

                {/* Empty state */}
                {todos.length === 0 && (
                    <p className="text-center text-gray-500 mt-6">
                        No todos found. Add a new one!
                    </p>
                )}
            </div>
        </div>
    );
};

export default TodoList;
