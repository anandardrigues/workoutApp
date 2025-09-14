import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Ícones SVG para o visual do painel
const icons = {
  Login: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>,
  Dumbbell: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.4 14.4 9.6 9.6"/><path d="M18.8 9.2a3 3 0 1 1-4.2-4.2l-5.6 5.6a3 3 0 1 1 4.2 4.2l5.6-5.6z"/><path d="M21.2 2.8a3 3 0 1 1-4.2-4.2l-5.6 5.6a3 3 0 1 1 4.2 4.2l5.6-5.6z"/></svg>,
  Target: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Clipboard: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>,
  User: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  ArrowLeft: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M19 12H5"/><polyline points="12 19 5 12 12 5"/></svg>,
  Check: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"/></svg>,
  Plus: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  Send: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  Bolt: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M13 14h-4l-3 6h7l-3-6z"/><path d="M15 10l-3-6h7l-3 6z"/></svg>,
  Heart: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  Star: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  Medal: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 18V6"/><path d="M14 12V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8l3 3z"/><path d="M10 18v6"/><path d="M14 18v6"/></svg>,
  ChartLine: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M3 3v18h18"/><path d="M18 10l-6 6-4-4-5 5"/></svg>,
  Trophy: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 12.8A6 6 0 1 0 5.2 2c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2a6 6 0 0 0-6.8 10.8z"/><path d="M12 12.8A6 6 0 1 0 18.8 2c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2a6 6 0 0 0 6.8 10.8z"/><path d="M22 17H2c0 2.2 1.8 4 4 4s4-1.8 4-4H12c0 2.2 1.8 4 4 4s4-1.8 4-4z"/></svg>,
  Sparkles: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.844 10.02a.5.5 0 0 0-.447-.282L15.93 9.38l-2.028-6.17a.5.5 0 0 0-.946 0L10.07 9.38 3.153 9.738a.5.5 0 0 0-.447.282l2.67 6.45-3.045 4.965a.5.5 0 0 0 .848.517l6.55-2.01 6.55 2.01a.5.5 0 0 0 .848-.517l-3.045-4.965 2.67-6.45z"/></svg>,
  Sun: ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
};

// -----------------------------------------------------------
// Dados de demonstração
// -----------------------------------------------------------
const initialTreinoData = [
  {
    id: 'treino-1',
    titulo: 'Treino Superiores',
    descricao: 'Foco em peito, costas e ombros.',
    exercicios: [
      { nome: 'Remada Baixa Unilateral', series: '4', repeticoes: '8-10', carga: '3kg' },
      { nome: 'Remada Curvada Pegada Pronada', series: '5', repeticoes: '10-12', carga: '40kg' },
       { nome: 'Puxada alta Frente', series: '5', repeticoes: '10-12', carga: '40kg' },
      { nome: 'Pulldown', series: '3', repeticoes: '10-12', carga: '20kg' },
      { nome: 'Rosca Martelo', series: '3', repeticoes: '10-12', carga: '20kg' },
      { nome: 'Rosca Direta com Barra ou Rosca Alternada com Halteres', series: '4', repeticoes: '10-12', carga: '20kg' },

    ]
  },
  {
    id: 'treino-2',
    titulo: 'Treino de Pernas e Glúteos',
    descricao: 'Para fortalecer a parte inferior do corpo.',
    exercicios: [
      { nome: 'Agachamento Búlgaro', series: '5', repeticoes: '10-12', carga: '60kg' },
      { nome: 'Elevação de Quadril', series: '5', repeticoes: '8-10', carga: '100kg' },
      { nome: 'Stiff', series: '4', repeticoes: '12-15', carga: '30kg' },
      { nome: 'Passada com Halteres', series: '4', repeticoes: '10', carga: '30kg' },
      { nome: 'Glúteo Coice na Polia', series: '3', repeticoes: '15-20', carga: '30kg' },
    ]
  },
  {
    id: 'treino-3',
    titulo: 'Treino Peito, ombros e Tríceps',
    descricao: 'Para fortalecer a parte inferior do corpo.',
    exercicios: [
      { nome: 'Supino Inclinado com Halteres', series: '4', repeticoes: '8-10', carga: '60kg' },
      { nome: 'Desenvolvimento de Ombros com Barra', series: '5', repeticoes: '8-10', carga: '100kg' },
      { nome: 'Cruxifixo Inclinado com Halteres', series: '4', repeticoes: '12-15', carga: '30kg' },
      { nome: 'Elevação Lateral com Alteres', series: '4', repeticoes: '10', carga: '30kg' },
      { nome: 'Tríceps Testa com Barra w', series: '3', repeticoes: '15-20', carga: '30kg' },
      { nome: 'Paralela', series: '3', repeticoes: '15-20', carga: '30kg' },
    ]
  },
  {
    id: 'treino-4',
    titulo: 'Quadríceps e Panturrilhas',
    descricao: 'Para fortalecer a parte inferior do corpo.',
    exercicios: [
      { nome: 'Agachamento Livre', series: '4', repeticoes: '8-10', carga: '60kg' },
      { nome: 'Leg Press 45', series: '5', repeticoes: '8-10', carga: '100kg' },
      { nome: 'Cadeira Extensora', series: '4', repeticoes: '12-15', carga: '30kg' },
      { nome: 'Hack Squat', series: '4', repeticoes: '10', carga: '30kg' },
      { nome: 'Panturrilhas', series: '3', repeticoes: '15-20', carga: '30kg' },
      { nome: 'Paralela', series: '3', repeticoes: '15-20', carga: '30kg' },
    ]
  },
  {
    id: 'treino-5',
    titulo: 'Peito e Costas',
    descricao: 'Para fortalecer a parte inferior do corpo.',
    exercicios: [
      { nome: 'Supino Reto com Barra', series: '4', repeticoes: '8-10', carga: '60kg' },
      { nome: 'Remada Cavalinho', series: '5', repeticoes: '8-10', carga: '100kg' },
      { nome: 'Crossover', series: '4', repeticoes: '12-15', carga: '30kg' },
      { nome: 'Puxada com Pegada  Fechada (Triangulo)', series: '4', repeticoes: '10', carga: '30kg' },
      { nome: 'Desenvolvimento de Ombros com Halteres', series: '3', repeticoes: '15-20', carga: '30kg' },
      { nome: 'Remada AltaParalela', series: '3', repeticoes: '15-20', carga: '30kg' },
    ]
  },
  {
    id: 'treino-6',
    titulo: 'Posterio de Coxa e Panturilhas',
    descricao: 'Para fortalecer a parte inferior do corpo.',
    exercicios: [
      { nome: 'Stiff com Barra', series: '4', repeticoes: '8-10', carga: '60kg' },
      { nome: 'Mexa Flexora', series: '5', repeticoes: '8-10', carga: '100kg' },
      { nome: 'Leg Press Unilateral', series: '4', repeticoes: '12-15', carga: '30kg' },
      { nome: 'Cadeira Flexora', series: '4', repeticoes: '10', carga: '30kg' },
      { nome: 'Panturrilhas', series: '3', repeticoes: '15-20', carga: '30kg' },
     
    ]
  },
];

const initialProfTreinoData = [
  {
    id: 'treino-prof-1',
    titulo: 'Treino de Cardio Intenso',
    descricao: 'Melhora a resistência e a saúde cardiovascular.',
    exercicios: [
      { nome: 'Corrida na Esteira', series: '1', repeticoes: '20 min', carga: 'Velocidade 10km/h' },
      { nome: 'Pular Corda', series: '5', repeticoes: '2 min', carga: 'Intervalos de 1 min' },
    ]
  },
  ...initialTreinoData,
];

// Dados das conquistas
const allAchievements = [
  { id: 'primeiros-passos', name: 'Primeiros Passos', description: 'Acumule 100 pontos.', pointsRequired: 100, icon: 'Sparkles', color: 'text-purple-400' },
  { id: 'meio-caminho', name: 'Meio Caminho', description: 'Acumule 500 pontos.', pointsRequired: 500, icon: 'Dumbbell', color: 'text-teal-400' },
  { id: 'estrela-do-treino', name: 'Estrela do Treino', description: 'Acumule 1000 pontos.', pointsRequired: 1000, icon: 'Trophy', color: 'text-yellow-400' },
  { id: 'fera-do-cardio', name: 'Fera do Cardio', description: 'Acumule 300 minutos de cardio.', minutesRequired: 300, icon: 'Heart', color: 'text-red-400' },
  { id: 'dia-a-dia', name: 'Dia a Dia', description: 'Complete um treino por dia durante uma semana.', dailyStreak: 7, icon: 'Sun', color: 'text-orange-400' },
];

// -----------------------------------------------------------
// Componente principal da aplicação
// -----------------------------------------------------------
export default function App() {
  const [treinoData, setTreinoData] = useState(initialTreinoData);
  const [profTreinoData, setProfTreinoData] = useState(initialProfTreinoData);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedTreino, setSelectedTreino] = useState(null);
  const [isProfessor, setIsProfessor] = useState(false); // Iniciar como Aluno
  const [statusMessage, setStatusMessage] = useState('');

  // -----------------------------------------------------------
  // Componente da Página de Detalhes do Treino (Aluno)
  // -----------------------------------------------------------
  const WorkoutDetailsPage = ({ addPoints }) => {
    const [completedExercises, setCompletedExercises] = useState([]);
    const isWorkoutFinalized = completedExercises.length === selectedTreino.exercicios.length;

    const handleCompleteExercise = (exerciseName) => {
      setCompletedExercises(prev => {
        if (prev.includes(exerciseName)) {
          return prev.filter(name => name !== exerciseName);
        } else {
          return [...prev, exerciseName];
        }
      });
    };

    const handleFinalizeWorkout = () => {
      addPoints(100); // Ganha 100 pontos por finalizar o treino
      setCurrentPage('dashboard');
      setStatusMessage('Treino finalizado! Você ganhou 100 pontos.');
    };

    if (!selectedTreino) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
          <p>Nenhum treino selecionado.</p>
          <button onClick={() => setCurrentPage('dashboard')} className="ml-4 text-teal-400 hover:underline">Voltar</button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="flex items-center text-gray-400 hover:text-white transition-colors duration-200 mb-8"
        >
          <icons.ArrowLeft className="w-5 h-5 mr-2" />
          Voltar para o Dashboard
        </button>
       
        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{selectedTreino.titulo}</h1>
        <p className="text-gray-400 mb-6">{selectedTreino.descricao}</p>

        <div className="space-y-6">
          {selectedTreino.exercicios.map((exercicio, index) => {
            const isCompleted = completedExercises.includes(exercicio.nome);
            return (
              <div key={index} className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
                <h2 className="text-2xl font-bold text-white mb-2 flex justify-between items-center">
                  {exercicio.nome}
                  {isCompleted && (
                    <icons.Check className="w-6 h-6 text-green-500" />
                  )}
                </h2>
                <div className="flex items-center space-x-4 text-gray-400 mb-4">
                  <span className="font-semibold">{exercicio.series} Séries</span>
                  <span>•</span>
                  <span className="font-semibold">{exercicio.repeticoes} Repetições</span>
                  <span>•</span>
                  <span className="font-semibold">{exercicio.carga} Carga</span>
                </div>
                {/* Vídeo de demonstração  */}
                <div className="aspect-video bg-gray-700 rounded-xl overflow-hidden mb-4">
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/watch?v=_x1i1hTFme0`} // Placeholder video
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <button
                  onClick={() => handleCompleteExercise(exercicio.nome)}
                  className={`w-full font-bold py-3 rounded-xl transition-all duration-300 ${
                    isCompleted ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'
                  }`}
                >
                  {isCompleted ? 'Concluído!' : 'Marcar como Concluído'}
                </button>
              </div>
            );
          })}
         
          <button
            onClick={handleFinalizeWorkout}
            disabled={!isWorkoutFinalized}
            className={`w-full font-bold py-4 mt-6 rounded-xl transition-all duration-300 ${
              isWorkoutFinalized ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isWorkoutFinalized ? 'Finalizar Treino' : 'Complete todos os exercícios para finalizar'}
          </button>
        </div>
      </div>
    );
  };

  // -----------------------------------------------------------
  // Componente do Dashboard (Aluno)
  // -----------------------------------------------------------
  const AlunoDashboardPage = () => {
    const userName = 'Ananda';
    const [cardioInput, setCardioInput] = useState('');
    const [points, setPoints] = useState(0);
    const [personalRecords, setPersonalRecords] = useState({
      mostPointsDay: 0,
    });
    const [pointHistory, setPointHistory] = useState([]);
    const [unlockedAchievements, setUnlockedAchievements] = useState([]);
    const [dailyCardioMinutes, setDailyCardioMinutes] = useState({});

    const WEEKLY_GOAL_MINUTES = 210; // 30 minutos por dia x 7 dias
    const WEEK_START_DAY = 1; // 1 = Monday

    // Obter nome do dia da semana
    const getDayName = (dayIndex) => {
      const dayNames = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
      return dayNames[dayIndex];
    };
   
    // Carregar dados do localStorage
    useEffect(() => {
      const storedPoints = parseInt(localStorage.getItem('userPoints')) || 0;
      setPoints(storedPoints);
     
      const storedRecords = JSON.parse(localStorage.getItem('personalRecords')) || { mostPointsDay: 0 };
      setPersonalRecords(storedRecords);
     
      const storedHistory = JSON.parse(localStorage.getItem('pointHistory')) || [];
      setPointHistory(storedHistory);

      const storedDailyMinutes = JSON.parse(localStorage.getItem('dailyCardioMinutes')) || {};
      setDailyCardioMinutes(storedDailyMinutes);

      const storedUnlocked = JSON.parse(localStorage.getItem('unlockedAchievements')) || [];
      setUnlockedAchievements(storedUnlocked);
    }, []);

    const getDailyCardioData = () => {
      const data = [];
      const today = new Date();
      const firstDayOfWeek = new Date(today);
      firstDayOfWeek.setDate(today.getDate() - today.getDay() + (today.getDay() === 0 ? -6 : 1));

      for(let i = 0; i < 7; i++) {
        const day = new Date(firstDayOfWeek);
        day.setDate(firstDayOfWeek.getDate() + i);
        const dayKey = day.toLocaleDateString();
        data.push({
          name: getDayName(day.getDay()),
          minutos: dailyCardioMinutes[dayKey] || 0
        });
      }
      return data;
    };
   
    const dailyCardioChartData = getDailyCardioData();

    const calculateWeeklyTotal = () => {
      return Object.values(dailyCardioMinutes).reduce((total, day) => total + day, 0);
    };

    const weeklyCardioTotal = calculateWeeklyTotal();
    const remainingCardio = Math.max(0, WEEKLY_GOAL_MINUTES - weeklyCardioTotal);
    const cardioProgress = Math.min(100, (weeklyCardioTotal / WEEKLY_GOAL_MINUTES) * 100);

    const checkForNewAchievements = (currentPoints) => {
      const newUnlocked = [];
      const unlockedIds = new Set(unlockedAchievements.map(a => a.id));

      allAchievements.forEach(ach => {
        if (!unlockedIds.has(ach.id) && ach.pointsRequired && currentPoints >= ach.pointsRequired) {
          newUnlocked.push(ach);
        }
      });
     
      if (newUnlocked.length > 0) {
        const updatedUnlocked = [...unlockedAchievements, ...newUnlocked];
        setUnlockedAchievements(updatedUnlocked);
        localStorage.setItem('unlockedAchievements', JSON.stringify(updatedUnlocked));
        newUnlocked.forEach(ach => {
          setStatusMessage(`Parabéns! Você desbloqueou a conquista: "${ach.name}"!`);
        });
      }
    };

    // Sistema de pontos
    const addPoints = (amount) => {
      setPoints(prevPoints => {
        const newPoints = prevPoints + amount;
        localStorage.setItem('userPoints', newPoints);

        // Atualizar histórico de pontos
        const today = new Date().toLocaleDateString();
        const updatedHistory = [...pointHistory];
        const todayIndex = updatedHistory.findIndex(d => d.date === today);
        if (todayIndex > -1) {
          updatedHistory[todayIndex].points = newPoints;
        } else {
          updatedHistory.push({ date: today, points: newPoints });
        }
        setPointHistory(updatedHistory);
        localStorage.setItem('pointHistory', JSON.stringify(updatedHistory));

        // Atualizar recordes pessoais
        setPersonalRecords(prevRecords => {
          const updatedRecords = { ...prevRecords };
          if (newPoints > updatedRecords.mostPointsDay) {
            updatedRecords.mostPointsDay = newPoints;
          }
          localStorage.setItem('personalRecords', JSON.stringify(updatedRecords));
          return updatedRecords;
        });

        checkForNewAchievements(newPoints);

        return newPoints;
      });
    };

    // Cardíaco
    const handleUpdateCardio = (e) => {
      e.preventDefault();
      const minutes = parseInt(cardioInput, 10);
      if (isNaN(minutes) || minutes <= 0) {
        setStatusMessage('Por favor, insira um valor válido.');
        return;
      }

      addPoints(minutes * 2); // Ganha 2 pontos por minuto de cardio
     
      const todayKey = new Date().toLocaleDateString();
      setDailyCardioMinutes(prev => {
        const updatedDailyMinutes = { ...prev, [todayKey]: (prev[todayKey] || 0) + minutes };
        localStorage.setItem('dailyCardioMinutes', JSON.stringify(updatedDailyMinutes));
        return updatedDailyMinutes;
      });

      setCardioInput('');
      setStatusMessage(`+${minutes} minutos de cardio adicionados!`);
    };

    // Desafio do Dia
    const challenges = [
      { id: 1, description: 'Faça 100 abdominais para aquecer.' },
      { id: 2, description: 'Complete 30 minutos de cardio.' },
      { id: 3, description: 'Caminhe 10.000 passos hoje.' },
      { id: 4, description: 'Faça 50 flexões.' },
      { id: 5, description: 'Faça alongamento por 15 minutos.' },
    ];
   
    const getDailyChallenge = () => {
      const today = new Date();
      const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
      return challenges[dayOfYear % challenges.length];
    };
   
    const [dailyChallenge, setDailyChallenge] = useState(null);
    const [isChallengeCompleted, setIsChallengeCompleted] = useState(false);

    useEffect(() => {
      setDailyChallenge(getDailyChallenge());
    }, []);

    const handleCompleteChallenge = () => {
      setIsChallengeCompleted(true);
      addPoints(50); // Ganha 50 pontos por completar o desafio
      setStatusMessage('Desafio do dia concluído! Ótimo trabalho.');
      setTimeout(() => setStatusMessage(''), 3000);
    };

    const AchievementCard = ({ achievement, isUnlocked }) => {
      const IconComponent = icons[achievement.icon];
      return (
        <div className={`p-4 rounded-2xl flex flex-col items-center text-center transition-all duration-300 ${isUnlocked ? 'bg-teal-700' : 'bg-gray-700 opacity-50'}`}>
          <span className={`w-12 h-12 flex items-center justify-center rounded-full mb-2 ${isUnlocked ? 'bg-yellow-400 text-gray-900' : 'bg-gray-500 text-gray-400'}`}>
            {IconComponent && <IconComponent className="w-6 h-6" />}
          </span>
          <h3 className="text-lg font-bold text-white mb-1">{achievement.name}</h3>
          <p className="text-xs text-gray-400">{achievement.description}</p>
        </div>
      );
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Olá, <span className="text-teal-400">{userName}</span>!
          </h1>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <span className="text-white text-xl font-bold flex items-center">
              <icons.Star className="w-6 h-6 mr-2 text-yellow-400" />
              {points} pontos
            </span>
          </div>
        </header>

        {statusMessage && (
          <div className="bg-teal-500 text-white p-3 rounded-xl mb-4 text-center">{statusMessage}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Seus Treinos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {treinoData.map((treino) => (
                  <div
                    key={treino.id}
                    onClick={() => {
                      setSelectedTreino(treino);
                      setCurrentPage('workoutDetails');
                    }}
                    className="bg-gray-700 p-6 rounded-2xl shadow-lg border border-gray-600 cursor-pointer hover:bg-gray-600 transition-colors duration-200"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white flex items-center">
                        <icons.Dumbbell className="w-5 h-5 mr-2 text-teal-400" />
                        {treino.titulo}
                      </h3>
                      <span className="bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full">Ver Treino</span>
                    </div>
                    <p className="text-gray-400 text-sm">{treino.descricao}</p>
                  </div>
                ))}
                {treinoData.length === 0 && (
                  <div className="text-center text-gray-500 p-8 col-span-2">
                    <p>Nenhum treino atribuído ainda. Peça para o professor atribuir um!</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <icons.Heart className="w-6 h-6 mr-2 text-red-400" />
                Meta de Cardio
              </h2>
              <div className="flex flex-col items-center text-center space-y-2 mb-4">
                <p className="text-white text-4xl font-extrabold">{weeklyCardioTotal} / {WEEKLY_GOAL_MINUTES} min</p>
                <p className="text-gray-400">Restam <span className="text-white font-bold">{remainingCardio}</span> minutos esta semana.</p>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 mb-4">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${cardioProgress}%` }}
                ></div>
              </div>
              <form onSubmit={handleUpdateCardio} className="space-y-2">
                <label className="block text-gray-400 text-sm">Adicionar minutos de cardio hoje:</label>
                <input
                  type="number"
                  value={cardioInput}
                  onChange={(e) => setCardioInput(e.target.value)}
                  className="w-full p-2 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 text-white text-center"
                  placeholder="Ex: 30"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-red-600 text-white font-bold py-2 rounded-xl hover:bg-red-700 transition-all duration-300"
                >
                  Adicionar
                </button>
              </form>
            </div>
           
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Meu Progresso Semanal</h2>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={dailyCardioChartData}
                  margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="name" stroke="#cbd5e0" />
                  <YAxis stroke="#cbd5e0" />
                  <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                  <Bar dataKey="minutos" fill="#e53e3e" barSize={30} radius={[10, 10, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700 flex flex-col justify-between">
              <h2 className="text-xl font-semibold text-white flex items-center mb-4">
                <icons.Bolt className="w-6 h-6 mr-2 text-yellow-400" />
                Desafio do Dia
              </h2>
              <div className="text-center flex-grow flex flex-col justify-center items-center">
                <p className="text-white text-lg font-medium">{dailyChallenge?.description}</p>
              </div>
              <button
                onClick={handleCompleteChallenge}
                disabled={isChallengeCompleted}
                className={`w-full font-bold py-3 mt-4 rounded-xl transition-all duration-300 ${
                  isChallengeCompleted ? 'bg-green-600 cursor-not-allowed' : 'bg-yellow-600 hover:bg-yellow-700'
                }`}
              >
                {isChallengeCompleted ? 'Concluído!' : 'Marcar como Concluído'}
              </button>
            </div>
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <icons.Medal className="w-6 h-6 mr-2 text-amber-400" />
                Meus Recordes Pessoais
              </h2>
              <ul className="space-y-3">
                <li className="flex items-center justify-between p-3 rounded-xl bg-gray-700">
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium">Maior Pontuação:</span>
                  </div>
                  <span className="text-yellow-400 font-bold">{personalRecords.mostPointsDay} pts</span>
                </li>
              </ul>
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <icons.Trophy className="w-6 h-6 mr-2 text-yellow-400" />
                Minhas Conquistas
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {allAchievements.map(ach => (
                  <AchievementCard key={ach.id} achievement={ach} isUnlocked={unlockedAchievements.some(ua => ua.id === ach.id)} />
                ))}
              </div>
              {unlockedAchievements.length === 0 && (
                <p className="text-center text-gray-500 mt-4">Nenhuma conquista desbloqueada ainda. Continue treinando!</p>
              )}
            </div>

            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
                <icons.ChartLine className="w-6 h-6 mr-2 text-teal-400" />
                Histórico de Pontos
              </h2>
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={pointHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#4a5568" />
                  <XAxis dataKey="date" stroke="#cbd5e0" />
                  <YAxis stroke="#cbd5e0" />
                  <Tooltip cursor={{ fill: 'rgba(255, 255, 255, 0.1)' }} contentStyle={{ backgroundColor: '#2d3748', border: 'none' }} />
                  <Line type="monotone" dataKey="points" stroke="#68d391" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // -----------------------------------------------------------
  // Componente do Dashboard do Professor
  // -----------------------------------------------------------
  const ProfessorDashboardPage = () => {
    const [newWorkout, setNewWorkout] = useState({ id: '', titulo: '', descricao: '', exercicios: [{ nome: '', series: '', repeticoes: '', carga: '' }] });
    const [assignTargetUserId, setAssignTargetUserId] = useState('');
    const [assignTreinoId, setAssignTreinoId] = useState('');

    const handleAddExercise = () => {
      setNewWorkout(prev => ({
        ...prev,
        exercicios: [...prev.exercicios, { nome: '', series: '', repeticoes: '', carga: '' }]
      }));
    };

    const handleExerciseChange = (index, field, value) => {
      const updatedExercises = newWorkout.exercicios.map((ex, i) =>
        i === index ? { ...ex, [field]: value } : ex
      );
      setNewWorkout(prev => ({ ...prev, exercicios: updatedExercises }));
    };

    const handleCreateTreino = (e) => {
      e.preventDefault();
      const newId = `treino-prof-${profTreinoData.length + 1}`;
      setProfTreinoData(prev => [...prev, { ...newWorkout, id: newId }]);
      setStatusMessage('Treino criado com sucesso!');
      setNewWorkout({ id: '', titulo: '', descricao: '', exercicios: [{ nome: '', series: '', repeticoes: '', carga: '' }] });
    };
   
    const handleAssignTreino = (e) => {
      e.preventDefault();
      const treinoToAssign = profTreinoData.find(t => t.id === assignTreinoId);
      if (treinoToAssign) {
        setTreinoData(prev => [...prev, treinoToAssign]);
        setStatusMessage('Treino atribuído com sucesso!');
        setAssignTargetUserId('');
        setAssignTreinoId('');
      } else {
        setStatusMessage('Erro ao atribuir treino. ID não encontrado.');
      }
    };

    return (
      <div className="min-h-screen bg-gray-900 text-white p-6 md:p-10">
        <header className="flex flex-col md:flex-row justify-between items-center mb-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white">
            Painel do <span className="text-teal-400">Professor</span>
          </h1>
        </header>
       
        {statusMessage && (
          <div className="bg-teal-500 text-white p-3 rounded-xl mb-4 text-center">{statusMessage}</div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         
          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <icons.Plus className="w-6 h-6 mr-2 text-green-400" />
              Criar Novo Treino
            </h2>
            <form onSubmit={handleCreateTreino} className="space-y-4">
              <div>
                <label className="block text-gray-400">Título do Treino</label>
                <input
                  type="text"
                  value={newWorkout.titulo}
                  onChange={(e) => setNewWorkout(prev => ({ ...prev, titulo: e.target.value }))}
                  className="w-full p-2 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400">Descrição</label>
                <textarea
                  value={newWorkout.descricao}
                  onChange={(e) => setNewWorkout(prev => ({ ...prev, descricao: e.target.value }))}
                  rows="3"
                  className="w-full p-2 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                ></textarea>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">Exercícios</h3>
                {newWorkout.exercicios.map((ex, index) => (
                  <div key={index} className="bg-gray-700 p-4 rounded-xl mb-4 space-y-2">
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Nome do Exercício"
                        value={ex.nome}
                        onChange={(e) => handleExerciseChange(index, 'nome', e.target.value)}
                        className="w-1/2 p-2 rounded-xl bg-gray-600 border border-gray-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Séries"
                        value={ex.series}
                        onChange={(e) => handleExerciseChange(index, 'series', e.target.value)}
                        className="w-1/4 p-2 rounded-xl bg-gray-600 border border-gray-500"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Repetições"
                        value={ex.repeticoes}
                        onChange={(e) => handleExerciseChange(index, 'repeticoes', e.target.value)}
                        className="w-1/4 p-2 rounded-xl bg-gray-600 border border-gray-500"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Carga (ex: 15kg)"
                      value={ex.carga}
                      onChange={(e) => handleExerciseChange(index, 'carga', e.target.value)}
                      className="w-full p-2 rounded-xl bg-gray-600 border border-gray-500"
                      required
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddExercise}
                  className="w-full bg-gray-600 text-white p-2 rounded-xl hover:bg-gray-500 transition-colors duration-200"
                >
                  Adicionar Exercício
                </button>
              </div>
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-bold p-3 rounded-xl hover:bg-teal-700 transition-all duration-300"
              >
                Salvar Treino
              </button>
            </form>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <icons.Send className="w-6 h-6 mr-2 text-blue-400" />
              Atribuir Treino
            </h2>
            <form onSubmit={handleAssignTreino} className="space-y-4">
              <div>
                <label className="block text-gray-400">Treino a Atribuir</label>
                <select
                  value={assignTreinoId}
                  onChange={(e) => setAssignTreinoId(e.target.value)}
                  className="w-full p-2 rounded-xl bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                >
                  <option value="">-- Selecione um Treino --</option>
                  {profTreinoData.map(treino => (
                    <option key={treino.id} value={treino.id}>{treino.titulo}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold p-3 rounded-xl hover:bg-blue-700 transition-all duration-300"
              >
                Atribuir Treino
              </button>
            </form>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4">Treinos Criados</h2>
              <ul className="space-y-2">
                {profTreinoData.map(treino => (
                  <li key={treino.id} className="bg-gray-700 p-3 rounded-xl flex justify-between items-center">
                    <span>{treino.titulo}</span>
                    <span className="text-xs text-gray-400">ID: {treino.id}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPage = () => {
    // Renderiza a página do professor ou do aluno
    if (isProfessor) {
      return <ProfessorDashboardPage />;
    }
   
    switch (currentPage) {
      case 'dashboard':
        return <AlunoDashboardPage />;
      case 'workoutDetails':
        return <WorkoutDetailsPage addPoints={(amount) => {
          const storedPoints = parseInt(localStorage.getItem('userPoints')) || 0;
          localStorage.setItem('userPoints', storedPoints + amount);
        }} />;
      default:
        return <AlunoDashboardPage />;
    }
  };

  return (
    <div className="bg-gray-900 min-h-screen font-sans">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
      `}</style>
      <div className="p-4 flex justify-end">
        <button
          onClick={() => setIsProfessor(!isProfessor)}
          className="bg-purple-600 text-white p-2 rounded-xl hover:bg-purple-700 transition-colors duration-300"
        >
          Alternar para {isProfessor ? 'Aluno' : 'Professor'}
        </button>
      </div>
      {renderPage()}
    </div>
  );
}
