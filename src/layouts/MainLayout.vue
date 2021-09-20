<template>
  <q-layout view="lHh lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer v-if="showTabMenu">
      <q-tabs
        v-model="tab"
        align="justify"
        class="bg-primary text-white"
        indicator-color="transparent"
        :breakpoint="0"
      >
        <q-route-tab icon="menu_book" :to="{ name: 'QuranReader' }" exact />
        <q-route-tab
          icon="play_circle_filled"
          :to="{ name: 'QuranPlayer' }"
          exact
        />
        <q-route-tab icon="bookmark" :to="{ name: 'QuranBookmark' }" exact />
        <q-route-tab icon="touch_app" :to="{ name: 'AboutIndex' }" exact />
      </q-tabs>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {
      tab: "mail",
      showTabMenu: false
    };
  }
};
</script>
