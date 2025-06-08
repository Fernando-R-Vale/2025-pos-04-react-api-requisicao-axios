"use client";

import { useState, useEffect } from "react";
import axios from "axios"; // Importa o axios
import { motion, AnimatePresence } from "framer-motion";
import Cabecalho from "@/componentes/Cabecalho";
import Tarefa from "@/componentes/Tarefa";
// Remova as importações de Modal e dados locais, pois esta página será só para exibição

// Interface para os dados que nosso componente Tarefa espera
interface TarefaInterface {
  id: number;
  title: string;
  completed: boolean;
}

// Interface para os dados como eles vêm da API
interface ApiTodo {
  id: number;
  todo: string; // Na API o campo é 'todo'
  completed: boolean;
  userId: number;
}

const TarefasApiPage = () => {
  const [tarefas, setTarefas] = useState<TarefaInterface[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect para buscar os dados da API quando o componente é montado
  useEffect(() => {
    const fetchTarefas = async () => {
      try {
        const response = await axios.get('https://dummyjson.com/todos');
        const dadosDaApi: ApiTodo[] = response.data.todos;

        // Mapeamos/adaptamos os dados da API para o formato que nosso componente <Tarefa> entende
        const tarefasFormatadas = dadosDaApi.map(item => ({
          id: item.id,
          title: item.todo, // Convertendo 'todo' da API para 'title' do nosso componente
          completed: item.completed,
        }));

        setTarefas(tarefasFormatadas);

      } catch (err) {
        console.error("Erro ao buscar dados da API:", err);
        setError("Não foi possível carregar as tarefas. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchTarefas();
  }, []); // O array vazio [] garante que esta função rode apenas uma vez

  // Função para simular a mudança de status (não afeta o servidor, apenas o estado local)
  const handleToggleStatus = (id: number) => {
    setTarefas(
      tarefas.map((tarefa) =>
        tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
      )
    );
  };

  // Renderização condicional para os estados de carregamento e erro
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <Cabecalho />
      <h2 className="text-3xl font-bold text-center text-gray-800 my-6">
        Tarefas da API DummyJSON
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {tarefas.map((tarefa) => (
            <motion.div
              key={tarefa.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Tarefa dados={tarefa} onToggleStatus={handleToggleStatus} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TarefasApiPage;