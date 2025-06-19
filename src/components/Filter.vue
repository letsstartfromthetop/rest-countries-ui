<script setup>
import {defineEmits, ref} from 'vue'
const selectedRegion = ref('')
const openDropdown = ref(false)

const emit = defineEmits(['select-region'])
const setFilter = value => {
  selectedRegion.value === value ? selectedRegion.value = '' : selectedRegion.value = value
  emit('select-region', selectedRegion.value)
  openDropdown.value = false
}
</script>
<template>
  <div class="filter-container " :class="{'active': openDropdown }">
    <div class="button filter-button flex items-center" @click="openDropdown =!openDropdown">
      Filter by Region <i class="fa-solid fa-chevron-down ml-4"></i>
    </div>
    <div class="dropdown-body mt-2" :class="{'active': openDropdown }">
      <div @click="setFilter('asia')" :class="{'selected': selectedRegion === 'asia' }">Asia</div>
      <div @click="setFilter('americas')" :class="{'selected': selectedRegion  === 'americas' }">Americas</div>
      <div @click="setFilter('africa')" :class="{'selected': selectedRegion === 'africa'  }">Africa</div>
      <div @click="setFilter('europe')" :class="{'selected': selectedRegion  === 'europe' }">Europe</div>
      <div @click="setFilter('oceania')" :class="{'selected': selectedRegion === 'oceania'  }">Oceania</div>
    </div>
  </div>

</template>
<style>
.filter-container {
  position: relative;
  overflow: hidden;
}
.filter-container.active {
  overflow: visible;
}
.filter-button {
  width: fit-content;
}
</style>
