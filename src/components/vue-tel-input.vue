<template>
  <div>
      <b-input-group>
        <b-dropdown variant="outline-secondary" class="drop-padding">
          <template slot="button-content">
            <img :src="activeCountry.icon" />
          </template>
          <b-dropdown-item v-for="pb in allCountries"
                           :key="pb['iso2']"
                           @click="choose(pb)">
            <img :src="pb.icon" />
            <strong>{{ pb.name }} </strong>
            <span>+{{ pb.dialCode }}</span>
          </b-dropdown-item>
        </b-dropdown>
        <b-form-input v-model="phoneNumber" @input="updatePhone"
                      placeholder="Ваш телефон"
                      :state="state" class="inputPhone"
                      :formatter="format">
        </b-form-input>
      </b-input-group>
  </div>
</template>

<script>
  /* eslint-disable import/extensions */

  import { format, asYouType, isValidNumber } from 'libphonenumber-js';
import allCountries from '../assets/all-countries';
import getCountry from '../assets/default-country';

export default {
    name: 'vue-tel-input',
    mounted() {
      getCountry().then((res) => {
        this.activeCountry = allCountries.find(country => country.iso2 === res);
      });
    },
    data() {
      return {
        allCountries,
        activeCountry: allCountries[0],
        phoneNumber: '',
      };
    },
    computed: {
      formattedResult() {
        const formatter = new asYouType();// eslint-disable-line
        if (this.phoneNumber && this.phoneNumber[0] === '+') {
          // if user manually type the country code
          this.activeCountry = this.allCountries.find(ele => ele.iso2.toUpperCase() === formatter.country) || this.activeCountry;// eslint-disable-line
        }
        return format(this.phoneNumber, this.activeCountry.iso2, 'International');
      },
      state() {
        if (this.phoneNumber.length === 0) {
          return null;
        }
        return isValidNumber(this.formattedResult);
      },
    },
    watch: {
      state(value) {
        if (value) {
          this.phoneNumber = this.formattedResult;
        }
      },
    },
    methods: {
      updatePhone: function e() {
        this.$emit('getPhoneNumber', { num: this.formattedResult, valid: this.state });
      },
      choose(country) {
        this.activeCountry = country;
      },
      format(value) {
        return new asYouType(this.activeCountry.iso2).input(value);// eslint-disable-line
      },
    },
};
</script>

<style>
.dropdown-menu.show {
  max-height: 250px;
  overflow: scroll;
}
.input-group img {
  width: 25px;
}
.drop-padding {
}

.inputPhone {
  border-left: 0.25rem;
}
</style>
