import React from "react";

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path>
  </svg>
);

const EditIcon = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
);

const TaskItem = ({ task, updateTask, deleteTask }) => {
  const handleComplete = () => {
    updateTask({ ...task, completed: !task.completed });
  };

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleEdit = () => {
    const event = new CustomEvent("editTask", { detail: task });
    window.dispatchEvent(event);
  };

  return (
    <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-md flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 sm:gap-6 mb-5 transition-transform duration-200 hover:shadow-xl hover:-translate-y-1">
      {/* Left Side */}
      <div className="flex items-start gap-4">
        <button
          onClick={handleComplete}
          aria-label={task.completed ? "Mark task as incomplete" : "Mark task as complete"}
          className={`w-7 h-7 flex-shrink-0 flex items-center justify-center rounded-full border-2 transition-colors duration-300 ${
            task.completed ? "bg-green-600 border-green-600" : "border-gray-400 hover:border-green-600"
          }`}
        >
          {task.completed && <CheckIcon />}
        </button>
        <div className="min-w-0">
          <h3 className={`text-base sm:text-lg font-semibold break-words ${task.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
            {task.title}
          </h3>
          <p className={`mt-1 text-sm leading-relaxed break-words ${task.completed ? "line-through text-gray-400" : "text-gray-700"}`}>
            {task.description}
          </p>
          <p className="mt-2 text-xs text-gray-500 italic">Due {task.dueDate}</p>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex flex-col sm:items-end w-full sm:w-auto">
        {/* For mobile: horizontal layout, For desktop: vertical layout */}
        <div className="flex flex-col sm:flex-col gap-2 sm:gap-3 mt-2 sm:mt-0">
          {/* Mobile (flex-row) | Desktop (flex-col) wrapper */}
          <div className="flex flex-row sm:flex-col items-center justify-between sm:items-end gap-2 flex-wrap sm:flex-nowrap">
            {/* Priority Badge */}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                task.priority === "High"
                  ? "bg-red-100 text-red-700"
                  : task.priority === "Medium"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {task.priority}
            </span>

            {/* Buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleEdit}
                className="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1.5 text-sm transition"
                aria-label="Edit task"
              >
                <EditIcon />
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white rounded-full px-3 py-1.5 text-sm transition"
                aria-label="Delete task"
              >
                <DeleteIcon />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
