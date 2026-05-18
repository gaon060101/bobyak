import { useState } from 'react';

export default function MapTab() {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [reviewInput, setReviewInput] = useState('');
  const [ratingInput, setRatingInput] = useState(5);
  const [userReviews, setUserReviews] = useState({});
  const [activeFilter, setActiveFilter] = useState('All');

  const places = [
    { id: 1, name: "하이디라오 신촌점", category: "🍲 식당", rating: 4.8, top: "45%", left: "50%", review: "마라탕 4단계 도전해봤는데 진짜 강렬해요! 중간고사 스트레스 풀기 딱 좋음." },
    { id: 2, name: "독수리다방", category: "☕ 카페", rating: 4.5, top: "35%", left: "40%", review: "분위기 좋고 백양로가 한눈에 보이는 창가 자리가 완전 명당입니다." },
    { id: 3, name: "쟁반집8292", category: "🥩 식당", rating: 4.7, top: "55%", left: "60%", review: "가성비 최고 고깃집! 특수부위 모듬 쟁반 구성이 너무 알차요." },
    { id: 4, name: "원앤온리커피", category: "☕ 카페", rating: 4.6, top: "25%", left: "70%", review: "말차라떼가 시그니처인데 엄청 진하고 브라우니도 맛집임." },
    { id: 5, name: "신촌황소곱창", category: "🍻 술집", rating: 4.4, top: "65%", left: "45%", review: "기름진 곱창에 소주 한잔 마시기 좋은 전통의 신촌 핫플." },
    { id: 6, name: "샌드커피 논탄토", category: "☕ 카페", rating: 4.8, top: "40%", left: "65%", review: "터키식 샌드커피 신기하고 오리지널 카이막 맛은 감동 그 자체." },
    { id: 7, name: "다성 일식", category: "🍣 식당", rating: 4.3, top: "30%", left: "30%", review: "회 무한리필 퀄리티가 좋아서 격식 있는 밥약 장소로 제격." },
    { id: 10, name: "역전할머니맥주", category: "🍻 술집", rating: 4.2, top: "60%", left: "75%", review: "살얼음 맥주에 짜파구리 조합은 가벼운 2차 약속으로 최고." }
  ];

  // 평점 4.5 이상의 장소만 핫플레이스로 선별
  const hotPlaces = places.filter(p => p.rating >= 4.5);
  const filteredPlaces = activeFilter === 'All' ? places : places.filter(place => place.category.includes(activeFilter));
  const filteredHotPlaces = activeFilter === 'All' ? hotPlaces : hotPlaces.filter(place => place.category.includes(activeFilter));

  const getMarkerColor = (category, isSelected) => {
    if (category.includes('카페')) return isSelected ? '#8d6e63' : 'rgba(141, 110, 99, 0.85)';
    if (category.includes('술집')) return isSelected ? '#ab47bc' : 'rgba(171, 71, 188, 0.85)';
    return isSelected ? '#ff5252' : 'rgba(255, 82, 82, 0.85)';
  };

  const handleReviewSubmit = () => {
    if (!reviewInput.trim()) return;
    setUserReviews(prev => ({
      ...prev,
      [selectedPlace.id]: [{ text: reviewInput, rating: ratingInput }, ...(prev[selectedPlace.id] || [])]
    }));
    setReviewInput('');
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '15px' }}>
      <div>
        <h2 style={{ margin: 0, marginBottom: '5px' }}>🗺️ 지도 예약 및 핫플레이스</h2>
        <p style={{ margin: 0, fontSize: '13.5px', color: '#666' }}>왼쪽 실시간 핫플 목록이나 지도의 서클 마커를 선택해 상세 일정을 조율하세요.</p>
      </div>
      
      {/* 카테고리 필터 버튼 */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {['All', '식당', '카페', '술집'].map(filterType => (
          <button
            key={filterType} onClick={() => { setActiveFilter(filterType); setSelectedPlace(null); }}
            style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 'bold', border: activeFilter === filterType ? 'none' : '1px solid #ddd', background: activeFilter === filterType ? '#007bff' : 'white', color: activeFilter === filterType ? 'white' : '#555', cursor: 'pointer', transition: 'all 0.2s' }}
          >
            {filterType === 'All' ? '🌐 전체' : filterType === '식당' ? '🍚 식당' : filterType === '카페' ? '☕ 카페' : '🍻 술집'}
          </button>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '20px', flex: 1, minHeight: '520px', position: 'relative' }}>
        
        {/* 좌측 사이드바: 핫플레이스 목록 */}
        <div className="custom-scroll" style={{ width: '250px', display: 'flex', flexDirection: 'column', gap: '10px', overflowY: 'auto', maxHeight: '520px' }}>
          <div style={{ fontSize: '12px', fontWeight: 'bold', color: '#ff5252', paddingLeft: '5px' }}>🔥 실시간 검증된 핫플 리스트</div>
          {filteredHotPlaces.map(place => (
            <div 
              key={place.id} onClick={() => { setSelectedPlace(place); setSelectedDate(null); }}
              style={{ padding: '14px', borderRadius: '18px', background: selectedPlace?.id === place.id ? '#f0f7ff' : '#fff', border: selectedPlace?.id === place.id ? '1.5px solid #007bff' : '1.5px solid #eaeaea', cursor: 'pointer', transition: 'all 0.2s' }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '13.5px', color: '#333' }}>{place.name}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginTop: '6px' }}>
                <span style={{ color: '#888' }}>{place.category}</span>
                <span style={{ color: '#ffb300', fontWeight: 'bold' }}>★ {place.rating}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 우측 맵 뷰포트 */}
        <div style={{ flex: 1, borderRadius: '25px', position: 'relative', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
          <iframe src="https://maps.google.com/maps?q=신촌역&output=embed" width="100%" height="100%" style={{ border: 0, pointerEvents: 'none' }} allowFullScreen="" loading="lazy" title="신촌 지도"></iframe>
          {filteredPlaces.map(place => {
            const isSelected = selectedPlace?.id === place.id;
            return (
              <button 
                key={place.id} className="circle-btn"
                style={{ position: 'absolute', top: place.top, left: place.left, transform: 'translate(-50%, -50%)', width: '38px', height: '38px', background: getMarkerColor(place.category, isSelected), color: 'white', fontSize: '16px', border: isSelected ? '2px solid white' : 'none', zIndex: isSelected ? 10 : 1 }}
                onClick={() => { setSelectedPlace(place); setSelectedDate(null); }}
              >
                {place.category.split(' ')[0]}
              </button>
            );
          })}
        </div>

        {/* 우측 예약 오버레이 상세 패널 */}
        {selectedPlace && (
          <div className="custom-scroll" style={{ position: 'absolute', top: 0, right: 0, width: '330px', height: '100%', boxSizing: 'border-box', background: 'white', padding: '25px', borderRadius: '25px', boxShadow: '-5px 0 25px rgba(0,0,0,0.08)', zIndex: 20, overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
              <h3 style={{ margin: 0, fontSize: '16.5px' }}>{selectedPlace.name}</h3>
              <button onClick={() => setSelectedPlace(null)} style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#999' }}>✕</button>
            </div>
            <div style={{ display: 'flex', gap: '6px', fontSize: '11px', marginBottom: '15px' }}>
              <span style={{ background: '#f0f0f0', padding: '2px 8px', borderRadius: '8px', color: '#555' }}>{selectedPlace.category}</span>
              <span style={{ color: '#ffb300', fontWeight: 'bold' }}>★ {selectedPlace.rating}</span>
            </div>

            <div style={{ background: '#f8f9fa', padding: '12px', borderRadius: '12px', marginBottom: '15px', fontSize: '12px', color: '#555', lineHeight: '1.4' }}>
              "{selectedPlace.review}"
            </div>

            {/* 후기 피드 피드백 시스템 */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '6px' }}>
                {[1,2,3,4,5].map(star => (
                  <span key={star} onClick={() => setRatingInput(star)} style={{ cursor: 'pointer', fontSize: '15px', color: star <= ratingInput ? '#ffb300' : '#e0e0e0' }}>★</span>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '4px' }}>
                <input type="text" placeholder="방문 후 한줄평 남기기" value={reviewInput} onChange={(e) => setReviewInput(e.target.value)} style={{ flex: 1, padding: '8px 12px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '12px', outline: 'none' }} />
                <button onClick={handleReviewSubmit} style={{ background: '#4caf50', color: 'white', border: 'none', padding: '0 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '12px', fontWeight: 'bold' }}>등록</button>
              </div>
              {userReviews[selectedPlace.id]?.map((rev, idx) => (
                <div key={idx} style={{ marginTop: '8px', background: '#f0f7ff', padding: '8px 12px', borderRadius: '8px', fontSize: '11.5px', color: '#0056b3' }}>
                  ✓ {rev.text}
                </div>
              ))}
            </div>

            {/* 14일 실시간 타임라인 스케줄러 */}
            <div style={{ borderTop: '1px solid #eee', paddingTop: '15px' }}>
              <div style={{ fontSize: '13px', fontWeight: 'bold', color: '#333', marginBottom: '10px' }}>📆 예약 날짜 조율</div>
              <div style={{ gridTemplateColumns: 'repeat(7, 1fr)', display: 'grid', gap: '5px', textAlign: 'center', marginBottom: '15px' }}>
                {Array.from({ length: 14 }).map((_, i) => {
                  const date = i + 1;
                  const isFull = i === 2 || i === 11;
                  return (
                    <div 
                      key={i} onClick={() => !isFull && setSelectedDate(date)}
                      style={{
                        height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '6px', fontSize: '11px', fontWeight: 'bold',
                        background: selectedDate === date ? '#007bff' : (isFull ? '#ffebee' : '#e8f5e9'),
                        color: selectedDate === date ? 'white' : (isFull ? '#c62828' : '#2e7d32'), cursor: isFull ? 'not-allowed' : 'pointer', opacity: isFull ? 0.5 : 1
                      }}
                    >
                      {date}
                    </div>
                  );
                })}
              </div>
              <button disabled={!selectedDate} onClick={() => alert('약속 예약이 완료되었습니다!')} style={{ width: '100%', padding: '12px', borderRadius: '12px', background: selectedDate ? '#007bff' : '#ccc', color: 'white', border: 'none', fontSize: '13px', fontWeight: 'bold', cursor: 'pointer' }}>
                {selectedDate ? `${selectedDate}일 실시간 밥약 선점하기` : '원하는 일정을 조율해 주세요'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}