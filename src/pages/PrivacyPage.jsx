import MagicBackground from "../components/effects";

export default function PrivacyPage() {
    const handleClickGooglePrivacy = (e) => {
        e.preventDefault();
        window.electronAPI?.openLink("https://policies.google.com/privacy");
    };

    return (
        <div className="w-full min-h-screen bg-neutral-950 text-white flex flex-col items-center relative overflow-hidden py-24 px-4">
            {/* Büyülü Arkaplan Efektleri */}
            <MagicBackground />
            <div className="z-10 w-full max-w-5xl px-4 text-left">
                {/* Başlık */}
                <div className="mb-8 text-center">
                    <h1
                        className="text-4xl md:text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-400 leading-tight" // leading-24 çok büyük, leading-tight daha iyi
                        style={{ fontFamily: "Henny Penny" }}
                    >
                        Gizlilik Politikası
                    </h1>
                    <p className="text-zinc-400 text-sm mt-2">
                        Verilerinizle ilgili yaklaşımımız
                    </p>
                </div>
                {/* Politika Metni */}
                <div className="text-zinc-300 text-sm leading-relaxed space-y-6">
                    <p>
                        Folder Wizard programını kullandığınız için teşekkür
                        ederiz. Gizliliğiniz bizim için önemlidir. Bu politika,
                        programımızın kullanıcı verileriyle ilgili yaklaşımını
                        ve Google'ın Gemini API'sinin kullanımıyla ilgili
                        hususları açıklamaktadır.
                    </p>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            Gemini API Kullanımı
                        </h2>
                        <p>
                            Programımız Folder Wizard, dosyalarınız için{" "}
                            <b>yeni klasör veya dosya yolları önerme</b> gibi
                            akıllı organizasyon ve analiz özellikleri sunmak
                            amacıyla Google tarafından sağlanan Gemini API'sini
                            kullanmaktadır. Bu özellik, dosyalarınızı daha
                            verimli bir şekilde organize etmenize yardımcı olmak
                            için tasarlanmıştır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            API'ye Gönderilen Veriler
                        </h2>
                        <p>
                            Gemini API'sine gönderilen veriler{" "}
                            <b>kesinlikle dosya içeriğinizi içermez.</b>{" "}
                            Programımız, dosya içeriğinizin gizliliğini korumak
                            için içeriği API'ye göndermez.
                        </p>
                        <p className="mt-2">
                            API'ye yalnızca, istenen öneriyi oluşturmak için
                            gerekli olan aşağıdaki bilgiler gönderilebilir:
                        </p>
                        <ul className="list-disc list-inside ml-4 text-zinc-400 space-y-1 mt-2">
                            <li>Dosya Adı</li>
                            <li>Dosya Uzantısı</li>
                            <li>
                                Dosya Yolu (işlemin yapıldığı konumun bir kısmı
                                veya tamamı)
                            </li>
                        </ul>
                        <p className="mt-2">
                            API iletişiminde, ilgili özelliğin çalışması için{" "}
                            <b>
                                minimum düzeyde ve içeriği hariç tutacak şekilde
                            </b>{" "}
                            veri gönderilir. Programımız, API'ye gönderilen
                            verilerin iletimi sırasında güvenliği sağlamak için
                            endüstri standardı güvenlik protokolleri (örn.
                            HTTPS/SSL) kullanır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            Google Tarafından Veri İşleme ve Sorumluluk Reddi
                        </h2>
                        <p>
                            Lütfen dikkat: Gemini API'sine gönderilen verilerin
                            Google'ın sunucularında nasıl işlendiği ve
                            kullanıldığı, Google'ın kendi Hizmet Şartları ve
                            Gizlilik Politikaları'na tabidir. Folder Wizard bu
                            politikaları doğrudan kontrol etmez. Google'ın veri
                            işleme uygulamaları hakkında daha fazla bilgi
                            edinmek için lütfen{" "}
                            <a
                                onClick={handleClickGooglePrivacy}
                                rel="noopener noreferrer"
                                className="text-indigo-400 hover:underline cursor-pointer"
                            >
                                Google Gizlilik Politikası
                            </a>{" "}
                            gibi ilgili dokümanları inceleyin.
                        </p>
                        <p className="mt-4 font-semibold text-red-400">
                            Önemli Not: Gemini API'sine gönderilen verilerin
                            Google'ın sunucularında işlenmesi sırasında olası
                            bir veri ihlali veya Google kaynaklı diğer güvenlik
                            sorunlarından Folder Wizard sorumlu tutulamaz.
                            Verilerinizin Google tarafındaki işlenmesi, tamamen
                            Google'ın kendi gizlilik ve güvenlik politikalarına
                            ve altyapısına bağlıdır.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            Yerel Veri İşleme ve Saklama
                        </h2>
                        <p>
                            Gemini API kullanımının dışında kalan dosya taşıma,
                            dosya oluşturma, klasörleme gibi tüm dosya işlemleri{" "}
                            <b>
                                yalnızca sizin cihazınızda yerel olarak
                                gerçekleştirilir ve saklanır.
                            </b>{" "}
                            Bu işlemler sırasında hiçbir veri dışarıya
                            gönderilmez.
                        </p>
                        <p className="mt-2">
                            Folder Wizard, Gemini API ile yapılan iletişimler
                            sırasında gönderilen veya alınan dosya yolu, dosya
                            adı gibi verileri <b>kalıcı olarak saklamaz</b>. Bu
                            veriler yalnızca işlemin tamamlanması için geçici
                            olarak kullanılır ve sonrasında tutulmaz.
                        </p>
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold text-white mb-2">
                            Politika Değişiklikleri
                        </h2>
                        <p>
                            Bu gizlilik politikası, programımızın özelliklerine
                            veya veri işleme uygulamalarına göre
                            güncellenebilir. Önemli değişiklikler olduğunda sizi
                            program içinde veya websitemizde bilgilendirmeye
                            çalışacağız.
                        </p>
                    </div>
                </div>{" "}
                {/* Politika Metni Sonu */}
            </div>{" "}
            {/* Ana İçerik Sonu */}
        </div>
    );
}
