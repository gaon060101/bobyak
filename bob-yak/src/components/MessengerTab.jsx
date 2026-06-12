import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UserPlus, Dices, Send, MapPin, Store, Info, ChevronLeft, MessageSquare, AlertCircle } from 'lucide-react';

export default function MessengerTab({ userInfo, chatRooms, setChatRooms }) {
  const [activeChat, setActiveChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  const [showRestaurantModal, setShowRestaurantModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const messagesEndRef = useRef(null);

  // 식당 목업 데이터
  const restaurants = [
    { name: '독수리 다방', type: '카페', distance: '100m' },
    { name: '스탠바이키친', type: '식당', distance: '300m' },
    { name: '포포나무', type: '식당', distance: '400m' }
  ];

  const icebreakers = [
    "Q. 평생 치킨 안 먹기 vs 평생 피자 안 먹기",
    "Q. 민초파이신가요, 반민초파이신가요? 🌿🍫",
    "Q. 신촌에서 가장 좋아하는 맛집이 어디인가요?",
    "Q. 찍먹파 vs 부먹파",
    "Q. 1교시 수업 듣기 vs 밤샘 과제하기"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSelectChat = (chat) => {
    setActiveChat(chat.id);
  };

  const currentChatRoom = chatRooms.find(c => c.id === activeChat);
  const messages = currentChatRoom ? currentChatRoom.messages : [];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessageToChat = (newMessage) => {
    setChatRooms(prevRooms => prevRooms.map(room => 
      room.id === activeChat 
        ? { ...room, messages: [...room.messages, newMessage] } 
        : room
    ));
  };

  const handleSendMessage = (e) => {
    e?.preventDefault();
    if (!messageInput.trim() || !activeChat) return;
    
    addMessageToChat({ id: Date.now(), sender: 'me', text: messageInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) });
    setMessageInput('');
  };

  const handleIcebreaker = () => {
    const randomQuestion = icebreakers[Math.floor(Math.random() * icebreakers.length)];
    addMessageToChat({ id: Date.now(), sender: 'system', text: `🎲 아이스브레이킹 질문: ${randomQuestion}`, type: 'icebreaker' });
  };

  const handleSuggestRestaurant = (rest) => {
    addMessageToChat({ 
      id: Date.now(), sender: 'me', 
      text: `제가 추천하는 밥약 장소예요! 어떠신가요?`, 
      type: 'restaurant',
      restaurant: rest,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
    });
    setShowRestaurantModal(false);
  };

  return (
    <div style={{ display: 'flex', height: '100%', gap: '20px', flex: 1, minHeight: 0, width: '100%' }}>
      
      {/* 좌측: 채팅방 목록 */}
      <div style={{ width: '320px', background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={{ padding: '20px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', color: 'var(--yonsei-blue)' }}>채팅 목록</h2>
            <button className="circle-btn" style={{ width: '32px', height: '32px', background: '#f1f5f9' }}>
              <UserPlus size={16} color="var(--text-dark)" />
            </button>
          </div>
          <div style={{ position: 'relative' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', top: '10px', left: '12px' }} />
            <input type="text" placeholder="닉네임으로 친구 추가 또는 검색" style={{ width: '100%', padding: '8px 12px 8px 32px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '13px', background: '#f8fafc' }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: 'auto' }}>
          {chatRooms.map(room => (
            <div 
              key={room.id}
              onClick={() => handleSelectChat(room)}
              style={{ 
                padding: '16px 20px', display: 'flex', gap: '12px', cursor: 'pointer',
                background: activeChat === room.id ? '#f0f6ff' : 'white',
                borderBottom: '1px solid #f1f5f9', transition: 'background 0.2s'
              }}
            >
              <div style={{ width: '48px', height: '48px', borderRadius: '20px', background: '#e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '24px', position: 'relative' }}>
                {room.avatar}
                {room.type === '매칭방' && (
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '14px', height: '14px', background: 'var(--manner-orange)', borderRadius: '50%', border: '2px solid white' }}></div>
                )}
                {room.type === '친구방' && (
                  <div style={{ position: 'absolute', bottom: '-4px', right: '-4px', width: '14px', height: '14px', background: 'var(--yonsei-blue)', borderRadius: '50%', border: '2px solid white' }}></div>
                )}
              </div>
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '15px' }}>{room.name}</span>
                    <span style={{ fontSize: '10px', padding: '2px 6px', borderRadius: '4px', background: room.type === '매칭방' ? '#fef3c7' : '#dbeafe', color: room.type === '매칭방' ? '#d97706' : '#2563eb', fontWeight: 'bold' }}>
                      {room.type}
                    </span>
                  </div>
                  <span style={{ fontSize: '11px', color: 'var(--text-light)' }}>{room.time}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '13px', color: room.unread > 0 ? 'var(--text-dark)' : 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: room.unread > 0 ? '600' : 'normal' }}>
                    {room.messages[room.messages.length - 1]?.text}
                  </span>
                  {room.unread > 0 && (
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'var(--manner-red)', color: 'white', fontSize: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center', fontWeight: 'bold' }}>
                      {room.unread}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 우측: 활성화된 대화방 */}
      <div style={{ flex: 1, background: 'white', borderRadius: '24px', border: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative' }}>
        {currentChatRoom ? (
          <>
            {/* 대화방 헤더 */}
            <div style={{ padding: '16px 24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.9)', backdropFilter: 'blur(10px)', zIndex: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>{currentChatRoom.avatar}</span>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{currentChatRoom.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {currentChatRoom.type === '매칭방' ? '최근에 매칭된 학우' : '내 친구'}
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => setShowRatingModal(true)}
                  title="매너 온도 평가"
                  style={{ padding: '0 12px', height: '36px', borderRadius: '12px', background: 'var(--yonsei-blue)', color: 'white', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', fontSize: '13px', fontWeight: 'bold' }}
                >
                  <AlertCircle size={14} style={{ marginRight: '4px' }} /> 매너 평가
                </button>
                <button 
                  onClick={handleIcebreaker}
                  title="랜덤 아이스브레이킹 주사위"
                  style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#f8fafc', border: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--yonsei-blue)' }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--yonsei-blue)'; e.currentTarget.style.color = 'white'; }}
                  onMouseOut={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.color = 'var(--yonsei-blue)'; }}
                >
                  <Dices size={18} />
                </button>
              </div>
            </div>

            {/* 메시지 영역 */}
            <div style={{ flex: 1, padding: '24px', overflowY: 'auto', background: '#f8fafc', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              
              {currentChatRoom.type === '매칭방' && (
                <div style={{ alignSelf: 'center', background: '#e0f2fe', color: '#0369a1', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '10px' }}>
                  <Info size={14} /> 처음 대화하는 사이입니다. 주사위 버튼을 눌러 어색함을 깨보세요!
                </div>
              )}

              {messages.map((msg, idx) => {
                if (msg.sender === 'system') {
                  return (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} key={msg.id} style={{ alignSelf: 'center', background: '#f1f5f9', padding: '12px 20px', borderRadius: '16px', fontSize: '13px', color: 'var(--text-dark)', maxWidth: '80%', textAlign: 'center', border: '1px dashed #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.02)' }}>
                      {msg.text}
                    </motion.div>
                  );
                }

                const isMe = msg.sender === 'me';
                return (
                  <motion.div initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} key={msg.id} style={{ alignSelf: isMe ? 'flex-end' : 'flex-start', maxWidth: '70%', display: 'flex', flexDirection: 'column', alignItems: isMe ? 'flex-end' : 'flex-start' }}>
                    <div style={{ 
                      padding: '12px 16px', 
                      borderRadius: '16px', 
                      background: isMe ? 'var(--yonsei-blue)' : 'white',
                      color: isMe ? 'white' : 'var(--text-dark)',
                      borderTopRightRadius: isMe ? '4px' : '16px',
                      borderTopLeftRadius: !isMe ? '4px' : '16px',
                      boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
                      border: isMe ? 'none' : '1px solid #e2e8f0',
                      fontSize: '14px',
                      lineHeight: '1.5'
                    }}>
                      {msg.text}
                      
                      {msg.type === 'restaurant' && (
                        <div style={{ marginTop: '10px', background: 'white', color: 'var(--text-dark)', padding: '12px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #e2e8f0' }}>
                          <div style={{ width: '36px', height: '36px', background: '#f1f5f9', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Store size={18} color="var(--yonsei-blue)" />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{msg.restaurant.name}</div>
                            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{msg.restaurant.type} • 연세대에서 {msg.restaurant.distance}</div>
                          </div>
                          <button className="btn-secondary" style={{ padding: '6px 10px', fontSize: '11px' }}>위치 보기</button>
                        </div>
                      )}
                    </div>
                    <span style={{ fontSize: '10px', color: 'var(--text-light)', marginTop: '4px', margin: isMe ? '0 4px 0 0' : '0 0 0 4px' }}>
                      {msg.time}
                    </span>
                  </motion.div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* 입력창 */}
            <div style={{ padding: '16px', background: 'white', borderTop: '1px solid #e2e8f0' }}>
              <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="button" 
                  onClick={() => setShowRestaurantModal(!showRestaurantModal)}
                  title="밥약 식당 추가"
                  style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f1f5f9', border: 'none', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: 'var(--yonsei-blue)' }}
                >
                  <Store size={20} />
                </button>
                <input 
                  type="text" 
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  placeholder="메시지를 입력하세요..." 
                  style={{ flex: 1, padding: '0 16px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px', background: '#f8fafc' }} 
                />
                <button type="submit" className="btn-primary" style={{ width: '44px', height: '44px', padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRadius: '12px' }}>
                  <Send size={18} />
                </button>
              </form>
            </div>

            {/* 식당 추천 모달 (밥약 식당 추가) */}
            <AnimatePresence>
              {showRestaurantModal && (
                <motion.div 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  style={{ position: 'absolute', bottom: '80px', left: '16px', background: 'white', borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 40px rgba(0,0,0,0.1)', padding: '16px', width: '300px', zIndex: 50 }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '14px', color: 'var(--yonsei-blue)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Store size={14} /> 밥약 장소 제안하기
                    </h4>
                    <button onClick={() => setShowRestaurantModal(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}>&times;</button>
                  </div>
                  <p style={{ margin: '0 0 12px', fontSize: '12px', color: 'var(--text-muted)' }}>가고 싶은 핫플레이스를 선택해 대화방에 전송하세요.</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                    {restaurants.map(rest => (
                      <div key={rest.name} onClick={() => handleSuggestRestaurant(rest)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px', background: '#f8fafc', borderRadius: '8px', cursor: 'pointer', border: '1px solid transparent', transition: 'border 0.2s' }} onMouseOver={e => e.currentTarget.style.borderColor = 'var(--yonsei-blue)'} onMouseOut={e => e.currentTarget.style.borderColor = 'transparent'}>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 'bold' }}>{rest.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{rest.type} • {rest.distance}</div>
                        </div>
                        <ChevronLeft size={16} color="var(--yonsei-blue)" style={{ transform: 'rotate(180deg)' }} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* 온도 평가 모달 */}
            <AnimatePresence>
              {showRatingModal && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 999 }}>
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    style={{ background: 'white', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '360px', boxShadow: '0 20px 40px rgba(0,0,0,0.2)', textAlign: 'center' }}
                  >
                    <div style={{ fontSize: '48px', marginBottom: '16px' }}>{currentChatRoom.avatar}</div>
                    <h3 style={{ margin: '0 0 8px', fontSize: '20px', color: 'var(--text-dark)' }}>{currentChatRoom.name} 학우와의<br/>밥약은 어떠셨나요?</h3>
                    <p style={{ margin: '0 0 24px', fontSize: '14px', color: 'var(--text-muted)' }}>솔직한 평가가 더 안전한 밥약 문화를 만듭니다.</p>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
                      <button 
                        onClick={() => {
                          alert(`[${currentChatRoom.name}] 학우의 매너 온도가 상승했습니다!`);
                          setShowRatingModal(false);
                        }}
                        style={{ padding: '16px', borderRadius: '16px', border: '1px solid #fca5a5', background: '#fef2f2', color: '#dc2626', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span>최고의 밥약이었어요! 😍</span>
                        <span style={{ fontSize: '18px' }}>+0.5°C</span>
                      </button>
                      <button 
                        onClick={() => {
                          alert(`[${currentChatRoom.name}] 학우의 평가가 기록되었습니다.`);
                          setShowRatingModal(false);
                        }}
                        style={{ padding: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', color: 'var(--text-dark)', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span>무난하고 좋았어요. 😊</span>
                        <span style={{ fontSize: '18px', color: 'var(--manner-green)' }}>유지</span>
                      </button>
                      <button 
                        onClick={() => {
                          alert(`[${currentChatRoom.name}] 학우의 매너 온도가 하락했습니다. 신고 내역을 검토합니다.`);
                          setShowRatingModal(false);
                        }}
                        style={{ padding: '16px', borderRadius: '16px', border: '1px solid #cbd5e1', background: '#f1f5f9', color: 'var(--text-muted)', fontSize: '15px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', transition: 'all 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                      >
                        <span>별로였어요... 😥</span>
                        <span style={{ fontSize: '18px' }}>-0.5°C</span>
                      </button>
                    </div>

                    <button 
                      onClick={() => setShowRatingModal(false)}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-light)', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                      다음에 할게요
                    </button>
                  </motion.div>
                </div>
              )}
            </AnimatePresence>

          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-light)', gap: '16px', background: '#f8fafc' }}>
            <MessageSquare size={48} color="#cbd5e1" />
            <p style={{ fontSize: '15px' }}>대화방을 선택하거나 새로운 밥약 친구를 찾아보세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}