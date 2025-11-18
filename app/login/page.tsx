"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");

    const handleLogin = async (e: any) => {
        e.preventDefault();
        setErro("");

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    email,
                    password: senha
                }),
            });

            const json = await res.json();

            if (!res.ok) {
                setErro(json.message || "Erro ao fazer login");
                return;
            }

            // SALVAR O TOKEN
            localStorage.setItem("token", json.access_token);
            document.cookie = `token=${json.access_token}; path=/;`;

            // REDIRECIONA
            router.push("/");
        } catch (error) {
            setErro("Erro ao conectar ao servidor");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 shadow rounded w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>

                {erro && <p className="text-red-600 mb-2">{erro}</p>}

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="border p-2 w-full rounded mb-3"
                />

                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
}
