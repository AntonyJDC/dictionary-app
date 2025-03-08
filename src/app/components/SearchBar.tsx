import React from "react";
import { Search } from "lucide-react";

type Props = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onSubmit: React.FormEventHandler<HTMLFormElement> | undefined;
};

export default function SearchBox({ value, onChange, onSubmit }: Props) {
  return (
    <form onSubmit={onSubmit} className="relative w-full flex items-center">
      <input
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Search any word..."
        className="font-bold rounded-2xl outline-purple bg-gray-200 h-12 sm:h-[64px] w-full px-4 pr-12 dark:bg-gray-600 z-10"
      />
      <button type="submit" className="absolute right-5 z-20 text-2xl sm:text-3xl text-[#A445ED] dark:text-white hover:cursor-pointer">
        <Search />
      </button>
    </form>
  );
}
