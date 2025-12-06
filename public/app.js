// Socket.IO 연결
const socket = io();

// DOM 요소
const loginModal = document.getElementById('login-modal');
const usernameInput = document.getElementById('username-input');
const joinBtn = document.getElementById('join-btn');
const messageInput = document.getElementById('message-input');
const sendBtn = document.getElementById('send-btn');
const chatMessages = document.getElementById('chat-messages');
const userList = document.getElementById('user-list');
const typingIndicator = document.getElementById('typing-indicator');

let currentUsername = '';
let typingTimeout;

// 페이지 로드 시 로그인 모달 표시
window.addEventListener('load', () => {
    loginModal.style.display = 'flex';
    usernameInput.focus();
});

// Enter 키로 입장
usernameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        joinChat();
    }
});

// 입장 버튼
joinBtn.addEventListener('click', joinChat);

// 채팅 입장
function joinChat() {
    const username = usernameInput.value.trim();
    if (username) {
        currentUsername = username;
        socket.emit('join', username);
        loginModal.style.display = 'none';
        messageInput.focus();
    }
}

// 메시지 전송
sendBtn.addEventListener('click', sendMessage);
messageInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

function sendMessage() {
    const message = messageInput.value.trim();
    if (message) {
        socket.emit('chat-message', { message });
        messageInput.value = '';
        socket.emit('typing', false);
    }
}

// 타이핑 감지
messageInput.addEventListener('input', () => {
    socket.emit('typing', true);

    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
        socket.emit('typing', false);
    }, 1000);
});

// 메시지 수신
socket.on('message', (data) => {
    addMessage(data);
});

// 메시지 추가
function addMessage(data) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message';

    // 메시지 타입에 따라 클래스 추가
    if (data.type === 'system') {
        messageDiv.classList.add('system');
    } else if (data.type === 'ai') {
        messageDiv.classList.add('ai');
    }

    const time = new Date(data.timestamp).toLocaleTimeString('ko-KR', {
        hour: '2-digit',
        minute: '2-digit'
    });

    messageDiv.innerHTML = `
        <div class="message-header">
            <span class="message-user ${data.type === 'ai' ? 'ai' : ''}">${data.user}</span>
            <span class="message-time">${time}</span>
        </div>
        <div class="message-text">${escapeHtml(data.text)}</div>
    `;

    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// 사용자 목록 업데이트
socket.on('update-users', (users) => {
    userList.innerHTML = '';

    users.forEach(user => {
        const userItem = document.createElement('div');
        userItem.className = 'user-item';

        // AI 봇인 경우
        if (user.id && user.id.startsWith('ai_')) {
            userItem.classList.add('ai');
        }

        userItem.innerHTML = `
            <span>${user.avatar || '👤'}</span>
            <span>${user.name}</span>
        `;

        userList.appendChild(userItem);
    });
});

// 사용자 참여 알림
socket.on('user-joined', (data) => {
    console.log(`${data.user}님이 입장했습니다.`);
});

// 사용자 퇴장 알림
socket.on('user-left', (data) => {
    const systemMsg = {
        user: 'System',
        text: `${data.user}님이 퇴장했습니다.`,
        timestamp: new Date(),
        type: 'system'
    };
    addMessage(systemMsg);
});

// 타이핑 중 표시
socket.on('user-typing', (data) => {
    if (data.isTyping) {
        typingIndicator.textContent = `${data.user}님이 입력 중...`;
    } else {
        typingIndicator.textContent = '';
    }
});

// HTML 이스케이프 (XSS 방지)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 연결 상태 표시
socket.on('connect', () => {
    console.log('✅ 서버 연결됨');
});

socket.on('disconnect', () => {
    console.log('❌ 서버 연결 끊김');
    const systemMsg = {
        user: 'System',
        text: '서버와의 연결이 끊어졌습니다. 다시 연결 중...',
        timestamp: new Date(),
        type: 'system'
    };
    addMessage(systemMsg);
});

socket.on('reconnect', () => {
    console.log('✅ 서버 재연결됨');
    if (currentUsername) {
        socket.emit('join', currentUsername);
    }
});
