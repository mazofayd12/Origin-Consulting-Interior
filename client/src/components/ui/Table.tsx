import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
}

export function Table<T extends { id: string | number }>({ columns, data }: TableProps<T>) {
  return (
    <div className="w-full overflow-x-auto border border-neutral-800 rounded-lg">
      <table className="w-full text-left text-sm text-neutral-300">
        <thead className="bg-neutral-900 text-xs font-semibold uppercase tracking-wider text-brand-gold border-b border-neutral-800">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800 bg-neutral-950/60">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-8 text-center text-neutral-500">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="hover:bg-neutral-900/50 transition-colors">
                {columns.map((col, idx) => (
                  <td key={idx} className="px-6 py-4 whitespace-nowrap">
                    {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor] as any)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
