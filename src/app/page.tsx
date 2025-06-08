"use client";

import Link from 'next/link';
import Cabecalho from "@/componentes/Cabecalho"; // Mantemos o cabeçalho para consistência

const HomePage = () => {
  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50 flex flex-col items-center">
      <Cabecalho />
      
      <div className="flex-grow flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl text-gray-700 mb-8 text-center">
          Atividade: Consumindo API com Axios
        </h2>
        
        <Link href="/tarefas">
          <span className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 ease-in-out transform hover:-translate-y-1">
            Ver Lista de Tarefas da API
          </span>
        </Link>
      </div>

      <footer className="w-full text-center p-4 text-gray-500">
        <p>Projeto da Atividade 4 - Requisições com API.</p>
      </footer>
    </div>
  );
};

export default HomePage;