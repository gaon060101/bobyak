import { useState } from 'react';

export default function ChatTab() {
  const [messages, setMessages] = useState([
    { id: 1, text: '안녕하세요! 매칭되어서 연락드려요.', isMe: false }
  ]);

  const addIcebreaker = (animal) => {
    const questions = {
      '양': '양 님이 질문을 뽑았습니다: 가장 좋아하는 동물은 무엇인가요?',
      '부엉이': '부엉이 님이 질문을 뽑았습니다: 밤샘 코딩 vs 아침 일찍 코딩?'
    };
    
    setMessages([...messages, { 
      id: Date.now(), 
      text: questions[animal], 
      isMe: true, 
      isIcebreaker: true 
    }]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h2 style={{ marginTop: 0 }}>채팅방</h2>
      
      <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {messages.map(msg => (
          <div key={msg.id} style={{ 
            alignSelf: msg.isMe ? 'flex-end' : 'flex-start',
            background: msg.isIcebreaker ? '#fff3e0' : (msg.isMe ? '#007bff' : '#e9ecef'),
            color: msg.isMe && !msg.isIcebreaker ? 'white' : 'black',
            padding: '12px 20px',
            borderRadius: '25px',
            maxWidth: '80%',
            border: msg.isIcebreaker ? '2px dashed #ffb74d' : 'none'
          }}>
            {msg.text}
          </div>
        ))}
      </div>

      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '30px' }}>
        <p style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#888', textAlign: 'center' }}>
          어색할 땐 아이스브레이킹 카드를 뽑아보세요
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
          <button 
            className="circle-btn" 
            style={{ width: '60px', height: '60px', background: 'white', fontSize: '28px', border: '1px solid #ddd' }}
            onClick={() => addIcebreaker('양')}
          >
            🐑
          </button>
          <button 
            className="circle-btn" 
            style={{ width: '60px', height: '60px', background: 'white', fontSize: '28px', border: '1px solid #ddd' }}
            onClick={() => addIcebreaker('부엉이')}
          >
            🦉
          </button>
        </div>
      </div>
    </div>
  );
}