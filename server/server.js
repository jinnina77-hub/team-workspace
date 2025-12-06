const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    },
    pingTimeout: 60000,        // 60초 동안 응답 없으면 끊김
    pingInterval: 25000,       // 25초마다 ping 전송
    transports: ['websocket', 'polling'],  // WebSocket 우선
    allowEIO3: true,
    connectTimeout: 45000,     // 연결 타임아웃 45초
    maxHttpBufferSize: 1e6     // 최대 버퍼 크기
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.static(path.join(__dirname, '../public')));

// 접속 중인 사용자 목록
let users = {};

// AI 봇들 (자동 참여)
const AI_BOTS = [
    { id: 'ai_jisu', name: '지수 (AI 총괄)', avatar: '👩‍💼' },
    { id: 'ai_yujin', name: '유진이 (AI)', avatar: '👨‍💻' },
    { id: 'ai_gray', name: '글레이 (AI)', avatar: '🤖' }
];

// Socket.IO 연결
io.on('connection', (socket) => {
    console.log(`✅ 새 사용자 접속: ${socket.id}`);

    // 사용자 참여
    socket.on('join', (username) => {
        users[socket.id] = {
            id: socket.id,
            name: username,
            avatar: '👤',
            joinedAt: new Date()
        };

        // 사용자에게 환영 메시지
        socket.emit('message', {
            user: 'System',
            text: `${username}님, 협업 워크스페이스에 오신 것을 환영합니다! 🎉`,
            timestamp: new Date(),
            type: 'system'
        });

        // 모든 사용자에게 알림
        io.emit('user-joined', {
            user: username,
            userList: getAllUsers()
        });

        // 현재 사용자 목록 전송
        io.emit('update-users', getAllUsers());
    });

    // 메시지 수신
    socket.on('chat-message', (data) => {
        const user = users[socket.id];
        if (user) {
            const message = {
                user: user.name,
                text: data.message,
                timestamp: new Date(),
                type: 'user'
            };

            // 모든 사용자에게 메시지 전송
            io.emit('message', message);

            // AI 자동 응답 (특정 키워드에 반응)
            handleAIResponse(data.message, user.name);
        }
    });

    // 타이핑 중
    socket.on('typing', (isTyping) => {
        const user = users[socket.id];
        if (user) {
            socket.broadcast.emit('user-typing', {
                user: user.name,
                isTyping
            });
        }
    });

    // 연결 해제
    socket.on('disconnect', () => {
        const user = users[socket.id];
        if (user) {
            console.log(`❌ 사용자 퇴장: ${user.name}`);
            delete users[socket.id];

            io.emit('user-left', {
                user: user.name,
                userList: getAllUsers()
            });

            io.emit('update-users', getAllUsers());
        }
    });
});

// 모든 사용자 목록 반환 (AI 봇 포함)
function getAllUsers() {
    const userList = Object.values(users);
    return [...AI_BOTS, ...userList];
}

// AI 자동 응답
function handleAIResponse(message, username) {
    const msg = message.toLowerCase();

    // 지수 AI 응답
    if (msg.includes('지수') || msg.includes('총괄')) {
        setTimeout(() => {
            io.emit('message', {
                user: '지수 (AI 총괄)',
                text: `네, ${username}님! 무엇을 도와드릴까요?`,
                timestamp: new Date(),
                type: 'ai'
            });
        }, 500);
    }

    // 유진이 AI 응답
    if (msg.includes('유진') || msg.includes('테스트')) {
        setTimeout(() => {
            io.emit('message', {
                user: '유진이 (AI)',
                text: `${username}님, 테스트 관련해서 말씀하신 건가요?`,
                timestamp: new Date(),
                type: 'ai'
            });
        }, 500);
    }

    // 글레이 AI 응답
    if (msg.includes('글레이') || msg.includes('코드') || msg.includes('도와줘')) {
        setTimeout(() => {
            io.emit('message', {
                user: '글레이 (AI)',
                text: `${username}님! 코딩 관련 질문이신가요? 제가 도와드릴게요!`,
                timestamp: new Date(),
                type: 'ai'
            });
        }, 500);
    }

    // 일반 도움 요청
    if (msg.includes('도움') || msg.includes('help')) {
        setTimeout(() => {
            io.emit('message', {
                user: '지수 (AI 총괄)',
                text: `사용 가능한 명령어:\n- "지수" - 총괄 AI 호출\n- "유진" - 테스트 AI 호출\n- "글레이" - 코딩 AI 호출\n- "도움" - 도움말 표시`,
                timestamp: new Date(),
                type: 'ai'
            });
        }, 500);
    }
}

// 서버 시작
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Team Workspace 서버 실행 중!`);
    console.log(`📍 로컬: http://localhost:${PORT}`);
    console.log(`📍 네트워크: http://0.0.0.0:${PORT}`);
    console.log(`\n👥 팀원: 오빠, 지수(AI), 유진이(AI), 글레이(AI)`);
});
