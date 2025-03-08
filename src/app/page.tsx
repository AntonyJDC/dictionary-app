"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import WordData, { ErrorResponse } from "@/types";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Meaning from "@/components/Meaning";
import AudioButton from "./components/AudioButton";

export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false); // Para controlar cuándo se busca

  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;

  const {
    isLoading,
    error,
    refetch,
    data: wordData
  } = useQuery<WordData[], ErrorResponse>({
    queryKey: ["wordData"],
    queryFn: () => fetch(api).then((res) => res.json()),
    enabled: false, // 🚀 No ejecutar la consulta automáticamente al cargar
  });

  const data: WordData | null = wordData ? wordData[0] : null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchValue.trim()) {
      alert("Please enter a word to search."); // 🚀 Alerta si el input está vacío
      return;
    }

    setSearched(true);
    refetch(); // 🚀 Buscar solo cuando el usuario presiona Enter o el botón
  }

  if (isLoading)
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <main className="max-w-[720px] flex flex-col gap-10 mx-auto py-5 md:py-10 px-4">
      <div className="w-full flex justify-between">
        <Navbar />
      </div>

      <SearchBox
        onChange={(e) => setSearchValue(e.target.value)}
        onSubmit={handleSubmit}
        value={searchValue}
      />

      {!searched ? (
        <div className="flex flex-col gap-5 mt-8 text-center">
          <p className="text-5xl">🔍</p>
          <h2 className="text-xl font-bold">Search for a word!</h2>
          <p className="text-lg">{`Type a word and press Enter or click the search icon.`}</p>
        </div>
      ) : !data ? (
        <div className="flex flex-col gap-5 mt-8 text-center">
          <p className="text-5xl">😕</p>
          <h2 className="text-xl font-bold">No Definitions Found</h2>
          <p className="text-lg">{`Sorry pal, we couldn't find definitions for the word you were looking for.`}</p>
        </div>
      ) : (
        <section className="flex flex-col gap-8">
          <section className="flex flex-col gap-1">
            <div className="flex justify-between items-center w-full">
              <h1 className="text-3xl sm:text-[64px] font-bold">{data?.word ?? ""}</h1>
              <AudioButton media={data} />
            </div>
            <p className="text-2xl text-[#A445ED]">{data?.phonetic}</p>
          </section>

          {data?.meanings.map((d, i) => (
            <Meaning key={i} antonyms={d.antonyms} definitions={d.definitions} partOfSpeech={d.partOfSpeech} synonyms={d.synonyms} />
          ))}

          <hr />

          {data?.sourceUrls && data?.sourceUrls.length > 0 ? (
            <div>
              <p>Source</p>
              <Link target="_blank" href={data?.sourceUrls[0]} className="flex gap-1 items-center">
                <span className="hover:border-b">{data?.sourceUrls}</span>
                <ExternalLink className="text-sm text-gray-400" />
              </Link>
            </div>
          ) : null}
        </section>
      )}
    </main>
  );
}
