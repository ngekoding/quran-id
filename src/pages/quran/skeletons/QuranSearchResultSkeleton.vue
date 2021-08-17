<template>
  <div class="quran-search-result-skeleton">
    <q-list class="bg-white rounded-borders">
      <div v-for="surah in 10" :key="surah">
        <q-item class="q-py-md" clickable>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" height="30px" />
              <q-skeleton type="text" height="30px" width="75%" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="30%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="surah != 10" />
      </div>
    </q-list>
  </div>
</template>
