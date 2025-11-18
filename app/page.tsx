"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Campeonato from "../components/Campeonato";
import TabelaAtual from "../components/TabelaAtual";

export default function Home() {
    const router = useRouter();
    const [view, setView] = useState("none");

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            router.push("/login");
        }
    }, []);

    return (
        <main className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6">Brasileirão 2025</h1>

            <div className="flex gap-4 mb-10">
                <button
                    onClick={() => setView("campeonato")}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                    Dados do Campeonato Atual
                </button>

                <button
                    onClick={() => setView("tabela")}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                    Tabela de Jogos
                </button>
            </div>

            {view === "campeonato" && <Campeonato />}
            {view === "tabela" && <TabelaAtual />}
        </main>
    );
}
