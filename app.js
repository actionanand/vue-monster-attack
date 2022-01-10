function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      playersHealth: 100,
      monstersHealth: 100,
      currentRound: 0,
      winner: null,
      logMessages: []
    };
  },
  computed: {
    playersHealthBar() {
      if(this.playersHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.playersHealth + '%'};
    },
    monstersHealthBar() {
      if(this.monstersHealth < 0) {
        return {width: '0%'};
      }
      return {width: this.monstersHealth + '%'};
    },
    mayUseSpecialAttack() {
      return this.currentRound % 3 !== 0;
    }
  },
  watch: {
    playersHealth(value) {
      if(value <= 0 && this.monstersHealth <= 0) {
        this.winner = 'draw';
      } else if(value <= 0) {
        this.winner = 'monster';
      }
    },
    monstersHealth(value) {
      if(value <= 0 && this.playersHealth <= 0) {
        this.winner = 'draw';
      } else if(value <= 0) {
        this.winner = 'player';
      }
    }
  },
  methods: {
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(5, 12);
      this.monstersHealth -= attackValue;
      this.addLogMessage('player', 'attacks', attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomValue(8, 15);
      this.playersHealth -= attackValue;
      this.addLogMessage('monster', 'attacks', attackValue);
    },
    specialAttackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(10, 25);
      this.monstersHealth -= attackValue;
      this.addLogMessage('player', 'specially attacks', attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 20);
      if(this.playersHealth + healValue > 100) {
        this.playersHealth = 100;
      } else {
        this.playersHealth += healValue;
      }
      this.addLogMessage('player', 'heals', healValue);
      this.attackPlayer();
    },
    startGame() {
      this.playersHealth = 100;
      this.monstersHealth = 100;
      this.currentRound = 0;
      this.winner = null;
      this.logMessages = [];
    },
    surrender() {
      this.winner = 'monster';
      this.addLogMessage('player', 'surrenders', 0);
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value  
      });
    }
  }
});

app.mount('#game');