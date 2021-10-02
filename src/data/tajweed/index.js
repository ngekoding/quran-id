const tajweedGroups = [
  {
    name: "group-1",
    color: "Oranye",
    items: [
      {
        key: "idgham_wo_ghunnah",
        name: "Idgham Bilaghunnah",
        description:
          "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf <b class='text-arabic'>ر ل</b>, cara membacanya di-<b>idgham</b>-kan (dimasukkan) ke dalam huruf berikutnya <b>tanpa ghunnah</b>.",
        example: {
          arabic:
            "وَيْ<tajweed class=idgham_wo_ghunnah>لٌ ل</tajweed>ِّكُلِّ هُمَزَ<tajweed class=idgham_wo_ghunnah>ةٍ ل</tajweed>ُّمَزَةٍ",
          meta: {
            info: "QS. Al-Humazah: 1",
            verseKey: "104:1"
          }
        }
      }
    ]
  },
  {
    name: "group-2",
    color: "Merah Muda",
    items: [
      {
        key: "idgham_ghunnah",
        name: "Idgham Bighunnah",
        description:
          "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf <b class='text-arabic'>ي ن م و</b>, cara membacanya di-<b>idgham</b>-kan (dimasukkan) ke dalam huruf berikutnya dengan tempo ghunnah yang dipanjangkan.",
        example: {
          arabic:
            "فَم<tajweed class=idgham_ghunnah>َن ي</tajweed>َعْمَلْ مِثْقَالَ ذَرَّةٍ خَيْ<tajweed class=idgham_ghunnah>رًا ي</tajweed>َرَهُۥ",
          meta: {
            info: "QS. Az-Zalzalah: 7",
            verseKey: "99:7"
          }
        }
      },
      {
        key: "idgham_shafawi",
        name: "Idgham Mimi",
        description:
          "Apabila mim sukun bertemu dengan huruf <b class='text-arabic'>م</b>, cara membacanya <b>mim</b> pertama di-<b>idgham</b>-kan (dimasukkan) ke dalam <b>mim</b> kedua dengan tempo ghunnah yang dipanjangkan.",
        example: {
          arabic:
            "إِ<tajweed class=ghunnah>نّ</tajweed>َهَا عَلَيْه<tajweed class=idgham_shafawi>ِم م</tajweed>ُّؤْصَدَةٌ",
          meta: {
            info: "QS. Al-Humazah: 8",
            verseKey: "104:8"
          }
        }
      },
      {
        key: "ghunnah",
        name: "Ghunnah",
        description:
          "Setiap huruf <b>Nun</b> bertasydid dan <b>Mim</b> bertasydid, wajib dibaca dengan tempo ghunnah yang dipanjangkan.",
        example: {
          arabic:
            "إِ<tajweed class=ghunnah>نّ</tajweed>َ <tajweed class=ham_wasl>ٱ</tajweed>لْإِ<tajweed class=ikhafa>نس</tajweed>َ<tajweed class=madda_normal>ـٰ</tajweed>نَ لَفِى خُسْرٍ",
          meta: {
            info: "QS. Al-'Asr: 2",
            verseKey: "103:2"
          }
        }
      }
    ]
  },
  {
    name: "group-3",
    color: "Hijau",
    items: [
      {
        key: "ikhafa",
        name: "Ikhfa",
        description:
          "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf <b class='text-arabic'>ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك</b>, cara membacanya <b>disamarkan</b> dengan tempo ghunnah yang dipanjangkan.",
        example: {
          arabic:
            "وَقَالَ <tajweed class=ham_wasl>ٱ</tajweed>لْإِ<tajweed class=ikhafa>نس</tajweed>َ<tajweed class=madda_normal>ـٰ</tajweed>نُ مَا لَهَا",
          meta: {
            info: "QS. Az-Zalzalah: 3",
            verseKey: "99:3"
          }
        }
      },
      {
        key: "ikhafa_shafawi",
        name: "Ikhfa Syafawi",
        description:
          "Apabila mim sukun bertemu dengan huruf <b class='text-arabic'>ب</b>, cara membacanya dengan meng-<b>ghunnah</b>-kan huruf <b>mim</b> dengan tempo yang dipanjangkan.",
        example: {
          arabic:
            "لَّسْتَ عَلَيْه<tajweed class=ikhafa_shafawi>ِم ب</tajweed>ِمُصَيْطِرٍ",
          meta: {
            info: "QS. Al-Gasyiyah: 22",
            verseKey: "88:22"
          }
        }
      }
    ]
  },
  {
    name: "group-4",
    color: "Biru",
    items: [
      {
        key: "iqlab",
        name: "Iqlab",
        description:
          "Apabila nun sukun atau tanwin bertemu dengan huruf <b class='text-arabic'>ب</b>, cara membacanya <b>diubah</b> menjadi <b>mim</b> dengan tempo ghunnah yang dipanjangkan.",
        example: {
          arabic:
            "جَز<tajweed class=madda_obligatory>َا</tajweed>ٓ<tajweed class=iqlab>ءَۢ ب</tajweed>ِمَا كَانُو<tajweed class=slnt>اْ</tajweed> يَعْمَل<tajweed class=madda_permissible>ُو</tajweed>نَ",
          meta: {
            info: "QS. Al-Waqi'ah: 24",
            verseKey: "56:24"
          }
        }
      }
    ]
  },
  {
    name: "group-5",
    color: "Ungu",
    items: [
      {
        key: "qalaqah",
        name: "Qalqalah",
        description:
          "Memantulnya suara pada huruf ketika sukun, tanpa terpengaruh dengan harakat yang tiga. Sifat ini terdapat pada 5 (lima) huruf yaitu <b class='text-arabic'>ق ط ب ج د</b>.<br><br>Qalqalah terbagi menjadi 2 bagian:<br><b>a. Qalqalah Kubra</b>, yaitu apabila <b>waqaf</b> pada huruf qalqalah (bertasydid atau tidak).<br><br><b>b. Qalqalah Sughra</b>, yaitu apabila huruf qalqalah ada di tengah kata atau kalimat.",
        example: {
          arabic:
            "ٱ<tajweed class=qalaqah>قْ</tajweed>رَأْ بِ<tajweed class=ham_wasl>ٱ</tajweed>سْمِ رَبِّكَ <tajweed class=ham_wasl>ٱ</tajweed>لَّذِى خَلَ<tajweed class=qalaqah>ق</tajweed>َ",
          meta: {
            info: "QS. Al-'Alaq: 1",
            verseKey: "96:1"
          }
        }
      }
    ]
  }
];

const tajweeds = [];
tajweedGroups.forEach(group =>
  group.items.forEach(item => {
    tajweeds.push({
      key: item.key,
      name: item.name
    });
  })
);

export { tajweedGroups, tajweeds };

export default tajweeds;
