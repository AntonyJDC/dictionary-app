"use client";

import FontSelector from "@/components/shared/FontSelector";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { BookMinus } from "lucide-react";

export default function Navbar() {
    return (
        <div className="flex text-lg w-full justify-between items-center mb-4 md:mb-8 pt-5">
            <div>
                <BookMinus className="h-10 w-10 md:h-10 md:w-10 lg:h-12 lg:w-12 opacity-50"/>
            </div>
            <div className="ml-auto">
                <FontSelector />
            </div>
            <div className="mx-5 opacity-50">|</div>
            <div className="flex items-center">
                <ThemeToggle />
            </div>
        </div>
    );
}