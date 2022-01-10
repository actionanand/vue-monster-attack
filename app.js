function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playersHealth: 100,
      monstersHealth: 100
    };
  },
  computed: {
    playersHealthBar() {
      return {width: this.playersHealth + '%'};
    },
    monstersHealthBar() {
      return {width: this.monstersHealth + '%'};
    }
  },
  methods: {
    attackMonster() {
      const attackValue = getRandomValue(5, 12);
      this.monstersHealth -= attackValue;
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playersHealth -= attackValue;
    }
  }
});

app.mount('#game');