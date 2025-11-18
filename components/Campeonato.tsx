"use client";
import { useState } from "react";

export default function Campeonato() {
    const [data, setData] = useState<any | null>(null);

    const buscarCampeonato = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/campeonato`,
            {
                method: "GET", // Explícito (opcional)
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            }
        );

        // Se token inválido/expirado, redireciona para login
        if (res.status === 401) {
            localStorage.removeItem("token");
            router.push("/login");
            return;
        }

        if (!res.ok) {
            throw new Error("Erro ao buscar campeonato");
        }

        const json = await res.json();

        const data = {
            nome: json.nome,
            temporada: json.temporada,
            logo: json.logo,
        };

        setData(data);
    };

    return (
        <div className="bg-white shadow p-6 rounded-lg w-full max-w-xl">
            <h2 className="text-xl font-bold mb-3">Informações do Campeonato</h2>

            <button
                onClick={buscarCampeonato}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Buscar Informações
            </button>

            {data && (
                <div className="mt-4">
                    <div className="flex items-center gap-4 mb-4">
                        {data.logo && (
                            <img
                                src={data.logo}
                                alt={data.nome}
                                className="w-20 h-auto"
                            />
                        )}
                        <div>
                            <p><strong>Nome:</strong> {data.nome}</p>
                            <p><strong>Temporada:</strong> {data.temporada}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
