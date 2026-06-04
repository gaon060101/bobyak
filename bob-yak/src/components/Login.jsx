import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, Loader2, Camera, CheckCircle2, UploadCloud } from 'lucide-react';

export default function Login({ onLogin }) {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLogin({ email, nickname: isLoginMode ? email.split('@')[0] : nickname });
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

          {/* 회원가입 시 학생증 인증 영역 통합 */}
          {!isLoginMode && (
            <div style={{ marginTop: '8px', padding: '16px', background: 'rgba(241, 245, 249, 0.7)', borderRadius: '16px', border: '1px dashed #cbd5e1' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                <CheckCircle2 size={16} color="var(--yonsei-blue)" />
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--text-dark)' }}>학생증 인증 (필수)</span>
              </div>
              
              <div style={{ marginBottom: '12px' }}>
                <input 
                  type="number" 
                  placeholder="학번 입력 (예: 2024123456)" 
                  value={studentId} 
                  onChange={(e) => setStudentId(e.target.value)} 
                  required
                  style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: '14px', outline: 'none', background: 'white' }} 
                />
              </div>

              <div>
                <input 
                  type="file" 
                  accept="image/*" 
                  ref={fileInputRef} 
                  required
                  onChange={(e) => {
                    if (e.target.files.length > 0) setIsFileUploaded(true);
                  }}
                  style={{ display: 'none' }} 
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  style={{ 
                    width: '100%', padding: '16px', borderRadius: '10px', 
                    border: isFileUploaded ? '2px solid var(--manner-green)' : '1px dashed #94a3b8', 
                    background: isFileUploaded ? '#f0fdf4' : 'white', 
                    cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', transition: 'all 0.2s' 
                  }}
                >
                  {isFileUploaded ? (
                    <>
                      <CheckCircle2 size={24} color="var(--manner-green)" />
                      <span style={{ color: 'var(--manner-green)', fontWeight: 'bold', fontSize: '13px' }}>업로드 완료</span>
                    </>
                  ) : (
                    <>
                      <Camera size={24} color="#94a3b8" />
                      <span style={{ color: 'var(--text-muted)', fontSize: '13px' }}>학생증 사진 첨부하기</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
          
          <button 
            type="submit" 
            disabled={!isLoginMode && (!studentId || !isFileUploaded)}
            className="btn-primary" 
            style={{ 
              marginTop: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '14px',
              opacity: (!isLoginMode && (!studentId || !isFileUploaded)) ? 0.5 : 1,
              cursor: (!isLoginMode && (!studentId || !isFileUploaded)) ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" size={20} /> : (isLoginMode ? '로그인' : '회원가입 완료')}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: 'var(--text-muted)' }}>
          {isLoginMode ? '계정이 없으신가요? ' : '이미 계정이 있나요? '}
          <span 
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setStudentId('');
              setIsFileUploaded(false);
            }} 
            style={{ color: 'var(--yonsei-blue)', cursor: 'pointer', fontWeight: '600' }}
          >
            {isLoginMode ? '회원가입' : '로그인'}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
