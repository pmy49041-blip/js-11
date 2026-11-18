
// Elementlarni topib olamiz
const forma = document.getElementById("forma");
const kartalarJoyi = document.getElementById("kartalar");
const bosh = document.getElementById("bosh");
const soni = document.getElementById("soni"); // a'zolar soni
const shablon = document.getElementById("kartaShablon"); // index.html dagi shablon

// Saqlangan ma'lumotlarni olamiz (bo'lmasa bo'sh ro'yxat)
let royxat = JSON.parse(localStorage.getItem("kartalar")) || [];

// Kartalarni ekranga chizish
function chiz() {
  kartalarJoyi.innerHTML = "";

  // A'zolar sonini yangilaymiz
  soni.textContent = royxat.length;

  // Ro'yxat bo'sh bo'lsa yozuv ko'rsatamiz
  if (royxat.length === 0) {
    bosh.classList.remove("hidden");
  } else {
    bosh.classList.add("hidden");
  }

  // Har bir odam uchun shablondan nusxa olamiz
  royxat.forEach(function (odam, i) {
    const karta = shablon.content.cloneNode(true);

    // Matnlarni joyiga qo'yamiz
    karta.querySelector(".ism").textContent = odam.ism;
    karta.querySelector(".guruh").textContent = odam.guruh;
    karta.querySelector(".yosh").textContent = odam.yosh + " yosh";
    karta.querySelector(".tel").textContent = odam.tel;
    karta.querySelector(".email").textContent = odam.email;

    // Rasm bor bo'lsa rasmni, bo'lmasa harfni qoldiramiz
    const rasm = karta.querySelector(".rasm");
    const harf = karta.querySelector(".harf");

    if (odam.rasm) {
      rasm.src = odam.rasm;
      harf.remove();
    } else {
      harf.textContent = odam.ism[0].toUpperCase();
      rasm.remove();
    }

    // O'chirish tugmasi
    karta.querySelector(".ochirTugma").addEventListener("click", function () {
      ochir(i);
    });

    // Tayyor kartani sahifaga qo'shamiz
    kartalarJoyi.appendChild(karta);
  });
}

// Ro'yxatni brauzerda saqlash
function saqla() {
  localStorage.setItem("kartalar", JSON.stringify(royxat));
}

// Kartani o'chirish
function ochir(i) {
  royxat.splice(i, 1);
  saqla();
  chiz();
}

// Yangi odamni qo'shish
function qosh(rasmManzili) {
  const odam = {
    ism: document.getElementById("inIsm").value,
    guruh: document.getElementById("inGuruh").value,
    yosh: document.getElementById("inYosh").value,
    tel: document.getElementById("inTel").value,
    email: document.getElementById("inEmail").value,
    rasm: rasmManzili,
  };

  royxat.push(odam);
  saqla();
  chiz();
  forma.reset(); // formani tozalaymiz
}

// Forma yuborilganda
forma.addEventListener("submit", function (e) {
  e.preventDefault(); // sahifa yangilanib ketmasin

  const fayl = document.getElementById("inRasm").files[0];

  if (fayl) {
    // Rasmni o'qib, matn ko'rinishiga o'tkazamiz
    const oqigich = new FileReader();
    oqigich.onload = function () {
      qosh(oqigich.result);
    };
    oqigich.readAsDataURL(fayl);
  } else {
    qosh(""); // rasm tanlanmagan
  }
});

// Sahifa ochilganda saqlangan kartalarni ko'rsatamiz
chiz();