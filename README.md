# Portofolio Profil Mahasiswa — Minggu 2 & 3 PPW
**Tugas Mandiri Lab 2 & 3: Pemrograman dan Pengujian Aplikasi Web (PPW)**  
Institut Teknologi Del · S1 Sistem Informasi

* **Nama:** Josef Christian Marpaung
* **NIM:** 12S24036
* **Angkatan / Semester:** 2024 / Semester 5
* **Repositori GitHub:** [ppw-2026-week2-12S24036](https://github.com/JosefMarpaung/ppw-2026-week2-12S24036)
* **🌐 Live Demo GitHub Pages:** [https://josefmarpaung.github.io/ppw-2026-week2-12S24036/](https://josefmarpaung.github.io/ppw-2026-week2-12S24036/)

---

## Tentang Halaman Ini

Halo! Website satu halaman (*single-page*) ini saya buat sebagai pemenuhan Tugas Mandiri Lab 2 dan Lab 3 PPW di Institut Teknologi Del.

Di kampus, saya mengambil program studi S1 Sistem Informasi. Saya punya ketertarikan besar di dua hal:
1. **Desain Tampilan Web (Frontend & UI/UX):** Saya suka merancang tampilan web yang rapi, enak dilihat, dan nyaman digunakan oleh siapa saja, termasuk menerapkan standar aksesibilitas (WCAG 2.2 AA).
2. **Analisis Proses Bisnis:** Melalui mata kuliah seperti ANAPRANCIS, MANPROBIS, dan MPSI, saya belajar bagaimana alur kerja dan kebutuhan sistem dipetakan agar aplikasi benar-benar menyelesaikan masalah nyata.

Pada **Minggu 3**, halaman ini direfaktor secara menyeluruh menggunakan **Bootstrap 5.3** — menggantikan tata letak manual CSS Grid/Flexbox dengan sistem Grid 12-kolom responsif, komponen interaktif (Navbar, Modal, Cards), dan formulir modern dengan Floating Labels.

---

## Komparasi: Sebelum vs Sesudah Integrasi Bootstrap 5

| Aspek | ⬅️ Minggu 2 (Pure CSS) | ➡️ Minggu 3 (Bootstrap 5) |
|:---|:---|:---|
| **Framework CSS** | Tanpa framework (Pure HTML5 + CSS) | Bootstrap 5.3.3 via CDN |
| **Sistem Tata Letak** | CSS Grid manual + Flexbox kustom | Grid 12-kolom responsif Bootstrap (`col-sm`, `col-md`, `col-lg`) |
| **Navigasi** | `<nav>` HTML semantik sticky manual | Bootstrap Navbar dengan hamburger toggle collapse mobile |
| **Kartu Proyek** | Div kustom dengan shadow CSS manual | Bootstrap `.card` dengan badge teknologi, tombol, dan hover |
| **Dialog Detail** | Tidak ada | Bootstrap Modal Dialog interaktif (minimal 2 modal) |
| **Formulir** | `<fieldset>` + 8 jenis input label eksplisit | Bootstrap Floating Labels, Input Groups berikon, validasi visual |
| **Ikon** | Karakter Unicode / emoji | Bootstrap Icons 1.11 via CDN (`<i class="bi bi-...">`) |
| **Custom Styling** | `style.css` (355 baris) — semua kustom | `custom-style.css` — override elegan di atas Bootstrap |
| **CSS Variables** | 25+ variabel di `:root` | Minimal 6 variabel `:root` personal (warna, radius, shadow) |
| **Responsivitas** | `@media` query manual 3 breakpoint | Breakpoint Bootstrap otomatis (xs, sm, md, lg, xl) |
| **Aksesibilitas** | WCAG 2.2 AA (skip-link, `:focus-visible`) | Dipertahankan + Bootstrap aria-attribute bawaan |
| **Jumlah File CSS** | 1 file (`style.css`) | 2 file (`custom-style.css` override + Bootstrap CDN) |

---

## Checklist Spesifikasi Modul Lab 3 (Week 3)

Halaman ini sudah memenuhi seluruh kriteria penilaian Lab 3:

* **Spesifisitas & Cascading CSS (Bobot 15%):** Penerapan selektor lanjutan (`>`, `+`, `~`), pseudo-classes (`:hover`, `:focus-visible`, `:focus-within`, `:nth-child()`, `:is()`, `:not()`), dan CSS Variables di `:root` tanpa penggunaan `!important` sembarangan.
* **Responsive Navbar & Hero (Bobot 20%):** Navbar `sticky-top` dengan brand identity; hamburger toggle berfungsi membuka/menutup menu di layar ponsel; Hero Section proporsional dengan tombol CTA.
* **Grid Portofolio & Modal Dialog (Bobot 20%):** Minimal 4 kartu proyek (`.card`) dalam grid responsif (`row-cols-1 row-cols-md-2 row-cols-lg-3 g-4`); terhubung ke Bootstrap Modal detail proyek (minimal 2 modal dengan konten berbeda).
* **Modernisasi Formulir Layanan (Bobot 15%):** Formulir diupgrade dengan Floating Labels (`.form-floating`), Input Groups berikon, Select category, Checkbox syarat & ketentuan, serta umpan balik validasi visual (`.valid-feedback` / `.invalid-feedback`).
* **Custom Overrides & Theming (Bobot 15%):** Mendefinisikan minimal 6 variabel CSS di `:root`; warna identitas personal unik; transisi mikro-interaksi hover pada kartu dan tombol; bebas dari `!important` sembarangan.
* **Git Management & Deployment (Bobot 15%):** Branch `week3-bootstrap` terstruktur; README memuat tabel komparasi "Sebelum vs Sesudah"; GitHub Pages aktif tanpa error 404.

---

## Checklist Spesifikasi Modul Lab 2 (Week 2 — Dipertahankan)

* **Struktur HTML5 Semantik (Bobot 20%):** Menggunakan elemen `<header>`, `<nav>`, `<main>`, 3 `<section>` (Tentang, Portofolio, Layanan), `<aside>`, dan `<footer>`.
* **Tabel Data & List (Bobot 15%):** Tabel rekapitulasi lengkap dengan caption, thead, tbody, tfoot, serta atribut `scope="col"` dan `scope="row"`. Ditambah daftar `<ul>` dan `<ol>`.
* **Formulir Interaktif & Aksesibel (Bobot 20%):** 2 `<fieldset>`, `<legend>`, dan 8 jenis input (`text`, `email`, `tel`, `radio`, `select`, `number`, `checkbox`, `textarea`) dengan validasi HTML5 bawaan.
* **CSS Modern & Desain Estetik (Bobot 25%):** File `style.css` terpisah, box-sizing reset, palet warna 60-30-10, Grid & Flexbox, responsif `@media (max-width: 768px)`.
* **Aksesibilitas (WCAG 2.2 AA):** Skip-link, `:focus-visible`, kontras warna tinggi, dan atribut `aria-*` lengkap.

---

## Struktur File Repositori

```text
ppw-2026-week2-12S24036/
├── index.html          # File utama halaman web (Week 2 + direfaktor Week 3)
├── style.css           # CSS kustom murni Week 2 (pure CSS, tanpa framework)
├── custom-style.css    # CSS override kustom Week 3 (di atas Bootstrap 5)
├── profile.jpg         # Foto profil resmi pengembang
├── .gitignore          # Mengabaikan folder .vscode dari version control
└── README.md           # Dokumentasi lengkap tugas minggu 2 & 3
```

---

## Rangkuman 10 Proyek Nyata (Total 34 SKS)

| No | Mata Kuliah | Nama Proyek | Yang Dikerjakan | SKS | Nilai |
|:--:|:---|:---|:---|:--:|:--:|
| 1 | **Pemrograman Berorientasi Objek** | COOKIES IN YOUR HEART | Aplikasi kasir penjualan cookies berbasis Java OOP & SQLite | 4 | A |
| 2 | **Analisis dan Perancangan Sistem** | Rental Alat Daki Gunung Sibayak | Analisis alur booking dan pemodelan diagram proses BPMN | 4 | A |
| 3 | **Pemrograman & Pengujian Web** | Website Portofolio (lab2_guided) | Web profil semantik, CSS responsif, dan audit aksesibilitas | 4 | A |
| 4 | **Information System Project Mgmt** | Analisis Siklus Hidup Proyek (PLC) | Analisis metode proyek (Predictive, Agile, Hybrid) | 3 | A |
| 5 | **Kepemimpinan & Organisasi SI** | Transformasi SI PT Nusantara Logistik | Rencana sistem logistik (TMS) dan integrasi data via API | 3 | A |
| 6 | **UI/UX Design** | Desain Aplikasi Buku KIA & Imunisasi | Perancangan antarmuka, user flow, dan prototipe di Figma | 3 | A |
| 7 | **Basis Data** | Database Trigger Sistem Perpustakaan | Pembuatan trigger SQL untuk update stok otomatis dan konsistensi | 4 | A |
| 8 | **Artificial Intelligence** | Praktikum AI & Data Preparation | Eksplorasi dan manipulasi data menggunakan Python (NumPy, Pandas) | 3 | A |
| 9 | **Jaringan Komputer** | Analisis Jaringan dengan Wireshark | Analisis alur paket data HTTP, DNS, dan ping pada jaringan | 3 | A |
| 10 | **Sistem Operasi** | Program IPC & Manajemen Memori | Program komunikasi antar-proses (Pipes) dan memori di Linux (C) | 3 | A |
| **Total** | **10 Proyek Terdata** | | **Seluruh capaian terverifikasi** | **34 SKS** | **A** |

---

## Cara Menjalankan Web Secara Lokal

1. Buka folder repositori menggunakan **Visual Studio Code**.
2. Buka file `index.html`.
3. Klik tombol **"Go Live"** di pojok kanan bawah VS Code.
4. Browser akan terbuka di:
   ```
   http://127.0.0.1:5500/index.html
   ```

---

## Cara Memperbarui ke GitHub

```powershell
# Pastikan berada di branch week3-bootstrap
git checkout week3-bootstrap

# Stage, commit, dan push
git add .
git commit -m "feat(week3): deskripsi perubahan"
git push origin week3-bootstrap
```
