<script setup>
import {defineEmits, ref, onUnmounted} from 'vue'

const searchTerm = ref('')
const emit = defineEmits(['search'])
let debounceTimer = null

const lookUp = function () {
  // Clear previous timer
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }

  // Input validation
  if (searchTerm.value.trim().length > 2) {
    // Debounce the search
    debounceTimer = setTimeout(() => {
      emit('search', searchTerm.value.trim())
    }, 300) // 300ms delay
  }
}

// Cleanup on component unmount
onUnmounted(() => {
  if (debounceTimer) {
    clearTimeout(debounceTimer)
  }
})
</script>

<template>
  <div class="search-container">
    <div class="button">
      <i class="fa-solid fa-search mr-10"></i>
      <input
        type="text"
        placeholder="Search for a country..."
        @input="lookUp"
        v-model="searchTerm"
        aria-label="Search for a country"
      />
    </div>
   <div v-if="searchTerm.length > 0 && searchTerm.length <= 2" class="validation-message">
      Please enter at least 3 characters
    </div>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  width: 100%;
}

.validation-message {
  position: absolute;
  top: 100%;
  left: 0;
  color:var(--font-color);
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

input {

  padding: 0.5rem;
  border: none;
  outline: none;
  background: transparent;
}

input:focus {
  outline: none;
}
</style>
