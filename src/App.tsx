import React, { useState } from 'react';
import Sidebar from './components/Layout/SideBar';
import Dashboard from './components/Dashboard/Dashboard';
import NotesManager from './components/Notes/NotesManager';
import AudioNotes from './components/Audio/AudioNotes';
import FlashcardsManager from './components/Flashcards/FlashcardsManager';
import StudyPlanner from './components/Study/StudyPlanner';
import QuizManager from './components/Quiz/QuizManager';
import PomodoroTimer from './components/Pomodoro/PomodoroTimer';
import StudyAnalytics from './components/Analytics/StudyAnalytics';
import CommunityHub from './components/Community/CommunityHub';
import StudyGroups from './components/Community/StudyGroups';
import StudyBuddies from './components/Community/StudyBuddies';
import Challenges from './components/Community/Challenges';
import Leaderboard from './components/Community/Leaderboard';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'notes':
        return <NotesManager />;
      case 'audio':
        return <AudioNotes />;
      case 'flashcards':
        return <FlashcardsManager />;
      case 'quiz':
        return <QuizManager />;
      case 'pomodoro':
        return <PomodoroTimer />;
      case 'study':
        return <StudyPlanner />;
      case 'analytics':
        return <StudyAnalytics />;
      case 'community':
        return <CommunityHub />;
      case 'study-groups':
        return <StudyGroups />;
      case 'discussions':
        return <CommunityHub />;
      case 'study-buddies':
        return <StudyBuddies />;
      case 'events':
        return <CommunityHub />;
      case 'challenges':
        return <Challenges />;
      case 'leaderboard':
        return <Leaderboard />;
      case 'library':
        return (
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-full flex items-center justify-center">
            <div className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">Library Coming Soon</h2>
              <p className="text-gray-300">Organize and browse all your study materials in style</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-full flex items-center justify-center">
            <div className="text-center bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">Settings Coming Soon</h2>
              <p className="text-gray-300">Customize your study experience with advanced options</p>
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex-1 overflow-hidden">
        <div className="h-full overflow-y-auto bg-white/5 backdrop-blur-md">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default App;