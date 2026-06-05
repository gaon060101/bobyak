import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, Search, MapPin, Heart, Coffee, Beer, UserCheck, ThermometerSun, AlertCircle, X, Edit2 } from 'lucide-react';

export default function MatchTab({ userInfo, setUserInfo }) {
  const [activeFilters, setActiveFilters] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const [editForm, setEditForm] = useState({
    nickname: userInfo?.nickname || '',
    dept: userInfo?.dept || '학과를 입력하세요',
    region: userInfo?.region || '서울',
    gender: userInfo?.gender || '선택안함',
    alcohol: userInfo?.alcohol || '알쓰',
    intro: userInfo?.intro || '한 줄 소개를 입력해주세요.',
    tags: userInfo?.tags ? userInfo.tags.join(', ') : '#맛집탐방, #INTJ'
  });
  
  // 가상 사용자 데이터 (8명) - 설문조사 기반 관심사 및 주량 등 포함
  const mockUsers = [
    { id: 1, nickname: '마라탕킬러', dept: '경영학과 22', region: '서울', temp: 42.5, tags: ['#마라탕', '#맛집탐방', '#ENFP'], alcohol: '술고래', similarity: 98, avatar: '🐯', intro: '수업 끝나고 마라탕 부술 분 구해요!' },
    { id: 2, nickname: '코딩하는독수리', dept: '컴퓨터과학과 23', region: '경기', temp: 36.5, tags: ['#코딩', '#LP바', '#INTP'], alcohol: '보통', similarity: 92, avatar: '🦅', intro: '개발 얘기 하면서 조용히 밥 먹고 싶어요.' },
    { id: 3, nickname: '백양로산책러', dept: '문헌정보학과 24', region: '부산', temp: 38.0, tags: ['#산책', '#카페', '#ISFJ'], alcohol: '알쓰', similarity: 85, avatar: '🐱', intro: '밥 먹고 백양로 산책하는 거 좋아합니다~' },
    { id: 4, nickname: '신촌고인물', dept: '기계공학부 20', region: '서울', temp: 45.2, tags: ['#노포맛집', '#소주', '#ENTJ'], alcohol: '술고래', similarity: 70, avatar: '👴', intro: '신촌 맛집은 제가 다 압니다. 따라오시죠.' },
    { id: 5, nickname: '도서관지박령', dept: '수학과 22', region: '대전', temp: 37.1, tags: ['#카공', '#조용한식사', '#ISTJ'], alcohol: '알쓰', similarity: 65, avatar: '📚', intro: '빠르게 밥 먹고 다시 공부하실 분!' },
    { id: 6, nickname: '음악인', dept: '관현악과 23', region: '대구', temp: 39.5, tags: ['#클래식', '#와인', '#INFJ'], alcohol: '보통', similarity: 55, avatar: '🎻', intro: '와인 한 잔 하면서 음악 얘기 나누고 싶어요.' },
    { id: 7, nickname: '운동중독', dept: '체육교육과 21', region: '인천', temp: 40.0, tags: ['#단백질', '#헬스', '#ESTP'], alcohol: '알쓰', similarity: 40, avatar: '💪', intro: '닭가슴살 샐러드 드실 분? 근손실 방지 필수!' },
    { id: 8, nickname: '프로혼밥러', dept: '생명과학부 24', region: '제주', temp: 36.5, tags: ['#혼밥탈출', '#아무거나', '#ISFP'], alcohol: '보통', similarity: 30, avatar: '🌿', intro: '혼밥이 지겨워서 용기 내어 봅니다...' }
  ];

  const filters = ['나와 비슷한 성향', '맛집탐방', '마라탕', '코딩', '알쓰', '술고래', 'ENTJ', 'INTJ'];

  const toggleFilter = (filter) => {
    if (activeFilters.includes(filter)) {
      setActiveFilters(activeFilters.filter(f => f !== filter));
    } else {
      setActiveFilters([...activeFilters, filter]);
    }
  };

  const filteredUsers = mockUsers.filter(user => {
    if (activeFilters.length === 0) return true;
    
    // Check if user matches ALL active filters
    return activeFilters.every(filter => {
      if (filter === '나와 비슷한 성향') return user.similarity > 80;
      if (['알쓰', '보통', '술고래'].includes(filter)) return user.alcohol === filter;
      return user.tags.some(tag => tag.includes(filter));
    });
  }).sort((a, b) => b.similarity - a.similarity); // 유사도 기반 상위 노출

  const getTempColor = (temp) => {
    if (temp >= 40) return 'var(--manner-red)';
    if (temp >= 37) return 'var(--manner-orange)';
    if (temp >= 36.5) return 'var(--manner-green)';
    return 'var(--manner-blue)';
  };

  return (
    <div style={{ display: 'flex', gap: '24px', flex: 1, height: '100%', minHeight: 0, width: '100%' }}>
      {/* 내 프로필 카드 (좌측 고정) */}
      <div style={{ width: '280px', minWidth: '280px', flexShrink: 0, background: 'linear-gradient(145deg, #ffffff, #f8fafc)', borderRadius: '24px', padding: '24px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--yonsei-blue)', color: 'white', fontSize: '32px', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto 12px', boxShadow: '0 8px 20px rgba(0,56,118,0.2)' }}>
            {userInfo.nickname.charAt(0)}
          </div>
          <h3 style={{ margin: '0 0 4px', fontSize: '18px' }}>{userInfo?.nickname}</h3>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '4px', color: 'var(--text-muted)', fontSize: '13px', marginBottom: '8px' }}>
            <MapPin size={12} /> {userInfo?.region || '지역 입력안됨'} • {userInfo?.dept || '소속 입력안됨'} {userInfo?.gender && userInfo.gender !== '선택안함' && `• ${userInfo.gender}`}
          </div>
          <p style={{ fontSize: '12px', color: 'var(--text-dark)', wordBreak: 'keep-all', margin: 0 }}>
            "{userInfo?.intro || '한 줄 소개가 없습니다.'}"
          </p>
        </div>

        <div style={{ background: '#f1f5f9', padding: '16px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold' }}>내 매너 온도</span>
            <span style={{ color: 'var(--manner-green)', fontWeight: 'bold', fontSize: '15px' }}>36.5°C</span>
          </div>
          <div style={{ width: '100%', height: '8px', background: '#e2e8f0', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{ width: '36.5%', height: '100%', background: 'var(--manner-green)', borderRadius: '4px' }}></div>
          </div>
          <p style={{ margin: '8px 0 0', fontSize: '11px', color: 'var(--text-muted)' }}>
            <AlertCircle size={10} style={{ display: 'inline', marginRight: '2px' }}/>
            첫 온도 36.5°C에서 시작하여 평가에 따라 증감합니다. 빌런 방지 시스템 적용 중!
          </p>
        </div>

        <div style={{ flex: 1 }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '14px', color: 'var(--text-muted)' }}>내 취향 프로필</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {userInfo?.tags ? userInfo.tags.map(tag => (
              <span key={tag} className="tag active" style={{ background: '#f1f5f9', color: 'var(--text-dark)' }}>{tag}</span>
            )) : (
              <>
                <span className="tag active" style={{ background: '#fef3c7', color: '#d97706' }}><Coffee size={12} /> 맛집탐방</span>
                <span className="tag active" style={{ background: '#dbeafe', color: '#2563eb' }}><UserCheck size={12} /> INTJ</span>
              </>
            )}
            <span className="tag active" style={{ background: userInfo?.alcohol === '알쓰' ? '#fee2e2' : '#dbeafe', color: userInfo?.alcohol === '알쓰' ? '#dc2626' : '#2563eb' }}>
              <Beer size={12} /> {userInfo?.alcohol || '알쓰'}
            </span>
          </div>
        </div>

        <button className="btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }} onClick={() => setIsEditing(true)}>
          <Edit2 size={14} /> 내 정보 수정
        </button>
      </div>

      {/* 매칭 리스트 영역 (우측) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, minHeight: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '20px', margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--yonsei-blue)' }}>
            <Heart size={20} fill="var(--yonsei-blue)" /> 밥약 매칭풀
          </h2>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="var(--text-muted)" style={{ position: 'absolute', top: '10px', left: '12px' }} />
            <input type="text" placeholder="닉네임, 키워드 검색" style={{ padding: '8px 16px 8px 36px', borderRadius: '100px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px' }} />
          </div>
        </div>

        {/* 필터 칩스 */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '4px' }} className="hide-scroll">
          <button 
            style={{ padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', border: '1px solid var(--yonsei-blue)', background: 'white', color: 'var(--yonsei-blue)', display: 'flex', alignItems: 'center', gap: '4px', transition: 'all 0.2s' }}
            onClick={() => setActiveFilters([])}
          >
            <Filter size={14} /> 필터 초기화 {activeFilters.length > 0 && `(${activeFilters.length})`}
          </button>
          {filters.map(filter => {
            const isActive = activeFilters.includes(filter);
            return (
              <button 
                key={filter} 
                onClick={() => toggleFilter(filter)}
                style={{ 
                  padding: '8px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
                  border: isActive ? 'none' : '1px solid #e2e8f0',
                  background: isActive ? 'var(--yonsei-blue)' : 'white',
                  color: isActive ? 'white' : 'var(--text-muted)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center'
                }}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* 유저 카드 그리드 */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px', overflowY: 'auto', paddingRight: '8px', flex: 1, minHeight: 0, paddingBottom: '20px', alignContent: 'start' }}>
          <AnimatePresence>
            {filteredUsers.map((user, idx) => (
              <motion.div 
                key={user.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: idx * 0.05 }}
                style={{ background: 'white', borderRadius: '20px', padding: '20px', border: '1px solid #e2e8f0', position: 'relative', display: 'flex', flexDirection: 'column' }}
              >
                {/* 유사도 뱃지 */}
                {user.similarity > 80 && (
                  <div style={{ position: 'absolute', top: '0', right: '0', background: 'var(--yonsei-blue)', color: 'white', padding: '4px 12px', borderBottomLeftRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                    유사도 {user.similarity}%
                  </div>
                )}
                
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#f1f5f9', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px' }}>
                    {user.avatar}
                  </div>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{user.nickname}</span>
                      <span style={{ fontSize: '12px', color: getTempColor(user.temp), fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
                        {user.temp}°C
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      {user.dept} • <MapPin size={10} /> {user.region}
                    </div>
                  </div>
                </div>

                <p style={{ margin: '0 0 16px', fontSize: '13px', color: 'var(--text-dark)', lineHeight: '1.4', wordBreak: 'break-word' }}>
                  "{user.intro}"
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px', marginTop: 'auto' }}>
                  {user.tags.map(tag => {
                    const isCommon = userInfo?.tags?.some(myTag => tag.includes(myTag.replace('#', '')));
                    return (
                      <span key={tag} style={{ 
                        background: isCommon ? '#dbeafe' : '#f1f5f9', 
                        color: isCommon ? '#2563eb' : 'var(--text-muted)', 
                        border: isCommon ? '1px solid #bfdbfe' : '1px solid transparent',
                        padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' 
                      }}>
                        {tag} {isCommon && '✨'}
                      </span>
                    );
                  })}
                  <span style={{ background: user.alcohol === '알쓰' ? '#fee2e2' : '#dbeafe', color: user.alcohol === '알쓰' ? '#dc2626' : '#2563eb', padding: '4px 8px', borderRadius: '6px', fontSize: '11px', fontWeight: '600' }}>
                    {user.alcohol}
                  </span>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '16px' }}>
                  <button className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '14px' }}>
                    밥약 신청하기
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
      
      {/* 정보 수정 모달 */}
      <AnimatePresence>
        {isEditing && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ background: 'white', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ margin: 0, fontSize: '20px', color: 'var(--yonsei-blue)' }}>내 정보 수정</h3>
                <button onClick={() => setIsEditing(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px', maxHeight: '60vh', overflowY: 'auto', paddingRight: '8px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>닉네임</label>
                    <input type="text" value={editForm.nickname} onChange={(e) => setEditForm({...editForm, nickname: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>소속(전공/학번)</label>
                    <input type="text" value={editForm.dept} onChange={(e) => setEditForm({...editForm, dept: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>한 줄 소개</label>
                  <input type="text" value={editForm.intro} onChange={(e) => setEditForm({...editForm, intro: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>출신 지역</label>
                    <input type="text" value={editForm.region} onChange={(e) => setEditForm({...editForm, region: e.target.value})} placeholder="예: 서울, 부산..." style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>성별</label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {['남자', '여자'].map(g => (
                        <button key={g} onClick={() => setEditForm({...editForm, gender: g})} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: editForm.gender === g ? '2px solid var(--yonsei-blue)' : '1px solid #e2e8f0', background: editForm.gender === g ? '#f0f6ff' : 'white', cursor: 'pointer', fontWeight: 'bold', color: editForm.gender === g ? 'var(--yonsei-blue)' : 'var(--text-muted)' }}>{g}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>해시태그 (쉼표로 구분)</label>
                  <input type="text" value={editForm.tags} onChange={(e) => setEditForm({...editForm, tags: e.target.value})} placeholder="#맛집탐방, #영화" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>내 주량</label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {['알쓰', '보통', '술고래'].map(a => (
                      <button key={a} onClick={() => setEditForm({...editForm, alcohol: a})} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: editForm.alcohol === a ? '2px solid var(--yonsei-blue)' : '1px solid #e2e8f0', background: editForm.alcohol === a ? '#f0f6ff' : 'white', cursor: 'pointer', fontWeight: 'bold', color: editForm.alcohol === a ? 'var(--yonsei-blue)' : 'var(--text-muted)' }}>{a}</button>
                    ))}
                  </div>
                </div>
              </div>
              
              <button className="btn-primary" style={{ width: '100%', padding: '14px' }} onClick={() => {
                if(setUserInfo) {
                  const tagsArray = editForm.tags.split(',').map(t => t.trim()).filter(t => t);
                  setUserInfo(prev => ({ ...prev, ...editForm, tags: tagsArray }));
                }
                setIsEditing(false);
              }}>저장하기</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}