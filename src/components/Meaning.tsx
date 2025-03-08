import type { Meaning } from "@/types";
import React from "react";

export default function Meaning({
    partOfSpeech,
    definitions,
    synonyms
}: Meaning) {
    return (
        <>
            <div className="flex  gap-5 items-center">
                {/* <p className="text-2xl italic font-bold">noun</p> */}
                <em className="text-2xl font-bold">{partOfSpeech}</em>
                <div className="w-full h-[2px] bg-gray-200 rounded-full" />
            </div>

            {/* Meaning */}
            <section className="flex flex-col gap-3">
                <p className="text-xl">Meaning</p>

                {definitions
                    ? definitions.map((d, i) => (
                        <ul key={i} className="text-lg">
                            {/* 1 data */}
                            <li className="flex gap-2">
                                <div className=" min-h-1.5 min-w-1.5 h-1.5 w-1.5 bg-[#A445ED] rounded-full mt-3" />
                                <p>{d.definition}</p>
                            </li>
                            {/*  */}
                        </ul>
                    ))
                    : null}
            </section>

            {/* Synonyms */}
            {synonyms.length > 0 && (
                <div className="flex gap-4 items-center">
                    <p className="text-xl opacity-60">Synonyms</p>
                    <p className="text-lg text-[#A445ED]">{synonyms.map((d) => d).join(", ")}</p>
                </div>
            )}
        </>
    );
}

//