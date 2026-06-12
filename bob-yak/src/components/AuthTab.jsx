import { useState } from 'react';

export default function AuthTab() {
  const [isLogin, setIsLogin] = useState(true); // true: 로그인 모드, false: 회원가입 모드
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // 폼 입력 데이터 상태 관리
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  // 로그인 & 회원가입 가상 처리 핸들러
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // 1초 동안 가상으로 서버랑 통신하는 척하기
    setTimeout(() => {
      setIsLoading(false);
      setIsLoggedIn(true);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail('');
    setPassword('');
    setNickname('');
  };

  // 로그인 성공 후 보여지는 가상 프로필 화면
  if (isLoggedIn) {
    return (
      <div style={{ padding: '30px', maxWidth: '400px', margin: '40px auto', background: 'white', borderRadius: '30px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)', textAlign: 'center', animation: 'fadeIn 0.4s ease' }}>
        <div style={{ fontSize: '50px', marginBottom: '15px' }}>🦅</div>
        <h3 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '20px' }}>
          {nickname || email.split('@')[0]}님, 환영합니다!
        </h3>
        <p style={{ fontSize: '13.5px', color: '#666', marginBottom: '25px', lineHeight: '1.4' }}>
          성공적으로 가상 인증이 완료되었습니다.<br />이제 자유롭게 밥약 서비스를 이용해보세요!
        </p>
        
        {/* 개발용 디버깅 가상 세션 정보 */}
        <div style={{ background: '#f8f9fa', padding: '15px', borderRadius: '20px', fontSize: '12px', color: '#555', textAlign: 'left', marginBottom: '25px', border: '1px solid #eee' }}>
          <strong style={{ color: '#007bff' }}>🔒 Mock Session Active (No DB)</strong>
          <div style={{ marginTop: '8px', textOverflow: 'ellipsis', overflow: 'hidden' }}>• 계정: {email}</div>
          <div>• 닉네임: {nickname || email.split('@')[0]}</div>
          <div style={{ color: '#2e7d32', fontWeight: 'bold' }}>• 상태: 로컬 가상 토큰 발급 완료</div>
        </div>

        <button 
          onClick={handleLogout}
          style={{ width: '100%', padding: '14px', background: '#ff5252', color: 'white', border: 'none', borderRadius: '15px', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer', transition: 'background 0.2s' }}
        >
          로그아웃
        </button>
      </div>
    );
  }

  // 로그인 / 회원가입 입력 양식 화면
  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '40px auto', width: '100%', boxSizing: 'border-box' }}>
      <div style={{ background: 'white', padding: '35px', borderRadius: '30px', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
        
        {/* 헤더 타이틀 */}
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 10px 0', color: '#333', fontSize: '22px' }}>
            {isLogin ? '반가워요! 👋' : '함께 가입해요! 🐑'}
          </h2>
          <p style={{ margin: 0, fontSize: '13.5px', color: '#888', lineHeight: '1.4' }}>
            {isLogin ? '로그인 창으로 넘어가 인증하는 척을 시작합니다.' : '몇 가지 양식만 채워 가상 회원으로 등록하세요.'}
          </p>
        </div>

        {/* 폼 본문 */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          {/* 회원가입 모드일 때만 닉네임 입력란 렌더링 */}
          {!isLogin && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#555' }}>닉네임</label>
              <input 
                type="text" 
                placeholder="예: 신촌올빼미" 
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
                style={{ padding: '12px 15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', background: '#fafafa' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#555' }}>이메일 주소</label>
            <input 
              type="email" 
              placeholder="example@yonsei.ac.kr" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ padding: '12px 15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', background: '#fafafa' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <label style={{ fontSize: '12.5px', fontWeight: 'bold', color: '#555' }}>비밀번호</label>
            <input 
              type="password" 
              placeholder="비밀번호를 입력하세요" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ padding: '12px 15px', borderRadius: '12px', border: '1px solid #ddd', fontSize: '14px', outline: 'none', background: '#fafafa' }}
            />
          </div>

          {/* 인증용 로그인 / 회원가입 버튼 */}
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              marginTop: '10px', padding: '14px', 
              background: isLoading ? '#aaa' : '#007bff', 
              color: 'white', border: 'none', borderRadius: '15px', 
              fontSize: '14px', fontWeight: 'bold', cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px',
              boxShadow: isLoading ? 'none' : '0 4px 12px rgba(0,123,255,0.15)',
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? (
              <>
                <div className="btn-spinner"></div>
                {isLogin ? '로그인 처리 중...' : '회원 등록 중...'}
              </>
            ) : (
              isLogin ? '로그인하기' : '회원가입 완료'
            )}
          </button>
        </form>

        {/* 하단 로그인/회원가입 토글 스위치 링크 */}
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#666' }}>
          {isLogin ? '아직 계정이 없으신가요?' : '이미 계정이 있으신가요?'} {' '}
          <button 
            onClick={() => { setIsLogin(!isLogin); }}
            style={{ background: 'none', border: 'none', color: '#007bff', fontWeight: 'bold', cursor: 'pointer', padding: 0, textDecoration: 'underline' }}
          >
            {isLogin ? '회원가입하기' : '로그인하기'}
          </button>
        </div>

      </div>

      {/* 버튼 내부 스피너 애니메이션 CSS 임베디드 */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .btn-spinner {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255,255,255,0.4);
          border-radius: 50%;
          border-top-color: white;
          animation: spin-loading 0.8s linear infinite;
        }
        @keyframes spin-loading {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}