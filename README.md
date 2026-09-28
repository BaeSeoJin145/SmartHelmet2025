# Smart Helmet

**English | 한국어**

## English

Smart Helmet is a mobile-oriented web app for cycling. It provides account registration and sign-in, ride tracking and navigation screens, emergency contact/profile details, and a Bluetooth device connection screen. The app is built with HTML, CSS, and JavaScript modules and uses Firebase Authentication and Realtime Database.

### Features

- Register, sign in, and manage a user profile.
- Start a free ride or open the navigation ride flow; view ride time, distance, speed, and calories on the finish screen.
- Save emergency information, including a contact phone number.
- Monitor the configured shock sensor value in Firebase and open the phone dialer when an impact is detected.
- Scan for nearby Bluetooth devices where the browser supports Web Bluetooth.
- Install the app as a PWA and receive browser notifications where supported.

### Project structure

```text
.
├── index.html                 # Welcome page
├── login.html                 # Sign-in
├── register.html              # Account registration
├── main.html                  # Main menu
├── goriding.html              # Ride mode selection
├── freeriding.html            # Free ride screen
├── withnavigation.html        # Destination and navigation screen
├── finishriding.html          # Ride summary
├── emergency.html             # Emergency information
├── connectdevice.html         # Bluetooth device screen
├── css-files/                 # Page stylesheets
├── icons/                     # App and UI images
└── script/
    ├── app.js                 # Firebase, app interactions, and ride logic
    ├── service-worker.js      # PWA service worker
    └── site.webmanifest       # PWA metadata
```

### Run locally

Serve the project directory over HTTP rather than opening the HTML files directly. For example, with Python installed:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in a browser. Features such as service workers, notifications, geolocation, and Web Bluetooth generally require a secure context (HTTPS, or localhost) and browser/device support. Bluetooth scanning is best tested on a compatible mobile or desktop browser.

### Firebase and hardware configuration

The Firebase project configuration is currently defined in `script/app.js`. To use a different Firebase project, configure Firebase Authentication and Realtime Database, then update `firebaseConfig` and the database security rules for your app. Do not rely on client-side configuration or hidden UI as database access control; use appropriate Firebase security rules. The app expects user data under `users/{uid}`, including profile/emergency fields and a `sensor/shock` value. A compatible helmet/device must update that sensor value for impact detection to work.

### Notes

- Browser and device support varies for notifications, background service workers, geolocation, and Web Bluetooth.
- Emergency dialing opens a `tel:` link; the user/device may need to confirm the call.
- This repository contains static frontend files and does not include a backend server or hardware firmware.

## 한국어

Smart Helmet은 자전거 주행을 위한 모바일 중심 웹 앱입니다. 회원가입과 로그인, 주행 및 내비게이션 화면, 긴급 연락처와 프로필 정보 관리, 블루투스 기기 연결 화면을 제공합니다. HTML, CSS, JavaScript 모듈로 구성되어 있으며 Firebase Authentication과 Realtime Database를 사용합니다.

### 주요 기능

- 회원가입, 로그인, 사용자 프로필 관리
- 자유 주행 또는 내비게이션 주행 흐름 실행 및 주행 시간·거리·속도·칼로리 요약 확인
- 긴급 연락처를 포함한 긴급 정보 저장
- Firebase에 저장된 충격 센서 값을 확인하고 충격 감지 시 휴대전화의 전화 앱 열기
- 브라우저가 지원하는 경우 주변 블루투스 기기 검색
- PWA 설치 및 지원되는 브라우저에서 알림 수신

### 프로젝트 구조

```text
.
├── index.html                 # 시작 화면
├── login.html                 # 로그인
├── register.html              # 회원가입
├── main.html                  # 메인 메뉴
├── goriding.html              # 주행 모드 선택
├── freeriding.html            # 자유 주행 화면
├── withnavigation.html        # 목적지 및 내비게이션 화면
├── finishriding.html          # 주행 결과
├── emergency.html             # 긴급 정보
├── connectdevice.html         # 블루투스 기기 화면
├── css-files/                 # 페이지별 스타일
├── icons/                     # 앱 및 UI 이미지
└── script/
    ├── app.js                 # Firebase, 앱 동작, 주행 로직
    ├── service-worker.js      # PWA 서비스 워커
    └── site.webmanifest       # PWA 메타데이터
```

### 로컬 실행

HTML 파일을 직접 여는 대신 프로젝트 디렉터리를 HTTP 서버로 실행하세요. Python이 설치되어 있다면 다음 명령을 사용할 수 있습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 <http://localhost:8000>을 여세요. 서비스 워커, 알림, 위치 정보, Web Bluetooth 등의 기능은 일반적으로 HTTPS(또는 localhost)와 브라우저·기기 지원이 필요합니다. 블루투스 검색은 호환되는 모바일 또는 데스크톱 브라우저에서 확인하세요.

### Firebase 및 하드웨어 설정

현재 Firebase 프로젝트 설정은 `script/app.js`에 있습니다. 다른 Firebase 프로젝트를 사용하려면 Firebase Authentication과 Realtime Database를 설정한 뒤 `firebaseConfig`와 데이터베이스 보안 규칙을 변경하세요. 클라이언트 설정이나 화면상의 접근 제한을 데이터 접근 제어로 간주하지 말고, 적절한 Firebase 보안 규칙을 적용해야 합니다. 앱은 `users/{uid}` 아래에 프로필·긴급 정보와 `sensor/shock` 값을 저장하는 구조를 사용합니다. 충격 감지가 동작하려면 호환되는 헬멧 또는 기기가 해당 센서 값을 업데이트해야 합니다.

### 참고 사항

- 알림, 백그라운드 서비스 워커, 위치 정보, Web Bluetooth 지원 여부는 브라우저와 기기에 따라 다릅니다.
- 긴급 전화 기능은 `tel:` 링크를 열며, 기기에서 사용자가 통화를 확인해야 할 수 있습니다.
- 이 저장소에는 정적 프런트엔드 파일이 포함되어 있으며 백엔드 서버나 하드웨어 펌웨어는 포함되어 있지 않습니다.
