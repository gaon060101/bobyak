import { useState } from 'react';

export default function MessengerTab() {
  const [activeMenu, setActiveMenu] = useState('chats'); 
  const [friendNickname, setFriendNickname] = useState('');
  
  const [friends, setFriends] = useState([
    { id: 1, name: "여자친구 💖", intro: "주말에 신촌 LP바 갈까? 🎵" },
    { id: 2, name: "세은", intro: "독수리다방 밀크티 먹고 싶당" }
  ]);

  const [chatRooms, setChatRooms] = useState([
    { id: 1, name: "여자친구 💖", type: "친구", messages: [{ isMe: false, text: "오늘 저녁에 하이디라오 훠궈 고? 🍲" }] },
    { id: 2, name: "신촌훠궈왕 🐑", type: "매칭", messages: [{ isMe: false, text: "🤝 매칭 시그널이 도달했습니다! 하이디라오 4단계 부수러 가실래요?" }] }
  ]);
  
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [msgInput, setMsgInput] = useState('');

  const icebreakers = [
    "🎲 [아이스브레이킹] '평생 훠궈마라탕만 먹기 vs 평생 삼겹살 소고기만 먹기' 당신의 선택은?",
    "🎲 [아이스브레이킹] 신촌 최고의 가성비 밥약 맛집 추천해 주기!",
    "🎲 [아이스브레이킹] 이번 주 연대 전공 수업 중 가장 탈주하고 싶었던 순간은? 😂",
    "🎲 [아이스브레이킹] '밤샘 팀플 코딩하기 vs 고학번 교수님과 일대일 밥약하기'",
    "🎲 [아이스브레이킹] 주말 힐링: 시끄러운 술집에서 달리기 vs 힙한 LP바에서 음악 감상!"
  ];

  const handleAddFriend = (e) => {
    e.preventDefault();
    if (!friendNickname.trim()) return;
    
    const newId = Date.now();
    const newFriend = { id: newId, name: friendNickname, intro: "새로운 연대 밥약 친구!" };
    setFriends([...friends, newFriend]);
    
    setChatRooms([...chatRooms, { 
      id: newId, 
      name: friendNickname, 
      type: "친구", 
      messages: [{ isMe: false, text: `👋 ${friendNickname}님과 닉네임 친구가 되었습니다. 대화를 나누어보세요!` }] 
    }]);
    
    alert(`${friendNickname}님이 친구 목록에 추가되었습니다!`);
    setFriendNickname('');
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!msgInput.trim()) return;

    setChatRooms(chatRooms.map(room => {
      if (room.id === activeRoomId) {
        return { ...room, messages: [...room.messages, { isMe: true, text: msgInput }] };
      }
      return room;
    }));
    setMsgInput('');
  };

  const triggerIcebreaker = () => {
    const randomIdx = Math.floor(Math.random() * icebreakers.length);
    const text = icebreakers[randomIdx];
    
    setChatRooms(chatRooms.map(room => {
      if (room.id === activeRoomId) {
        return { ...room, messages: [...room.messages, { isMe: true, text }] };
      }
      return room;
    }));
  };

  const currentRoom = chatRooms.find(r => r.id === activeRoomId);

  return (
    <div style={{ display: 'flex', height: '510px', border: '1px solid #eee', borderRadius: '25px', overflow: 'hidden', background: '#fff' }}>
      
      {/* 좌측 메인 컨트롤 패널 */}
      <div style={{ width: '250px', borderRight: '1px solid #eee', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #f5f5f5', padding: '10px', gap: '5px' }}>
          <button onClick={() => setActiveMenu('chats')} style={{ flex: 1, padding: '10px', background: activeMenu === 'chats' ? '#f0f7ff' : '#fff', color: activeMenu === 'chats' ? '#007bff' : '#555', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>💬 대화방</button>
          <button onClick={() => setActiveMenu('friends')} style={{ flex: 1, padding: '10px', background: activeMenu === 'friends' ? '#f0f7ff' : '#fff', color: activeMenu === 'friends' ? '#007bff' : '#555', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' }}>👥 친구목록</button>
        </div>

        <div className="custom-scroll" style={{ flex: 1, overflowY: 'auto', padding: '12px' }}>
          {activeMenu === 'friends' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <form onSubmit={handleAddFriend} style={{ display: 'flex', gap: '4px' }}>
                <input type="text" placeholder="닉네임으로 친추" value={friendNickname} onChange={(e) => setFriendNickname(e.target.value)} style={{ flex: 1, padding: '8px 10px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '11.5px', outline: 'none' }} />
                <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '8px', padding: '0 10px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>등록</button>
              </form>
              
              {friends.map(f => (
                <div key={f.id} onClick={() => { setActiveRoomId(f.id); setActiveMenu('chats'); }} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', borderRadius: '12px', cursor: 'pointer', background: '#fafafa', border: '1px solid #f0f0f0' }}>
                  <div style={{ width: '30px', height: '30px', background: '#e0f2fe', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '12px' }}>👤</div>
                  <div style={{ minWidth: 0 }}><div style={{ fontWeight: 'bold', fontSize: '12.5px' }}>{f.name}</div><div style={{ fontSize: '10px', color: '#888', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{f.intro}</div></div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {chatRooms.map(room => (
                <div key={room.id} onClick={() => setActiveRoomId(room.id)} style={{ padding: '12px', borderRadius: '12px', background: activeRoomId === room.id ? '#f0f7ff' : '#fff', border: activeRoomId === room.id ? '1px solid #007bff' : '1px solid #f0f0f0', cursor: 'pointer' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3px' }}>
                    <span style={{ fontWeight: 'bold', fontSize: '13px' }}>{room.name}</span>
                    <span style={{ fontSize: '9.5px', background: room.type === '매칭' ? '#e0f7fa' : '#f1f3f5', color: room.type === '매칭' ? '#006064' : '#666', padding: '1px 5px', borderRadius: '5px' }}>{room.type}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#777', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{room.messages[room.messages.length - 1]?.text || '대화 내역이 없습니다.'}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 우측 실시간 피드 및 롤링 보드 */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#fafafa' }}>
        {currentRoom ? (
          <>
            <div style={{ padding: '12px 20px', background: 'white', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 'bold', fontSize: '14.5px' }}>{currentRoom.name}</span>
              <button onClick={triggerIcebreaker} style={{ background: '#ff9800', color: 'white', border: 'none', padding: '5px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}>🎲 토크 토스</button>
            </div>

            <div className="custom-scroll" style={{ flex: 1, padding: '15px 20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {currentRoom.messages.map((m, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: m.isMe ? 'flex-end' : 'flex-start' }}>
                  <div style={{
                    maxWidth: '75%', padding: '9px 13px', borderRadius: '14px', fontSize: '12.5px', lineHeight: '1.45', wordBreak: 'break-all',
                    background: m.isMe ? (m.text.includes('🎲') ? '#fff3e0' : '#007bff') : 'white',
                    color: m.isMe ? (m.text.includes('🎲') ? '#e65100' : 'white') : '#333',
                    border: m.isMe ? 'none' : '1px solid #e0e0e0',
                    fontWeight: m.text.includes('🎲') ? 'bold' : 'normal'
                  }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSendMessage} style={{ padding: '12px', background: 'white', borderTop: '1px solid #eee', display: 'flex', gap: '8px' }}>
              <input type="text" placeholder="메시지 전송하기..." value={msgInput} onChange={(e) => setMsgInput(e.target.value)} style={{ flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '10px', fontSize: '12.5px', outline: 'none' }} />
              <button type="submit" style={{ background: '#007bff', color: 'white', border: 'none', borderRadius: '10px', padding: '0 15px', fontWeight: 'bold', cursor: 'pointer', fontSize: '12.5px' }}>보내기</button>
            </form>
          </>
        ) : (
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#aaafb5', fontSize: '13px' }}>💬 왼쪽의 대화 채널을 활성화하거나 닉네임 친구를 등록해 밥약을 제안하세요.</div>
        )}
      </div>
    </div>
  );
}