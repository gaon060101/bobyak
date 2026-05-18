import { useState } from 'react';
import MapTab from './components/MapTab';
import CalendarTab from './components/CalenderTab';
import MatchTab from './components/MatchTab';
import MessengerTab from './components/MessengerTab';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', nickname: '' });
  const [activeTab, setActiveTab] = useState('map'); 
  
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setUserInfo({ 
        email: emailInput, 
        nickname: nicknameInput || emailInput.split('@')[0] 
      });
      setIsLoggedIn(true);
      setActiveTab('map'); 
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowUserMenu(false);
    setEmailInput('');
    setPasswordInput('');
    setNicknameInput('');
    setUserInfo({ email: '', nickname: '' });
  };

  if (!isLoggedIn) {
    return (
      <div style={{ fontFamily: 'system-ui', background: '#f4f6f9', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        {/* 깨졌던 너비 설정을 maxWidth: '400px', width: '100%'로 완벽 복구 */}
        <div style={{ padding: '35px', maxWidth: '400px', width: '100%', background: 'white', borderRadius: '30px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', boxSizing: 'border-box' }}>
          <div style={{ textAlign: 'center', marginBottom: '25px' }}>
            <div style={{ fontSize: '40px' }}>🦉</div>
            <h2 style={{ color: '#007bff', margin: '5px 0', fontSize: '24px' }}>연세 밥약</h2>
            <p style={{ margin: 0, fontSize: '13.5px', color: '#888' }}>
              {isLoginMode ? '서비스 이용을 위해 로그인해주세요.' : '환영합니다! 정보를 입력해주세요.'}
            </p>
          </div>
          
          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {!isLoginMode && (
              <input type="text" placeholder="닉네임" value={nicknameInput} onChange={(e) => setNicknameInput(e.target.value)} required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }} />
            )}
            <input type="email" placeholder="이메일 (@yonsei.ac.kr)" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }} />
            <input type="password" placeholder="비밀번호" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} required style={{ padding: '12px', borderRadius: '10px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }} />
            <button type="submit" style={{ padding: '14px', background: '#007bff', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', marginTop: '5px', fontSize: '14px' }}>
              {isLoginMode ? '로그인' : '회원가입 완료'}
            </button>
          </form>
          
          <div style={{ textAlign: 'center', marginTop: '15px', fontSize: '12.5px', color: '#666' }}>
            {isLoginMode ? '계정이 없으신가요? ' : '이미 계정이 있나요? '}
            <span onClick={() => setIsLoginMode(!isLoginMode)} style={{ color: '#007bff', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
              {isLoginMode ? '회원가입' : '로그인'}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ fontFamily: 'system-ui', background: '#f4f6f9', minHeight: '100vh', padding: '20px 10px', boxSizing: 'border-box' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* 글로벌 네비게이션 바 */}
        <nav style={{ background: 'white', padding: '12px 25px', borderRadius: '25px', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
            <span style={{ fontWeight: 'bold', fontSize: '17px', color: '#007bff' }}>연세 밥약 🦉</span>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[
                { id: 'map', label: '🗺️ 지도 예약' },
                { id: 'calendar', label: '📅 내 캘린더' },
                { id: 'match', label: '🤝 밥약 매칭' },
                { id: 'messenger', label: '💬 메신저' }
              ].map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding: '8px 14px', borderRadius: '12px', border: 'none', cursor: 'pointer', background: activeTab === tab.id ? '#f0f7ff' : 'transparent', color: activeTab === tab.id ? '#007bff' : '#666', fontWeight: activeTab === tab.id ? 'bold' : 'normal', fontSize: '13.5px', transition: 'all 0.2s' }}>{tab.label}</button>
              ))}
            </div>
          </div>
          
          <button onClick={() => setShowUserMenu(!showUserMenu)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', borderRadius: '20px', background: 'white', border: '1px solid #e0e0e0', cursor: 'pointer' }}>
            <div style={{ width: '26px', height: '26px', background: '#007bff', color: 'white', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px', fontWeight: 'bold' }}>{userInfo.nickname.charAt(0)}</div>
            <span style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#555' }}>{userInfo.nickname} 님</span>
          </button>
          
          {showUserMenu && (
            <div style={{ position: 'absolute', top: '60px', right: '25px', background: 'white', border: '1px solid #eee', borderRadius: '12px', padding: '12px', width: '180px', boxShadow: '0 8px 20px rgba(0,0,0,0.08)', zIndex: 100 }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '3px', color: '#333' }}>{userInfo.nickname}</div>
              <div style={{ fontSize: '11px', color: '#888', marginBottom: '10px', wordBreak: 'break-all' }}>{userInfo.email}</div>
              <button onClick={handleLogout} style={{ width: '100%', padding: '6px', background: '#ffeeee', color: '#c62828', border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}>로그아웃</button>
            </div>
          )}
        </nav>

        <main style={{ background: 'white', borderRadius: '35px', padding: '25px', boxShadow: '0 8px 25px rgba(0,0,0,0.02)', minHeight: '560px', boxSizing: 'border-box' }}>
          {activeTab === 'map' && <MapTab />}
          {activeTab === 'calendar' && <CalendarTab />}
          {activeTab === 'match' && <MatchTab />}
          {activeTab === 'messenger' && <MessengerTab />}
        </main>
      </div>
    </div>
  );
}