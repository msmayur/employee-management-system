"use client";

import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import EditEmployeeModal from "./EditEmployeeModal";

export default function EmployeeTable({ data, refresh }: any) {
  const [selected, setSelected] = useState<any>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      await axios.delete(`/api/employees/${id}`);
      toast.success("Employee deleted");
      refresh();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg overflow-hidden shadow-sm">
        {/* Header */}
        <thead>
          <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Position</th>
            <th className="p-3 text-left">Department</th>
            <th className="p-3 text-left">Organization</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((emp: any) => (
            <tr
              key={emp.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-3 font-medium text-gray-800">
                {emp.fullName}
              </td>

              <td className="p-3 text-gray-600">{emp.email}</td>

              <td className="p-3">{emp.position}</td>

              <td className="p-3">{emp.department}</td>

              <td className="p-3">
                {emp.organization?.name || "-"}
              </td>

              {/* Actions */}
              <td className="p-3 text-center space-x-2">
                <button
                  onClick={() => setSelected(emp)}
                  className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(emp.id)}
                  className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {selected && (
        <EditEmployeeModal
          employee={selected}
          onClose={() => setSelected(null)}
          refresh={refresh}
        />
      )}
    </div>
  );
}