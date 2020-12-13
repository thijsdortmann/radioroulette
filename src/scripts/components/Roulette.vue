<template>
  <div class="container my-5">
    <select v-model="selectedVoice" class="form-control form-control-lg">
      <option value="" disabled>Selecteer een stem...</option>
      <template v-for="(voice, index) in availableVoices">
        <option :value="index">{{ voice.name }} ({{ voice.lang }})</option>
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
        <button class="btn btn-danger btn-lg" @click="roll" :disabled="rolling">Roll</button>
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
      availableVoices: [],
      selectedVoice: '',
      currentSong: '',
      rolling: false,
      synth: window.speechSynthesis
    }
  },
  computed: {},
  mounted() {
    this.availableVoices = this.synth.getVoices()

    this.synth.onvoiceschanged = () => {
      this.availableVoices = this.synth.getVoices()
    }
  },
  methods: {
    roll() {
      this.rolling = true

      const randomNumber = Math.ceil(Math.random() * this.songs.length - 1)
      this.currentSong = this.songs[randomNumber]

      const rouletteSpin = new Audio('roulette_spin.mp3');

      const voice = window.speechSynthesis.getVoices()[this.selectedVoice]

      const tts = new SpeechSynthesisUtterance();
      tts.lang = voice.lang
      tts.voice = voice
      tts.text = `Ik ben de roulettecomputer. Bliep, bloep, blop. Daar gaan we weer... De keuze is tussen ${this.songs[0].title}, ${this.songs[1].title}, ${this.songs[2].title}, ${this.songs[3].title} en ${this.songs[4].title}. We gaan nu aan het rad draaien...`
      window.speechSynthesis.speak(tts)

      tts.onend = () => {
        rouletteSpin.play();

        setTimeout(() => {
          const tts2 = new SpeechSynthesisUtterance();
          const voice = window.speechSynthesis.getVoices()[this.selectedVoice]
          tts2.lang = voice.lang
          tts2.voice = voice
          tts2.pitch = 1.5
          tts2.text = `Het wordt heel spannend...`
          window.speechSynthesis.speak(tts2)

          tts2.onend = () => {
            setTimeout(() => {
              const tts3 = new SpeechSynthesisUtterance();
              const voice = window.speechSynthesis.getVoices()[this.selectedVoice]
              tts3.lang = voice.lang
              tts3.voice = voice
              tts3.pitch = 2
              tts3.text = `Ik hou het niet meer`
              window.speechSynthesis.speak(tts3)

              tts3.onend = () => {
                setTimeout(() => {
                  const tts4 = new SpeechSynthesisUtterance();
                  const voice = window.speechSynthesis.getVoices()[this.selectedVoice]
                  tts4.lang = voice.lang
                  tts4.voice = voice
                  tts4.text = `Het nummer dat we gaan draaien is... ${this.currentSong.title}`
                  window.speechSynthesis.speak(tts4)

                  tts4.onend = () => {
                    this.rolling = false
                  }
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