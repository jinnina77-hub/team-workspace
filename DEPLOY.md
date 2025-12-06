# 🚀 Team Workspace 무료 배포 가이드

## 배포 방법 (Render.com)

### 준비 완료 ✅
- Git 저장소 초기화 완료
- 커밋 완료
- Render 설정 파일 생성 완료

---

## 🌐 배포 단계

### Step 1: GitHub 리포지토리 생성

#### 옵션 A: GitHub 웹사이트에서 (추천)
1. https://github.com 접속
2. 우측 상단 **+** → **New repository** 클릭
3. Repository name: `team-workspace`
4. **Public** 또는 **Private** 선택
5. **Create repository** 클릭

#### 옵션 B: GitHub CLI 사용
```bash
# GitHub CLI 설치 후
gh repo create team-workspace --public --source=. --remote=origin --push
```

#### 수동으로 GitHub에 푸시
```bash
cd C:\Users\lifef\.gemini\antigravity\scratch\team-workspace

# GitHub 리포지토리 URL로 변경 (리포지토리 생성 후 받은 URL)
git remote add origin https://github.com/[YOUR-USERNAME]/team-workspace.git

git branch -M main
git push -u origin main
```

---

### Step 2: Render 배포

1. **Render 계정 생성**
   - https://render.com 접속
   - **Get Started for Free** 클릭
   - GitHub 계정으로 로그인

2. **새 Web Service 생성**
   - Dashboard → **New** → **Web Service**
   - **Connect GitHub repository** 선택
   - `team-workspace` 리포지토리 선택

3. **설정**
   - **Name**: team-workspace (또는 원하는 이름)
   - **Root Directory**: `server`
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: Free

4. **Deploy**
   - **Create Web Service** 클릭
   - 자동으로 배포 시작! (5~10분 소요)

5. **배포 완료!**
   - URL 제공됨: `https://team-workspace-xxxx.onrender.com`
   - 이 URL을 팀원들에게 공유!

---

## 🎯 더 빠른 방법: Railway

Railway도 무료이고 더 빠릅니다!

### Railway 배포 (3분)

1. https://railway.app 접속
2. **Start a New Project**
3. **Deploy from GitHub repo** 선택
4. `team-workspace` 선택
5. **Root Directory**: `server` 설정
6. **Deploy now** 클릭

완료! URL 자동 생성됨!

---

## ⚡ 가장 빠른 방법: Glitch (코드 업로드)

1. https://glitch.com 접속
2. **New Project** → **Import from GitHub**
3. GitHub 리포지토리 URL 입력
4. 자동 배포!

---

## 📌 추천 순서

1. **Render** (가장 안정적, 무료)
2. **Railway** (가장 빠름, 무료 티어 제한 있음)
3. **Glitch** (즉시 배포, 제한 있음)

---

## 🔧 배포 후 확인 사항

1. **서버 상태**: Render 대시보드에서 "Deploy succeeded" 확인
2. **URL 접속**: 제공된 URL로 브라우저 접속
3. **채팅 테스트**: 이름 입력 후 메시지 전송 테스트
4. **AI 응답 테스트**: "지수", "유진", "글레이" 호출

---

## 💡 오빠가 해야 할 것

### 1. GitHub 리포지토리 만들기
```bash
# 이미 커밋은 완료되어 있어!
# GitHub에서 리포지토리만 만들면 돼

# 리포지토리 생성 후:
git remote add origin https://github.com/[YOUR-USERNAME]/team-workspace.git
git push -u origin main
```

### 2. Render에서 배포
- render.com 접속
- GitHub 연결
- team-workspace 선택
- 배포!

---

## 🎉 완료 후

배포된 URL을:
- 지수, 유진이에게 공유
- 어디서든 접속 가능!
- 무료!

---

Made with ❤️ by 글레이 (AI)
