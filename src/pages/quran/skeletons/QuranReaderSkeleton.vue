<template>
  <div class="quran-reader-skeleton">
    <q-list class="bg-white rounded-borders">
      <div v-for="surah in 10" :key="surah">
        <q-item class="q-py-md" clickable>
          <q-item-section side class="items-center" style="width: 40px">
            <div class="text-center">
              <q-skeleton type="circle" size="13px" />
            </div>
          </q-item-section>
          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" width="75%" />
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-separator v-if="surah != 10" style="margin-left: 54px" />
      </div>
    </q-list>
  </div>
</template>
