// Sıralı gösterim için ana fonksiyon
async function showSequence() {
    console.log("Animasyon başlatılıyor...");
    
    // İframe'leri içerecek bir konteyner oluştur
    const container = document.createElement('div');
    container.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%;';
    document.body.appendChild(container);

    // Fade efekti için stil ekle
    const style = document.createElement('style');
    style.textContent = `
        .frame-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            transition: opacity 1s ease-in-out;
        }
        .frame-container iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `;
    document.head.appendChild(style);

    // Frame oluşturma ve fade-in efekti için yardımcı fonksiyon
    function createFrame(src) {
        console.log(`Frame oluşturuluyor: ${src}`);
        const frameContainer = document.createElement('div');
        frameContainer.className = 'frame-container';
        
        const frame = document.createElement('iframe');
        frame.src = src;
        
        // iframe yükleme hatalarını kontrol et
        frame.onload = () => {
            console.log(`${src} başarıyla yüklendi`);
        };
        
        frame.onerror = (err) => {
            console.error(`${src} yüklenemedi:`, err);
        };
        
        frameContainer.appendChild(frame);
        container.appendChild(frameContainer);

        // Fade in efekti
        setTimeout(() => {
            frameContainer.style.opacity = '1';
        }, 100);

        return frameContainer;
    }

    // Frame'i kaldırmak için yardımcı fonksiyon
    function removeFrame(frameContainer) {
        return new Promise(resolve => {
            frameContainer.style.opacity = '0';
            setTimeout(() => {
                frameContainer.remove();
                resolve();
            }, 1000); // 1 saniye fade-out süresi
        });
    }

    // Her klasörü kontrol et
    try {
        // Çiçek sayfasını doğrudan doküman içine göm
        console.log("flover/index.html yükleniyor...");
        const flowerFrame = createFrame('./flover/index.html');

        // 10 saniye sonra çiçekleri kaldır ve kalpleri göster
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log("love/index.html yükleniyor...");
        const loveFrame = createFrame('./love/index.html');
        await removeFrame(flowerFrame);

        // 10 saniye sonra kalpleri kaldır ve mektubu göster
        await new Promise(resolve => setTimeout(resolve, 10000));
        console.log("mektup/index.html yükleniyor...");
        const letterFrame = createFrame('./mektup/index.html');
        await removeFrame(loveFrame);
        
    } catch (error) {
        console.error("Animasyon sırasında hata oluştu:", error);
    }
}

// Sayfa yüklendiğinde sıralı gösterimi başlat
window.addEventListener('load', () => {
    console.log("Sayfa yüklendi, animasyon başlıyor");
    showSequence();
}); 