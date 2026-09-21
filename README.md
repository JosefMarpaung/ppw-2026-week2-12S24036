# Portofolio Profil Mahasiswa - Single Page Web
**Tugas Mandiri Lab 2: Pemograman dan Pengujian Aplikasi Web (PPW)**  
Institut Teknologi Del S1 Sistem Informasi  

* **Nama:** Josef Christian Marpaung  
* **NIM:** 12S24036  
* **Angkatan / Semester:** 2024 / Semester 5  
* **Repositori GitHub:** [ppw-2026-week2-12S24036](https://github.com/JosefMarpaung/ppw-2026-week2-12S24036.git)

---

## Tentang Halaman Ini

Halo! Website satu halaman (*single-page*) ini saya buat sebagai pemenuhan Tugas Mandiri Lab 2 PPW di Institut Teknologi Del. 

Di kampus, saya mengambil program studi S1 Sistem Informasi. Saya punya ketertarikan besar di dua hal:
1. **Desain Tampilan Web (Frontend & UI/UX):** Saya suka merancang tampilan web yang rapi, enak dilihat, dan nyaman digunakan oleh siapa saja, termasuk menerapkan standar aksesibilitas (WCAG 2.2 AA).
2. **Analisis Proses Bisnis:** Melalui mata kuliah seperti ANAPRANCIS, MANPROBIS, dan MPSI, saya belajar bagaimana alur kerja dan kebutuhan sistem dipetakan agar aplikasi benar-benar menyelesaikan masalah nyata.

Di portofolio ini, saya menampilkan profil diri, kartu keahlian, rangkuman 10 proyek kuliah yang sudah pernah saya kerjakan, serta formulir pemesanan layanan dan kontak. Seluruh halaman ini dibangun murni menggunakan **HTML5 semantik** dan **CSS modern** (Grid & Flexbox) tanpa framework tambahan.

---

## Rangkuman 10 Proyek Nyata (Total 34 SKS)

Berikut adalah daftar proyek dan tugas besar dari mata kuliah yang sudah saya selesaikan di IT Del:

| No | Mata Kuliah | Nama Proyek | Yang Dikerjakan | SKS | Nilai |
|:--:|:---|:---|:---|:--:|:--:|
| 1 | **Pemrograman Berorientasi Objek** | COOKIES IN YOUR HEART | Aplikasi kasir penjualan cookies berbasis Java OOP & SQLite | 4 | A |
| 2 | **Analisis dan Perancangan Sistem** | Rental Alat Daki Gunung Sibayak | Analisis alur booking dan pemodelan diagram proses BPMN | 4 | A |
| 3 | **Pemograman & Pengujian Web** | Website Portofolio (lab2_guided) | Web profil semantik, CSS responsif, dan audit aksesibilitas | 4 | A |
| 4 | **Information System Project Mgmt** | Analisis Siklus Hidup Proyek (PLC) | Analisis metode proyek (Predictive, Agile, Hybrid) | 3 | A |
| 5 | **Kepemimpinan & Organisasi SI** | Transformasi SI PT Nusantara Logistik | Rencana sistem logistik (TMS) dan integrasi data via API | 3 | A |
| 6 | **UI/UX Design** | Desain Aplikasi Buku KIA & Imunisasi | Perancangan antarmuka, user flow, dan prototipe di Figma | 3 | A |
| 7 | **Basis Data** | Database Trigger Sistem Perpustakaan | Pembuatan trigger SQL untuk update stok otomatis dan konsistensi | 4 | A |
| 8 | **Artificial Intelligence** | Praktikum AI & Data Preparation | Eksplorasi dan manipulasi data menggunakan Python (NumPy, Pandas) | 3 | A |
| 9 | **Jaringan Komputer** | Analisis Jaringan dengan Wireshark | Analisis alur paket data HTTP, DNS, dan ping pada jaringan | 3 | A |
| 10 | **Sistem Operasi** | Program IPC & Manajemen Memori | Program komunikasi antar-proses (Pipes) dan memori di Linux (C) | 3 | A |
| **Total** | **10 Proyek Terdata** | | **Seluruh capaian terverifikasi** | **34 SKS** | **A** |

---

## Checklist Spesifikasi Modul Lab 2

Halaman ini sudah memenuhi seluruh kriteria penilaian yang diminta pada modul praktikum:

* **Struktur HTML5 Semantik (Bobot 20%):** Menggunakan elemen `<header>`, `<nav>`, `<main>`, 3 `<section>` (Tentang, Portofolio, Layanan), `<aside>`, dan `<footer>`. Tidak memakai *div* sembarangan.
* **Tabel Data & List (Bobot 15%):** Tabel rekapitulasi lengkap dengan caption, thead, tbody, tfoot, serta atribut `scope="col"` dan `scope="row"`. Ditambah daftar list `<ul>` dan `<ol>`.
* **Formulir Interaktif & Aksesibel (Bobot 20%):** Memiliki 2 `<fieldset>`, `<legend>`, dan 8 jenis input (`text`, `email`, `tel`, `radio`, `select`, `number`, `checkbox`, `textarea`) dengan label yang terhubung rapi serta validasi bawaan HTML5.
* **CSS Modern & Desain Estetik (Bobot 25%):** Memakai file terpisah `style.css`, box-sizing reset, aturan warna 60-30-10, sudut membulat, bayangan halus, tata letak Grid & Flexbox, serta responsif di HP/tablet (`@media (max-width: 768px)`).
* **Aksesibilitas (WCAG 2.2 AA):** Ada tombol loncat ke konten (*skip-link*), fokus keyboard terlihat jelas (`:focus-visible`), dan kontras warna teks terjaga.

---

## Struktur File

Sesuai aturan praktikum, repositori ini hanya memuat berkas-berkas utama:

```text
lab2_guided/
├── index.html       # File utama halaman web
├── style.css        # File styling CSS modern
├── profile.jpg      # Foto profil resmi pengembang
└── README.md        # Penjelasan dan dokumentasi tugas
```

---

## Cara Menjalankan Web

1. Buka folder `lab2_guided` menggunakan **Visual Studio Code**.
2. Buka file `index.html`.
3. Klik tombol **"Go Live"** di pojok kanan bawah VS Code (atau klik kanan di editor `index.html` lalu pilih **Open with Live Server**).
4. Browser akan otomatis terbuka dan menampilkan website dengan alamat nomor port:
   ```text
   http://127.0.0.1:5500/index.html
   ```

---

## Cara Mengunggah ke GitHub

Jalankan perintah ini di terminal VS Code jika ingin mengupdate repositori:

```powershell
git add .
git commit -m "feat: complete week 2 html5 and modern css assignment"
git push -u origin main
```
