"use strict"

class UserInterface extends Phaser.Scene {
    constructor() {
        super({
            key: "userInterface"
        })
    }

    create() {

        width = this.cameras.main.width;
        height = this.cameras.main.height;

        // gameplay scene, call getQuestions when skip button is clicked
        this.gameplay = this.scene.get("gameplay");
        this.gameCompleted = false;
       // question bg
       this.bgQuestion = this.add.image(width/2, 45, "bgQuestion");
       // question text
       this.questionText = this.add.text(width/2 + 18, 45, "", { fontFamily: "bold", fontSize: 33, color: "#000000" });
       this.questionText.setOrigin(0.5,0.5);
        // sound button
        this.buttonSound = this.add.sprite(20, height - 20, 'buttonSound').setInteractive({ useHandCursor: true });
        this.buttonSound.on("pointerdown", () => {
            // mute/unmute sounds
            this.sound.mute = !this.sound.mute;
            // switch button
            if (soundButtonFrame === 0) {
                this.buttonSound.setFrame(1);
                soundButtonFrame = 1;
            }
            else {
                this.buttonSound.setFrame(0);
                soundButtonFrame = 0;
            }
        });
        this.buttonSound.alpha = 0;
        this.buttonSound.setOrigin(0,1);
        // on/off image
        this.buttonSound.setFrame(soundButtonFrame);
       // button back
       this.buttonBack = this.add.image(50, 50, "buttonBack").setInteractive({ useHandCursor: true });
       this.buttonBack.on("pointerup", () => {
           this.scene.stop("gameplay");
           this.scene.start("menu");
       }, this);

       // txt incorrect
       this.txtIncorrect = this.add.text(width/2, 95, labels.incorrect, { fontFamily: "bold", fontSize: 28, color: '#FFFFFF' });
       this.txtIncorrect.setOrigin(0.5,0.5);
       this.txtIncorrect.alpha = 0;
        // score
        this.txtScore = this.add.text(width - 25, 15, labels.score + "0/" + String(questionsArray.length), { fontFamily: "bold", fontSize: 32, color: '#FFFFFF' });
        this.txtScore.setOrigin(1,0);
        // reset attempts and skips
        attempts = 0;
        skips = 0;
        // attempts
        this.txtAttempts = this.add.text(width - 25, 55, labels.attempts + String(attempts), { fontFamily: "bold", fontSize: 32, color: '#FFFFFF' });
        this.txtAttempts.setOrigin(1,0);
        // skip button
        this.buttonSkip = this.add.text(width/2 + 260, 48, labels.skip, { fontFamily: "bold", fontSize: 32, color: '#FFFFFF' }).setInteractive({ useHandCursor: true });
        this.buttonSkip.on("pointerup", () => {
            skips++;
            // hide incorrect text
            this.txtIncorrect.alpha = 0;
            
            // get new question
            if (this.gameplay.questionsArray.length > 0) {
                this.gameplay.getQuestion();
                this.buttonSkip.setVisible(false);
                this.buttonSkip.y = -1000;
                this.skipTimer = this.time.delayedCall(900, () => {
                    this.buttonSkip.y = 48;
                    this.buttonSkip.setVisible(true);
                }, this);
            }
            else {
                this.gameplay.gameOver();
            }
        });
        this.buttonSkip.alpha = 0;
        this.buttonSkip.setOrigin(0,0.5);

        // hide user interface on start
        this.bgQuestion.alpha = 0;
        this.buttonBack.alpha = 0;
        this.txtScore.alpha = 0;
        this.txtAttempts.alpha = 0;

        // resize
        const resize = () => {
            this.setPositions();
        }
        this.scale.on("resize", (gameSize, baseSize, displaySize, resolution) => {
            if (this.scene.isActive()) {
                this.cameras.resize(gameSize.width, gameSize.height);
                resize();
            }
        })
        resize();
    }

    endScreen() {

        this.gameCompleted = true;

        // circle
        this.circle = this.add.image(width/2, height/2, 'circle');
        this.circle.scaleX = .9;
        this.circle.scaleY = .9;

         // button play again
         this.buttonPlayAgain = this.add.image(width/2, height/2 + 125, 'button').setInteractive({ useHandCursor: true });
         this.buttonPlayAgain.scaleX = .8;
         this.buttonPlayAgain.on("pointerup", () => {
             this.scene.stop("gameplay");
             this.scene.start("menu");
         });
         this.txtPlayAgain = this.add.text(width/2, height/2 + 125, labels.playAgain, { fontFamily: "bold", fontSize: 28, color: "#000000" });
         this.txtPlayAgain.setOrigin(0.5,0.5);
 
         // button stop
         this.buttonStop = this.add.image(width/2, height/2 + 210, 'button').setInteractive({ useHandCursor: true });
         this.buttonStop.scaleX = .8;
         this.buttonStop.on("pointerup", () => {
             location.assign(webUrl);
         });
         this.txtStop = this.add.text(width/2, height/2 + 210, labels.stop, { fontFamily: "bold", fontSize: 28, color: "#000000" });
         this.txtStop.setOrigin(0.5,0.5);
 
         // green circle and countries
         this.circleGreen = this.add.image(width/2 - 70, height/2 - 220, 'circleGreen');
         this.circleGreen.scaleX = 1.3;
         this.circleGreen.scaleY = 1.3;
         this.txtCountries = this.add.text(width/2, height/2 - 220, labels.countries, { fontFamily: "extraBold", fontSize: 32, color: '#000000' });
         this.txtCountries.setOrigin(0,.5);
 
         // number of countries
         this.correctAnswers = questionsArray.length - skips;        
         this.txtNumberOfCountries = this.add.text(this.circleGreen.x, this.circleGreen.y, String(this.correctAnswers), { fontFamily: "extraBold", fontSize: 58, color: '#000000' });
         this.txtNumberOfCountries.setOrigin(.5,.5);
 
         // circle yellow and attempts
         this.circleYellow = this.add.image(width/2 - 70, height/2 - 100, 'circleYellow');
         this.circleYellow.scaleX = 1.3;
         this.circleYellow.scaleY = 1.3;
         this.txtAttemptsEnd = this.add.text(width/2, this.circleYellow.y, labels.attemptsEnd, { fontFamily: "extraBold", fontSize: 32, color: '#000000' });
         this.txtAttemptsEnd.setOrigin(0,.5);
 
         // number of attempts
         this.txtNumberOfAttempts = this.add.text(this.circleYellow.x, this.circleYellow.y, String(attempts), { fontFamily: "extraBold", fontSize: 58, color: '#000000' });
         this.txtNumberOfAttempts.setOrigin(.5,.5);
 
         // red circle and skip
         this.circleRed = this.add.image(width/2 - 70, height/2 + 25, 'circleRed');
         this.circleRed.scaleX = 1.3;
         this.circleRed.scaleY = 1.3;
         this.txtSkip = this.add.text(width/2, height/2 + 25, labels.skipped, { fontFamily: "extraBold", fontSize: 32, color: '#000000' });
         this.txtSkip.setOrigin(0,.5);

         // skips
         this.txtNumSkip = this.add.text(this.circleRed.x, this.circleRed.y, String(skips), { fontFamily: "extraBold", fontSize: 58, color: '#000000' });
         this.txtNumSkip.setOrigin(.5,.5);
        // tween objects
        tweenObj(this, this.circle, 0, 1);
        tweenObj(this, this.buttonStop, 0, 1);
        tweenObj(this, this.buttonPlayAgain, 0, 1);
        tweenObj(this, this.txtStop, 0, 1);
        tweenObj(this, this.txtPlayAgain, 0, 1);
        tweenObj(this, this.txtAttemptsEnd, 0, 1);
        tweenObj(this, this.txtSkip, 0, 1);
        tweenObj(this, this.txtNumSkip, 0, 1);
        tweenObj(this, this.txtNumberOfAttempts, 0, 1);
        tweenObj(this, this.circleGreen, 0, 1);
        tweenObj(this, this.circleYellow, 0, 1);
        tweenObj(this, this.circleRed, 0, 1);
        tweenObj(this, this.txtNumberOfCountries, 0, 1);
        tweenObj(this, this.txtCountries, 0, 1);
        tweenObj(this, this.buttonSkip, 0, 1);

        // animation config
        let sheepConfig = {
            key: "sheepAnim",
            frames: this.anims.generateFrameNumbers("sheep", { frames: [ 0,1,2,3,4,5,6,7 ] }),
            frameRate: 18,
            repeat: -1
        };
        this.anims.create(sheepConfig);

        // new sprite
        this.sheep = this.add.sprite(width + 200, height+10, 'sheep');
        this.sheep.setOrigin(0.5,1);
        this.sheep.anims.play("sheepAnim");
        // move 
        this.moveLeft();
    }

    moveRight() {
        this.sheep.scaleX = 1;

        this.tweens.add({
            targets: [this.sheep],
            callbackScope: this,
            ease: 'Linear',
            x: width + 200, 
            duration: width * 5,
            onComplete: () => {
                this.moveLeft();
            },
        });
    }
    
    moveLeft() {
        this.sheep.scaleX = -1;
        this.tweens.add({
            targets: [this.sheep],
            callbackScope: this,
            ease: 'Linear',
            x: -200, 
            duration: width * 5,
            onComplete: () => {
                this.moveRight();
            },
        });
    }

    setPositions() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;

       // question bg
       this.bgQuestion.setPosition(width/2, 45, "bgQuestion");
       this.questionText.setPosition(width/2 + 18, 45);
       this.txtIncorrect.setPosition(width/2, 95);
       this.txtScore.setPosition(width - 20, 15);
       this.txtAttempts.setPosition(width - 20, 55);
       this.buttonBack.setPosition(45, 40);
       this.buttonSkip.setPosition(width/2 + 260, 48);
       this.buttonSound.setPosition(20, height - 20);

       if (this.gameCompleted === true) {
            this.circleGreen.setPosition(width/2 - 70, height/2 - 220);
            this.txtCountries.setPosition(width/2, height/2 - 220);
            this.txtNumberOfCountries.setPosition(this.circleGreen.x, this.circleGreen.y);
            this.txtStop.setPosition(width/2, height/2 + 210);
            this.buttonStop.setPosition(width/2, height/2 + 210);
            this.txtPlayAgain.setPosition(width/2, height/2 + 125);
            this.buttonPlayAgain.setPosition(width/2, height/2 + 125);
            this.circle.setPosition(width/2, height/2);
            this.circleYellow.setPosition(width/2 - 70, height/2 - 100);
            this.txtAttemptsEnd.setPosition(width/2, this.circleYellow.y);
            this.txtNumberOfAttempts.setPosition(this.circleYellow.x, this.circleYellow.y);
            this.circleRed.setPosition(width/2 - 70, height/2 + 25);
            this.txtSkip.setPosition(width/2, height/2 + 25);
            this.txtNumSkip.setPosition(this.circleRed.x, this.circleRed.y);
            this.sheep.setPosition(this.sheep.x, height+10);
       }
    }
}
