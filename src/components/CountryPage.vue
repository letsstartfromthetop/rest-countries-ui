<script setup>
import {defineProps, ref, onMounted, computed, watch} from 'vue';

import {useRouter, useRoute} from 'vue-router'
import axios from 'axios'
// const props = defineProps({
//   name: String
// })
defineProps({
  name: String,
});
const route = useRoute()
const router = useRouter()
const common_name = route.params.name; // From the URL
const officialName = route.query.officialName; // From query params
const country = ref({})
const borderCountries = ref([])
const isLoadingBorders = ref(false)
const isLoading = ref(false)
const error = ref(null)

// Computed property for formatted languages
const formattedLanguages = computed(() => {
  if (!country.value.languages) return '';
  return Object.values(country.value.languages).join(', ');
});

// Computed property for formatted border countries
const formattedBorders = computed(() => {
  if (!borderCountries.value.length) return '';
  return borderCountries.value.map(country => country.name.common).join(', ');
});

// Navigate to border country
function navigateToCountry(country) {
  router.push({
    name: 'CountryPage',
    params: { name: country.name.common },
    query: { officialName: country.name.official }
  });
}

// Fetch border countries names
async function fetchBorderCountries(borderCodes) {
  if (!borderCodes || !borderCodes.length) return;

  isLoadingBorders.value = true;
  try {
    const response = await axios.get(
      `https://restcountries.com/v3.1/alpha?codes=${borderCodes.join(',')}&fields=name`
    );
    borderCountries.value = response.data;
  } catch (error) {
    console.error('Error fetching border countries:', error);
    borderCountries.value = [];
  } finally {
    isLoadingBorders.value = false;
  }
}

//https://restcountries.com/v3.1/name/{name}?fullText=true
// Fetch country by full Name
async function fetchCountry (name) {
  isLoading.value = true;
  error.value = null;
  borderCountries.value = [];

  try {
    const response = await axios.get(
        'https://restcountries.com/v3.1/name/' + name + '?fullText=true&fields=name,population,flags,capital,nativeName,language,region,subregion,subregion,tld,currencies,languages,borders'
    );
    country.value = response.data[ 0 ];

    // Fetch border countries after getting the main country data
    if (country.value.borders && country.value.borders.length) {
      await fetchBorderCountries(country.value.borders);
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    error.value = err.response?.status === 404
      ? 'Country not found. Please check the name and try again.'
      : 'Failed to fetch country data. Please try again later.';
    country.value = {};
  } finally {
    isLoading.value = false;
  }
}

// Watch for route changes
watch(
  () => route.query.officialName,
  (newOfficialName) => {
    if (newOfficialName) {
      fetchCountry(newOfficialName);
    }
  }
);

// Fetch data when component mounts
onMounted(() => fetchCountry(officialName));

</script>
<template>
  <div class="mb-20">
    <router-link to="/" class="button inline-block"><i class="fa-solid fa-arrow-left mr-3"></i>Back</router-link>
  </div>

  <!-- Loading State -->
  <div v-if="isLoading" class="loading-container">
    <div class="loading-spinner"></div>
    <p class="loading-text">Loading country data...</p>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="error-container">
    <div class="error-icon">⚠️</div>
    <p class="error-message">{{ error }}</p>
    <button @click="fetchCountry(officialName)" class="button">
      Try Again
    </button>
  </div>

  <!-- Country Data -->
  <div v-else-if="country.flags" class="flex justify-between gap-x-[80px]">
    <div class="flex-1">
      <img :src="country.flags.svg" alt="" class="w-full">
    </div>
    <div class="country-details flex-1 flex-col justify-center flex">

      <h3 class="mb-8">{{ country.name.common }}</h3>
      <div class=" flex justify-between gap-x-10 ">
        <div class="flex-1">
          <p ><strong>Official Name:</strong> {{ country.name.official }}</p>
          <p><strong>Population:</strong> {{ country.population }}</p>
          <p><strong>Region:</strong> {{ country.region }}</p>
          <p><strong>Sub region:</strong> {{ country.subregion }}</p>
          <p><strong>Capital:</strong>  {{country.capital.join(', ')}} </p></div>
        <div class="flex-1">

          <p><strong>Top Level Domain:</strong>
            {{country.tld.join(', ')}}
           </p>

          <p><strong>Currencies:</strong>
            <span v-for="(item, index) in country.currencies" :key="'currency-' + index" class="font-italic mx-1">{{item.name}} ({{item.symbol}})</span> </p>

          <p><strong>Languages:</strong>
            <span class="font-italic mx-1">{{ formattedLanguages }}</span>
          </p>


        </div>

      </div>
      <div>
        <p><strong class="mr-1">Border Countries:</strong>
          <span v-if="isLoadingBorders" class="text-gray-500 italic">Loading border countries...</span>
          <template v-else-if="borderCountries.length">
              <button
                  v-for="borderCountry in borderCountries"
                  :key="borderCountry.name.common"
                  @click="navigateToCountry(borderCountry)"
                  class="border-country-btn"
              >
                {{ borderCountry.name.common }}
              </button>
            </template>
          <span v-else class="text-gray-500 italic">No border countries</span>
        </p>
      </div>
    </div>


  </div>
</template>


<style scoped>
/*.country-details {

}

p {
  margin-bottom: 1em;
}*/

.border-country-btn {
  padding: 0.25rem 0.75rem;
  background-color: var(--font-color-dark);
  border-radius: 4px;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  margin: 0.5rem;
}

.dark-theme .border-country-btn {
  background-color: var(--input-dark);
}

.border-country-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.dark-theme .border-country-btn:hover {
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}


</style>
