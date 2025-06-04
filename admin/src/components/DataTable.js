import React from "react";
import { FiEdit2, FiTrash2, FiEye } from "react-icons/fi";
import Link from "next/link";
import Spinner from "./Spinner";

const DataTable = ({
  columns,
  data,
  loading = false,
  onEdit,
  onDelete,
  onView,
  basePath,
}) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Spinner size="lg" />
        <span className="ml-3 text-gray-600">Loading...</span>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className={column.className}>
                {column.label}
              </th>
            ))}
            <th className="w-24">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id || item._id}>
              {columns.map((column) => (
                <td
                  key={`${item.id || item._id}-${column.key}`}
                  className={column.className}
                >
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              <td>
                <div className="flex space-x-2">
                  {onView && (
                    <button
                      onClick={() => onView(item)}
                      className="text-blue-600 hover:text-blue-800"
                      title="View"
                    >
                      <FiEye size={18} />
                    </button>
                  )}

                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="text-amber-600 hover:text-amber-800"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </button>
                  )}

                  {basePath && (
                    <Link
                      href={`${basePath}/edit/${item.id || item._id}`}
                      className="text-amber-600 hover:text-amber-800"
                      title="Edit"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                  )}

                  {onDelete && (
                    <button
                      onClick={() => onDelete(item)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
