import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Sun, Cloud, Edit2, Check, Wallet, ChevronLeft, ChevronRight, X } from 'lucide-react';

export default function CalendarTab({ calendarEvents = [], setCalendarEvents }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDateStr, setSelectedDateStr] = useState(null);
  
  const [memoText, setMemoText] = useState('');
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [expenseInput, setExpenseInput] = useState('');

  // 날씨 랜덤 생성 (임시)
  const getRandomWeather = () => {
    const w = ['sun', 'cloud', 'rain'];
    return w[Math.floor(Math.random() * w.length)];
  };

  const getWeatherIcon = (type) => {
    switch(type) {
      case 'sun': return <Sun size={20} color="#ff9d00" />;
      case 'cloud': return <Cloud size={20} color="#94a3b8" />;
      case 'rain': return <CloudRain size={20} color="#00b4d8" />;
      default: return <Sun size={20} />;
    }
  };

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
  const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

  const generateMonthGrid = () => {
    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
    
    const grid = [];
    // 빈 칸
    for (let i = 0; i < firstDay; i++) {
      grid.push(null);
    }
    // 날짜
    for (let i = 1; i <= daysInMonth; i++) {
      grid.push(i);
    }
    return grid;
  };

  const grid = generateMonthGrid();
  
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    setSelectedDateStr(null);
  };
  
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    setSelectedDateStr(null);
  };

  const getEventForDate = (dateStr) => {
    return calendarEvents.find(e => e.date === dateStr) || { date: dateStr, expense: 0, plan: '', memo: '', weather: getRandomWeather(), temp: '25° / 15°' };
  };

  const handleSelectDate = (day) => {
    const str = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    setSelectedDateStr(str);
    const ev = getEventForDate(str);
    setMemoText(ev.memo || '');
    setIsEditingMemo(!ev.memo);
    setExpenseInput(ev.expense > 0 ? ev.expense.toString() : '');
  };

  const handleSaveExpense = () => {
    if (!selectedDateStr) return;
    const ev = getEventForDate(selectedDateStr);
    const updatedEv = { ...ev, expense: parseInt(expenseInput) || 0 };
    updateEvent(updatedEv);
  };

  const handleSaveMemo = () => {
    if (!selectedDateStr) return;
    const ev = getEventForDate(selectedDateStr);
    const updatedEv = { ...ev, memo: memoText };
    updateEvent(updatedEv);
    setIsEditingMemo(false);
  };

  const updateEvent = (updatedEv) => {
    if (setCalendarEvents) {
      setCalendarEvents(prev => {
        const existingIndex = prev.findIndex(e => e.date === updatedEv.date);
        if (existingIndex >= 0) {
          const newEvents = [...prev];
          newEvents[existingIndex] = updatedEv;
          return newEvents;
        }
        return [...prev, updatedEv];
      });
    }
  };

  const selectedEvent = selectedDateStr ? getEventForDate(selectedDateStr) : null;
  const todayStr = new Date().toISOString().split('T')[0];

  return (
    <div style={{ display: 'flex', gap: '20px', height: '100%', minHeight: 0, width: '100%' }}>
      {/* 캘린더 메인 */}
      <div style={{ flex: selectedDateStr ? 2 : 1, display: 'flex', flexDirection: 'column', transition: 'flex 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '24px', color: 'var(--yonsei-blue)', margin: 0, fontWeight: '800' }}>
            {currentYear}년 {currentMonth + 1}월
          </h2>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={handlePrevMonth} className="circle-btn" style={{ width: '36px', height: '36px', background: 'white' }}><ChevronLeft size={18} /></button>
            <button onClick={handleNextMonth} className="circle-btn" style={{ width: '36px', height: '36px', background: 'white' }}><ChevronRight size={18} /></button>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '8px' }}>
          {['일', '월', '화', '수', '목', '금', '토'].map((day, idx) => (
            <div key={day} style={{ textAlign: 'center', fontWeight: 'bold', fontSize: '14px', color: idx === 0 ? 'var(--manner-red)' : idx === 6 ? 'var(--yonsei-light-blue)' : 'var(--text-muted)' }}>
              {day}
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', flex: 1, gridAutoRows: '1fr' }}>
          {grid.map((day, idx) => {
            if (day === null) return <div key={`empty-${idx}`} style={{ background: 'transparent' }} />;
            
            const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const isToday = dateStr === todayStr;
            const isSelected = dateStr === selectedDateStr;
            const ev = calendarEvents.find(e => e.date === dateStr);
            const isSunday = idx % 7 === 0;
            const isSaturday = idx % 7 === 6;

            return (
              <motion.div
                key={day}
                whileHover={{ scale: 1.02 }}
                onClick={() => handleSelectDate(day)}
                style={{ 
                  background: isSelected ? 'var(--yonsei-blue)' : (isToday ? 'rgba(0, 56, 118, 0.05)' : 'white'),
                  border: isToday && !isSelected ? '2px solid var(--yonsei-blue)' : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  color: isSelected ? 'white' : 'var(--text-dark)',
                  boxShadow: isSelected ? '0 10px 20px rgba(0,56,118,0.2)' : 'none',
                  overflow: 'hidden'
                }}
              >
                <div style={{ fontSize: '16px', fontWeight: 'bold', color: isSelected ? 'white' : (isSunday ? 'var(--manner-red)' : isSaturday ? 'var(--yonsei-light-blue)' : 'var(--text-dark)') }}>
                  {day}
                </div>
                
                {ev && ev.plan && (
                  <div style={{ marginTop: '4px', fontSize: '10px', background: isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,56,118,0.1)', color: isSelected ? 'white' : 'var(--yonsei-blue)', padding: '2px 4px', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {ev.plan}
                  </div>
                )}

                {ev && ev.expense > 0 && (
                  <div style={{ marginTop: 'auto', alignSelf: 'flex-end', fontSize: '11px', fontWeight: 'bold', color: isSelected ? '#ffdb58' : '#64748b' }}>
                    ₩
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 우측 상세 정보 패널 */}
      <AnimatePresence>
        {selectedDateStr && selectedEvent && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            animate={{ opacity: 1, x: 0 }} 
            exit={{ opacity: 0, x: 20 }}
            style={{ width: '320px', background: 'white', borderRadius: '24px', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid #e2e8f0', boxShadow: '0 10px 30px rgba(0,0,0,0.03)', overflowY: 'auto' }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', color: 'var(--yonsei-blue)' }}>
                {parseInt(selectedDateStr.split('-')[1])}월 {parseInt(selectedDateStr.split('-')[2])}일 상세
              </h3>
              <button onClick={() => setSelectedDateStr(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <X size={20} color="var(--text-muted)" />
              </button>
            </div>

            {/* 날씨 정보 */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px 16px', borderRadius: '16px' }}>
              {getWeatherIcon(selectedEvent.weather)}
              <div>
                <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{selectedEvent.temp}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {selectedEvent.weather === 'sun' ? '맑고 화창한 날씨' : selectedEvent.weather === 'cloud' ? '구름이 많은 날씨' : '비가 오는 날씨'}
                </div>
              </div>
            </div>

            {/* 일정 */}
            {selectedEvent.plan && (
              <div>
                <h4 style={{ margin: '0 0 8px', fontSize: '13px', color: 'var(--text-muted)' }}>예약된 일정</h4>
                <div style={{ padding: '12px 16px', background: 'rgba(0,56,118,0.05)', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--yonsei-blue)', borderLeft: '4px solid var(--yonsei-blue)' }}>
                  {selectedEvent.plan}
                </div>
              </div>
            )}

            {/* 가계부 모듈 */}
            <div style={{ background: selectedEvent.expense > 0 ? 'var(--yonsei-blue)' : '#f1f5f9', color: selectedEvent.expense > 0 ? 'white' : 'var(--text-dark)', padding: '16px', borderRadius: '16px', transition: 'all 0.3s' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '13px', fontWeight: '600' }}>
                <Wallet size={16} /> 
                {selectedEvent.expense > 0 ? '지출 내역' : '지출 입력'}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input 
                  type="number" 
                  value={expenseInput}
                  onChange={(e) => setExpenseInput(e.target.value)}
                  placeholder="금액 입력" 
                  style={{ flex: 1, width: '100%', padding: '10px 12px', borderRadius: '8px', border: 'none', outline: 'none', background: 'rgba(255,255,255,0.9)', color: '#333', fontSize: '14px', fontWeight: 'bold' }} 
                />
                <button onClick={handleSaveExpense} className="btn-primary" style={{ padding: '0 12px', background: selectedEvent.expense > 0 ? 'rgba(255,255,255,0.2)' : 'var(--yonsei-blue)', color: 'white', fontSize: '13px' }}>
                  저장
                </button>
              </div>
            </div>

            {/* 메모장 */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>다이어리 / 메모</h4>
              
              <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '16px', position: 'relative', minHeight: '150px' }}>
                {isEditingMemo ? (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
                    <textarea 
                      value={memoText}
                      onChange={(e) => setMemoText(e.target.value)}
                      placeholder="오늘의 밥약 후기나 일기를 남겨보세요." 
                      style={{ flex: 1, width: '100%', resize: 'none', border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', lineHeight: '1.6', fontFamily: 'inherit' }}
                    />
                    <button onClick={handleSaveMemo} style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', background: 'var(--text-dark)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                      <Check size={14} /> 완료
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ flex: 1, fontSize: '13px', lineHeight: '1.6', color: 'var(--text-dark)', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)', whiteSpace: 'pre-wrap' }}>
                      {selectedEvent.memo || '작성된 메모가 없습니다.'}
                    </div>
                    <button onClick={() => setIsEditingMemo(true)} style={{ position: 'absolute', bottom: '16px', right: '16px', width: '32px', height: '32px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                      <Edit2 size={14} color="var(--text-muted)" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}