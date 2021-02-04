<template>
  <div class="quran-reader-detail-skeleton">
    <q-item class="q-py-md q-px-md">
      <q-item-section side>
        <q-skeleton type="circle" size="24px" class="q-mr-sm" />
      </q-item-section>
      <q-item-section>
        <q-item-label>
          <q-skeleton type="text" width="75px" />
        </q-item-label>
        <q-item-label caption>
          <q-skeleton type="text" width="100px" />
        </q-item-label>
      </q-item-section>
    </q-item>
    <div class="bg-white" style="min-height: 100vh">
      <q-list>
        <div v-for="i in 10" :key="i">
          <q-item class="q-py-md">
            <q-item-section>
              <q-item-label class="text-right">
                <q-skeleton type="text" height="30px" />
              </q-item-label>
              <q-item-label class="q-pt-sm">
                <q-skeleton type="text" />
                <q-skeleton type="text" width="75%" />
              </q-item-label>
            </q-item-section>
            <q-item-section side top class="q-mt-sm">
              <q-skeleton type="circle" size="16px" />
            </q-item-section>
          </q-item>
          <q-separator v-if="i != 10" color="grey-3" />
        </div>
      </q-list>
    </div>
  </div>
</template>
