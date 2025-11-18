"use client";
import { useEffect, useState } from "react";

export default function PartidasModal({ time, onClose }) {
    const [partidas, setPartidas] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPartidas = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/proximas/partidas/${time.time_id}`,
                    {
                        method: "GET",
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

                setPartidas(json);

            } catch (err) {
                console.error("Erro ao buscar partidas", err);
            }

            setLoading(false);
        };

        fetchPartidas();
    }, [time]);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded shadow-lg relative">

                {/* Botão de Fechar */}
                <button
                    className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
                    onClick={onClose}
                >
                    ×
                </button>

                {/* LOADING */}
                {loading && <p>Carregando partidas...</p>}

                {/* LISTA */}
                {!loading && partidas && (
                    <div className="space-y-3 max-h-80 overflow-y-auto">
                        {Object.values(partidas)
                            .flat()
                            .map((p) => (
                                <div key={p.partida_id} className="border p-3 rounded">
                                    <p className="font-bold">{p.campeonato}</p>
                                    <p>{p.placar}</p>
                                    <p>{p.data} às {p.hora}</p>
                                    <p className="text-gray-500 text-sm">Estádio: {p.estadio}</p>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
}
