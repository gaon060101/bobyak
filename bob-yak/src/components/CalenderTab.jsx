import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CloudRain, Sun, Cloud, Edit2, Check, Wallet, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarTab() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [memoText, setMemoText] = useState('');
  const [isEditingMemo, setIsEditingMemo] = useState(false);
  const [expenseInput, setExpenseInput] = useState('');

  // 날짜 데이터 목업 (1주일)
  const [weekData, setWeekData] = useState([
    { id: 1, date: 24, day: '월', weather: 'sun', temp: '25° / 15°', isToday: false, state: 'past', expense: 15000, plan: '', memo: '스탠바이키친 너무 맛있었음!' },
    { id: 2, date: 25, day: '화', weather: 'cloud', temp: '23° / 14°', isToday: false, state: 'past', expense: 8000, plan: '', memo: '' },
    { id: 3, date: 26, day: '수', weather: 'rain', temp: '20° / 12°', isToday: true, state: 'today', expense: 0, plan: '독수리 다방 (오후 3시)', memo: '' },
    { id: 4, date: 27, day: '목', weather: 'sun', temp: '26° / 16°', isToday: false, state: 'future', expense: 0, plan: '신촌 황소곱창 (저녁)', memo: '' },
    { id: 5, date: 28, day: '금', weather: 'sun', temp: '28° / 18°', isToday: false, state: 'future', expense: 0, plan: '', memo: '' },
    { id: 6, date: 29, day: '토', weather: 'cloud', temp: '24° / 15°', isToday: false, state: 'future', expense: 0, plan: '', memo: '' },
    { id: 7, date: 30, day: '일', weather: 'sun', temp: '27° / 17°', isToday: false, state: 'future', expense: 0, plan: '', memo: '' }
  ]);

  // 마운트 시 오늘 날짜를 기본 선택
  React.useEffect(() => {
    const today = weekData.find(d => d.isToday);
    if (today && !selectedDate) {
      handleSelectDate(today);
    }
  }, []);

  const getWeatherIcon = (type) => {
    switch(type) {
      case 'sun': return <Sun size={24} color="#ff9d00" />;
      case 'cloud': return <Cloud size={24} color="#94a3b8" />;
      case 'rain': return <CloudRain size={24} color="#00b4d8" />;
      default: return <Sun size={24} />;
    }
  };

  const handleSelectDate = (item) => {
    setSelectedDate(item);
    setMemoText(item.memo);
    setIsEditingMemo(item.memo === '');
    setExpenseInput(item.expense > 0 ? item.expense.toString() : '');
  };

  const handleSaveExpense = () => {
    if (!selectedDate) return;
    const updated = weekData.map(d => 
      d.id === selectedDate.id ? { ...d, expense: parseInt(expenseInput) || 0 } : d
    );
    setWeekData(updated);
    setSelectedDate({ ...selectedDate, expense: parseInt(expenseInput) || 0 });
  };

  const handleSaveMemo = () => {
    if (!selectedDate) return;
    const updated = weekData.map(d => 
      d.id === selectedDate.id ? { ...d, memo: memoText } : d
    );
    setWeekData(updated);
    setSelectedDate({ ...selectedDate, memo: memoText });
    setIsEditingMemo(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '20px', flex: 1, minHeight: 0, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ fontSize: '20px', color: 'var(--yonsei-blue)', margin: 0 }}>5월 4주차</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="circle-btn" style={{ width: '36px', height: '36px', background: 'white' }}><ChevronLeft size={18} /></button>
          <button className="circle-btn" style={{ width: '36px', height: '36px', background: 'white' }}><ChevronRight size={18} /></button>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, gap: '12px', overflow: 'hidden' }}>
        {weekData.map(item => {
          const isSelected = selectedDate?.id === item.id;
          return (
            <motion.div
              key={item.id}
              onClick={() => !isSelected && handleSelectDate(item)}
              animate={{ flex: isSelected ? 3 : 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              style={{ 
                background: item.isToday ? 'rgba(0, 56, 118, 0.05)' : 'white',
                border: item.isToday ? '2px solid var(--yonsei-blue)' : '1px solid #e2e8f0',
                borderRadius: '24px',
                padding: '20px',
                cursor: isSelected ? 'default' : 'pointer',
                overflow: 'hidden',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: isSelected ? '0 10px 30px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              {item.isToday && (
                <div style={{ position: 'absolute', top: '16px', right: '16px', background: 'var(--yonsei-blue)', color: 'white', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 'bold' }}>
                  오늘
                </div>
              )}
              
              <div style={{ textAlign: isSelected ? 'left' : 'center', marginBottom: isSelected ? '20px' : 'auto' }}>
                <div style={{ fontSize: '16px', color: item.day === '일' ? 'var(--manner-red)' : (item.day === '토' ? 'var(--yonsei-light-blue)' : 'var(--text-muted)'), fontWeight: '600' }}>
                  {item.day}
                </div>
                <div style={{ fontSize: isSelected ? '36px' : '28px', fontWeight: '800', color: 'var(--text-dark)', transition: 'font-size 0.3s', marginBottom: '8px' }}>
                  {item.date}
                </div>
                
                {/* 안 고른 날 일정 살짝 크게 보여주기 */}
                {!isSelected && item.plan && (
                  <div style={{ fontSize: '13px', color: 'var(--yonsei-blue)', fontWeight: 'bold', background: 'rgba(0,56,118,0.1)', padding: '6px', borderRadius: '8px', wordBreak: 'keep-all', lineHeight: '1.2' }}>
                    {item.plan}
                  </div>
                )}
              </div>

              {/* 축소 모드 하단 내용 (날씨, 가계부 등) */}
              {!isSelected && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', marginTop: '16px', width: '100%' }}>
                  {item.expense > 0 && <span style={{ fontSize: '12px', fontWeight: '600', color: '#64748b' }}>₩</span>}
                  {getWeatherIcon(item.weather)}
                </div>
              )}

              {/* 확장 모드 (상세 보기) 내용 */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ display: 'flex', flexDirection: 'column', flex: 1, gap: '20px' }}
                  >
                    {/* 날씨 정보 */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '12px 16px', borderRadius: '16px' }}>
                      {getWeatherIcon(item.weather)}
                      <div>
                        <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{item.temp}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                          {item.weather === 'sun' ? '맑고 화창한 날씨' : item.weather === 'cloud' ? '구름이 많은 날씨' : '비가 오는 날씨'}
                        </div>
                      </div>
                    </div>

                    {/* 가계부 모듈 */}
                    <div style={{ background: item.expense > 0 ? 'var(--yonsei-blue)' : '#f1f5f9', color: item.expense > 0 ? 'white' : 'var(--text-dark)', padding: '16px', borderRadius: '16px', transition: 'all 0.3s' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px', fontSize: '14px', fontWeight: '600', justifyContent: 'flex-start' }}>
                        <Wallet size={16} /> 
                        {item.expense > 0 ? '실제 지출 내역' : '예상 지출 플랜'}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-start' }}>
                        <input 
                          type="number" 
                          value={expenseInput}
                          onChange={(e) => setExpenseInput(e.target.value)}
                          placeholder="금액 입력" 
                          style={{ flex: 1, padding: '10px 12px', borderRadius: '8px', border: 'none', outline: 'none', background: 'rgba(255,255,255,0.9)', color: '#333', fontSize: '16px', fontWeight: 'bold', textAlign: 'left' }} 
                        />
                        <button onClick={handleSaveExpense} className="btn-primary" style={{ padding: '0 16px', background: item.expense > 0 ? 'rgba(255,255,255,0.2)' : 'var(--yonsei-blue)', color: item.expense > 0 ? 'white' : 'white' }}>
                          저장
                        </button>
                      </div>
                    </div>

                    {/* 일정 및 메모장 */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--text-muted)' }}>일정 및 메모</h4>
                      
                      {item.plan && (
                        <div style={{ padding: '12px 16px', background: 'rgba(0,56,118,0.05)', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: 'var(--yonsei-blue)', borderLeft: '4px solid var(--yonsei-blue)' }}>
                          {item.plan}
                        </div>
                      )}

                      <div style={{ flex: 1, background: '#f8fafc', borderRadius: '16px', padding: '16px', position: 'relative' }}>
                        {isEditingMemo ? (
                          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', gap: '10px' }}>
                            <textarea 
                              value={memoText}
                              onChange={(e) => setMemoText(e.target.value)}
                              placeholder="오늘의 밥약 후기나 일기를 남겨보세요." 
                              style={{ flex: 1, width: '100%', resize: 'none', border: 'none', background: 'transparent', outline: 'none', fontSize: '14px', lineHeight: '1.6', fontFamily: 'inherit' }}
                            />
                            <button onClick={handleSaveMemo} style={{ alignSelf: 'flex-end', display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', background: 'var(--text-dark)', color: 'white', border: 'none', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>
                              <Check size={14} /> 완료
                            </button>
                          </div>
                        ) : (
                          <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                            <div style={{ flex: 1, fontSize: '14px', lineHeight: '1.6', color: 'var(--text-dark)', background: 'white', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 5px rgba(0,0,0,0.02)' }}>
                              {selectedDate.memo}
                            </div>
                            <button onClick={() => setIsEditingMemo(true)} style={{ position: 'absolute', bottom: '16px', right: '16px', width: '36px', height: '36px', borderRadius: '50%', background: 'white', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}>
                              <Edit2 size={16} color="var(--text-muted)" />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>
    </div>
  );
}