
import React, { useState, useEffect } from "react";

const TaskForm = ({ onSubmit, editingTask, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = {
      id: editingTask ? editingTask.id : Date.now(),
      title,
      description,
      priority,
      dueDate,
      completed: editingTask ? editingTask.completed : false,
    };

    onSubmit(newTask);
    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl p-6 shadow-lg space-y-4">
      <div>
        <label className="block font-semibold mb-1">Title</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block font-semibold mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <label className="block font-semibold mb-1">Priority</label>
          <select
            className="border rounded px-3 py-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
        <div>
          <label className="block font-semibold mb-1">Due Date</label>
          <input
            type="date"
            className="border rounded px-3 py-2"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
      <div className="flex justify-end gap-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border rounded bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-black text-white rounded"
        >
          {editingTask ? "Update" : "Add"} Task
        </button>
      </div>
    </form>
  );
};

export default TaskForm;