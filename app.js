function getRandom(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      gameRound: 0,
      winner: null,
      logMessage: [],
    };
  },
  watch: {
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
  },
  computed: {
    monsterHealthBar() {
      if (this.monsterHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerHealthBar() {
      if (this.playerHealth <= 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    specialAttackDisplay() {
      return this.gameRound % 3 !== 0;
    },
    mayHealPlayer() {
      return this.gameRound % 2 !== 0;
    },
  },

  methods: {
    startGame() {
      this.monsterHealth = 100;
      this.playerHealth = 100;
      this.gameRound = 0;
      this.winner = null;
      this.logMessage = [];
    },
    attackMonster() {
      this.gameRound++;
      const attackValue = getRandom(12, 5);
      this.monsterHealth -= attackValue;
      this.battleLog("Player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandom(15, 8);
      this.battleLog("Monster", "attack", attackValue);
      this.playerHealth -= attackValue;
    },
    specialAttack() {
      this.gameRound++;
      const attackValue = getRandom(20, 12);
      this.monsterHealth -= attackValue;
      this.battleLog("Player", "special-attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.gameRound++;
      const healHealth = getRandom(8, 22);
      if (this.playerHealth + healHealth >= 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healHealth;
        this.battleLog("Player", "heal", healHealth);
      }
      this.attackPlayer();
    },
    surrender() {
      this.winner = "monster";
    },
    battleLog(who, what, value) {
      this.logMessage.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
