new Vue ({
    el:'#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],
        message1: 'Strike everything',
        message2: 'Strike everything including 5G towers',
        message3: 'Use medcine + random monster attack value',
        message4: 'for cowards',

    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        }, 
        calcDamage(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        attack() {
            let damage = this.calcDamage(1, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage + 'hp'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        specialAttack() {
            let damage = this.calcDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage + 'hp'
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttack();
        },
        heal() {
           if (this.playerHealth <= 90) {
               this.playerHealth += 10;
           } else {
               this.playerHealth = 100;
           }
           this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10 hp'
           })
           this.monsterAttack();
        },
        giveUp() {
            this.gameIsRunning = false;
            this.turns = [];
        },
        monsterAttack() {
            let damage = this.calcDamage(2, 11);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage + 'hp'
            })
        },
        checkWin() {
            if (this.monsterHealth <= 0) {
                if(confirm('You won! Play again?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! Play again?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }
    }
})