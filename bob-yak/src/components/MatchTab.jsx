import { useState } from 'react';

export default function MatchTab() {
  const [myProfile, setMyProfile] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('남성');
  const [alcohol, setAlcohol] = useState('반 병'); 
  const [foodTaste, setFoodTaste] = useState('');
  const [hobby, setHobby] = useState('');

  const [selectedTag, setSelectedTag] = useState('전체');
  const [requestedIds, setRequestedIds] = useState([]);

  const matchingPool = [
    { id: 1, name: "신촌훠궈왕", age: 22, gender: "남성", alcohol: "2병 이상", dept: "컴퓨터과학과", tags: ["#마라탕", "#하이디라오", "#코딩"], intro: "하이디라오 소스 개꿀조합 마스터임. 4단계 같이 격파해요! 🍲", emoji: "🐑" },
    { id: 2, name: "송도코알라", age: 20, gender: "여성", alcohol: "알쓰", dept: "경영학과", tags: ["#카페", "#디저트", "#수다"], intro: "예쁜 감성 카페 탐방하면서 조잘조잘 떠들 메이트 구함 ☕", emoji: "🍰" },
    { id: 3, name: "독수리피아노", age: 24, gender: "남성", alcohol: "1병~1병반", dept: "교회음악과", tags: ["#음악", "#LP바", "#술집"], intro: "창천동 LP바 단골입니다. 레트로 음악 들으면서 친해져요 🎵", emoji: "🎹" },
    { id: 4, name: "연세올빼미", age: 21, gender: "여성", alcohol: "반 병", dept: "의류환경학과", tags: ["#일식", "#초밥", "#동물"], intro: "초밥에 진심인 사람! 밤샘 공부할 야식 메이트도 대환영 구함 🦉", emoji: "🦉" },
    { id: 5, name: "연세호날두", age: 23, gender: "남성", alcohol: "1병", dept: "체육교육학과", tags: ["#축구", "#삼겹살", "#운동"], intro: "운동 깔끔하게 뿌시고 쟁반집 고기 굽굽할 든든한 동기 모집 ⚽", emoji: "⚽" },
    { id: 6, name: "백양로요정", age: 21, gender: "여성", alcohol: "알쓰", dept: "영어영문학과", tags: ["#치킨", "#영화", "#카페"], intro: "수업 끝나고 가볍게 아웃닭 치맥 때릴 분 (전 콜라 마심) 🍗", emoji: "🧚" },
    { id: 7, name: "화공과공대장", age: 25, gender: "남성", alcohol: "3병 이상", dept: "화학공학과", tags: ["#술집", "#곱창", "#코딩"], intro: "신촌 황소곱창에 이슬 진하게 달릴 고학번 동지들 컴온 🍻", emoji: "🧪" },
    { id: 8, name: "창천동동글이", age: 22, gender: "여성", alcohol: "1병", dept: "산업디자인학과", tags: ["#기획", "#디저트", "#음악"], intro: "기하학 테마 카페 투어 좋아하는 동글이입니다 🟡", emoji: "🎨" }
  ];

  const popularTags = ["전체", "#마라탕", "#코딩", "#카페", "#음악", "#축구", "#술집"];

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    if (!age || !foodTaste || !hobby) return;
    
    // 생략되었던 태그 파싱 로직을 유실 없이 완전 복구!
    const parsedTags = [
      ...foodTaste.split(',').map(t => `#${t.trim()}`), 
      ...hobby.split(',').map(t => `#${t.trim()}`)
    ];

    setMyProfile({ university: "연세대학교", age, gender, alcohol, tags: parsedTags });
  };

  const handleRequestMatch = (id) => {
    if (requestedIds.includes(id)) {
      setRequestedIds(prev => prev.filter(reqId => reqId !== id));
    } else {
      setRequestedIds(prev => [...prev, id]);
      alert("매칭 시그널이 전송되었습니다! 메신저에서 대화방이 활성화되는지 확인하세요 ✨");
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', animation: 'fadeIn 0.3s ease' }}>
      {!myProfile ? (
        <div style={{ maxWidth: '480px', margin: '20px auto', width: '100%' }}>
          <div style={{ background: 'white', padding: '30px', borderRadius: '25px', border: '1px solid #eee' }}>
            <h3 style={{ margin: '0 0 8px 0' }}>🤝 매칭 레이더 등록</h3>
            <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#888' }}>연대 학우들과의 결 매칭을 위해 관심사와 주량을 적어주세요.</p>
            <form onSubmit={handleProfileSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>나이</label>
                  <input type="number" placeholder="나이" value={age} onChange={(e) => setAge(e.target.value)} required style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} />
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>성별</label>
                  <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: '#fff', outline: 'none' }}>
                    <option value="남성">남성</option>
                    <option value="여성">여성</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>평소 주량</label>
                <select value={alcohol} onChange={(e) => setAlcohol(e.target.value)} style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', background: '#fff', outline: 'none' }}>
                  <option value="알쓰">귀여운 알쓰 🥤</option>
                  <option value="반 병">기분 좋게 반 병 🥂</option>
                  <option value="1병">깔끔한 소주 1병 👍</option>
                  <option value="2병 이상">술고래 환영 🍻</option>
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>음식 취향 (쉼표로 구분)</label>
                <input type="text" placeholder="예: 마라탕, 하이디라오, 곱창" value={foodTaste} onChange={(e) => setFoodTaste(e.target.value)} required style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <label style={{ fontSize: '12px', fontWeight: 'bold', color: '#555' }}>취미 관심사 (쉼표로 구분)</label>
                <input type="text" placeholder="예: 코딩, LP바, 음악, 축구" value={hobby} onChange={(e) => setHobby(e.target.value)} required style={{ padding: '10px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' }} />
              </div>
              <button type="submit" style={{ padding: '14px', background: '#007bff', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>매칭 풀 입장하기 🚀</button>
            </form>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ margin: 0, marginBottom: '5px' }}>🤝 밥약 매칭 매트릭스</h2>
              <p style={{ margin: 0, fontSize: '13.5px', color: '#666' }}>관심 해시태그와 주량 지표를 필터링해 맞춤 연대생 메이트를 선별합니다.</p>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <div style={{ fontSize: '12px', background: '#e0f7fa', color: '#006064', padding: '6px 12px', borderRadius: '15px', fontWeight: 'bold' }}>🍶 내 주량: {myProfile.alcohol}</div>
              <button onClick={() => setMyProfile(null)} style={{ background: '#fff', border: '1px solid #007bff', color: '#007bff', padding: '6px 12px', borderRadius: '15px', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s' }}>내 정보 수정</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '5px' }}>
            {popularTags.map(tag => (
              <button key={tag} onClick={() => setSelectedTag(tag)} style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: selectedTag === tag ? 'none' : '1px solid #e0e0e0', background: selectedTag === tag ? '#007bff' : 'white', color: selectedTag === tag ? 'white' : '#555', cursor: 'pointer', whiteSpace: 'nowrap' }}>{tag === '전체' ? '🌐 전체 매칭 풀' : tag}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '15px' }}>
            {matchingPool.filter(u => selectedTag === '전체' || u.tags.includes(selectedTag)).map(user => {
              const isRequested = requestedIds.includes(user.id);
              return (
                <div key={user.id} style={{ background: 'white', border: '1px solid #f0f0f0', borderRadius: '25px', padding: '20px', display: 'flex', flexDirection: 'column', justifycontent: 'space-between', boxShadow: '0 4px 15px rgba(0,0,0,0.01)' }}>
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                      <div className="circle-btn" style={{ width: '45px', height: '45px', background: '#f0f4f8', fontSize: '22px' }}>{user.emoji}</div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><span style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{user.name}</span><span style={{ fontSize: '11px', color: '#888' }}>{user.age}세 · {user.gender}</span></div>
                        <div style={{ fontSize: '11px', color: '#e65100', fontWeight: 'bold' }}>🍻 주량: {user.alcohol}</div>
                      </div>
                    </div>
                    <p style={{ fontSize: '12.5px', color: '#555', background: '#f8f9fa', padding: '10px', borderRadius: '12px', fontStyle: 'italic', margin: '0 0 12px 0' }}>"{user.intro}"</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {user.tags.map(t => (<span key={t} style={{ fontSize: '10.5px', background: '#f1f3f5', color: '#666', padding: '3px 8px', borderRadius: '8px' }}>{t}</span>))}
                    </div>
                  </div>
                  <button onClick={() => handleRequestMatch(user.id)} style={{ width: '100%', padding: '12px', borderRadius: '12px', border: 'none', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer', background: isRequested ? '#e2e8f0' : '#007bff', color: isRequested ? '#64748b' : 'white', transition: 'all 0.2s' }}>
                    {isRequested ? '✓ 시그널 전송됨' : '🤝 밥약 매칭 신청'}
                  </button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}