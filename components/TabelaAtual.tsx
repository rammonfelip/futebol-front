"use client";
import { useState } from "react";
import PartidasModal from "./PartidasModal";
import { useRouter } from "next/navigation";

export default function TabelaAtual() {
    const router = useRouter();
    const [tabela, setTabela] = useState<any[]>([]);
    const [timeSelecionado, setTimeSelecionado] = useState<any | null>(null);

    const buscarTabela = async () => {
        const token = localStorage.getItem("token");

        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tabela`,
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
            throw new Error("Erro ao buscar tabela");
        }

        const json = await res.json();
        console.log(json);
        setTabela(json);
    };

    return (
        <div className="bg-black shadow p-6 rounded-lg w-full max-w-3xl">
            <h2 className="text-xl font-bold mb-3">Tabela Atual</h2>

            <button
                onClick={buscarTabela}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
                Buscar Tabela
            </button>

            {tabela.length > 0 && (
                <table className="w-full mt-4 border-collapse">
                    <thead>
                    <tr className="border-b bg-white-100">
                        <th className="text-left p-2">Posição</th>
                        <th className="text-left p-2">Time</th>
                        <th className="text-left p-2">PJ</th>
                        <th className="text-left p-2">VIT</th>
                        <th className="text-left p-2">E</th>
                        <th className="text-left p-2">DER</th>
                        <th className="text-left p-2">SG</th>
                        <th className="text-left p-2">Pts</th>
                        <th className="text-left p-2">Ações</th>
                    </tr>
                    </thead>

                    <tbody>
                    {tabela.map((t) => (
                        <tr key={t.posicao} className="border-b">
                            <td className="p-2 font-bold">{t.posicao}</td>

                            <td className="p-2 flex items-center gap-2">
                                <img src={t.time_logo} className="w-6 h-6" />
                                {t.time_nome}
                            </td>

                            <td className="p-2">{t.jogos}</td>
                            <td className="p-2">{t.vitorias}</td>
                            <td className="p-2">{t.empates}</td>
                            <td className="p-2">{t.derrotas}</td>
                            <td className="p-2">{t.saldo_gols}</td>
                            <td className="p-2">{t.pontos}</td>

                            <td className="p-2">
                                <button
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                                    onClick={() => setTimeSelecionado(t)}
                                >
                                    Próximas partidas
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {timeSelecionado && (
                <PartidasModal
                    time={timeSelecionado}
                    onClose={() => setTimeSelecionado(null)}
                />
            )}
        </div>
    );
}
