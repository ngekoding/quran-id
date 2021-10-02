<template>
  <q-dialog v-model="showDialog">
    <q-card class="bg-primary" style="width: 80vw">
      <q-card-section class="row items-center text-white">
        <div class="text-h6">Pergi ke ayat</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="bg-white">
        <q-input
          rounded
          outlined
          v-model="keyword"
          placeholder="Filter nomor ayat..."
          dense
          type="number"
          min="1"
        >
          <template v-slot:prepend>
            <q-icon name="search" />
          </template>
        </q-input>
      </q-card-section>
      <q-list separator class="scroll bg-white" style="max-height: 60vh">
        <q-item v-if="ayahListFiltered.length == 0">
          <q-item-section class="text-center text-grey-6">
            Tidak tersedia
          </q-item-section>
        </q-item>
        <q-item
          clickable
          v-ripple
          v-for="ayah in ayahListFiltered"
          :key="'ayah-' + ayah.verseKey"
          @click="click(ayah)"
        >
          <q-item-section> Ayat {{ ayah.ayahNumber }} </q-item-section>
        </q-item>
      </q-list>
    </q-card>
  </q-dialog>
</template>

<script>
import { ref, watch, computed } from "vue";

export default {
  name: "AyahChangerDialog",
  props: {
    show: {
      type: Boolean,
    },
    surahId: {
      type: Number,
      required: true,
    },
    versesCount: {
      type: Number,
      required: true,
    },
  },
  emits: ["update:show", "item-click"],
  setup(props, { emit }) {
    const showDialog = computed({
      get: () => props.show,
      set: (val) => emit("update:show", val),
    });

    const keyword = ref("");
    watch(showDialog, () => (keyword.value = ""));

    const ayahList = computed(() => {
      return Array.from({ length: props.versesCount }, (_, i) => {
        return {
          ayahNumber: i + 1,
          verseKey: `${props.surahId}:${i + 1}`,
        };
      });
    });

    const ayahListFiltered = computed(() => {
      const q = keyword.value.toString();
      if (q) {
        return ayahList.value.filter((ayah) =>
          ayah.ayahNumber.toString().startsWith(q)
        );
      }
      return ayahList.value;
    });

    const click = (ayah) => emit("item-click", ayah.verseKey);

    return {
      keyword,
      showDialog,
      ayahListFiltered,
      click,
    };
  },
};
</script>
