import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Loader2 } from 'lucide-react';

export default function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email, nickname: nickname || email.split('@')[0] });
    }, 1000);
  };

  return (
    <div className="app-container" style={{ justifyContent: 'center', alignItems: 'center' }}>
      <motion.div 
        className="glass-panel"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ padding: '40px', width: '100%', maxWidth: '420px', margin: '20px' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{ fontSize: '48px', marginBottom: '10px' }}>🦉</div>
          <h2 style={{ margin: 0, color: 'var(--yonsei-blue)', fontSize: '28px', fontWeight: '700' }}>연세 밥약</h2>
          <p style={{ margin: '10px 0 0', color: 'var(--text-muted)', fontSize: '15px' }}>
            {isLoginMode ? '서비스 이용을 위해 로그인해주세요.' : '환영합니다! 정보를 입력해주세요.'}
          </p>
        </div>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLoginMode && (
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', top: '14px', left: '16px', color: '#94a3b8' }} size={20} />
              <input 
                type="text" 
                placeholder="닉네임" 
                value={nickname} 
                onChange={(e) => setNickname(e.target.value)} 
                required 
                style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', background: 'rgba(255,255,255,0.8)' }} 
              />
            </div>
          )}
          
          <div style={{ position: 'relative' }}>
            <Mail style={{ position: 'absolute', top: '14px', left: '16px', color: '#94a3b8' }} size={20} />
            <input 
              type="email" 
              placeholder="이메일 (@yonsei.ac.kr)" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', background: 'rgba(255,255,255,0.8)' }} 
            />
          </div>
          
          <div style={{ position: 'relative' }}>
            <Lock style={{ position: 'absolute', top: '14px', left: '16px', color: '#94a3b8' }} size={20} />
            <input 
              type="password" 
              placeholder="비밀번호" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '15px', outline: 'none', background: 'rgba(255,255,255,0.8)' }} 
            />
          </div>
          
          <button type="submit" className="btn-primary" style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px' }}>
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLoginMode ? '로그인' : '회원가입 완료')}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          {isLoginMode ? '계정이 없으신가요? ' : '이미 계정이 있나요? '}
          <span onClick={() => setIsLoginMode(!isLoginMode)} style={{ color: 'var(--yonsei-blue)', cursor: 'pointer', fontWeight: '600' }}>
            {isLoginMode ? '회원가입' : '로그인'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
