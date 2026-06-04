import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Star, Calendar, Clock, ChevronRight, MessageSquare } from 'lucide-react';

export default function MapTab() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('전체');
  const [myReviewText, setMyReviewText] = useState('');
  const [myReviewScore, setMyReviewScore] = useState(5);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newPlace, setNewPlace] = useState({ name: '', type: '식당', tag: '', address: '' });
  
  const [hotPlaces, setHotPlaces] = useState([
    { id: 1, name: '독수리 다방', type: '카페', rating: 4.8, distance: '100m', tag: '#백양로', reviews: 128, top: '40%', left: '45%', reviewList: [{user: '연희동불주먹', text: '뷰가 미쳤어요! 카공하기 딱 좋음', score: 5}, {user: '마라탕사랑해', text: '자리잡기 너무 힘들어요', score: 4}] },
    { id: 2, name: '스탠바이키친', type: '식당', rating: 4.6, distance: '300m', tag: '#이대후문', reviews: 256, top: '25%', left: '70%', reviewList: [{user: '신촌자취생', text: '샌드위치 양도 많고 맛있음', score: 5}] },
    { id: 3, name: '포포나무', type: '식당', rating: 4.5, distance: '400m', tag: '#신촌명물거리', reviews: 89, top: '65%', left: '35%', reviewList: [{user: '새내기24', text: '가성비 최고 밥집입니다', score: 4}, {user: '화석학번', text: '요즘 폼 미쳤다', score: 5}] },
    { id: 4, name: '신촌 황소곱창', type: '술집', rating: 4.7, distance: '500m', tag: '#창천동', reviews: 512, top: '75%', left: '60%', reviewList: [{user: '알콜중독자', text: '곱창은 무조건 여기지', score: 5}] }
  ]);

  const filteredPlaces = categoryFilter === '전체' ? hotPlaces : hotPlaces.filter(p => p.type === categoryFilter);

  // 14일 스케줄러 목업 (오늘부터 14일)
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for(let i=0; i<14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      dates.push({
        id: i,
        day: d.getDate(),
        week: ['일','월','화','수','목','금','토'][d.getDay()],
        isAvailable: Math.random() > 0.3,
        isToday: i === 0,
        fullDate: `${d.getMonth() + 1}월 ${d.getDate()}일`
      });
    }
    return dates;
  };
  
  const [dates] = useState(generateDates());
  const [selectedDate, setSelectedDate] = useState(dates[0]);

  return (
    <div style={{ display: 'flex', height: '100%', gap: '24px', flex: 1, minHeight: 0, width: '100%' }}>
      {/* 왼쪽 사이드바 - 핫플레이스 리스트 */}
      <div style={{ width: '320px', minWidth: '320px', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', paddingRight: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '18px', margin: 0, color: 'var(--yonsei-blue)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={20} fill="var(--yonsei-blue)" color="white" /> 실시간 핫플
          </h2>
          <button 
            onClick={() => setShowAddModal(true)}
            style={{ padding: '6px 12px', borderRadius: '8px', background: '#f1f5f9', color: 'var(--yonsei-blue)', border: 'none', fontSize: '12px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            + 핫플 등록
          </button>
        </div>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          {['전체', '식당', '카페', '술집'].map(cat => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              style={{
                flex: 1, padding: '6px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer', border: '1px solid #e2e8f0', transition: 'all 0.2s',
                background: categoryFilter === cat ? 'var(--yonsei-blue)' : 'white',
                color: categoryFilter === cat ? 'white' : 'var(--text-muted)'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {filteredPlaces.map(place => (
          <motion.div 
            key={place.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedPlace(place)}
            style={{ 
              padding: '16px', 
              borderRadius: '16px', 
              background: selectedPlace?.id === place.id ? 'var(--yonsei-blue)' : 'rgba(255,255,255,0.6)', 
              color: selectedPlace?.id === place.id ? 'white' : 'var(--text-dark)',
              border: '1px solid rgba(0,56,118,0.1)',
              cursor: 'pointer',
              boxShadow: selectedPlace?.id === place.id ? '0 8px 20px rgba(0,56,118,0.2)' : '0 2px 8px rgba(0,0,0,0.02)'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: '700', fontSize: '16px' }}>{place.name}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '14px', fontWeight: '600', color: selectedPlace?.id === place.id ? '#ffdb58' : 'var(--manner-orange)' }}>
                <Star size={14} fill="currentColor" /> {place.rating}
              </span>
            </div>
            <div style={{ display: 'flex', gap: '8px', fontSize: '12px', color: selectedPlace?.id === place.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
              <span>{place.type}</span> • <span>{place.distance}</span>
            </div>
            <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="tag" style={{ background: selectedPlace?.id === place.id ? 'rgba(255,255,255,0.2)' : '', color: selectedPlace?.id === place.id ? 'white' : '' }}>
                {place.tag}
              </span>
              <span style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '4px', color: selectedPlace?.id === place.id ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
                <MessageSquare size={12} /> {place.reviews}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 오른쪽 메인 영역 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* 지도 영역 */}
        <div style={{ flex: 1, borderRadius: '20px', background: '#e2e8f0', position: 'relative', overflow: 'hidden', border: '1px solid rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.290076773539!2d126.936814!3d37.561995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c988c52089453%3A0xc34df37f8fa5534!2sYonsei%20University!5e0!3m2!1sen!2skr!4v1680000000000!5m2!1sen!2skr" 
            width="100%" 
            height="100%" 
            style={{ border: 0, position: 'absolute', inset: 0 }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          <div style={{ position: 'absolute', inset: 0 }}>
            {filteredPlaces.map(place => (
              <motion.div 
                key={place.id}
                onClick={() => setSelectedPlace(place)}
                whileHover={{ scale: 1.1, zIndex: 30 }}
                style={{ 
                  position: 'absolute', top: place.top, left: place.left, transform: 'translate(-50%, -50%)',
                  padding: '8px 12px', background: selectedPlace?.id === place.id ? 'var(--yonsei-blue)' : 'white', 
                  color: selectedPlace?.id === place.id ? 'white' : 'var(--text-dark)',
                  borderRadius: '100px', fontSize: '13px', fontWeight: 'bold', 
                  boxShadow: selectedPlace?.id === place.id ? '0 6px 16px rgba(0,56,118,0.4)' : '0 4px 12px rgba(0,0,0,0.1)', 
                  display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', zIndex: selectedPlace?.id === place.id ? 25 : 10
                }}
              >
                <div style={{ 
                  width: '10px', height: '10px', borderRadius: '50%', 
                  background: place.type === '식당' ? 'var(--manner-red)' : place.type === '카페' ? 'var(--yonsei-light-blue)' : 'var(--manner-orange)' 
                }}></div> 
                {place.name}
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {selectedPlace && (
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.15)', border: '1px solid rgba(255,255,255,0.5)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: 'var(--yonsei-blue)' }}>{selectedPlace.name}</h3>
                    <div style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{selectedPlace.type} • {selectedPlace.distance}</div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '16px', fontWeight: 'bold', color: 'var(--manner-orange)' }}>
                    <Star fill="currentColor" /> {selectedPlace.rating}
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px' }}>예약 날짜 선택</h4>
                    {selectedDate && <span style={{ fontSize: '13px', color: 'var(--yonsei-blue)', fontWeight: 'bold' }}>{selectedDate.fullDate} ({selectedDate.week}) 선택됨</span>}
                  </div>
                  <div style={{ display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
                    {generateDates().map(date => (
                      <button 
                        key={date.id}
                        onClick={() => setSelectedDate(date)}
                        style={{ 
                          flexShrink: 0, width: '60px', height: '70px', borderRadius: '16px', border: '1px solid #e2e8f0', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                          background: selectedDate?.id === date.id ? 'var(--yonsei-blue)' : 'white',
                          color: selectedDate?.id === date.id ? 'white' : 'var(--text-dark)'
                        }}
                      >
                        <span style={{ fontSize: '12px', fontWeight: 'bold', color: selectedDate?.id === date.id ? 'rgba(255,255,255,0.8)' : (date.week === '일' ? 'var(--manner-red)' : date.week === '토' ? 'var(--yonsei-light-blue)' : 'var(--text-muted)') }}>{date.week}</span>
                        <span style={{ fontSize: '20px', fontWeight: '800' }}>{date.day}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ background: '#f8fafc', borderRadius: '16px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px', maxHeight: showAllReviews ? '250px' : 'auto', overflowY: showAllReviews ? 'auto' : 'visible' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MessageSquare size={16} color="var(--yonsei-blue)" /> 실시간 한줄평
                    </h4>
                    {!showAllReviews && selectedPlace.reviewList?.length > 2 && (
                      <button onClick={() => setShowAllReviews(true)} style={{ background: 'none', border: 'none', color: 'var(--yonsei-blue)', fontSize: '12px', cursor: 'pointer', fontWeight: 'bold' }}>
                        더보기 ({selectedPlace.reviewList.length}개)
                      </button>
                    )}
                  </div>
                  
                  {(showAllReviews ? selectedPlace.reviewList : selectedPlace.reviewList?.slice(0, 2)).map((rev, i) => (
                    <div key={i} style={{ display: 'flex', gap: '8px', fontSize: '13px' }}>
                      <span style={{ fontWeight: 'bold', color: 'var(--yonsei-blue)', minWidth: '80px' }}>{rev.user}</span>
                      <span style={{ color: 'var(--text-dark)', flex: 1 }}>{rev.text}</span>
                      <span style={{ display: 'flex', alignItems: 'center', color: 'var(--manner-orange)', fontSize: '11px', fontWeight: 'bold' }}><Star size={10} fill="currentColor" /> {rev.score}</span>
                    </div>
                  ))}
                  
                  {showAllReviews && (
                    <button onClick={() => setShowAllReviews(false)} style={{ background: '#e2e8f0', border: 'none', color: 'var(--text-dark)', fontSize: '12px', padding: '6px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', marginTop: '4px' }}>
                      접기
                    </button>
                  )}
                  
                  <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                    <select 
                      value={myReviewScore} 
                      onChange={(e) => setMyReviewScore(Number(e.target.value))}
                      style={{ padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none', background: 'white' }}
                    >
                      <option value={5}>⭐⭐⭐⭐⭐</option>
                      <option value={4}>⭐⭐⭐⭐</option>
                      <option value={3}>⭐⭐⭐</option>
                      <option value={2}>⭐⭐</option>
                      <option value={1}>⭐</option>
                    </select>
                    <input 
                      type="text" 
                      placeholder="한줄평을 남겨보세요..." 
                      value={myReviewText}
                      onChange={(e) => setMyReviewText(e.target.value)}
                      style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '13px', outline: 'none' }} 
                    />
                    <button 
                      className="btn-secondary" 
                      style={{ padding: '8px 12px', fontSize: '13px', whiteSpace: 'nowrap' }}
                      onClick={() => {
                        if (!myReviewText.trim()) return;
                        selectedPlace.reviewList.unshift({ user: '나', text: myReviewText, score: myReviewScore });
                        setMyReviewText('');
                      }}
                    >
                      등록
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button 
                    className="btn-primary" 
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                    onClick={() => {
                      if(!selectedPlace) alert('식당을 먼저 선택해주세요.');
                      else alert(`${selectedDate.day}일 ${selectedDate.week}요일에 '${selectedPlace.name}' 예약이 신청되었습니다!`);
                    }}
                  >
                    예약 신청하기 <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ background: 'white', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '360px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
            >
              <h3 style={{ margin: '0 0 20px', fontSize: '18px', color: 'var(--yonsei-blue)' }}>나만의 핫플레이스 등록하기</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>가게 이름</label>
                  <input type="text" value={newPlace.name} onChange={e => setNewPlace({...newPlace, name: e.target.value})} placeholder="예: 스탠바이키친" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>상세 주소 (위치)</label>
                  <input type="text" value={newPlace.address} onChange={e => setNewPlace({...newPlace, address: e.target.value})} placeholder="예: 서대문구 신촌동 (마커는 임의 생성)" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>분류</label>
                  <select value={newPlace.type} onChange={e => setNewPlace({...newPlace, type: e.target.value})} style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none', background: 'white' }}>
                    <option value="식당">식당</option>
                    <option value="카페">카페</option>
                    <option value="술집">술집</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: 'bold' }}>해시태그 포인트</label>
                  <input type="text" value={newPlace.tag} onChange={e => setNewPlace({...newPlace, tag: e.target.value})} placeholder="예: #연대동문, #가성비" style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #e2e8f0', outline: 'none' }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '12px' }}>
                <button 
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1, padding: '12px', borderRadius: '12px', border: 'none', background: '#f1f5f9', color: 'var(--text-muted)', fontWeight: 'bold', cursor: 'pointer' }}
                >
                  취소
                </button>
                <button 
                  onClick={() => {
                    if (!newPlace.name.trim()) return;
                    setHotPlaces([{ 
                      id: Date.now(), 
                      name: newPlace.name, 
                      type: newPlace.type, 
                      rating: 5.0, 
                      distance: newPlace.address || '새로 등록됨', 
                      tag: newPlace.tag || '#신규', 
                      reviews: 0, 
                      top: `${Math.floor(Math.random() * 60) + 20}%`, 
                      left: `${Math.floor(Math.random() * 60) + 20}%`, 
                      reviewList: [] 
                    }, ...hotPlaces]);
                    setShowAddModal(false);
                    setNewPlace({ name: '', type: '식당', tag: '', address: '' });
                    alert('핫플레이스가 성공적으로 등록되었습니다!');
                  }}
                  className="btn-primary"
                  style={{ flex: 1, padding: '12px', borderRadius: '12px' }}
                >
                  등록하기
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}