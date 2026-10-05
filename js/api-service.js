/**
 * api-service.js
 * ============================================================
 * PERAN   : Data Access Layer (DAL) — Lapisan Akses Data
 * KEGUNAAN: Satu-satunya modul yang boleh berkomunikasi dengan
 *           sumber data eksternal (JSON Provider / REST API).
 *           Berkas ini TIDAK menyentuh DOM HTML sama sekali.
 * MODUL   : Praktikum Minggu 04 — Decoupled Multi-Tier Architecture
 * ============================================================
 */

// Objek ApiService membungkus seluruh fungsi komunikasi data.
// Dengan pola objek ini, pemanggilan di app.js cukup:
//   ApiService.fetchProjects()  atau  ApiService.submitServiceOrder(payload)
const ApiService = {

  /**
   * fetchProjects()
   * PERAN   : Mengambil data koleksi proyek dari JSON provider secara asinkron.
   * KEGUNAAN: Dipanggil oleh app.js saat halaman pertama kali dimuat.
   *           Hasilnya dirender menjadi kartu-kartu portofolio di #projectsContainer.
   * @returns {Promise<Array>} Array berisi 4 objek proyek dari data/project.json
   */
  async fetchProjects() {
    try {
      // fetch() mengirim HTTP GET ke berkas data/project.json
      // 'await' berarti JavaScript menunggu respon tanpa memblokir halaman
      const response = await fetch('./data/project.json');

      // Jika server mengembalikan status bukan 200 OK, coba nama berkas alternatif
      if (!response.ok) {
        const fallback = await fetch('./data/projects.json');
        if (!fallback.ok) {
          // Lempar error agar ditangkap oleh blok catch di bawah
          throw new Error(`HTTP Error ${fallback.status}: ${fallback.statusText}`);
        }
        // Parsing isi berkas JSON menjadi Array JavaScript
        return await fallback.json();
      }

      // Parsing isi berkas JSON menjadi Array JavaScript
      return await response.json();

    } catch (err) {
      // Catat detail error di DevTools Console untuk keperluan debugging
      console.error('[ApiService Network Error - fetchProjects]:', err);
      // Lempar ulang agar app.js bisa menampilkan UI State: Error
      throw err;
    }
  },

  /**
   * fetchKeahlian()
   * PERAN   : Mengambil data kompetensi teknis dari data/keahlian.json.
   * KEGUNAAN: Hasilnya dirender menjadi kartu galeri keahlian 3 kategori
   *           di bagian #keahlianContainer oleh fungsi renderKeahlian() di app.js.
   * @returns {Promise<Object>} Objek berisi skillsSummary, stats, dan categories
   */
  async fetchKeahlian() {
    try {
      const response = await fetch('./data/keahlian.json');

      // Jika HTTP status bukan 2xx, anggap sebagai kegagalan jaringan
      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      // Kembalikan hasil parsing JSON sebagai Objek JavaScript
      return await response.json();

    } catch (err) {
      console.error('[ApiService Network Error - fetchKeahlian]:', err);
      throw err;
    }
  },

  /**
   * fetchProfile()
   * PERAN   : Mengambil biodata dan identitas akademik pengembang.
   * KEGUNAAN: Data dari data/profile.json dapat dipakai untuk mengisi
   *           komponen kartu profil dan bagian footer secara dinamis.
   * @returns {Promise<Object>} Objek berisi name, nim, bio, contact, dsb.
   */
  async fetchProfile() {
    try {
      const response = await fetch('./data/profile.json');

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (err) {
      console.error('[ApiService Network Error - fetchProfile]:', err);
      throw err;
    }
  },

  /**
   * fetchServices()
   * PERAN   : Mengambil katalog paket layanan konsultasi dari data/services.json.
   * KEGUNAAN: Hasilnya dapat dirender sebagai kartu-kartu paket layanan.
   *           Nilai 'id' di setiap paket sinkron dengan <option value="...">
   *           pada dropdown formulir pemesanan di index.html.
   * @returns {Promise<Array>} Array berisi 4 objek paket layanan
   */
  async fetchServices() {
    try {
      const response = await fetch('./data/services.json');

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
      }

      return await response.json();

    } catch (err) {
      console.error('[ApiService Network Error - fetchServices]:', err);
      throw err;
    }
  },

  /**
   * submitServiceOrder(orderPayload)
   * PERAN   : Mensimulasikan pengiriman data formulir ke REST API endpoint (HTTP POST).
   * KEGUNAAN: Dipanggil oleh setupFormHandler() di app.js ketika pengguna
   *           menekan tombol "Kirim Formulir". Menghasilkan response seperti
   *           server sungguhan (orderId, timestamp, status 201 Created).
   * @param   {Object} orderPayload — Data DTO formulir yang telah diserialisasi
   * @returns {Promise<Object>}     — Respon sukses dengan orderId & timestamp
   */
  async submitServiceOrder(orderPayload) {
    try {
      // Validasi: pastikan payload yang dikirim adalah objek yang valid
      if (!orderPayload || typeof orderPayload !== 'object') {
        throw new Error('Payload DTO pesanan tidak valid.');
      }

      // Simulasi latensi jaringan realistis (750ms) sesuai RFC 9111
      // Ini mensimulasikan waktu round-trip ke server sungguhan
      await new Promise(resolve => setTimeout(resolve, 750));

      // Kembalikan simulasi respons HTTP 201 Created dari server
      return {
        status: 201,                                         // HTTP 201 Created
        success: true,                                       // Flag keberhasilan
        message: 'Permintaan layanan berhasil diproses.',   // Pesan konfirmasi
        orderId: 'ORD-' + Date.now().toString().slice(-6),  // ID pesanan unik
        timestamp: new Date().toISOString(),                 // Waktu pemrosesan
        data: orderPayload                                   // Echo kembali data yang dikirim
      };

    } catch (err) {
      console.error('[ApiService Network Error - submitServiceOrder]:', err);
      throw err;
    }
  }

};

// Daftarkan ApiService ke objek window (global scope)
// Agar bisa diakses oleh app.js yang dimuat setelahnya di index.html
window.ApiService = ApiService;
