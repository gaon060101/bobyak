import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Map, Calendar, Users, MessageCircle, LogOut } from 'lucide-react';

import Login from './components/Login';
import MapTab from './components/MapTab';
import CalendarTab from './components/CalenderTab';
import MatchTab from './components/MatchTab';
import MessengerTab from './components/MessengerTab';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', nickname: '' });
  const [activeTab, setActiveTab] = useState('match'); 
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState([
    { date: new Date(new Date().setDate(new Date().getDate() - 2)).toISOString().split('T')[0], expense: 15000, plan: '', memo: '스탠바이키친 너무 맛있었음!' },
    { date: new Date().toISOString().split('T')[0], expense: 0, plan: '독수리 다방 (오후 3시)', memo: '' },
    { date: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0], expense: 0, plan: '신촌 황소곱창 (저녁)', memo: '' }
  ]);

  const [chatRooms, setChatRooms] = useState([
    { 
      id: 1, type: '매칭방', name: '마라탕킬러', avatar: '🐯', unread: 0, time: '오후 2:30',
      messages: [
        { id: 1, sender: 'other', text: '안녕하세요! 마라탕 좋아하시나요?', time: '14:28' },
        { id: 2, sender: 'me', text: '네 엄청 좋아해요!! 1주 2마라탕 합니다 ㅎㅎ', time: '14:30' }
      ]
    },
    { 
      id: 2, type: '친구방', name: '김연세', avatar: '🦅', unread: 0, time: '어제',
      messages: [
        { id: 1, sender: 'other', text: '내일 학식 고?', time: '어제' }
      ]
    },
    { 
      id: 3, type: '매칭방', name: '백양로산책러', avatar: '🐱', unread: 0, time: '어제',
      messages: [
        { id: 1, sender: 'other', text: '점심 드시고 같이 걸으실래요?', time: '어제' },
        { id: 2, sender: 'me', text: '네 좋아요! 백양로 앞에서 봬요.', time: '어제' }
      ]
    }
  ]);

  const handleLogin = (info) => {
    setUserInfo(info);
    setIsLoggedIn(true);
    setActiveTab('match');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    setUserInfo({ email: '', nickname: '' });
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const tabs = [
    { id: 'match', label: '밥약 매칭', icon: <Users size={18} /> },
    { id: 'map', label: '지도 예약', icon: <Map size={18} /> },
    { id: 'calendar', label: '내 캘린더', icon: <Calendar size={18} /> },
    { id: 'messenger', label: '메신저', icon: <MessageCircle size={18} /> }
  ];

  return (
    <div className="app-container" style={{ padding: '24px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
        
        {/* 네비게이션 바 */}
        <motion.nav 
          className="glass-panel"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ padding: '12px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', zIndex: 50, position: 'relative' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <span style={{ fontWeight: '800', fontSize: '20px', color: 'var(--yonsei-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '24px' }}>🦅</span> 연세 밥약
            </span>
            <div style={{ display: 'flex', gap: '8px' }}>
              {tabs.map(tab => (
                <button 
                  key={tab.id} 
                  onClick={() => setActiveTab(tab.id)} 
                  style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                    background: activeTab === tab.id ? 'var(--yonsei-blue)' : 'transparent', 
                    color: activeTab === tab.id ? 'white' : 'var(--text-muted)', 
                    fontWeight: activeTab === tab.id ? '600' : '500',
                    fontSize: '15px', transition: 'all 0.2s ease'
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ))}
            </div>
          </div>
          
          <div style={{ position: 'relative' }}>
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)} 
              style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '6px 16px 6px 6px', borderRadius: '100px', background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <div style={{ width: '32px', height: '32px', background: 'var(--yonsei-blue)', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '14px', fontWeight: 'bold' }}>
                {userInfo.nickname.charAt(0)}
              </div>
              <span style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>{userInfo.nickname}</span>
            </button>
            
            <AnimatePresence>
              {showUserMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  style={{ position: 'absolute', top: '50px', right: '0', background: 'white', border: '1px solid #eee', borderRadius: '16px', padding: '16px', width: '220px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)', zIndex: 100 }}
                >
                  <div style={{ fontSize: '15px', fontWeight: '700', marginBottom: '4px', color: 'var(--text-dark)' }}>{userInfo.nickname}</div>
                  <div style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '16px', wordBreak: 'break-all' }}>{userInfo.email}</div>
                  <button 
                    onClick={handleLogout} 
                    style={{ width: '100%', padding: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '10px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', transition: 'background 0.2s' }}
                    onMouseOver={e => e.currentTarget.style.background = '#fee2e2'}
                    onMouseOut={e => e.currentTarget.style.background = '#fef2f2'}
                  >
                    <LogOut size={16} /> 로그아웃
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>

        {/* 메인 콘텐츠 영역 */}
        <motion.main 
          className="glass-panel"
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          style={{ flex: 1, padding: '30px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
        >
          {activeTab === 'map' && <MapTab calendarEvents={calendarEvents} setCalendarEvents={setCalendarEvents} />}
          {activeTab === 'calendar' && <CalendarTab calendarEvents={calendarEvents} setCalendarEvents={setCalendarEvents} />}
          {activeTab === 'match' && <MatchTab userInfo={userInfo} setUserInfo={setUserInfo} chatRooms={chatRooms} setChatRooms={setChatRooms} />}
          {activeTab === 'messenger' && <MessengerTab userInfo={userInfo} chatRooms={chatRooms} setChatRooms={setChatRooms} />}
        </motion.main>
      </div>
    </div>
  );
}