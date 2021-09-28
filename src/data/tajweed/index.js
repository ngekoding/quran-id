const tajweedGroups = [
  {
    name: "group-1",
    color: "Oranye",
    items: [
      {
        key: "idgham_wo_ghunnah",
        name: "Idgham Bilaghunnah",
        description:
          "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf <b class='arabic'>ر ل</b>, cara membacanya di-<b>idgham</b>-kan (dimasukkan) ke dalam huruf berikutnya <b>tanpa ghunnah</b>."
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
          "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf <b class='arabic'>ي ن م و</b>, cara membacanya di-<b>idgham</b>-kan (dimasukkan) ke dalam huruf berikutnya dengan tempo ghunnah yang dipanjangkan."
      },
      {
        key: "idgham_shafawi",
        name: "Idgham Mimi",
        description:
          "Apabila mim sukun bertemu dengan huruf <b class='arabic'>م</b>, cara membacanya <b>mim</b> pertama di-<b>idgham</b>-kan (dimasukkan) ke dalam <b>mim</b> kedua dengan tempo ghunnah yang dipanjangkan."
      },
      {
        key: "ghunnah",
        name: "Ghunnah",
        description:
          "Setiap huruf <b>Nun</b> bertasydid dan <b>Mim</b> bertasydid, wajib dibaca dengan tempo ghunnah yang dipanjangkan."
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
          "Apabila nun sukun atau tanwin bertemu dengan salah satu huruf <b class='arabic'>ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك</b>, cara membacanya <b>disamarkan</b> dengan tempo ghunnah yang dipanjangkan."
      },
      {
        key: "ikhafa_shafawi",
        name: "Ikhfa Syafawi",
        description:
          "Apabila mim sukun bertemu dengan huruf <b class='arabic'>ب</b>, cara membacanya dengan meng-<b>ghunnah</b>-kan huruf <b>mim</b> dengan tempo yang dipanjangkan."
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
          "Apabila nun sukun atau tanwin bertemu dengan huruf <b class='arabic'>ب</b>, cara membacanya <b>diubah</b> menjadi <b>mim</b> dengan tempo ghunnah yang dipanjangkan."
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
          "Memantulnya suara pada huruf ketika sukun, tanpa terpengaruh dengan harakat yang tiga. Sifat ini terdapat pada 5 (lima) huruf yaitu <b class='arabic'>ق ط ب ج د</b>.<br><br>Qalqalah terbagi menjadi 2 bagian:<br><b>a. Qalqalah Kubra</b>, yaitu apabila <b>waqaf</b> pada huruf qalqalah (bertasydid atau tidak).<br><br><b>b. Qalqalah Sughra</b>, yaitu apabila huruf qalqalah ada di tengah kata atau kalimat."
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
