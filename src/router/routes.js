const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        alias: "reader",
        name: "QuranReader",
        component: () => import("pages/quran/QuranReader.vue")
      },
      {
        path: "reader/:surahId",
        name: "QuranReaderDetail",
        component: () => import("pages/quran/QuranReaderDetail.vue"),
        props: true
      },
      {
        path: "search-by-ayah",
        name: "QuranSearchByAyah",
        component: () => import("pages/quran/QuranSearchByAyah.vue")
      },
      {
        path: "player",
        name: "QuranPlayer",
        component: () => import("pages/quran/QuranPlayer.vue")
      },
      {
        path: "bookmark",
        name: "QuranBookmark",
        component: () => import("pages/quran/QuranBookmark.vue")
      },
      {
        path: "about",
        name: "AboutIndex",
        component: () => import("pages/about/AboutIndex.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
