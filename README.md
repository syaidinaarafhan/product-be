## 1. Konsep Back-End

### a. Perbedaan antara Monolitik dan Microservices
- **Monolitik**:
  - Merupakan arsitektur di mana seluruh aplikasi terdiri dari satu unit yang saling terintegrasi
  - Semua fungsionalitas aplikasi berada dalam satu kode dasar dan berjalan di satu server

- **Microservices**:
  - Aplikasi dibagi menjadi layanan-layanan kecil yang berjalan secara independen dan berkomunikasi melalui API
  - Setiap layanan menangani fungsionalitas tertentu

### b. Apa itu Middleware?
**Middleware** adalah lapisan perangkat lunak yang berada di antara permintaan (request) dan respons (response). Fungsi middleware dapat meliputi otentikasi, logging, penanganan error, dan manipulasi data sebelum sampai ke rute utama

### c. Konsep Dependency Injection
**Dependency Injection** adalah pola desain di mana objek yang dibutuhkan oleh komponen diberikan secara eksternal, bukan dibuat di dalam komponen itu sendiri

## 2. Konsep Front-End

### a. Apa itu Data Binding dalam Framework Front-End?
**Data Binding** adalah mekanisme di mana data dalam model (seperti state atau props) disinkronkan dengan tampilan (view)

### b. Perbedaan antara State dan Props dalam React

**State** adalah data yang dikelola dalam komponen itu sendiri. State memungkinkan komponen untuk merender ulang dirinya ketika data berubah

**Props** adalah data yang diteruskan dari komponen induk (parent) ke komponen anak (child). Props tidak bisa diubah oleh komponen anak

### c. Keuntungan Menggunakan State Management Library

**Menggunakan library manajemen** state seperti Redux atau Vuex memungkinkan pengelolaan state aplikasi secara global, yang mempermudah komunikasi antar komponen dan menyederhanakan pengelolaan state dalam aplikasi besar

## 3. Konsep Database

### a. Apa itu Indexing dalam Database

**Indexing** adalah teknik untuk mempercepat pencarian data dalam database dengan menggunakan struktur data tertentu yang memetakan nilai kolom tertentu ke lokasi data di tabel

### b. Perbedaan antara INNER JOIN dan LEFT JOIN

**INNER JOIN** mengembalikan hanya baris yang memiliki kecocokan di kedua tabel yang digabungkan

**LEFT JOIN** mengembalikan semua baris dari tabel kiri, dan hanya kecocokan dari tabel kanan, jika ada

### c. Tujuan dari Normalisasi Database

**Normalisasi** adalah proses merancang database untuk mengurangi redundansi dan meningkatkan integritas data. Salah satu kelemahan dari normalisasi adalah dapat menyebabkan banyaknya tabel yang saling terhubung, yang mempersulit query dan menambah jumlah join yang diperlukan