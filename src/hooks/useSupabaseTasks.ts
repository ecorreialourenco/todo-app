import { useEffect, useState } from "react";

import { Status } from "../enum/status.enum";
import { supabase } from "../lib/supabase";
import { Task } from "../models/task.model";
import { User } from "../models/user.model";

export const useSupabaseTasks = (user: User | null) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carregar tasks quando o user faz login
  useEffect(() => {
    if (!user) {
      setTasks([]);
      setLoading(false);
      return;
    }

    loadTasks();
  }, [user]);

  const loadTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error: fetchError } = await supabase
        .from("tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (fetchError) {
        setError(fetchError.message);
        return;
      }

      const mappedTasks: Task[] = (data || []).map((task: any) => ({
        task: task.task,
        status: task.status,
        id: task.id,
      }));

      setTasks(mappedTasks);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask: Task) => {
    if (!user) return;

    try {
      const { data, error: insertError } = await supabase
        .from("tasks")
        .insert([
          {
            task: newTask.task,
            status: newTask.status,
            user_id: user.id
          },
        ])
        .select();

      if (insertError) {
        setError(insertError.message);
        return;
      }

      if (data) {
        const mappedTask: Task = {
          task: data[0].task,
          status: data[0].status,
          id: data[0].id,
        };
        setTasks([mappedTask, ...tasks]);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    }
  };

  const updateTaskStatus = async (taskId: string, status: Boolean) => {
    if (!user) return;

    try {
      const { error: updateError } = await supabase
        .from("tasks")
        .update({ status })
        .eq("id", taskId)
        .eq("user_id", user.id);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status } : task
        )
      );
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    }
  };

  const deleteTask = async (taskId: string) => {
    if (!user) return;

    try {
      const { error: deleteError } = await supabase
        .from("tasks")
        .delete()
        .eq("id", taskId)
        .eq("user_id", user.id);

      if (deleteError) {
        setError(deleteError.message);
        return;
      }

      setTasks(tasks.filter((task) => task.id !== taskId));
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Unknown error";
      setError(errorMsg);
    }
  };

  return { tasks, setTasks, loading, error, addTask, updateTaskStatus, deleteTask };
};
