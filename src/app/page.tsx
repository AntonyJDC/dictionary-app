"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import SearchBox from "./components/SearchBar";
import { useQuery } from "@tanstack/react-query";
import WordData, { ErrorResponse } from "@/types";
import Link from "next/link";
import { ExternalLink, Clock } from "lucide-react";
import Meaning from "@/components/Meaning";
import AudioButton from "./components/AudioButton";
import HistoryModal from "./components/HistoryModal";
import { toast } from "sonner";
import Swal from "sweetalert2";


export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [searched, setSearched] = useState(false);
  const [history, setHistory] = useState<{ word: string; timestamp: string }[]>([]);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Cargar historial de localStorage al montar el componente
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      try {
        const parsedHistory = JSON.parse(storedHistory);
        if (Array.isArray(parsedHistory)) {
          setHistory(parsedHistory);
        }
      } catch (error) {
        console.error("Error parsing search history:", error);
      }
    }
  }, []);

  const api = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`;

  const {
    isLoading,
    error,
    refetch,
    data: wordData,
  } = useQuery<WordData[], ErrorResponse>({
    queryKey: ["wordData"],
    queryFn: () => fetch(api).then((res) => res.json()),
    enabled: false, // No ejecutar la consulta automáticamente
  });

  const data: WordData | null = wordData ? wordData[0] : null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchValue.trim()) {
      toast.error("Please enter a word to search.");
      return;
    }

    setSearched(true);
    refetch();

    // Guardar en historial solo si la palabra no está repetida
    const newHistoryItem = { word: searchValue, timestamp: new Date().toLocaleString() };
    if (!history.some((item) => item.word === searchValue)) {
      const updatedHistory = [newHistoryItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
    }
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

      <div className="flex items-center w-full">

        <button
          title="Search History"
          onClick={() => setIsHistoryOpen(true)}
          className="mr-2 p-2 rounded-lg hover:bg-[#A445ED] dark:hover:bg-[#A445ED] transition cursor-pointer"
        >
          <Clock className="w-6 h-6 text-gray-500 hover:text-white dark:text-gray-300" />
        </button>
        <SearchBox onChange={(e) => setSearchValue(e.target.value)} onSubmit={handleSubmit} value={searchValue} />
      </div>

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

      {isHistoryOpen && (
        <HistoryModal
          history={history}
          onClose={() => setIsHistoryOpen(false)}
          onClearHistory={() => {
            Swal.fire({
              title: "Are you sure?",
              text: "Your search history will be deleted permanently.",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#A445ED",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, clear it!",
            }).then((result) => {
              if (result.isConfirmed) {
                setHistory([]); 
                localStorage.removeItem("searchHistory"); 
                setIsHistoryOpen(false); 

                toast.success("Search history cleared successfully.");
              }
            });
          }}
        />
      )}

    </main>

  );
}
