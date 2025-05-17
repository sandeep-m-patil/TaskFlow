import React, { useEffect, useState } from "react";
import "./App.css";
import { getTasks, saveTasks } from "./utils/storage";
import TaskItem from "./components/TaskItem";
import ProgressBar from "./components/ProgressBar";
import TaskForm from "./components/TaskForm";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  useEffect(() => {
    const handleEdit = (e) => {
      setEditingTask(e.detail);
      setIsFormOpen(true);
    };
    window.addEventListener("editTask", handleEdit);
    return () => window.removeEventListener("editTask", handleEdit);
  }, []);

  const addTask = (task) => {
    const updated = [...tasks, task];
    setTasks(updated);
    saveTasks(updated);
  };

  const updateTask = (updatedTask) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
    saveTasks(updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveTasks(updated);
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "All") return true;
      if (filter === "Completed") return task.completed;
      return task.priority === filter;
    })
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate)); // Sort by due date

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <>
    <Header/>
    
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full">
      

      <ProgressBar progress={progress} />

      <div className="mt-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Your Tasks</h2>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={() => {
              setEditingTask(null);
              setIsFormOpen(true);
            }}
            className="bg-black text-white font-bold py-2 px-4 rounded"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Filter buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mt-5">
        {["All", "Low", "Medium", "High", "Completed"].map((f) => {
          const isSelected = filter === f;
          let bgColor = isSelected
            ? "bg-black text-white"
            : "text-gray-800 border-gray-300";

          return (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-sm sm:text-base font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border transition-all duration-200 shadow-sm ${bgColor}`}
            >
              {f}
            </button>
          );
        })}
      </div>

      {/* Task form modal */}
      <div className="mt-6 space-y-4">
        {isFormOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-50">
            <div className="bg-white rounded-lg w-full h-full max-w-md mx-4 shadow-lg">
              <TaskForm
                editingTask={editingTask}
                onSubmit={(task) => {
                  if (editingTask) {
                    updateTask(task);
                  } else {
                    addTask(task);
                  }
                }}
                onClose={() => {
                  setIsFormOpen(false);
                  setEditingTask(null);
                }}
              />
            </div>
          </div>
        )}

        {/* Task list */}
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              updateTask={updateTask}
              deleteTask={deleteTask}
            />
          ))
        ) : (
          <p className="text-center text-gray-500">
            No tasks found for this filter.
          </p>
        )}
      </div>


    </div>
  <Footer/>
        

</>
    
  );
};

export default App;
