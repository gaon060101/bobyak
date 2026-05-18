import { useState } from 'react';

export default function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const [memos, setMemos] = useState({
    2: "오랜만에 동기들 만나서 너무 재밌었다! 역시 곱창은 신촌황소 🍻",
    8: "팀플 발표 준비 마무리. 논탄토 카이막 진짜 맛있음. 다음엔 샌드커피도 마셔봐야지.",
    12: "여자친구랑 하이디라오! 마라탕 4단계는 역시 강렬했다... 스트레스 다 풀림 ㅋㅋㅋ",
    15: "소프트웨어 스터디원들이랑 파이썬, C++ 얘기하다가 시간 다 감. 파티션 조용하고 좋음."
  });
  const [currentMemo, setCurrentMemo] = useState("");
  const [isEditingMemo, setIsEditingMemo] = useState(false); 
  
  const [userCosts, setUserCosts] = useState({}); 
  const [inputCost, setInputCost] = useState("");
  const [editingCostEventId, setEditingCostEventId] = useState(null);
  
  const year = 2026;
  const month = 5;
  const today = 18;

  const events = [
    { id: 1, date: 2, title: '신촌황소곱창', person: '동아리 동기들', type: '술집', emoji: '🍻', time: '오후 7:00', color: '#ab47bc', cost: 45000 },
    { id: 2, date: 8, title: '샌드커피 논탄토', person: '팀플 조원', type: '카페', emoji: '☕', time: '오후 2:00', color: '#8d6e63', cost: 13000 },
    { id: 3, date: 12, title: '하이디라오 신촌점', person: '여자친구', type: '식당', emoji: '🍲', time: '오후 6:30', color: '#ff5252', cost: 82000 },
    { id: 4, date: 15, title: '파티션 WSC', person: '소프트웨어 스터디', type: '카페', emoji: '💻', time: '오후 4:00', color: '#8d6e63', cost: 6500 },
    { id: 5, date: 18, title: '독수리다방', person: '세은', type: '카페', emoji: '☕', time: '오후 3:00', color: '#8d6e63' }, 
    { id: 6, date: 21, title: '역전할머니맥주', person: '고등학교 친구들', type: '술집', emoji: '🍺', time: '오후 8:00', color: '#ab47bc' }, 
    { id: 7, date: 24, title: '다성 일식', person: '경영학과 선배', type: '식당', emoji: '🍣', time: '오후 12:00', color: '#ff5252' }, 
    { id: 8, date: 28, title: '신촌 LP바', person: '음악동아리', type: '술집', emoji: '🎵', time: '오후 9:00', color: '#ab47bc' }, 
    { id: 9, date: 30, title: '쟁반집8292', person: '알바 회식', type: '식당', emoji: '🥩', time: '오후 6:30', color: '#ff5252' } 
  ];

  const getWeather = (date) => {
    const weathers = [
      { icon: '☀️', text: '맑음', temp: '최고 25°C / 최저 15°C' },
      { icon: '⛅', text: '구름 조금', temp: '최고 23°C / 최저 16°C' },
      { icon: '🌧️', text: '봄비', temp: '최고 18°C / 최저 13°C' },
      { icon: '☁️', text: '흐림', temp: '최고 20°C / 최저 14°C' }
    ];
    return weathers[date % 4];
  };

  const daysInMonth = 31;
  const startDayOfWeek = 5; 

  const totalCells = [];
  for (let i = 0; i < startDayOfWeek; i++) totalCells.push(null);
  for (let i = 1; i <= daysInMonth; i++) totalCells.push(i);
  while (totalCells.length % 7 !== 0) totalCells.push(null);

  const weeks = [];
  for (let i = 0; i < totalCells.length; i += 7) {
    weeks.push(totalCells.slice(i, i + 7));
  }

  const handleSaveCost = (e, date, eventId) => {
    e.stopPropagation();
    const strCost = String(inputCost || "");
    const numCost = parseInt(strCost.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numCost)) {
      setUserCosts(prev => ({
        ...prev,
        [date]: { ...(prev[date] || {}), [eventId]: numCost }
      }));
    }
    setEditingCostEventId(null);
    setInputCost("");
  };

  return (
    <div style={{ padding: '10px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px' }}>
        <h2 style={{ margin: 0 }}>밥약 캘린더</h2>
        <span style={{ fontSize: '12px', color: '#666', background: '#f0f0f0', padding: '4px 10px', borderRadius: '15px' }}>오늘: {year}년 {month}월 {today}일</span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px', gap: '15px' }}>
        <button className="circle-btn" style={{ width: '35px', height: '35px', background: 'white', color: '#666', fontSize: '16px' }}>&lt;</button>
        <h3 style={{ margin: 0, fontSize: '20px', color: '#333' }}>{year}년 {month}월</h3>
        <button className="circle-btn" style={{ width: '35px', height: '35px', background: 'white', color: '#666', fontSize: '16px' }}>&gt;</button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', paddingBottom: '10px' }}>
        {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
          <div key={day} style={{ fontWeight: 'bold', fontSize: '14px', color: idx === 0 ? '#ff5252' : idx === 6 ? '#007bff' : '#888' }}>{day}</div>
        ))}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingBottom: '40px' }}>
        {weeks.map((week, wIdx) => {
          const hasSelectedInWeek = week.includes(selectedDate) && selectedDate !== null;
          return (
            <div key={wIdx} style={{ display: 'flex', gap: '8px', width: '100%' }}>
              {week.map((date, dIdx) => {
                const isSelected = date === selectedDate && date !== null;
                const isSquished = hasSelectedInWeek && !isSelected; 
                const isToday = date === today;
                const isPast = date < today && date !== null;
                const dayEvents = date ? events.filter(e => e.date === date) : [];
                const weather = date ? getWeather(date) : null;

                const hasEnteredCost = userCosts[date] && Object.values(userCosts[date]).some(c => c > 0);
                const showAsExpenseWidget = isPast || hasEnteredCost;

                return (
                  <div 
                    key={dIdx} 
                    onClick={() => {
                      if (!isSelected && date) {
                        setSelectedDate(date);
                        const existingMemo = memos[date] || "";
                        setCurrentMemo(existingMemo); 
                        setIsEditingMemo(existingMemo === "");
                        setEditingCostEventId(null); 
                      }
                    }}
                    style={{ 
                      flex: isSelected ? 1.6 : (isSquished ? 0.8 : 1),
                      minWidth: 0, height: isSelected ? '340px' : (isSquished ? '100%' : '75px'),
                      border: isSelected ? '2px solid #007bff' : (isToday ? '2px solid #ff9800' : (date ? '1px solid #f0f0f0' : 'none')), 
                      borderRadius: isSelected ? '20px' : '15px', padding: isSelected ? '15px' : (isSquished ? '6px 4px' : '6px'), 
                      display: 'flex', flexDirection: 'column', alignItems: isSelected ? 'flex-start' : 'center',
                      background: isToday && !isSelected ? '#fff8e1' : (date ? 'white' : 'transparent'),
                      boxShadow: isSelected ? '0 8px 25px rgba(0,123,255,0.15)' : (date ? '0 1px 5px rgba(0,0,0,0.02)' : 'none'),
                      overflow: 'hidden', cursor: isSelected || !date ? 'default' : 'pointer', transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)' 
                    }}
                  >
                    {date && (
                      <>
                        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginBottom: isSelected ? '12px' : '4px', flexShrink: 0 }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ 
                              fontSize: isSelected ? '16px' : (isSquished ? '11px' : '13px'), fontWeight: 'bold', color: isSelected ? 'white' : (isToday ? '#ff9800' : '#333'),
                              background: isSelected ? '#007bff' : (dayEvents.length > 0 && !isSquished ? '#f0f4f8' : 'transparent'),
                              width: isSelected ? '32px' : (isSquished ? '20px' : '22px'), height: isSelected ? '32px' : (isSquished ? '20px' : '22px'),
                              display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '50%', transition: 'all 0.3s'
                            }}>{date}</span>
                            {isToday && !isSquished && (<span style={{ fontSize: '10px', fontWeight: 'bold', color: 'white', background: '#ff9800', padding: '2px 6px', borderRadius: '10px' }}>오늘</span>)}
                          </div>
                          {isSelected && ( <button onClick={(e) => { e.stopPropagation(); setSelectedDate(null); }} style={{ background: '#f0f0f0', borderRadius: '50%', border: 'none', width: '28px', height: '28px', cursor: 'pointer', color: '#666' }}>✕</button> )}
                        </div>
                        
                        {!isSelected && (
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '100%' }}>
                            {dayEvents.map(event => (
                              <div key={event.id} style={{ background: event.color + '15', color: event.color, fontSize: '11px', padding: '3px', borderRadius: '10px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 'bold', textAlign: 'center' }}>{event.title}</div>
                            ))}
                          </div>
                        )}

                        {isSelected && (
                          <div className="custom-scroll" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px', animation: 'fadeIn 0.4s ease', overflowY: 'auto', flex: 1, paddingRight: '5px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#f0f7ff', padding: '12px', borderRadius: '15px' }}>
                              <span style={{ fontSize: '24px' }}>{weather.icon}</span>
                              <div>
                                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#0056b3' }}>{weather.text}</div>
                                <div style={{ fontSize: '11px', color: '#666' }}>{weather.temp}</div>
                              </div>
                            </div>

                            <div style={{ background: showAsExpenseWidget ? '#fff0f0' : '#f0f4c3', padding: '15px', borderRadius: '15px', transition: 'background 0.3s' }}>
                              <div style={{ fontSize: '13px', fontWeight: 'bold', color: showAsExpenseWidget ? '#c62828' : '#827717', marginBottom: '8px' }}>{showAsExpenseWidget ? '💰 지출 내역' : '💵 예상 지출 플랜'}</div>
                              {dayEvents.length > 0 ? (
                                <>
                                  {dayEvents.map(e => {
                                    const displayCost = isPast ? (e.cost || 0) : (userCosts[date]?.[e.id] || 0);
                                    const isEditing = editingCostEventId === e.id;
                                    return (
                                      <div key={`cost-${e.id}`} style={{ display: 'flex', flexDirection: 'column', marginBottom: '6px' }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: '#555', alignItems: 'center' }}>
                                          <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>{e.title}</span>
                                          {isEditing ? (
                                            <div style={{ display: 'flex', gap: '4px' }}>
                                              <input type="text" value={inputCost} onChange={(evt) => setInputCost(evt.target.value)} placeholder="숫자만 입력" onClick={(evt) => evt.stopPropagation()} onKeyDown={(evt) => { if(evt.key === 'Enter') handleSaveCost(evt, date, e.id); }} style={{ width: '80px', padding: '4px', fontSize: '12px', border: `1px solid ${showAsExpenseWidget ? '#c62828' : '#827717'}`, borderRadius: '4px', outline: 'none' }} autoFocus />
                                              <button onClick={(evt) => handleSaveCost(evt, date, e.id)} style={{ background: showAsExpenseWidget ? '#c62828' : '#827717', color: 'white', border: 'none', borderRadius: '4px', padding: '4px 8px', fontSize: '11px', cursor: 'pointer', fontWeight: 'bold' }}>저장</button>
                                            </div>
                                          ) : (
                                            <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                                              <span style={{ fontWeight: displayCost > 0 ? 'bold' : 'normal', color: displayCost > 0 ? '#333' : '#999' }}>{displayCost > 0 ? displayCost.toLocaleString() + '원' : (isPast ? '무료/얻어먹음 😋' : '입력 안됨')}</span>
                                              <button onClick={(evt) => { evt.stopPropagation(); setEditingCostEventId(e.id); setInputCost(displayCost ? String(displayCost) : ""); }} style={{ background: '#fff', border: `1px solid ${showAsExpenseWidget ? '#c62828' : '#827717'}`, color: showAsExpenseWidget ? '#c62828' : '#827717', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', cursor: 'pointer', fontWeight: 'bold' }}>{displayCost > 0 ? '수정' : '입력'}</button>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    );
                                  })}
                                  <div style={{ borderTop: `1px dashed ${showAsExpenseWidget ? '#ffcdd2' : '#dce775'}`, marginTop: '8px', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', color: showAsExpenseWidget ? '#c62828' : '#827717', fontSize: '13px' }}>
                                    <span>{showAsExpenseWidget ? '총 지출' : '예상 총합'}</span>
                                    <span>{dayEvents.reduce((acc, cur) => acc + (isPast ? (cur.cost || 0) : (userCosts[date]?.[cur.id] || 0)), 0).toLocaleString()}원</span>
                                  </div>
                                </>
                              ) : ( <div style={{ fontSize: '12px', color: '#999' }}>일정이 없습니다.</div> )}
                            </div>

                            {dayEvents.map(event => (
                              <div key={event.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: '#f8f9fa', borderRadius: '15px', border: '1px solid #f0f0f0' }}>
                                <div className="circle-btn" style={{ width: '36px', height: '36px', background: 'white', fontSize: '18px', flexShrink: 0 }}>{event.emoji}</div>
                                <div style={{ flex: 1, minWidth: 0 }}>
                                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', marginBottom: '3px' }}>
                                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{event.title}</span>
                                    <span style={{ background: '#e0f7fa', color: '#006064', padding: '2px 6px', borderRadius: '8px', fontSize: '10px', fontWeight: 'bold' }}>{event.time}</span>
                                  </div>
                                  <div style={{ color: '#666', fontSize: '11px' }}>함께하는 사람: <span style={{ fontWeight: 'bold', color: '#333' }}>{event.person}</span></div>
                                </div>
                              </div>
                            ))}

                            <div style={{ background: '#fcfcfc', border: '1px solid #e0e0e0', padding: '15px', borderRadius: '15px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333' }}>📝 밥약 메모장</div>
                                {!isEditingMemo && memos[date] && ( <button onClick={(e) => { e.stopPropagation(); setIsEditingMemo(true); }} style={{ background: 'none', border: 'none', color: '#007bff', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>수정</button> )}
                              </div>
                              {isEditingMemo ? (
                                <>
                                  <textarea value={currentMemo} onChange={(e) => setCurrentMemo(e.target.value)} placeholder="약속 메모 등록" onClick={(e) => e.stopPropagation()} style={{ width: '100%', boxSizing: 'border-box', padding: '10px', borderRadius: '10px', border: '1px solid #007bff', fontSize: '12px', resize: 'none', height: '70px', outline: 'none' }} autoFocus />
                                  <button onClick={(e) => { e.stopPropagation(); setMemos(prev => ({ ...prev, [date]: currentMemo })); setIsEditingMemo(false); }} style={{ background: '#007bff', color: 'white', border: 'none', padding: '8px', borderRadius: '10px', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>저장하기</button>
                                </>
                              ) : ( <div onClick={(e) => e.stopPropagation()} style={{ background: '#f0f7ff', padding: '12px', borderRadius: '10px', fontSize: '12.5px', color: '#333', lineHeight: '1.5' }}>{memos[date] || "저장된 메모가 없습니다."}</div> )}
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}