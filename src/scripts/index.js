import '../styles/styles.scss';

import Vue from 'vue';

import Roulette from './components/Roulette.vue'

const container = document.getElementById('container');
if (container) {
    window.containerVueInstance = new Vue({
        el: container,
        components: {
            Roulette
        }
    });
}

console.log(Roulette)