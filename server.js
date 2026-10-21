const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Endpoint untuk memproses pembuatan APK (Simulasi / Generator config)
app.post('/api/build-apk', upload.single('icon'), (req, res) => {
    const { appName, packageNmae, websiteUrl } = req.body;
    const iconFile = req.file;

    if (!appName || !websiteUrl) {
        return res.status(400).json({ success: false, message: 'Nama aplikasi dan URL website wajib diisi!' });
    }

    // Di sini Anda bisa menambahkan logika server untuk memanggil script Python/Cordova 
    // Untuk contoh ini, kita berikan respons sukses simulasi build instan.
    
    setTimeout(() => {
        // Simulasi pembuatan file APK jadi (bisa diarahkan ke link download dummy atau zip template)
        res.json({
            success: true,
            message: 'APK berhasil dibuat!',
            downloadUrl: `/downloads/sample-app.apk`, // Ganti dengan file asli jika server mendukung build native
            details: {
                appName,
                packageNmae: packageNmae || 'com.mycompany.app',
                websiteUrl,
                iconUploaded: iconFile ? iconFile.originalname : 'Default Icon'
            }
        });
    }, 3000); // Simulasi proses selama 3 detik
});

// Dummy route untuk download (opsional)
app.get('/downloads/:filename', (req, res) => {
    // Anda bisa membuat file dummy atau mengirimkan file hasil build asli di sini
    res.send('File APK Anda sedang disiapkan atau template WebView siap diunduh.');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});
