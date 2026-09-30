// ========================================
// DATA RAKITAN
// ========================================

let rakitan = [];
let total = 0;


// ========================================
// PILIH SPAREPART
// ========================================

function pilihPart(nama, harga) {

    // Cek apakah komponen sudah dipilih
    const sudahDipilih = rakitan.some(function(part) {
        return part.nama === nama;
    });

    if (sudahDipilih) {
        return;
    }


    // Masukkan komponen ke rakitan
    rakitan.push({
        nama: nama,
        harga: harga
    });


    // Tambahkan harga
    total += harga;


    // Tampilkan rakitan
    tampilkanRakitan();


    // Ubah tombol menjadi "Sudah Dipilih"
    ubahTombol(nama, true);


    // Update budget jika sudah diisi
    const input = document.getElementById("budgetInput");

    if (input && input.value !== "") {
        cekBudget();
    }
}


// ========================================
// UBAH TOMBOL PILIH
// ========================================

function ubahTombol(nama, sudahDipilih) {

    const tombol =
        document.querySelectorAll(".btn-pilih");


    tombol.forEach(function(button) {

        if (button.dataset.part === nama) {

            if (sudahDipilih) {

                button.textContent = "✓ Sudah Dipilih";

                button.disabled = true;

                button.classList.add("sudah-dipilih");

            } else {

                button.textContent = "Pilih";

                button.disabled = false;

                button.classList.remove("sudah-dipilih");

            }
        }

    });
}


// ========================================
// TAMPILKAN RAKITAN
// ========================================

function tampilkanRakitan() {

    const daftar =
        document.getElementById("daftarRakitan");

    const totalHarga =
        document.getElementById("totalHarga");


    if (!daftar || !totalHarga) {
        return;
    }


    daftar.innerHTML = "";


    // Jika belum ada komponen
    if (rakitan.length === 0) {

        daftar.innerHTML = `
            <p>
                Belum ada komponen yang dipilih.
            </p>
        `;

    } else {

        rakitan.forEach(function(part, index) {

            const item =
                document.createElement("div");


            item.className =
                "item-rakitan";


            item.innerHTML = `

                <span>
                    ${part.nama}
                    -
                    Rp${part.harga.toLocaleString("id-ID")}
                </span>

                <button
                    onclick="hapusPart(${index})"
                >
                    Hapus
                </button>

            `;


            daftar.appendChild(item);

        });
    }


    // Update total
    totalHarga.textContent =
        "Rp" + total.toLocaleString("id-ID");
}


// ========================================
// HAPUS SPAREPART
// ========================================

function hapusPart(index) {

    if (
        index < 0 ||
        index >= rakitan.length
    ) {
        return;
    }


    // Ambil nama komponen
    const nama =
        rakitan[index].nama;


    // Kurangi harga
    total -= rakitan[index].harga;


    // Hapus dari array
    rakitan.splice(index, 1);


    // Tampilkan ulang
    tampilkanRakitan();


    // Aktifkan kembali tombol
    ubahTombol(nama, false);


    // Update budget
    const input =
        document.getElementById("budgetInput");


    if (
        input &&
        input.value !== ""
    ) {
        cekBudget();
    }
}


// ========================================
// RESET RAKITAN
// ========================================

function resetRakitan() {

    // Kosongkan rakitan
    rakitan = [];


    // Reset total
    total = 0;


    // Tampilkan ulang
    tampilkanRakitan();


    // Aktifkan semua tombol
    const tombol =
        document.querySelectorAll(".btn-pilih");


    tombol.forEach(function(button) {

        button.textContent = "Pilih";

        button.disabled = false;

        button.classList.remove("sudah-dipilih");

    });


    // Update budget
    const input =
        document.getElementById("budgetInput");


    if (
        input &&
        input.value !== ""
    ) {
        cekBudget();
    }
}


// ========================================
// FORMAT RUPIAH
// ========================================

function formatRupiah(input) {

    // Ambil angka saja
    let angka =
        input.value.replace(/\D/g, "");


    // Jika kosong
    if (angka === "") {

        input.value = "";

        return;
    }


    // Format Indonesia
    input.value =
        Number(angka).toLocaleString("id-ID");
}


// ========================================
// CEK BUDGET
// ========================================

function cekBudget() {

    const input =
        document.getElementById("budgetInput");


    const hasil =
        document.getElementById("hasilBudget");


    if (!input || !hasil) {
        return;
    }


    // Hilangkan titik
    const angkaBudget =
        input.value.replace(/\./g, "");


    const budget =
        Number(angkaBudget);


    // Validasi
    if (!budget || budget <= 0) {

        hasil.innerHTML = `
            <p>
                Silakan masukkan budget yang valid.
            </p>
        `;

        return;
    }


    // Hitung selisih
    const selisih =
        budget - total;


    // ====================================
    // BUDGET AMAN
    // ====================================

    if (selisih >= 0) {

        hasil.innerHTML = `

            <div class="budget-aman">

                <h3>
                    🟢 Budget Aman
                </h3>

                <p>
                    Budget:
                    <strong>
                        Rp${budget.toLocaleString("id-ID")}
                    </strong>
                </p>

                <p>
                    Total rakitan:
                    <strong>
                        Rp${total.toLocaleString("id-ID")}
                    </strong>
                </p>

                <p>
                    Sisa budget:
                    <strong>
                        Rp${selisih.toLocaleString("id-ID")}
                    </strong>
                </p>

            </div>

        `;

    }


    // ====================================
    // KELEBIHAN BUDGET
    // ====================================

    else {

        const kelebihan =
            Math.abs(selisih);


        hasil.innerHTML = `

            <div class="budget-lebih">

                <h3>
                    🔴 Kelebihan Budget
                </h3>

                <p>
                    Budget:
                    <strong>
                        Rp${budget.toLocaleString("id-ID")}
                    </strong>
                </p>

                <p>
                    Total rakitan:
                    <strong>
                        Rp${total.toLocaleString("id-ID")}
                    </strong>
                </p>

                <p>
                    Kelebihan:
                    <strong class="kelebihan">
                        Rp${kelebihan.toLocaleString("id-ID")}
                    </strong>
                </p>

            </div>

        `;
    }
}