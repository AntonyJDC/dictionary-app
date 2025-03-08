import React from "react";
import { X } from "lucide-react";

interface Props {
  history: { word: string; timestamp: string }[];
  onClose: () => void;
  onClearHistory: () => void;
}

export default function HistoryModal({ history, onClose, onClearHistory }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center border shadow-lg z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-96">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-bold">Search History</h2>
          <button onClick={onClose} className="hover:text-red-500 transition cursor-pointer">
            <X />
          </button>
        </div>

        {history.length === 0 ? (
          <p className="text-center text-gray-500 mt-4">No history available.</p>
        ) : (
          <ul className="mt-4 max-h-60 overflow-y-auto">
            {history.map((item, index) => (
              <li key={index} className="flex justify-between py-2 border-b last:border-none">
                <span>{item.word}</span>
                <span className="text-xs text-gray-400">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        )}

        <button onClick={onClearHistory} className="mt-12 w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition cursor-pointer">
          Clear History
        </button>
      </div>
    </div>
  );
}
