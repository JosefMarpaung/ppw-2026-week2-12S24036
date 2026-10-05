/**
 * app.js
 * ============================================================
 * PERAN   : Presentation Layer — Lapisan Tampilan & Interaksi
 * KEGUNAAN: Mengontrol seluruh tampilan yang dilihat pengguna:
 *           merender kartu proyek, mengelola 4 UI States,
 *           menangani klik filter, membuka modal, mengirim
 *           formulir, dan menyimpan pesanan ke localStorage.
 * MODUL   : Praktikum Minggu 04 — Dynamic Client-Side Rendering (CSR)
 * ============================================================
 */

// Objek App adalah pusat kendali seluruh antarmuka pengguna.
// Semua fungsi terkait tampilan dikumpulkan di sini (Separation of Concerns).
const App = {

  // --------------------------------------------------------------------------
  // STATE — Penyimpanan Data Sementara di Sisi Klien (Memori Browser)
  // --------------------------------------------------------------------------
  state: {
    projects: [],        // Menyimpan array proyek hasil fetch dari JSON
    keahlian: null,      // Menyimpan objek keahlian hasil fetch dari JSON
    activeFilter: 'all', // Mencatat kategori filter yang sedang aktif
    orders: []           // Menyimpan riwayat pesanan layanan dari localStorage
  },

  /**
   * init()
   * PERAN   : Titik masuk utama aplikasi (entry point).
   * KEGUNAAN: Dipanggil satu kali saat DOM selesai dimuat oleh browser.
   *           Menjalankan semua persiapan awal secara berurutan.
   */
  async init() {
    this.loadOrdersFromLocalStorage(); // Muat riwayat pesanan yang tersimpan
    this.updateOrderBadge();          // Tampilkan jumlah pesanan di badge navbar
    this.setupEventListeners();       // Pasang semua pendengar event (klik, submit)
    await this.loadInitialData();     // Ambil data JSON dan render ke halaman
  },

  /**
   * escapeHTML(str)
   * PERAN   : Fungsi sanitasi teks untuk mencegah serangan DOM XSS.
   * KEGUNAAN: Dipanggil setiap kali data dari JSON akan disuntikkan ke innerHTML.
   *           Mengubah karakter berbahaya seperti < > & " menjadi entitas HTML aman.
   * @param   {string} str — Teks mentah dari data JSON
   * @returns {string}     — Teks yang sudah aman untuk ditampilkan di DOM
   */
  escapeHTML(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')   // & menjadi &amp;
      .replace(/</g, '&lt;')    // < menjadi &lt; (mencegah tag HTML liar)
      .replace(/>/g, '&gt;')    // > menjadi &gt;
      .replace(/"/g, '&quot;')  // " menjadi &quot;
      .replace(/'/g, '&#039;'); // ' menjadi &#039;
  },

  // --------------------------------------------------------------------------
  // PEMUATAN DATA — Mengambil Data dari api-service.js secara Asinkron
  // --------------------------------------------------------------------------

  /**
   * loadInitialData()
   * PERAN   : Mengkoordinasikan pemuatan seluruh data awal halaman.
   * KEGUNAAN: Memanggil ApiService (Data Access Layer) lalu meneruskan
   *           hasilnya ke fungsi render yang sesuai.
   */
  async loadInitialData() {
    // Tampilkan animasi Loading terlebih dahulu agar halaman tidak terasa kosong
    this.renderProjectsLoadingState();
    this.renderKeahlianLoadingState();

    try {
      // Promise.all: jalankan fetchProjects dan fetchKeahlian secara PARALEL
      // Lebih cepat dari menjalankan keduanya satu per satu secara berurutan
      const [projectsData, keahlianData] = await Promise.all([
        ApiService.fetchProjects(),
        ApiService.fetchKeahlian()
      ]);

      // Simpan data ke state agar bisa digunakan oleh fungsi lain (filter, modal)
      this.state.projects = projectsData;
      this.state.keahlian = keahlianData;

      // Render UI State 2: Success — tampilkan kartu hasil data
      this.renderProjects(this.state.projects);
      this.renderKeahlian(this.state.keahlian);

    } catch (error) {
      // Jika fetch gagal (jaringan mati, file tidak ditemukan), tampilkan error
      console.error('[App Init Error]:', error);
      // Render UI State 4: Error — tampilkan alert merah dengan tombol Retry
      this.renderProjectsErrorState(error.message);
      this.renderKeahlianErrorState(error.message);
    }
  },

  // --------------------------------------------------------------------------
  // UI STATE 1: LOADING STATE — Skeleton Loader Animasi Bootstrap 5
  // KEGUNAAN : Memberi feedback visual instan saat data sedang diambil.
  //            Pengguna tidak melihat halaman kosong yang membingungkan.
  // --------------------------------------------------------------------------
  renderProjectsLoadingState() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    // Buat 4 kerangka kartu animasi (placeholder-glow dari Bootstrap 5)
    let skeletonHTML = '';
    for (let i = 0; i < 4; i++) {
      skeletonHTML += `
        <div class="col-md-6 col-lg-6 mb-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden placeholder-glow">
            <div class="ratio ratio-16x9 bg-secondary opacity-25"></div>
            <div class="card-body p-4">
              <span class="placeholder col-4 rounded-pill mb-2 bg-secondary"></span>
              <h5 class="card-title placeholder-glow mb-2">
                <span class="placeholder col-10"></span>
              </h5>
              <p class="card-text placeholder-glow mb-3">
                <span class="placeholder col-12"></span>
                <span class="placeholder col-8"></span>
              </p>
              <span class="placeholder col-5 py-3 rounded-3 bg-primary"></span>
            </div>
          </div>
        </div>
      `;
    }
    container.innerHTML = skeletonHTML;
  },

  // --------------------------------------------------------------------------
  // UI STATE 2: SUCCESS STATE — Render Kartu Proyek Dinamis dari JSON
  // KEGUNAAN : Merakit HTML kartu proyek secara programatik dari array data.
  //            Tidak ada satupun kartu yang ditulis manual di index.html.
  // --------------------------------------------------------------------------
  renderProjects(projects) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;

    // Jika array kosong setelah filter, tampilkan UI State 3: Empty
    if (!projects || projects.length === 0) {
      this.renderProjectsEmptyState();
      return;
    }

    // Ubah setiap objek proyek menjadi string HTML kartu Bootstrap
    container.innerHTML = projects.map(proj => {

      // Sanitasi semua teks sebelum dimasukkan ke innerHTML (anti-XSS)
      const title    = this.escapeHTML(proj.title);
      const desc     = this.escapeHTML(proj.description);
      const category = this.escapeHTML(proj.category);
      const course   = this.escapeHTML(proj.course);
      const metrics  = this.escapeHTML(proj.metrics);

      // Buat badge tag teknologi dari array proj.tags
      const tagsHTML = (proj.tags || [])
        .map(tag => `<span class="badge bg-light text-dark border me-1 mb-1">${this.escapeHTML(tag)}</span>`)
        .join('');

      return `
        <div class="col-md-6 col-lg-6 mb-4">
          <article class="card h-100 border-0 shadow-sm rounded-4 overflow-hidden">
            <div class="position-relative overflow-hidden">
              <div class="ratio ratio-16x9">
                <img src="${proj.thumbnail}" class="card-img-top object-fit-cover"
                     alt="${title}" loading="lazy">
              </div>
              <span class="badge bg-primary position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill shadow-sm" style="z-index: 2;">
                ${category}
              </span>
            </div>
            <div class="card-body p-4 d-flex flex-column">
              <div class="text-muted small fw-semibold mb-1">
                <i class="bi bi-journal-bookmark me-1 text-primary"></i>${course}
              </div>
              <h3 class="h5 fw-bold text-dark mb-2">${title}</h3>
              <p class="text-secondary small flex-grow-1 mb-3">${desc}</p>
              <div class="mb-3">${tagsHTML}</div>
              <div class="pt-3 border-top d-flex align-items-center justify-content-between mt-auto">
                <span class="badge bg-success-subtle text-success border border-success-subtle px-2 py-1 small">
                  <i class="bi bi-award me-1"></i>${metrics}
                </span>
                <!-- data-id menyimpan ID proyek untuk diambil oleh openProjectModal() -->
                <button type="button"
                        class="btn btn-sm btn-primary px-3 py-2 rounded-pill btn-open-modal"
                        data-id="${proj.id}">
                  Rincian Proyek <i class="bi bi-arrow-right ms-1"></i>
                </button>
              </div>
            </div>
          </article>
        </div>
      `;
    }).join('');
  },

  // --------------------------------------------------------------------------
  // UI STATE 3: EMPTY STATE — Pesan Hasil Filter Kosong
  // KEGUNAAN : Ditampilkan jika tidak ada proyek yang cocok dengan filter aktif.
  //            Memberi tahu pengguna secara informatif, bukan halaman kosong.
  // --------------------------------------------------------------------------
  renderProjectsEmptyState() {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <div class="p-5 bg-light rounded-4 border">
          <i class="bi bi-folder-x text-muted display-3 mb-3"></i>
          <h4 class="fw-bold text-dark mb-2">Tidak Ada Proyek Ditemukan</h4>
          <p class="text-secondary mb-4">Tidak ada karya yang sesuai dengan kategori filter yang dipilih.</p>
          <button class="btn btn-outline-primary btn-sm px-4 rounded-pill"
                  onclick="App.filterProjects('all')">
            <i class="bi bi-arrow-counterclockwise me-1"></i>Tampilkan Semua Proyek
          </button>
        </div>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // UI STATE 4: ERROR STATE — Alert Defensif dengan Tombol Retry
  // KEGUNAAN : Ditampilkan jika fetch() gagal (file JSON tidak ada / offline).
  //            Menghindari halaman diam tanpa informasi ketika terjadi error.
  // --------------------------------------------------------------------------
  renderProjectsErrorState(errorMessage) {
    const container = document.getElementById('projectsContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="col-12 py-4">
        <div class="alert alert-danger border-0 shadow-sm rounded-4 p-4 d-flex align-items-start gap-3" role="alert">
          <i class="bi bi-exclamation-triangle-fill fs-2 text-danger"></i>
          <div>
            <h5 class="alert-heading fw-bold mb-1">Gagal Memuat Data Portofolio</h5>
            <p class="mb-3 small">Kegagalan saat memuat JSON: <code>${this.escapeHTML(errorMessage)}</code></p>
            <!-- Tombol Retry memanggil ulang loadInitialData() -->
            <button class="btn btn-danger btn-sm px-3 rounded-pill"
                    onclick="App.loadInitialData()">
              <i class="bi bi-arrow-clockwise me-1"></i>Coba Lagi (Retry)
            </button>
          </div>
        </div>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // RENDER KEAHLIAN — Galeri Kompetensi Teknis dari keahlian.json
  // --------------------------------------------------------------------------
  renderKeahlianLoadingState() {
    const container = document.getElementById('keahlianContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="col-12 text-center py-4 text-muted">
        <div class="spinner-border spinner-border-sm text-primary me-2" role="status"></div>
        <span>Memuat data kompetensi teknis...</span>
      </div>
    `;
  },

  /**
   * renderKeahlian(keahlianData)
   * PERAN   : Merender 3 kartu kategori kompetensi teknis secara dinamis.
   * KEGUNAAN: Data berasal dari keahlian.json yang sudah di-fetch.
   *           Setiap kategori memiliki ikon Bootstrap Icons, judul, dan daftar keahlian.
   */
  renderKeahlian(keahlianData) {
    const container = document.getElementById('keahlianContainer');
    if (!container || !keahlianData) return;

    const categories = keahlianData.categories || [];

    container.innerHTML = categories.map(cat => {
      // Buat <li> untuk setiap poin keahlian di dalam kategori
      const skillsList = (cat.skills || [])
        .map(skill => `
          <li class="list-group-item px-0 py-2 border-0 d-flex align-items-center">
            <i class="bi bi-check2-circle text-primary me-2 fs-5"></i>
            <span>${this.escapeHTML(skill)}</span>
          </li>`)
        .join('');

      return `
        <div class="col-md-4 mb-4">
          <div class="card h-100 border-0 shadow-sm rounded-4 p-4">
            <div class="d-flex align-items-center gap-3 mb-3">
              <div class="p-3 bg-primary-subtle text-primary rounded-4 fs-4">
                <i class="bi ${this.escapeHTML(cat.icon || 'bi-gear')}"></i>
              </div>
              <h4 class="h6 fw-bold mb-0 text-dark">${this.escapeHTML(cat.title)}</h4>
            </div>
            <ul class="list-group list-group-flush small">${skillsList}</ul>
          </div>
        </div>
      `;
    }).join('');
  },

  renderKeahlianErrorState(errorMessage) {
    const container = document.getElementById('keahlianContainer');
    if (!container) return;
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-warning rounded-4 border-0 small">
          <i class="bi bi-exclamation-circle me-1"></i>
          Data keahlian tidak dapat dimuat: ${this.escapeHTML(errorMessage)}
        </div>
      </div>
    `;
  },

  // --------------------------------------------------------------------------
  // FILTER KATEGORI INSTAN — Menyaring Proyek di Memori Browser (Tanpa Reload)
  // KEGUNAAN: Pengguna klik tombol filter → daftar proyek langsung berubah
  //           tanpa memuat ulang halaman atau melakukan fetch ulang.
  // --------------------------------------------------------------------------
  filterProjects(category) {
    this.state.activeFilter = category;

    // Perbarui tampilan tombol filter (aktif = biru, non-aktif = outline)
    document.querySelectorAll('.btn-filter').forEach(btn => {
      const isActive = btn.dataset.category === category;
      btn.classList.toggle('btn-primary', isActive);
      btn.classList.toggle('text-white', isActive);
      btn.classList.toggle('btn-outline-primary', !isActive);
    });

    // Saring array projects di state berdasarkan kategori
    if (category === 'all') {
      this.renderProjects(this.state.projects); // Tampilkan semua proyek
    } else {
      const filtered = this.state.projects.filter(p =>
        p.category.toLowerCase().includes(category.toLowerCase())
      );
      this.renderProjects(filtered); // Tampilkan proyek yang lolos filter
    }
  },

  // --------------------------------------------------------------------------
  // UNIVERSAL DYNAMIC MODAL — Satu Modal Bootstrap 5 untuk Semua Proyek
  // KEGUNAAN: Alih-alih membuat modal terpisah untuk setiap proyek (boros & duplikat),
  //           cukup satu modal (#universalProjectModal) yang kontennya diganti
  //           secara dinamis berdasarkan proyek mana yang diklik.
  // --------------------------------------------------------------------------

  /**
   * openProjectModal(projectId)
   * PERAN   : Mengisi dan membuka modal dengan data proyek yang diklik.
   * KEGUNAAN: Dipanggil oleh event listener saat tombol .btn-open-modal diklik.
   *           Mencari data proyek di state berdasarkan ID lalu menyuntikkan
   *           konten ke elemen-elemen di dalam modal Bootstrap 5.
   * @param {string} projectId — ID proyek (contoh: 'proj-1')
   */
  openProjectModal(projectId) {
    // Cari objek proyek di state berdasarkan ID yang dikirim tombol
    const proj = this.state.projects.find(p => p.id === projectId);
    if (!proj) return; // Keluar jika proyek tidak ditemukan

    const modalTitleEl = document.getElementById('projectModalTitle');
    const modalBodyEl  = document.getElementById('projectModalBody');
    const modalEl      = document.getElementById('universalProjectModal');
    if (!modalTitleEl || !modalBodyEl || !modalEl) return;

    // Isi judul modal dengan nama proyek
    modalTitleEl.textContent = proj.title;

    // Buat badge tags untuk modal
    const tagsBadges = (proj.tags || [])
      .map(tag => `<span class="badge bg-secondary-subtle text-secondary border me-1">${this.escapeHTML(tag)}</span>`)
      .join('');

    // Susun konten HTML detail proyek di dalam body modal
    modalBodyEl.innerHTML = `
      <div class="ratio ratio-16x9 rounded-3 overflow-hidden mb-3 shadow-sm">
        <img src="${proj.thumbnail}" class="object-fit-cover w-100 h-100"
             alt="${this.escapeHTML(proj.title)}">
      </div>
      <div class="row g-2 mb-3">
        <div class="col-sm-6">
          <div class="p-2 px-3 bg-light rounded-3 border">
            <small class="text-muted d-block fw-semibold text-uppercase">Mata Kuliah</small>
            <span class="small fw-bold text-dark">${this.escapeHTML(proj.course)}</span>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="p-2 px-3 bg-light rounded-3 border">
            <small class="text-muted d-block fw-semibold text-uppercase">Peran Teknis</small>
            <span class="small fw-bold text-dark">${this.escapeHTML(proj.role)}</span>
          </div>
        </div>
      </div>
      <h6 class="fw-bold text-dark mb-1">Deskripsi & Ruang Lingkup</h6>
      <p class="text-secondary small mb-3">${this.escapeHTML(proj.description)}</p>
      <div class="mb-3"><small class="text-muted fw-semibold">Teknologi:</small><br>${tagsBadges}</div>
      <div class="alert alert-primary py-2 px-3 mb-0 small d-flex align-items-center">
        <i class="bi bi-trophy-fill me-2 fs-5 text-primary"></i>
        <span><strong>Hasil:</strong> ${this.escapeHTML(proj.metrics)}</span>
      </div>
    `;

    // Buka modal menggunakan Bootstrap 5 JavaScript API
    bootstrap.Modal.getOrCreateInstance(modalEl).show();
  },

  // --------------------------------------------------------------------------
  // FORM HANDLER — Pengiriman Formulir Asinkron (Decoupled REST POST)
  // KEGUNAAN : Menangani submit formulir tanpa full page reload.
  //            Mengirim data ke ApiService, menyimpan ke localStorage,
  //            dan menampilkan Toast notifikasi sebagai umpan balik visual.
  // --------------------------------------------------------------------------
  setupFormHandler() {
    const form = document.getElementById('consultationForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      // Mencegah perilaku default browser (refresh halaman)
      e.preventDefault();

      // Jalankan validasi bawaan HTML5 sebelum mengirim
      if (!form.checkValidity()) {
        form.classList.add('was-validated'); // Tampilkan pesan error validasi Bootstrap
        return;
      }

      // Serialisasi semua input form menjadi objek DTO JavaScript
      const formData = new FormData(form);
      const payload  = Object.fromEntries(formData.entries());

      // Kumpulkan nilai checkbox fitur tambahan (bisa lebih dari satu)
      payload['addon-features'] = [...form.querySelectorAll('input[name="addon-features"]:checked')]
        .map(cb => cb.value);

      // Ubah tombol Submit menjadi status "loading" (disabled + spinner)
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalHTML = submitBtn.innerHTML;
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Memproses...';

      try {
        // Kirim payload ke mock REST API melalui api-service.js
        const result = await ApiService.submitServiceOrder(payload);

        // Simpan pesanan ke localStorage untuk persistensi sisi klien
        this.saveOrderToLocalStorage({ id: result.orderId, timestamp: result.timestamp, ...payload });

        // Tampilkan Toast Bootstrap: Notifikasi berhasil
        this.showToastNotification('Pesanan Berhasil!', 'Permintaan layanan Anda telah berhasil diproses.');

        // Bersihkan form dan hapus state validasi
        form.reset();
        form.classList.remove('was-validated');

      } catch (err) {
        console.error('[Form Submit Error]:', err);
        // Tampilkan Toast Bootstrap: Notifikasi gagal
        this.showToastNotification('Gagal Mengirim', 'Terjadi kesalahan jaringan.', 'danger');
      } finally {
        // Kembalikan tombol ke kondisi semula apapun hasilnya
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalHTML;
      }
    });
  },

  // --------------------------------------------------------------------------
  // LOCAL STORAGE — Persistensi State Pesanan di Sisi Klien
  // KEGUNAAN : Menyimpan riwayat pesanan di browser pengguna agar tidak
  //            hilang saat halaman di-refresh (tanpa perlu server/database).
  // --------------------------------------------------------------------------
  saveOrderToLocalStorage(orderData) {
    this.state.orders.unshift(orderData); // Tambahkan pesanan baru di posisi pertama
    localStorage.setItem('ppw_week4_orders', JSON.stringify(this.state.orders));
    this.updateOrderBadge(); // Perbarui badge jumlah pesanan di navbar
  },

  loadOrdersFromLocalStorage() {
    try {
      const stored = localStorage.getItem('ppw_week4_orders');
      this.state.orders = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.warn('[LocalStorage] Gagal membaca data:', e);
      this.state.orders = [];
    }
  },

  /**
   * updateOrderBadge()
   * PERAN   : Memperbarui angka pada badge pesanan di navbar secara reaktif.
   * KEGUNAAN: Setiap kali pesanan baru masuk, badge langsung menampilkan
   *           jumlah terbaru tanpa perlu reload halaman.
   */
  updateOrderBadge() {
    const badge = document.getElementById('orderCountBadge');
    if (!badge) return;
    const count = this.state.orders.length;
    badge.textContent = count;
    badge.style.display = count > 0 ? 'inline-block' : 'none'; // Sembunyikan jika 0
  },

  /**
   * showToastNotification(title, message, type)
   * PERAN   : Menampilkan notifikasi Bootstrap 5 Toast di pojok layar.
   * KEGUNAAN: Memberikan umpan balik visual interaktif kepada pengguna
   *           setelah formulir berhasil atau gagal dikirim.
   * @param {string} title   — Judul notifikasi
   * @param {string} message — Isi pesan notifikasi
   * @param {string} type    — 'success' (hijau/biru) atau 'danger' (merah)
   */
  showToastNotification(title, message, type = 'success') {
    const toastEl     = document.getElementById('liveToastNotification');
    const toastTitle  = document.getElementById('toastNotificationTitle');
    const toastBody   = document.getElementById('toastNotificationBody');
    const toastHeader = toastEl?.querySelector('.toast-header');
    if (!toastEl) return;

    // Isi konten toast
    if (toastTitle) toastTitle.textContent = title;
    if (toastBody)  toastBody.textContent  = message;

    // Sesuaikan warna header berdasarkan tipe notifikasi
    if (toastHeader) {
      toastHeader.className = `toast-header text-white ${type === 'danger' ? 'bg-danger' : 'bg-primary'}`;
    }

    // Tampilkan toast selama 4,5 detik lalu hilang otomatis
    bootstrap.Toast.getOrCreateInstance(toastEl, { delay: 4500 }).show();
  },

  // --------------------------------------------------------------------------
  // EVENT LISTENERS — Pendaftaran Semua Pendengar Event di Halaman
  // --------------------------------------------------------------------------
  setupEventListeners() {
    // Delegasi event: tangkap klik tombol modal di dalam #projectsContainer
    // (Event delegation lebih efisien karena kartu dirender secara dinamis)
    document.addEventListener('click', (e) => {
      const modalBtn = e.target.closest('.btn-open-modal');
      if (modalBtn) {
        // Ambil ID proyek dari atribut data-id pada tombol yang diklik
        this.openProjectModal(modalBtn.dataset.id);
      }
    });

    // Pasang event klik pada setiap tombol filter kategori
    document.querySelectorAll('.btn-filter').forEach(btn => {
      btn.addEventListener('click', () => this.filterProjects(btn.dataset.category));
    });

    // Inisialisasi penanganan formulir asinkron
    this.setupFormHandler();
  }

};

// Jalankan App.init() tepat setelah seluruh elemen HTML selesai diparsing
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
