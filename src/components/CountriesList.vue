<script setup>
// components
import SearchBar from './Search.vue'
import FilterDropdown from './Filter.vue'
import Country from './CountryPreview.vue'
import CountryFullInfo from './CountryPage.vue'
// plugins

import {useRouter} from 'vue-router'

// Vue methods
import {onMounted, ref} from "vue"
import countryService from '@/services/api'

// Reactive state for countries list
const countries = ref([]);
const selectedCountry = ref('');
const filter = ref('');
const search = ref('');
const isLoading = ref(false);
const error = ref(null);
const router = useRouter()

const selectCountry = function (country) {
  router.push({
    name: 'CountryPage', // Use name OR path, not both
    params: { name: country.name.common }, // Route params
    query: { officialName: country.name.official }, // Query params
  });
}

// Fetch countries list
async function fetchCountriesList (region, searchTerm) {
  isLoading.value = true;
  error.value = null;

  try {
    let response;
    if (search.value) {
      response = await countryService.searchByName(search.value);
    } else if (region) {
      response = await countryService.getByRegion(region);
    } else {
      response = await countryService.getAllCountries();
    }
    countries.value = response.data;
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = err.message;
    countries.value = [];
  } finally {
    isLoading.value = false;
  }
}
const setFilter = function (region) {
  search.value = ''
  filter.value = region;
  fetchCountriesList(region)
}
const searchCountry = function (searchTerm) {
  filter.value = '';
  search.value = searchTerm;
  fetchCountriesList('', searchTerm)
}
// Fetch data when component mounts
onMounted(fetchCountriesList);

</script>
<template>
  <div class="flex mb-10">
    <div class="flex-1">
      <SearchBar @search="searchCountry"/>
    </div>
    <div class="flex flex-1 justify-end">
      <FilterDropdown @select-region="setFilter"/>
    </div>


  </div>

  <div v-if="error" class="error-message">
    {{ error }}
  </div>

  <div v-else-if="isLoading" class="loading-state">
    Loading countries...
  </div>

  <div v-else class="flex justify-evenly">
    <CountryFullInfo :name="selectedCountry" v-if="selectedCountry"></CountryFullInfo>
    <div class="flex flex-wrap gap-[80px] justify-between">
      <Country @click="selectCountry(item)" v-for="(item, index) in countries" :key="'country' + index"
               :country="item"></Country>
    </div>

  </div>
</template>

