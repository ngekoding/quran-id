<template>
  <div
    class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center"
  >
    <div>
      <q-icon name="travel_explore" size="65px" />
      <div class="text-h5 q-mt-md">
        Halaman tidak ditemukan
      </div>
      <q-btn
        flat
        icon="arrow_back"
        class="q-mt-xl"
        :to="{ name: 'QuranReader' }"
        label="Kembali"
        no-caps
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404"
};
</script>
