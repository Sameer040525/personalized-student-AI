import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Brain,
  BookOpen,
  Calendar,
  Star,
  ChevronRight,
  Zap,
  Award,
  Users,
  MessageCircle,
  Play,
  Plus,
  BarChart3,
  Timer,
  Sparkles,
  Quote
} from 'lucide-react';
import { storage } from '../../utils/storage';
import { Note, StudySession, StudyGoal } from '../../types';
import { format, isToday, isThisWeek } from 'date-fns';

const motivationalQuotes = [
  "Keep pushing forward, your goals are closer than you think!",
  "Every study session is a step toward greatness.",
  "Master your mind, conquer your goals.",
  "The future belongs to those who prepare today.",
  "Stay focused, stay fearless, stay unstoppable."
];

const Dashboard: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  const [goals, setGoals] = useState<StudyGoal[]>([]);
  const [quote, setQuote] = useState(motivationalQuotes[0]);

  useEffect(() => {
    setNotes(storage.getNotes());
    setSessions(storage.getSessions());
    setGoals(storage.getGoals());
    // Rotate motivational quote every 30 seconds
    const quoteInterval = setInterval(() => {
      setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, 30000);
    return () => clearInterval(quoteInterval);
  }, []);

  const todaysSessions = sessions.filter(session => isToday(session.date));
  const weekSessions = sessions.filter(session => isThisWeek(session.date));
  const recentNotes = notes.slice(0, 5);
  const activeGoals = goals.filter(goal => !goal.isCompleted);

  const stats = [
    {
      label: 'Notes Created',
      value: notes.length,
      icon: BookOpen,
      color: 'text-neon-blue',
      bgColor: 'bg-gray-900',
      iconBg: 'bg-neon-blue/20'
    },
    {
      label: 'Study Time Today',
      value: `${todaysSessions.reduce((acc, s) => acc + s.duration, 0)}min`,
      icon: Clock,
      color: 'text-neon-purple',
      bgColor: 'bg-gray-900',
      iconBg: 'bg-neon-purple/20'
    },
    {
      label: 'Active Goals',
      value: activeGoals.length,
      icon: Target,
      color: 'text-neon-green',
      bgColor: 'bg-gray-900',
      iconBg: 'bg-neon-green/20'
    },
    {
      label: 'Weekly Accuracy',
      value: weekSessions.length > 0 
        ? `${Math.round(weekSessions.reduce((acc, s) => acc + s.accuracy, 0) / weekSessions.length)}%`
        : '0%',
      icon: Brain,
      color: 'text-neon-orange',
      bgColor: 'bg-gray-900',
      iconBg: 'bg-neon-orange/20'
    }
  ];

  const quickActions = [
    { label: 'Create Note', icon: BookOpen, color: 'text-neon-blue', action: () => {} },
    { label: 'Start Flashcards', icon: Brain, color: 'text-neon-purple', action: () => {} },
    { label: 'Pomodoro Timer', icon: Timer, color: 'text-neon-green', action: () => {} },
    { label: 'Take Quiz', icon: Award, color: 'text-neon-orange', action: () => {} },
    { label: 'Join Study Group', icon: Users, color: 'text-neon-pink', action: () => {} },
    { label: 'View Analytics', icon: BarChart3, color: 'text-neon-cyan', action: () => {} }
  ];

  const upcomingEvents = [
    { title: 'Math Study Group', time: 'Today, 3:00 PM', participants: 12 },
    { title: 'Physics Quiz Challenge', time: 'Tomorrow, 7:00 PM', participants: 45 },
    { title: 'Chemistry Workshop', time: 'Friday, 2:00 PM', participants: 23 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 to-teal-900 text-gray-100 overflow-hidden">
      {/* Cyberpunk Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-indigo-950/50 to-teal-900/50 opacity-80"></div>
        <div className="absolute top-10 left-10 w-64 h-64 bg-neon-blue/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-neon-pink/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="relative z-10 p-6 max-w-7xl mx-auto">
        {/* Header with Motivational Quote */}
        <div className="mb-6 bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-neon-blue/30 shadow-cyber">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-neon-blue/20 rounded-full flex items-center justify-center border border-neon-blue/50">
                <Sparkles className="w-6 h-6 text-neon-blue" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-neon-blue">Welcome, Alex!</h1>
                <p className="text-sm text-gray-400 flex items-center">
                  <Quote className="w-4 h-4 mr-2 text-neon-pink" />
                  {quote}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-neon-green">Level 12</div>
              <div className="text-sm text-gray-400">2,450 XP</div>
            </div>
          </div>
        </div>

        {/* Stats Grid with 3D Card Effect */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`${stat.bgColor} rounded-2xl p-4 border border-neon-blue/30 shadow-cyber transform hover:-translate-y-1 hover:rotate-1 transition-all duration-300`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                  <div className={`${stat.iconBg} p-3 rounded-full border border-neon-blue/50`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Left Column: Quick Actions and Recent Notes */}
          <div className="lg:col-span-3 space-y-6">
            {/* Quick Actions */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-neon-purple/30 shadow-cyber">
              <h2 className="text-lg font-bold text-neon-purple mb-4 flex items-center">
                <Zap className="w-5 h-5 mr-2 text-neon-yellow" />
                Quick Actions
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {quickActions.map((action, index) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={index}
                      onClick={action.action}
                      className="bg-gray-800/50 rounded-xl p-3 flex flex-col items-center justify-center border border-neon-blue/30 hover:bg-gray-800 hover:shadow-cyber-hover transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-neon-blue/20 rounded-full flex items-center justify-center mb-2">
                        <Icon className={`w-5 h-5 ${action.color}`} />
                      </div>
                      <p className="text-xs text-gray-300 text-center">{action.label}</p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Recent Notes */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-neon-cyan/30 shadow-cyber">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-neon-cyan flex items-center">
                  <BookOpen className="w-5 h-5 mr-2 text-neon-blue" />
                  Recent Notes
                </h2>
                <button className="text-neon-blue hover:text-neon-cyan text-sm flex items-center">
                  View All
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              {recentNotes.length > 0 ? (
                <div className="space-y-3">
                  {recentNotes.map((note) => (
                    <div
                      key={note.id}
                      className="bg-gray-800/50 rounded-xl p-3 flex items-center space-x-3 border border-neon-blue/30 hover:bg-gray-800 hover:shadow-cyber-hover transform hover:-translate-y-1 transition-all duration-300"
                    >
                      <div className="w-10 h-10 bg-neon-blue/20 rounded-full flex items-center justify-center">
                        <BookOpen className="w-5 h-5 text-neon-blue" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className="text-sm font-semibold text-gray-100">{note.title}</h3>
                          {note.isStarred && <Star className="w-4 h-4 text-neon-yellow fill-current" />}
                        </div>
                        <p className="text-xs text-gray-400 truncate">{note.content}</p>
                        <p className="text-xs text-gray-500">{format(note.updatedAt, 'MMM d, yyyy')}</p>
                      </div>
                      <div className="flex gap-1">
                        {note.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="px-2 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 mb-3">No notes yet.</p>
                  <button className="bg-neon-blue hover:bg-neon-cyan text-black px-4 py-2 rounded-xl text-sm font-semibold">
                    Create Note
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Goals, Events, Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Active Goals with Progress Rings */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-neon-green/30 shadow-cyber">
              <h2 className="text-lg font-bold text-neon-green mb-4 flex items-center">
                <Target className="w-5 h-5 mr-2 text-neon-green" />
                Active Goals
              </h2>
              {activeGoals.length > 0 ? (
                <div className="space-y-4">
                  {activeGoals.slice(0, 3).map((goal) => (
                    <div key={goal.id} className="bg-gray-800/50 rounded-xl p-3 border border-neon-green/30">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-sm font-semibold text-gray-100">{goal.title}</h3>
                        <span className="text-xs text-neon-green">{goal.progress}%</span>
                      </div>
                      <div className="relative w-16 h-16 mx-auto">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="rgba(255,255,255,0.1)"
                            strokeWidth="2"
                          />
                          <path
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                            fill="none"
                            stroke="#00ff88"
                            strokeWidth="2"
                            strokeDasharray={`${goal.progress}, 100`}
                            strokeLinecap="round"
                          />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-xs text-neon-green">
                          {goal.progress}%
                        </div>
                      </div>
                      <p className="text-xs text-gray-500 text-center mt-2">Due {format(goal.targetDate, 'MMM d')}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <Target className="w-10 h-10 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400 mb-3">Set your first goal!</p>
                  <button className="bg-neon-green hover:bg-neon-green/80 text-black px-4 py-2 rounded-xl text-sm font-semibold">
                    Create Goal
                  </button>
                </div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-neon-purple/30 shadow-cyber">
              <h2 className="text-lg font-bold text-neon-purple mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-neon-purple" />
                Upcoming Events
              </h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, index) => (
                  <div
                    key={index}
                    className="bg-gray-800/50 rounded-xl p-3 flex items-center space-x-3 border border-neon-purple/30 hover:shadow-cyber-hover transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="w-10 h-10 bg-neon-purple/20 rounded-full flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-neon-purple" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-gray-100">{event.title}</h4>
                      <p className="text-xs text-gray-400">{event.time}</p>
                      <p className="text-xs text-neon-purple">{event.participants} participants</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievement Showcase */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-neon-yellow/30 shadow-cyber">
              <h3 className="text-lg font-bold text-neon-yellow mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-neon-yellow" />
                Latest Achievement
              </h3>
              <div className="text-center">
                <div className="w-12 h-12 bg-neon-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3 border border-neon-yellow/50">
                  <Award className="w-6 h-6 text-neon-yellow" />
                </div>
                <h4 className="text-sm font-semibold text-gray-100">Study Streak Master</h4>
                <p className="text-xs text-gray-400 mb-2">15 consecutive days of studying</p>
                <div className="text-xs text-neon-yellow font-semibold">+500 XP</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Cyberpunk Aesthetic */}
      <style jsx>{`
        .shadow-cyber {
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.2), 0 0 5px rgba(0, 255, 255, 0.1);
        }
        .shadow-cyber-hover {
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.3), 0 0 8px rgba(0, 255, 255, 0.2);
        }
        .text-neon-blue {
          color: #00f0ff;
          text-shadow: 0 0 5px rgba(0, 240, 255, 0.5);
        }
        .text-neon-purple {
          color: #cc00ff;
          text-shadow: 0 0 5px rgba(204, 0, 255, 0.5);
        }
        .text-neon-green {
          color: #00ff88;
          text-shadow: 0 0 5px rgba(0, 255, 136, 0.5);
        }
        .text-neon-orange {
          color: #ff6200;
          text-shadow: 0 0 5px rgba(255, 98, 0, 0.5);
        }
        .text-neon-pink {
          color: #ff00cc;
          text-shadow: 0 0 5px rgba(255, 0, 204, 0.5);
        }
        .text-neon-cyan {
          color: #00ccff;
          text-shadow: 0 0 5px rgba(0, 204, 255, 0.5);
        }
        .text-neon-yellow {
          color: #ffee00;
          text-shadow: 0 0 5px rgba(255, 238, 0, 0.5);
        }
        .bg-neon-blue {
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(0, 240, 255, 0.1));
        }
        .bg-neon-purple {
          background: linear-gradient(135deg, rgba(204, 0, 255, 0.2), rgba(204, 0, 255, 0.1));
        }
        .bg-neon-green {
          background: linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 255, 136, 0.1));
        }
        .bg-neon-orange {
          background: linear-gradient(135deg, rgba(255, 98, 0, 0.2), rgba(255, 98, 0, 0.1));
        }
        .bg-neon-pink {
          background: linear-gradient(135deg, rgba(255, 0, 204, 0.2), rgba(255, 0, 204, 0.1));
        }
        .bg-neon-cyan {
          background: linear-gradient(135deg, rgba(0, 204, 255, 0.2), rgba(0, 204, 255, 0.1));
        }
        .bg-neon-yellow {
          background: linear-gradient(135deg, rgba(255, 238, 0, 0.2), rgba(255, 238, 0, 0.1));
        }
      `}</style>
    </div>
  );
};

export default Dashboard;