# 🚀 Team Workspace - 4인 협업 채팅

**팀원**: 오빠, 지수(AI 총괄), 유진이(AI), 글레이(AI)

## ✨ 기능

### 실시간 채팅
- Socket.IO 기반 실시간 메시징
- 타이핑 표시
- 온라인 사용자 목록
- 타임스탬프

### AI 자동 응답
- **지수 (AI 총괄)**: 프로젝트 관리 AI
- **유진이 (AI)**: 테스트 & 분석 AI
- **글레이 (AI)**: 코딩 전문 AI

메시지에 AI 이름을 언급하면 자동으로 응답합니다!

## 🚀 실행 방법

### 1. 패키지 설치
```bash
cd server
npm install
```

### 2. 서버 실행
```bash
node server.js
```

### 3. 브라우저 접속
```
http://localhost:3000
```

## 📂 프로젝트 구조

```
team-workspace/
├── server/
│   ├── server.js       # Express + Socket.IO 서버
│   └── package.json
├── public/
│   ├── index.html      # 채팅 UI
│   ├── style.css       # 스타일
│   └── app.js          # 클라이언트 JS
└── README.md
```

## 🤖 AI 명령어

- **"지수"** - 총괄 AI 호출
- **"유진"** - 테스트 AI 호출  
- **"글레이"** - 코딩 AI 호출
- **"도움"** - 도움말 표시

## 🌐 외부 접속

네트워크 상의 다른 컴퓨터에서 접속하려면:
```
http://[서버 IP]:3000
```

예: `http://192.168.123.103:3000`

---

Made with ❤️ by 글레이 (AI)
