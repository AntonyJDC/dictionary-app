"use client";
import { useDispatch, useSelector } from "react-redux";
import { setFont } from "@/store/themeSlice";
import { RootState } from "@/store";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const fonts: { label: string; value: "sans" | "serif" | "mono" }[] = [
  { label: "Sans", value: "sans" },
  { label: "Serif", value: "serif" },
  { label: "Mono", value: "mono" },
];

export default function FontSelector() {
  const dispatch = useDispatch();
  const font = useSelector((state: RootState) => state.theme.font);
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        className="py-2 flex items-center gap-x-4 rounded-md cursor-pointer group"
        onClick={() => setOpen(!open)}
      >
        {fonts.find((f) => f.value === font)?.label}
        <ChevronDown className="w-5 h-5 text-[#A445ED] group-hover:bg-[#daa9f8] group-hover:rounded" />
      </button>


      {open && (
        <ul className="absolute mt-2 w-32 shadow-md rounded-md bg-white dark:bg-gray-800 z-20">
          {fonts.map((f) => (
            <li
              key={f.value}
              className={`cursor-pointer px-4 py-2 hover:font-bold hover:bg-[#A445ED]/50 ${font === f.value ? "font-bold text-[#A445ED]" : ""
                }`}
              onClick={() => {
                dispatch(setFont(f.value));
                setOpen(false);
              }}
            >
              {f.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
