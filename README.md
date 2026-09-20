# Tugas Mandiri: Single Page Showcase Webpage (Portofolio Profil Profesional)
**Mata Kuliah:** Pengembangan Pemrograman Web (PPW)  
**Program Studi:** S1 Sistem Informasi - Fakultas Informatika & Teknik Elektro, Institut Teknologi Del  
**Mahasiswa:** Josef Christian Marpaung (NIM: 12S24036)  
**Repositori GitHub:** [ppw-2026-week2-12S24036](https://github.com/JosefMarpaung/ppw-2026-week2-12S24036.git)

---

## Ringkasan Proyek
Halaman web portofolio profil profesional tunggal (*Single Page Showcase Webpage*) ini dibangun oleh **Josef Christian Marpaung** untuk menyajikan identitas akademik, keahlian antarmuka web, rekapitulasi 10 proyek akademik nyata (Pemrograman Berorientasi Objek, Analisis dan Perancangan Sistem, Pemograman dan Pengujian Aplikasi Web, ISPM, Kepemimpinan Organisasi SI, UI/UX, Basis Data, AI, Jaringan Komputer, dan Sistem Operasi), serta formulir pemesanan layanan konsultasi/kontak resmi yang sepenuhnya estetik, rapi (harmonisasi format Hands-on Lab), responsif, dan memenuhi standar aksesibilitas digital **WCAG 2.2 Level AA**.

---

## Pemenuhan Spesifikasi Teknis (Checklist Evaluasi)

### 1. Struktur Semantik HTML5 (Bobot 20%)
- [x] `<header>`: Memuat logo/monogram identitas `JM`, identitas nama Josef Christian Marpaung, dan navigasi utama.
- [x] `<nav>`: Navigasi utama dengan atribut aksesibilitas `aria-label="Navigasi Utama Portofolio"`.
- [x] `<main>`: Kontainer konten utama dengan `id="main-content"`.
- [x] Minimal 3 `<section>` bermakna:
  1. `<section id="tentang">`: Developer Profile Card terstruktur (Hands-on Lab format: banner, avatar mengambang dengan status aktif, bio, skill tags, stats container, action buttons).
  2. `<section id="portofolio">`: Showcase 4 proyek unggulan terpilih dan tabel rekapitulasi semantik 10 proyek akademik terdata.
  3. `<section id="layanan">`: Panduan alur konsultasi dan formulir pemesanan layanan interaktif.
- [x] `<aside>`: Sidebar semantik memuat status akademik (NIM 12S24036, Angkatan 2024, Semester 5), ketersediaan konsultasi, unduhan berkas PDF, dan verifikasi lab.
- [x] `<footer>`: Footer semantik memuat identitas merek, ringkasan kepatuhan WCAG, tautan navigasi langsung, informasi kontak dan alamat resmi dengan `<address>`, hak cipta, dan tombol kembali ke atas.
- [x] Penghindaran `<div>` tanpa makna: Memaksimalkan elemen semantik seperti `<article>`, `<figure>`, `<figcaption>`, `<dl>`, `<dt>`, `<dd>`, `<time>`, `<abbr>`, dan `<address>`.

### 2. Penyajian Data Tabular & Lists (Bobot 15%)
- [x] Tabel Data Semantik Lengkap (10 Proyek Akademik Terverifikasi):
  - Elemen: `<table>`, `<caption>`, `<thead>`, `<tbody>`, `<tfoot>`, `<tr>`, `<th>`, dan `<td>`.
  - Atribut cakupan: `scope="col"` pada semua header kolom dan `scope="row"` pada setiap baris riwayat mata kuliah & total footer.
  - Konten: Rekapitulasi 10 proyek dan mata kuliah unggulan:
    1. **Pemrograman Berorientasi Objek**: COOKIES IN YOUR HEART – Sistem Penjualan Cookies (4 SKS - Nilai A)
    2. **Analisis dan Perancangan Sistem**: Sistem Penyewaan Alat Mendaki Gunung Sibayak (4 SKS - Nilai A)
    3. **Pemograman dan Pengujian Aplikasi Web**: Website Profil Profesional & Form Kontak (lab2_guided) (4 SKS - Nilai A)
    4. **Information System Project Management**: Analisis Product Life Cycle Proyek SI (3 SKS - Nilai A)
    5. **Kepemimpinan & Manajemen Organisasi SI**: Transformasi SI PT Nusantara Logistik Prima (3 SKS - Nilai A)
    6. **UI/UX**: Perancangan UI/UX Aplikasi Buku KIA & Imunisasi (3 SKS - Nilai A)
    7. **Basis Data**: Database Trigger – Sistem Perpustakaan (4 SKS - Nilai A)
    8. **Artificial Intelligence**: Praktikum AI – Fondasi Python untuk AI (3 SKS - Nilai A)
    9. **Jaringan Komputer**: Analisis Jaringan dengan Wireshark (3 SKS - Nilai A)
    10. **Sistem Operasi**: Program IPC & Manajemen Memori (3 SKS - Nilai A)
    - Total: 34 SKS Keahlian Akademik dengan seluruh 10 capaian terverifikasi sangat memuaskan.
  - Wadah responsif: Pembungkus tabel dengan `overflow-x: auto` dan styling scrollbar halus.
- [x] Minimal 2 Jenis HTML Lists:
  - `<ul>` (Unordered List): Daftar menu navigasi, statistik capaian, galeri keahlian (*Rekayasa Web & Desain Antarmuka*, *Pemrograman, Basis Data & AI*, *Sistem, Jaringan & Manajemen Proyek*), badge teknologi, daftar jadwal konsultasi, dan tautan footer.
  - `<ol>` (Ordered List): Alur standar pelayanan & konsultasi proyek (4 tahapan berurutan).

### 3. Komponen Formulir Interaktif & Accessible (Bobot 20%)
- [x] Pengelompokan fieldset: Minimal 2 blok `<fieldset>` dan `<legend>`:
  1. `<fieldset>` 1: *Identitas & Kontak Pemesan Layanan*
  2. `<fieldset>` 2: *Spesifikasi Teknis & Rincian Proyek*
- [x] 8 Tipe Kontrol Input Lengkap:
  1. `text`: Nama Lengkap Pemesan (`minlength="3"`, `maxlength="60"`)
  2. `email`: Alamat Email Resmi
  3. `tel`: Nomor Telepon / WhatsApp (`pattern="[0-9]{10,14}"`)
  4. `radio`: Kategori Klien (Mahasiswa, Dosen/Akademisi, Institusi/Industri)
  5. `select`: Pilihan Paket Layanan (UI/UX, ANAPRANCIS, MANPROBIS, MPSI, Web Semantik)
  6. `number`: Estimasi Durasi Pengerjaan (`min="3"`, `max="90"`)
  7. `checkbox`: Pilihan Fitur Tambahan (Audit WCAG, Responsive Mobile, Dokumentasi Sistem, Diagram BPMN)
  8. `textarea`: Rincian Deskripsi Proyek (`minlength="20"`, `maxlength="800"`)
- [x] Pasangan Eksplisit Label: Seluruh kontrol input memiliki pasangan `<label for="...">` yang terhubung langsung dengan atribut `id`.
- [x] Validasi Native: Menggunakan atribut `required`, `placeholder`, `pattern`, `min`, `max`, `minlength`, `maxlength`, `title`, dan `autocomplete`.
- [x] Aksesibilitas WCAG 2.2 AA: Indikator fokus `:focus-visible`, teks petunjuk (*hint*), dan pewarnaan kontras tinggi.

### 4. Estetika & Tata Letak CSS Modern (Bobot 25%)
- [x] CSS Eksternal: Terhubung melalui `style.css`.
- [x] *Universal Box Sizing Reset*: Menggunakan `*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`.
- [x] Aturan Pewarnaan 60-30-10:
  - **60% (Latar Netral)**: `#f0f4f8` / `#d9e2ec` (kanvas gradient), `#ffffff` (cards), `#f8fafc` (surfaces).
  - **30% (Struktur & Teks)**: `#0f172a` (slate 900), `#334e68` (slate 700), `#64748b` (slate 500), `#e2e8f0` (borders).
  - **10% (Aksen Kontras)**: `#0284c7` (sky 600), `#0369a1` (sky 700), `#38bdf8` (sky 400).
- [x] Tipografi Modern: *System-ui font stack* dengan keterbacaan tinggi dan rasio kontras melebihi 4.5:1.
- [x] Sudut Membulat (`border-radius: 20px`) & Bayangan Lembut (`box-shadow` berlapis khas Hands-on Lab).
- [x] Tata Letak CSS Grid & Flexbox:
  - Grid pada tata letak halaman utama (`minmax(0, 1fr) 340px`), galeri kartu proyek, galeri keahlian, dan kolom form.
  - Flexbox pada bilah header/nav, profil avatar mengambang, badge status, form radio/checkbox inline, dan footer bar.
- [x] Responsivitas Media Queries:
  - `@media (max-width: 992px)`: Menyesuaikan tata letak desktop ke tablet (stacked main & sidebar).
  - `@media (max-width: 768px)`: Penataan ulang navigasi, konversi form grid menjadi 1 kolom, penyesuaian ukuran tipografi, dan tabel scroll horizontal.
  - `@media (max-width: 480px)`: Optimasi tampilan untuk layar smartphone kecil.

---

## Struktur Berkas
```
lab2_guided/
├── index.html       # Struktur semantik Single Page Showcase Josef Christian Marpaung
├── style.css        # Tata letak CSS Grid, Flexbox, Desain Token 60-30-10 & Media Queries
├── profile.jpg      # Foto profil asli Josef Christian Marpaung
└── README.md        # Dokumentasi pemenuhan spesifikasi teknis Tugas Mandiri
```

---

## Panduan Push ke GitHub
```powershell
git add .
git commit -m "feat: sinkronisasi keahlian utama dan 10 proyek nyata mahasiswa"
git push -u origin main
```
