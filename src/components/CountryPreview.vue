<script setup>
import {defineProps} from 'vue'

const props = defineProps({
  country: {
    'name': Object,
    'population': Number,
    'region': String,
    'capital': Array,
    'flags': Object,
  }
})
</script>
<template>
  <div class="card">
    <div class="center country-flag" :style="{'background-image': 'url(' + props.country.flags.png + ')'}">

    </div>
    <div class="data">
      <div class="country-name">{{ props.country.name.common }}</div>
      <p><strong>Population:</strong> {{ props.country.population }}</p>
      <p>
        <strong>Region:</strong> {{ props.country.region }}
      </p>
      <p>
        <strong>Capital:</strong> {{ props.country.capital[ 0 ] }}
      </p>

    </div>
  </div>
</template>


<style scoped>
.card {
  width: 320px;
  border-radius: 8px;
  background-color: var(--elements);
  box-shadow: 0 4px 18px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
}

.dark-theme .card {

  box-shadow: 0 4px 18px 0 rgba(25, 22, 22, 0.45);
}

.country-flag {
  border-radius: 8px 8px 0 0;

  width: 100%;
  height: auto;
  aspect-ratio: 3/2;
  background-position: 50% 0;
  background-repeat: no-repeat;
  background-size: contain;

}

.country-name {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 1em;
}

.data {
  padding: 25px 25px 40px;
}

p:last-child {
  margin-bottom: 0;
}
</style>
