<template>
  <div class="container my-5">
    <select v-model="selectedVoice" class="form-control form-control-lg">
      <option value="" disabled selected>Selecteer een stem...</option>
      <template v-for="voice in availableVoices">
        <option :value="voice">{{ voice.name }}</option>
      </template>
    </select>

    <div class="row">
      <template v-for="song in songs">
        <div class="col-md-6">
          <label>
          </label>
          <input type="text" class="form-control form-control-lg" v-model="song.title" placeholder="Voer een liedje in...">
        </div>
      </template>
    </div>

    <div class="row">
      <div class="col-12 d-flex justify-content-center my-4">
        <button class="btn btn-danger btn-lg" @click="roll">Roll</button>
      </div>
    </div>

    <div class="row" v-if="currentSong">
      <div class="col-12 text-center small">
        Psst... Het gaat <strong>{{ currentSong.title }}</strong> worden.
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: [
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
        { title: '' },
      ],
      selectedVoice: '',
      currentSong: ''
    }
  },
  computed: {
    availableVoices() {
      return window.speechSynthesis.getVoices().filter(voice => voice.lang == 'nl-NL')
    }
  },
  methods: {
    roll() {
      const randomNumber = Math.ceil(Math.random() * this.songs.length - 1)
      this.currentSong = this.songs[randomNumber]

      const rouletteSpin = new Audio('roulette_spin.mp3');

      const tts = new SpeechSynthesisUtterance();
      tts.lang = 'nl-NL'
      tts.voice = this.selectedVoice
      tts.text = `Ik ben de roulettecomputer. Bliep, bloep, blop. Daar gaan we weer... De keuze is tussen ${this.songs[0].title}, ${this.songs[1].title}, ${this.songs[2].title}, ${this.songs[3].title} en ${this.songs[4].title}. We gaan nu aan het rad draaien...`
      window.speechSynthesis.speak(tts)

      tts.onend = () => {
        rouletteSpin.play();

        setTimeout(() => {
          const tts2 = new SpeechSynthesisUtterance();
          tts2.lang = 'nl-NL'
          tts2.voice = this.selectedVoice
          tts2.pitch = 1.5
          tts2.text = `Het wordt heel spannend...`
          window.speechSynthesis.speak(tts2)

          tts2.onend = () => {
            setTimeout(() => {
              const tts3 = new SpeechSynthesisUtterance();
              tts3.lang = 'nl-NL'
              tts3.voice = this.selectedVoice
              tts3.pitch = 2
              tts3.text = `Ik hou het niet meer`
              window.speechSynthesis.speak(tts3)

              tts3.onend = () => {
                setTimeout(() => {
                  const tts4 = new SpeechSynthesisUtterance();
                  tts4.lang = 'nl-NL'
                  tts4.voice = this.selectedVoice
                  tts4.text = `Het nummer dat we gaan draaien is... ${this.currentSong.title}`
                  window.speechSynthesis.speak(tts4)
                }, 3000)
              }
            }, 3000)
          }
        }, 3500)
      }

    }
  }
}
</script>

<style lang="scss" scoped>

</style>