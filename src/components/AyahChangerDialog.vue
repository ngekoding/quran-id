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
export default {
  name: "AyahChangerDialog",
  props: {
    show: {
      type: Boolean
    },
    surahId: {
      type: Number,
      required: true
    },
    versesCount: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      showDialog: false,
      keyword: ""
    };
  },
  watch: {
    show: {
      immediate: true,
      handler(val) {
        this.showDialog = val;
        this.keyword = "";
      }
    },
    showDialog(val) {
      this.$emit("update:show", val);
    }
  },
  computed: {
    ayahList() {
      return Array.from({ length: this.versesCount }, (_, i) => {
        return {
          ayahNumber: i + 1,
          verseKey: `${this.surahId}:${i + 1}`
        };
      });
    },
    ayahListFiltered() {
      const q = this.keyword.toString();
      if (q) {
        return this.ayahList.filter(ayah =>
          ayah.ayahNumber.toString().startsWith(q)
        );
      }
      return this.ayahList;
    }
  },
  methods: {
    click(ayah) {
      this.$emit("item-click", ayah.verseKey);
    }
  }
};
</script>
