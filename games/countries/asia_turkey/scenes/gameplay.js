"use strict"

var ui, camera, startTime, endTime, startX, startY, endX, endY;

class Gameplay extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameplay'
        })
    }

    create() {

        width = this.cameras.main.width;
        height = this.cameras.main.height;
        this.score = +0;
        this.gameStarted = false;
        this.gameCompleted = false;
        this.canTap = false;
        this.canZoom = true;

        // user interface scene
        ui = this.scene.get("userInterface");
        this.scene.launch("userInterface");
        this.scene.moveAbove("gameplay", "userInterface");
        // sounds
        this.wrongSound = this.sound.add("wrongSound");
        this.correctSound = this.sound.add("correctSound");
        this.gameOverSound = this.sound.add("gameOverSound");
       // camera
       camera = this.cameras.main;
       camera.zoom = 0.9;

        // min max zoom
        this.minZoom = 0.7;        
        if (this.sys.game.device.os.desktop) {
            this.maxZoom = 1.6;
        }
        else {
            this.maxZoom = 1.8;
        }

        // display countries in this scene
        this.displayProvinces(this);
       
        // get countries (sprites) array from the container
        this.countriesArray = this.provincesContainer.getAll();
        // for each country (sprite)
        for (let i = 0; i < this.countriesArray.length; i++) {

            let country = this.countriesArray[i];

            /* development phase
            country.setInteractive()
            this.input.setDraggable(country);
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

                gameObject.x = dragX;
                gameObject.y = dragY;
        
            });
            this.input.on('dragend', function (pointer, gameObject) {
                console.log("endX: " + (gameObject.x - width/2))
                console.log("endY: " + (gameObject.y - height/2))
            });
            */
            // make countries sprites interactive
            country.setInteractive({ 
                useHandCursor: true,             
                pixelPerfect: true,
                alphaTolerance: 255
             });

             // mouse over
            if (this.sys.game.device.os.desktop && this.gameCompleted === false) {
                // mouse over country
                country.on("pointerover", (pointer) => {
                    if (this.gameStarted === true) {
                        if (country.isSpritesheet === true) {
                            country.setFrame(1);
                        }
                        else {
                            country.setTintFill(0xFFFFFF);
                        }
                    }
                },this);

                country.on("pointerout", () => {
                    if (this.gameStarted === true) {
                        if (country.isSpritesheet === true) {
                            country.setFrame(0);
                        }
                        else {
                            country.clearTint();
                        }
                    }
                },this);
            }

            country.on('pointerdown', () => {

                // start x, y positions and current time
                startX = round(camera.scrollX, 1);
                startY = round(camera.scrollY, 1);
                startTime = round(this.time.now, 1);
            });

            country.on('pointerup', () => {

                endX = round(camera.scrollX, 1);
                endY = round(camera.scrollY, 1);
                endTime = round(this.time.now, 1);

                // click
                if (endTime - startTime < 254 && 
                    (endX + 4 >= startX && endX - 4 <= startX) &&
                    endY + 4 >= startY && endY - 4 <= startY) {
                    country.xPos = camera.x;
                    country.yPos = camera.y;

                    if (this.canTap === true && this.gameCompleted === false)
                    {
                        // increase attempts
                        attempts++;
                        ui.txtAttempts.text = labels.attempts + String(attempts);
                        // correct
                        if (ui.questionText.text === country.name || (ui.questionText.text === labels.mariElRepublic2 && country.name === countriesLabels.mariElRepublic) || (ui.questionText.text === labels.northOssetiaAlaniaRepublic2 && country.name === countriesLabels.northOssetiaAlaniaRepublic) || (ui.questionText.text === labels.chukotkaAutonomousOkrug2 && country.name === countriesLabels.chukotkaAutonomousOkrug) || (ui.questionText.text === labels.jewishAutonomousOblast2 && country.name === countriesLabels.jewishAutonomousOblast) || (ui.questionText.text === labels.nenetsAutonomousOkrug2 && country.name === countriesLabels.nenetsAutonomousOkrug) || (ui.questionText.text === labels.khantyMansiAutonomousOkrug2 && country.name === countriesLabels.khantyMansiAutonomousOkrug) || (ui.questionText.text === labels.yamaloNenetsAutonomousOkrug2 && country.name === countriesLabels.yamaloNenetsAutonomousOkrug) || (ui.questionText.text === labels.crimeaRepublicDisputedArea2 && country.name === countriesLabels.crimeaRepublicDisputedArea) || (ui.questionText.text === labels.sevastopolDisputedArea2 && country.name === countriesLabels.sevastopolDisputedArea))
                        {
                            // increase the score
                            this.score ++;
                            ui.txtScore.text = labels.score + String(this.score) + "/" + String(questionsArray.length);
                            this.correctSound.play();
                            // disable this country
                            country.disableInteractive();

                            // hide incorrect
                            if (ui.txtIncorrect.alpha === 1) {
                                tweenObj(this, ui.txtIncorrect, 1, 0);
                            }

                            // create the country label
                            this.showLabels(country);
    
                            // get new question
                            if (this.questionsArray.length > 0) {
                                this.getQuestion();
                            }
                            else {
                                this.gameOver();
                            }
                        }
                        else {
                            // wrong
                            tweenObj(this, ui.txtIncorrect, 0, 1);
                            this.wrongSound.play();
                        }
    
                        // you can tap after 600 ms again
                        this.canTap = false;
                        setTimeout(() => {
                            this.canTap = true;
                        }, 600);
                    }
                }
                // drag
                else {
                    // console.log("don't tap, drag the map");
                }
            });
        }
		
        // shuffle array defined in game.js
        shuffle(questionsArray);
        // clone questionsArray
        this.questionsArray = questionsArray.slice();

        // click anywhere to start          
        this.input.on('pointerup', () => {

            if (this.gameStarted === false)
            {
                // hide click to start text
                this.gameStarted = true;
                this.txtStart.destroy();

                // show ui
                this.tweens.add({
                    targets: [ui.bgQuestion, ui.buttonBack, ui.txtAttempts, ui.txtScore, ui.buttonSkip],
                    ease: "Linear",
                    alpha: 1,
                    duration: 600,
                 });

                setTimeout(() => {
                    this.canTap = true;
                }, 1000);

                // enable drag and pinch to zoom
                var dragScale = this.plugins.get('rexpinchplugin').add(this);
                dragScale.on('drag1', dragScale => {

                    // drag 
                    if (this.gameCompleted === false) {
                        var drag1Vector = dragScale.drag1Vector;
                        camera.scrollX -= drag1Vector.x / camera.zoom;
                        camera.scrollY -= drag1Vector.y / camera.zoom;
                    }

                }).on('pinch', dragScale => {
                    var scaleFactor = dragScale.scaleFactor;
                    
                    // camera zoom
                    if (this.canZoom === true) {
                        if (this.gameCompleted === false) {
                            camera.zoom *= scaleFactor;
                        }
                    }
                    
                }, this);

                // show the first question
                this.getQuestion();
            }
        },this);

        // mouse wheel
        if (this.sys.game.device.os.desktop) {
            var mouseWheelToUpDown = this.plugins.get('rexmousewheeltoupdownplugin').add(this);
            this.cursorKeys = mouseWheelToUpDown.createCursorKeys();
        }

        // tap on the map
        if (this.sys.game.device.os.desktop) {
            this.txtStart = this.add.text(width/2, height/2, labels.clickStart, { fontFamily: "bold", fontSize: 65, color: '#FFFFFF' });
        }
        else{
            this.txtStart = this.add.text(width/2, height/2, labels.tapStart, { fontFamily: "bold", fontSize: 65, color: '#FFFFFF' });
        }
        this.txtStart.setOrigin(0.5,0.5);

        // tween click to start text
        this.tweens.add({
            targets: [this.txtStart],
            ease: "Linear",
            alpha: 0,
            duration: 400,
            repeat: -1,
            yoyo: true,
         });

        // mouse over microstate sprite
        this.mouseOverMicro = this.add.image(0,0, 'mouseOverMicrostate');
        this.mouseOverMicro.setVisible(false);

        // resize
        const resize = () => {
            this.setPositions();
        }
        this.scale.on('resize', (gameSize, baseSize, displaySize, resolution) => {
            if (this.scene.isActive()) {
                this.cameras.resize(gameSize.width, gameSize.height);
                resize();
            }
        })
        resize();
    }

	update(){
        
        // mouse wheel zoom in/out
        if (this.sys.game.device.os.desktop && this.gameCompleted === false) {
            if (this.cursorKeys.up.isDown && this.canZoom === true) {
                camera.zoom *= 1.1;
            } else if (this.cursorKeys.down.isDown && this.canZoom === true) {
                
                camera.zoom *= 0.9;
            }
        }
        camera.setZoom(Phaser.Math.Clamp(camera.zoom, this.minZoom, this.maxZoom));
    }

    setPositions() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        this.provincesContainer.setSize(width, height);
        this.provincesContainer.x = 0;
        this.provincesContainer.y = 0; 
        if (this.txtStart != null) {
            this.txtStart.setPosition(width/2, height/2);
        }
    }

    getQuestion()
    {
        this.question = this.questionsArray[0];
        this.correctAnswer = this.questionsArray[0];
        ui.questionText.text = this.question;

        // use short labels for these regions
        if (ui.questionText.text === countriesLabels.chukotkaAutonomousOkrug) {
            ui.questionText.text = labels.chukotkaAutonomousOkrug2;
        }
        else if (ui.questionText.text === countriesLabels.jewishAutonomousOblast) {
            ui.questionText.text = labels.jewishAutonomousOblast2;
        }
        else if (ui.questionText.text === countriesLabels.nenetsAutonomousOkrug) {
            ui.questionText.text = labels.nenetsAutonomousOkrug2;
        }
        else if (ui.questionText.text === countriesLabels.khantyMansiAutonomousOkrug) {
            ui.questionText.text = labels.khantyMansiAutonomousOkrug2;
        }
        else if (ui.questionText.text === countriesLabels.yamaloNenetsAutonomousOkrug) {
            ui.questionText.text = labels.yamaloNenetsAutonomousOkrug2;
        }
        else if (ui.questionText.text === countriesLabels.crimeaRepublicDisputedArea) {
            ui.questionText.text = labels.crimeaRepublicDisputedArea2;
        }
        else if (ui.questionText.text === countriesLabels.sevastopolDisputedArea) {
            ui.questionText.text = labels.sevastopolDisputedArea2;
        }

        // small font size for these labels
        if (ui.questionText.text === countriesLabels.kabardinoBalkarRepublic || ui.questionText.text === countriesLabels.karachayCherkessRepublic || ui.questionText.text === countriesLabels.northOssetiaAlaniaRepublic) {
            ui.questionText.setFontSize(25);
        }
        else {
            ui.questionText.setFontSize(33);
        }
        
        // tween
        this.tweens.add({
           targets: [ui.questionText],
           //scaleX: '-=.2',
           //angle: 10,
           ease: 'Power1',
           alpha: 0.2,
           duration: 200,
           repeat: 1,
           yoyo: true,
        });

        // remove the previous question
        this.questionsArray.shift();
    }

    gameOver() {
        ui.bgQuestion.setFrame(1);
        ui.questionText.x -= 20;
        ui.questionText.text = "Completed!";
        this.gameCompleted = true;

        // play sound
        this.gameOverSound.play();

        // remove score, attempts and back button
        ui.buttonBack.destroy();
        ui.bgQuestion.destroy();
        ui.questionText.destroy();
        ui.txtScore.destroy();
        ui.txtAttempts.destroy();
        ui.buttonSkip.destroy();
        ui.buttonSound.destroy();

        // show animation at the end
        this.showAnimation();
    }

    showAnimation() {

        // tween camera
        if (camera.zoom > .3) {
            this.canZoom = false;
            this.tweens.add({
                targets: [camera],
                callbackScope: this,
                ease: 'Linear',
                zoom: .3,
                x: 0, 
                y: 0,
                duration: 2000,
                onComplete: () => {
                    
                    this.canZoom = true;
                    // show end screen
                    ui.endScreen();
                },
            });
        }
        else {
            // show end screen
            ui.endScreen();
        }

        this.tweens.add({
            targets: [camera],
            scrollX: 0,
            scrollY: 0,
            ease: 'Linear',
            duration: 2000,
        });
    }

    showLabels(country) {
            // label
            country.txt = this.add.text(country.x, country.y, country.name, { fontFamily: "bold", fontSize: 17, align: "center", color: '#000000' });
            country.txt.setOrigin(.5,.5);
            this.provincesContainer.add(country.txt);

            // position text
            if (country.labelX) {
                country.txt.x = country.labelX;
                country.txt.y = country.labelY;
            }

            // rectangless
            country.rect = this.add.sprite(country.txt.x, country.txt.y, "rectangle");
            country.rect.displayWidth = country.txt.width + 1;
            country.rect.displayHeight = country.txt.height;
            this.provincesContainer.add(country.rect);
            // bring to top
            this.provincesContainer.bringToTop(country.txt);
    }
    
    displayProvinces(aScene) {
        // extra
        aScene.map = aScene.add.image(width/2, height/2, 'map');
        aScene.map.alpha = .5;

        aScene.yozgat = aScene.add.image(width/2-21, height/2-43, 'texture', 'yozgat.png');
        aScene.corum = aScene.add.image(width/2-51, height/2-150, 'texture', 'corum.png');
        aScene.sinop = aScene.add.image(width/2-36, height/2-258.5, 'texture', 'sinop.png');
        aScene.kayseri = aScene.add.image(width/2+45, height/2+73, 'texture', 'kayseri.png');
        aScene.adana = aScene.add.image(width/2+17, height/2+182, 'texture', 'adana.png');
        aScene.sivas = aScene.add.image(width/2+159.5, height/2-36, 'texture', 'sivas.png');
        aScene.kahramanmaras = aScene.add.image(width/2+134, height/2+138.5, 'texture', 'kahramanmaras.png');
        aScene.tokat = aScene.add.image(width/2+95, height/2-132, 'texture', 'tokat.png');
        aScene.amasya = aScene.add.image(width/2+31, height/2-154, 'texture', 'amasya.png');
        aScene.samsun = aScene.add.image(width/2+51.5, height/2-219.5, 'texture', 'samsun.png');
        aScene.osmaniye = aScene.add.image(width/2+76, height/2+197, 'texture', 'osmaniye.png');
        aScene.hatay = aScene.add.image(width/2+72.5, height/2+292, 'texture', 'hatay.png');
        aScene.gaziantep = aScene.add.image(width/2+158, height/2+218, 'texture', 'gaziantep.png');
        aScene.ordu = aScene.add.image(width/2+167.5, height/2-163.5, 'texture', 'ordu.png');
        aScene.malatya = aScene.add.image(width/2+235, height/2+69, 'texture', 'malatya.png');
        aScene.elazig = aScene.add.image(width/2+329, height/2+42, 'texture', 'elazig.png');
        aScene.erzincan = aScene.add.image(width/2+342, height/2-42, 'texture', 'erzincan.png');
        aScene.adiyaman = aScene.add.image(width/2+247, height/2+145.5, 'texture', 'adiyaman.png');
        aScene.sanliurfa = aScene.add.image(width/2+307, height/2+192, 'texture', 'sanliurfa.png');
        aScene.kilis = aScene.add.image(width/2+147, height/2+247.5, 'texture', 'kilis.png');
        aScene.giresun = aScene.add.image(width/2+257.5, height/2-145.5, 'texture', 'giresun.png');
        aScene.gumushane = aScene.add.image(width/2+328, height/2-124.5, 'texture', 'gumushane.png');
        aScene.bayburt = aScene.add.image(width/2+391.5, height/2-118.5, 'texture', 'bayburt.png');
        aScene.trabzon = aScene.add.image(width/2+356, height/2-175, 'texture', 'trabzon.png');
        aScene.tunceli = aScene.add.image(width/2+346, height/2-5.5, 'texture', 'tunceli.png');
        aScene.bingol = aScene.add.image(width/2+431.5, height/2+13.5, 'texture', 'bingol.png');
        aScene.diyarbakir = aScene.add.image(width/2+403, height/2+104.5, 'texture', 'diyarbakir.png');
        aScene.mardin = aScene.add.image(width/2+460, height/2+187, 'texture', 'mardin.png');
        aScene.rize = aScene.add.image(width/2+442, height/2-191, 'texture', 'rize.png');
        aScene.batman = aScene.add.image(width/2+505.5, height/2+109.5, 'texture', 'batman.png');
        aScene.erzurum = aScene.add.image(width/2+493, height/2-103.5, 'texture', 'erzurum.png');
        aScene.mus = aScene.add.image(width/2+538, height/2+8.5, 'texture', 'mus.png');
        aScene.bitlis = aScene.add.image(width/2+575, height/2+58.5, 'texture', 'bitlis.png');
        aScene.siirt = aScene.add.image(width/2+567.5, height/2+118.5, 'texture', 'siirt.png');
        aScene.sirnak = aScene.add.image(width/2+599.5, height/2+164.5, 'texture', 'sirnak.png');
        aScene.hakkari = aScene.add.image(width/2+730, height/2+156.5, 'texture', 'hakkari.png');
        aScene.van = aScene.add.image(width/2+683.5, height/2+42.5, 'texture', 'van.png');
        aScene.artvin = aScene.add.image(width/2+521, height/2-207, 'texture', 'artvin.png');
        aScene.ardahan = aScene.add.image(width/2+600.5, height/2-221.5, 'texture', 'ardahan.png');
        aScene.kars = aScene.add.image(width/2+609.5, height/2-160.5, 'texture', 'kars.png');
        aScene.igdir = aScene.add.image(width/2+704, height/2-104.5, 'texture', 'igdir.png');
        aScene.agri = aScene.add.image(width/2+654, height/2-51.5, 'texture', 'agri.png');
        aScene.kirikkale = aScene.add.image(width/2-134.5, height/2-70, 'texture', 'kirikkale.png');
        aScene.kirsehir = aScene.add.image(width/2-105, height/2-12, 'texture', 'kirsehir.png');
        aScene.nevsehir = aScene.add.image(width/2-62, height/2+35, 'texture', 'nevsehir.png');
        aScene.nigde = aScene.add.image(width/2-59.5, height/2+139.5, 'texture', 'nigde.png');
        aScene.mersin = aScene.add.image(width/2-130, height/2+257.5, 'texture', 'mersin.png');
        aScene.ankara = aScene.add.image(width/2-244.5, height/2-54, 'texture', 'ankara.png');
        aScene.konya = aScene.add.image(width/2-211, height/2+123, 'texture', 'konya.png');
        aScene.karaman = aScene.add.image(width/2-181.5, height/2+226.5, 'texture', 'karaman.png');
        aScene.aksaray = aScene.add.image(width/2-130, height/2+72, 'texture', 'aksaray.png');
        aScene.cankiri = aScene.add.image(width/2-161, height/2-155, 'texture', 'cankiri.png');
        aScene.karabuk = aScene.add.image(width/2-217.5, height/2-214.5, 'texture', 'karabuk.png');
        aScene.kastamonu = aScene.add.image(width/2-131, height/2-236, 'texture', 'kastamonu.png');
        aScene.bartin = aScene.add.image(width/2-228, height/2-255, 'texture', 'bartin.png');
        aScene.bolu = aScene.add.image(width/2-306, height/2-154, 'texture', 'bolu.png');
        aScene.zonguldak = aScene.add.image(width/2-283.5, height/2-226, 'texture', 'zonguldak.png');
        aScene.duzce = aScene.add.image(width/2-325, height/2-184, 'texture', 'duzce.png');
        aScene.sakarya = aScene.add.image(width/2-391.5, height/2-174, 'texture', 'sakarya.png');
        aScene.kocaeli = aScene.add.image(width/2-439, height/2-191.5, 'texture', 'kocaeli.png');
        aScene.istanbul = aScene.add.image(width/2-511.5, height/2-233, 'texture', 'istanbul.png');
        aScene.tekirdag = aScene.add.image(width/2-630.5, height/2-227.5, 'texture', 'tekirdag.png');
        aScene.kirklareli = aScene.add.image(width/2-620.5, height/2-291, 'texture', 'kirklareli.png');
        aScene.edirne = aScene.add.image(width/2-701.5, height/2-258, 'texture', 'edirne.png');
        aScene.antalya = aScene.add.image(width/2-380, height/2+249.5, 'texture', 'antalya.png');
        aScene.isparta = aScene.add.image(width/2-379, height/2+124, 'texture', 'isparta.png');
        aScene.afyonkarahisar = aScene.add.image(width/2-389.5, height/2+58.5, 'texture', 'afyonkarahisar.png');
        aScene.bilecik = aScene.add.image(width/2-419.5, height/2-107.5, 'texture', 'bilecik.png');
        aScene.eskisehir = aScene.add.image(width/2-353, height/2-53.5, 'texture', 'eskisehir.png');
        aScene.burdur = aScene.add.image(width/2-443.5, height/2+177, 'texture', 'burdur.png');
        aScene.yalova = aScene.add.image(width/2-497, height/2-167.5, 'texture', 'yalova.png');
        aScene.bursa = aScene.add.image(width/2-511, height/2-113.5, 'texture', 'bursa.png');
        aScene.kutahya = aScene.add.image(width/2-478.5, height/2-31, 'texture', 'kutahya.png');
        aScene.usak = aScene.add.image(width/2-497.5, height/2+48, 'texture', 'usak.png');
        aScene.denizli = aScene.add.image(width/2-507.5, height/2+141.5, 'texture', 'denizli.png');
        aScene.balikesir = aScene.add.image(width/2-617.5, height/2-100, 'texture', 'balikesir.png');
        aScene.canakkale = aScene.add.image(width/2-708.5, height/2-135.5, 'texture', 'canakkale.png');
        aScene.manisa = aScene.add.image(width/2-601.5, height/2+20, 'texture', 'manisa.png');
        aScene.izmir = aScene.add.image(width/2-664.5, height/2+25.5, 'texture', 'izmir.png');
        aScene.aydin = aScene.add.image(width/2-622.5, height/2+123, 'texture', 'aydin.png');
        aScene.mugla = aScene.add.image(width/2-582, height/2+210.5, 'texture', 'mugla.png');
        // positions
        aScene.agri.labelX = aScene.agri.x;
        aScene.agri.labelY = aScene.agri.y - 20;
        aScene.artvin.labelX = aScene.artvin.x;
        aScene.artvin.labelY = aScene.artvin.y - 20;
        aScene.erzincan.labelX = aScene.erzincan.x - 20;
        aScene.erzincan.labelY = aScene.erzincan.y - 15;
        aScene.elazig.labelX = aScene.elazig.x;
        aScene.elazig.labelY = aScene.elazig.y + 20;
        aScene.giresun.labelX = aScene.giresun.x;
        aScene.giresun.labelY = aScene.giresun.y - 20;
        aScene.gumushane.labelX = aScene.gumushane.x - 5;
        aScene.gumushane.labelY = aScene.gumushane.y - 20;
        aScene.malatya.labelX = aScene.malatya.x - 25;
        aScene.malatya.labelY = aScene.malatya.y;
        aScene.kilis.labelX = aScene.kilis.x - 5;
        aScene.kilis.labelY = aScene.kilis.y + 10;
        aScene.adana.labelX = aScene.adana.x - 10;
        aScene.adana.labelY = aScene.adana.y;
        aScene.ordu.labelX = aScene.ordu.x + 10;
        aScene.ordu.labelY = aScene.ordu.y - 5;
        aScene.tokat.labelX = aScene.tokat.x + 5;
        aScene.tokat.labelY = aScene.tokat.y + 5;
        aScene.aksaray.labelX = aScene.aksaray.x;
        aScene.aksaray.labelY = aScene.aksaray.y + 10;
        aScene.karaman.labelX = aScene.karaman.x + 10;
        aScene.karaman.labelY = aScene.karaman.y - 15;
        aScene.zonguldak.labelX = aScene.zonguldak.x - 15;
        aScene.zonguldak.labelY = aScene.zonguldak.y;
        aScene.bartin.labelX = aScene.bartin.x;
        aScene.bartin.labelY = aScene.bartin.y - 10;
        aScene.duzce.labelX = aScene.duzce.x - 5;
        aScene.duzce.labelY = aScene.duzce.y - 5;
        aScene.bolu.labelX = aScene.bolu.x + 10;
        aScene.bolu.labelY = aScene.bolu.y;
        aScene.sakarya.labelX = aScene.sakarya.x + 5;
        aScene.sakarya.labelY = aScene.sakarya.y + 5;
        aScene.bilecik.labelY = aScene.bilecik.y - 10;
        aScene.bilecik.labelX = aScene.bilecik.x;
        aScene.izmir.labelY = aScene.izmir.y + 15;
        aScene.izmir.labelX = aScene.izmir.x - 40;
        aScene.antalya.labelY = aScene.antalya.y - 25;
        aScene.antalya.labelX = aScene.antalya.x;
        aScene.denizli.labelY = aScene.denizli.y - 10;
        aScene.denizli.labelX = aScene.denizli.x - 5;
        aScene.burdur.labelY = aScene.burdur.y - 10;
        aScene.burdur.labelX = aScene.burdur.x;
        aScene.ankara.labelY = aScene.ankara.y - 20;
        aScene.ankara.labelX = aScene.ankara.x + 20;
        aScene.afyonkarahisar.labelY = aScene.afyonkarahisar.y - 10;
        aScene.afyonkarahisar.labelX = aScene.afyonkarahisar.x;
        aScene.yalova.labelY = aScene.yalova.y - 5;
        aScene.yalova.labelX = aScene.yalova.x - 5;
        aScene.amasya.labelY = aScene.amasya.y - 5;
        aScene.amasya.labelX = aScene.amasya.x + 10;
        aScene.balikesir.labelY = aScene.balikesir.y + 30;
        aScene.balikesir.labelX = aScene.balikesir.x + 10;

        // names
        aScene.yozgat.name = countriesLabels.yozgat;
        aScene.corum.name = countriesLabels.corum;
        aScene.sinop.name = countriesLabels.sinop;
        aScene.kayseri.name = countriesLabels.kayseri;
        aScene.adana.name = countriesLabels.adana;
        aScene.sivas.name = countriesLabels.sivas;
        aScene.kahramanmaras.name = countriesLabels.kahramanmaras;
        aScene.tokat.name = countriesLabels.tokat;
        aScene.amasya.name = countriesLabels.amasya;
        aScene.samsun.name = countriesLabels.samsun;
        aScene.osmaniye.name = countriesLabels.osmaniye;
        aScene.hatay.name = countriesLabels.hatay;
        aScene.gaziantep.name = countriesLabels.gaziantep;
        aScene.ordu.name = countriesLabels.ordu;
        aScene.malatya.name = countriesLabels.malatya;
        aScene.elazig.name = countriesLabels.elazig;
        aScene.erzincan.name = countriesLabels.erzincan;
        aScene.adiyaman.name = countriesLabels.adiyaman;
        aScene.sanliurfa.name = countriesLabels.sanliurfa;
        aScene.kilis.name = countriesLabels.kilis;
        aScene.giresun.name = countriesLabels.giresun;
        aScene.gumushane.name = countriesLabels.gumushane;
        aScene.bayburt.name = countriesLabels.bayburt;
        aScene.trabzon.name = countriesLabels.trabzon;
        aScene.tunceli.name = countriesLabels.tunceli;
        aScene.bingol.name = countriesLabels.bingol;
        aScene.diyarbakir.name = countriesLabels.diyarbakir;
        aScene.mardin.name = countriesLabels.mardin;
        aScene.rize.name = countriesLabels.rize;
        aScene.batman.name = countriesLabels.batman;
        aScene.erzurum.name = countriesLabels.erzurum;
        aScene.mus.name = countriesLabels.mus;
        aScene.bitlis.name = countriesLabels.bitlis;
        aScene.siirt.name = countriesLabels.siirt;
        aScene.sirnak.name = countriesLabels.sirnak;
        aScene.hakkari.name = countriesLabels.hakkari;
        aScene.van.name = countriesLabels.van;
        aScene.artvin.name = countriesLabels.artvin;
        aScene.ardahan.name = countriesLabels.ardahan;
        aScene.kars.name = countriesLabels.kars;
        aScene.igdir.name = countriesLabels.igdir;
        aScene.agri.name = countriesLabels.agri;
        aScene.kirikkale.name = countriesLabels.kirikkale;
        aScene.kirsehir.name = countriesLabels.kirsehir;
        aScene.nevsehir.name = countriesLabels.nevsehir;
        aScene.nigde.name = countriesLabels.nigde;
        aScene.mersin.name = countriesLabels.mersin;
        aScene.ankara.name = countriesLabels.ankara;
        aScene.konya.name = countriesLabels.konya;
        aScene.karaman.name = countriesLabels.karaman;
        aScene.aksaray.name = countriesLabels.aksaray;
        aScene.cankiri.name = countriesLabels.cankiri;
        aScene.karabuk.name = countriesLabels.karabuk;
        aScene.kastamonu.name = countriesLabels.kastamonu;
        aScene.bartin.name = countriesLabels.bartin;
        aScene.bolu.name = countriesLabels.bolu;
        aScene.zonguldak.name = countriesLabels.zonguldak;
        aScene.duzce.name = countriesLabels.duzce;
        aScene.sakarya.name = countriesLabels.sakarya;
        aScene.kocaeli.name = countriesLabels.kocaeli;
        aScene.istanbul.name = countriesLabels.istanbul;
        aScene.tekirdag.name = countriesLabels.tekirdag;
        aScene.kirklareli.name = countriesLabels.kirklareli;
        aScene.edirne.name = countriesLabels.edirne;
        aScene.antalya.name = countriesLabels.antalya;
        aScene.isparta.name = countriesLabels.isparta;
        aScene.afyonkarahisar.name = countriesLabels.afyonkarahisar;
        aScene.bilecik.name = countriesLabels.bilecik;
        aScene.eskisehir.name = countriesLabels.eskisehir;
        aScene.burdur.name = countriesLabels.burdur;
        aScene.yalova.name = countriesLabels.yalova;
        aScene.bursa.name = countriesLabels.bursa;
        aScene.kutahya.name = countriesLabels.kutahya;
        aScene.usak.name = countriesLabels.usak;
        aScene.denizli.name = countriesLabels.denizli;
        aScene.balikesir.name = countriesLabels.balikesir;
        aScene.canakkale.name = countriesLabels.canakkale;
        aScene.manisa.name = countriesLabels.manisa;
        aScene.izmir.name = countriesLabels.izmir;
        aScene.aydin.name = countriesLabels.aydin;
        aScene.mugla.name = countriesLabels.mugla;

        // add sprites to the container
        aScene.provincesContainer = aScene.add.container(0, 0, [aScene.eskisehir, aScene.yozgat, aScene.corum, aScene.sinop, aScene.kayseri, aScene.adana, aScene.sivas, aScene.kahramanmaras, aScene.tokat, aScene.amasya, aScene.samsun, aScene.osmaniye, aScene.hatay, aScene.gaziantep, aScene.ordu, aScene.malatya, aScene.elazig, aScene.erzincan, aScene.adiyaman, aScene.sanliurfa, aScene.kilis, aScene.giresun, aScene.gumushane, aScene.bayburt, aScene.trabzon, aScene.tunceli, aScene.bingol, aScene.diyarbakir, aScene.mardin, aScene.rize, aScene.batman, aScene.erzurum, aScene.mus, aScene.bitlis, aScene.siirt, aScene.sirnak, aScene.hakkari, aScene.van, aScene.artvin, aScene.ardahan, aScene.kars, aScene.igdir, aScene.agri, aScene.kirikkale, aScene.kirsehir, aScene.nevsehir, aScene.nigde, aScene.mersin, aScene.ankara, aScene.konya, aScene.karaman, aScene.aksaray, aScene.cankiri, aScene.karabuk, aScene.kastamonu, aScene.bartin, aScene.bolu, aScene.zonguldak, aScene.duzce, aScene.sakarya, aScene.kocaeli, aScene.istanbul, aScene.tekirdag, aScene.kirklareli, aScene.edirne, aScene.antalya, aScene.isparta, aScene.afyonkarahisar, aScene.bilecik, aScene.burdur, aScene.yalova, aScene.bursa, aScene.kutahya, aScene.usak, aScene.denizli, aScene.balikesir, aScene.canakkale, aScene.manisa, aScene.izmir, aScene.aydin, aScene.mugla]);

        aScene.provincesContainer.setSize(width, height);
        aScene.provincesContainer.x = 0;
        aScene.provincesContainer.y = 0;     
     }
}
