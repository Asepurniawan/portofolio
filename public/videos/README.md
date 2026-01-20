# 📹 Video Backgrounds

## Cara Menambahkan Video Background

### 1. File Video yang Dibutuhkan

Untuk section **Tentang (About)**, letakkan file video Anda di folder ini dengan nama:
- `about-bg.mp4` (format utama)
- `about-bg.webm` (format alternatif, opsional)

### 2. Spesifikasi Video yang Disarankan

**Resolusi:**
- Minimum: 1280x720 (720p)
- Recommended: 1920x1080 (1080p)
- Aspect Ratio: 16:9

**Format:**
- MP4 (H.264 codec) - kompatibel dengan semua browser
- WebM (VP9 codec) - opsional, untuk browser modern

**Durasi:**
- 10-30 detik untuk looping yang smooth
- Pastikan awal dan akhir video seamless untuk looping

**Ukuran File:**
- Maksimal 10MB untuk performa optimal
- Compress video untuk mengurangi ukuran tanpa mengurangi kualitas

### 3. Dimana Mendapatkan Video?

**Sumber Gratis:**
- [Pexels Videos](https://www.pexels.com/videos/)
- [Pixabay Videos](https://pixabay.com/videos/)
- [Videvo](https://www.videvo.net/)
- [Coverr](https://coverr.co/)

**Tips Memilih Video:**
- Pilih video dengan gerakan smooth dan tidak terlalu ramai
- Hindari video dengan teks atau watermark
- Pastikan cocok dengan tema section (tentang/pendidikan/skills)

### 4. Compress Video (Opsional)

Gunakan tools online untuk compress:
- [HandBrake](https://handbrake.fr/) (desktop app)
- [CloudConvert](https://cloudconvert.com/mp4-converter)
- [Online Video Compressor](https://www.freeconvert.com/video-compressor)

**Settings Recommended:**
- Codec: H.264
- Quality: Medium (CRF 23-28)
- Resolution: 1920x1080 atau 1280x720
- Framerate: 25-30 fps

### 5. Video Background untuk Section Lain

Jika ingin menambahkan video di section lain, gunakan nama file:
- `home-bg.mp4` / `home-bg.webm` - Hero section
- `education-bg.mp4` / `education-bg.webm` - Pendidikan section
- `skills-bg.mp4` / `skills-bg.webm` - Skills section
- `contact-bg.mp4` / `contact-bg.webm` - Contact section

### 6. Fallback

Jika video tidak ada atau gagal load, sistem akan otomatis menggunakan **animated gradient background** sebagai fallback.

### 7. Testing

Setelah menambahkan video:
1. Refresh halaman web
2. Periksa apakah video autoplay dan loop
3. Test di berbagai browser (Chrome, Firefox, Safari)
4. Test di mobile device

## 📱 Mobile Optimization

Video background akan tetap ditampilkan di mobile dengan beberapa optimasi:
- Video di-compress otomatis oleh browser
- Autoplay mungkin tidak bekerja di beberapa device (akan pakai gradient)
- Pastikan video tidak terlalu besar (max 10MB)

## 🎨 Contoh Video Background yang Cocok

**Untuk Section About:**
- Abstract tech animations
- Coding screens dengan smooth transitions
- Modern workspace/office scenes
- Technology/innovation themed videos
- Particles atau geometric patterns

**Keyword pencarian:**
- "technology background"
- "coding animation"
- "abstract tech"
- "digital background"
- "modern workspace"

## ⚙️ Status Saat Ini

✅ Video element sudah ditambahkan di HTML
✅ CSS styling sudah siap
✅ Animated gradient fallback aktif
⏳ **Menunggu video file diupload**

## 🚀 Quick Start

1. Download video dari Pexels/Pixabay
2. Rename menjadi `about-bg.mp4`
3. Copy ke folder `public/videos/`
4. Refresh halaman - Done! ✨

---

**Note:** Video akan autoplay, muted, dan loop secara otomatis. Overlay gelap akan ditambahkan agar text tetap readable.
