// 📌 Service Worker 설치 이벤트
self.addEventListener("install", (event) => {
    console.log("✅ Service Worker 설치 완료");
    self.skipWaiting(); // 즉시 활성화
});

// 📌 Service Worker 활성화 이벤트
self.addEventListener("activate", (event) => {
    console.log("✅ Service Worker 활성화 완료");
    event.waitUntil(self.clients.claim()); // 모든 클라이언트 제어
});

// 📌 ESP32와의 통신을 방해하지 않도록 fetch 요청 수정
self.addEventListener("fetch", (event) => {
    const requestUrl = new URL(event.request.url);

    // 🚨 ESP32 (로컬 네트워크)와의 요청은 캐싱하지 않음
    if (requestUrl.hostname.startsWith("192.168.")) {
        console.log(`🔄 ESP32 요청 감지 (캐싱 제외): ${event.request.url}`);
        return; // Service Worker가 가로채지 않도록 그냥 통과시킴
    }

    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// 📌 푸시 알림 수신 이벤트
self.addEventListener("push", async (event) => {
    console.log("📌 푸시 알림 수신:", event);
    
    let notificationData = {};

    if (event.data) {
        // 먼저 텍스트 형태로 데이터를 읽는다.
        let textData = "";
        try {
            textData = await event.data.text();
            console.log("푸시 데이터 (텍스트):", textData);
        } catch (readError) {
            console.error("🚨 푸시 데이터 텍스트 읽기 실패:", readError);
        }
        
        // 읽은 텍스트를 JSON 파싱 시도
        try {
            notificationData = JSON.parse(textData);
            console.log("푸시 데이터 (JSON):", notificationData);
        } catch (parseError) {
            console.warn("🚨 JSON 파싱 실패, 일반 텍스트 처리:", parseError);
            notificationData = { title: "📢 New Message", body: textData };
        }
    }

    const title = notificationData.title || "🚴 Ride Smart, Stay Safe";
    const options = {
        body: notificationData.body || "Your Ultimate Companion for a Smooth Journey.",
        icon: notificationData.icon || "/icons/icon-192x192-notiflication.png",
        badge: notificationData.badge || "/icons/icon-96x96-notiflication.png",
        vibrate: [200, 100, 200],
        actions: [
            { action: "open", title: "열기" },
            { action: "dismiss", title: "닫기" }
        ]
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// 📌 알림 클릭 시 앱 열기
self.addEventListener("notificationclick", (event) => {
    event.notification.close();
    if (event.action === "open") {
        event.waitUntil(clients.openWindow("/"));
    }
});
