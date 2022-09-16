"use strict"

var selectTxtPos;

class Options extends Phaser.Scene {
    constructor() {
        super({
            key: "options"
        })
    }

    create() {

        width = this.cameras.main.width;
        height = this.cameras.main.height;
        // x position of 'select' text
        selectTxtPos = width/2 + 520;
        // game started
        this.gamestarted = false;
        // arrays contain countries names and toggle buttons
        this.textArray = [];
        this.toggleButtonsArray = [];
        // regions aren't visible at the beginning
        this.region1Visible = false;
        this.region2Visible = false;
        this.region3Visible = false;
        this.region4Visible = false;
        this.region5Visible = false;
        this.region6Visible = false;
        this.region7Visible = false;
        // map
        this.bg = this.add.image(width/2, height/2, 'map');
        this.bg.scaleX = .4;
        this.bg.scaleY = .4;
        // white background
        this.bgWhite = this.add.image(width/2, height/2, 'bgWhite');
        this.bgWhite.setOrigin(.5,.5);
        this.bgWhite.displayWidth = 1100;
        this.bgWhite.displayHeight = height;
        // text options
        this.txtOptions = this.add.text((width/2 + 550) - 30, 25, labels.options, { fontFamily: "extraBold", fontSize: 50, color: '#009999' });
        this.txtOptions.setOrigin(1,0);
        // options img
        this.optionsIcon = this.add.image((width/2 + 550) - (40 + this.txtOptions.width), 12, 'buttonOptions');
        this.optionsIcon.scaleX = .9;
        this.optionsIcon.scaleY = .9;
        this.optionsIcon.setOrigin(1,0);
       // button back
       this.buttonBack = this.add.image((width/2 - 505), 50, "buttonBackBlack").setInteractive({ useHandCursor: true });
       this.buttonBack.on("pointerup", () => {
           this.goBack();
       }, this);
       // text back
       this.txtBack = this.add.text((width/2 - 485), 20, labels.back, { fontFamily: "bold", fontSize: 38, color: '#000000' }).setInteractive({ useHandCursor: true });
       this.txtBack.on("pointerup", () => {
           this.goBack();
       }, this);

       // text select at least 5 countries
       this.txtSelectAtleast = this.add.text(width/2 - 70, 20, labels.selectAtleast, { fontFamily: "bold", fontSize: 32, color: '#FF0000' });
       this.txtSelectAtleast.setOrigin(.5,0)
       this.txtSelectAtleast.setVisible(false);

       // regions group
       this.regionsGroup = this.add.group();

        // select text fields
        this.txtSelect1 = this.add.text(selectTxtPos, 415, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect1));
        // y pos is needed for scrolling
        this.txtSelect1.yPos = this.txtSelect1.y;
        this.txtSelect1.setOrigin(1,0.5);
        this.underline1 = this.regionsGroup.create(this.txtSelect1.x, 430, 'underline');
        this.underline1.displayWidth = this.txtSelect1.width;
        // y pos is needed for scrolling
        this.underline1.yPos = this.underline1.y;
        this.underline1.setOrigin(1,0.5);
    
        this.txtSelect2 = this.add.text(selectTxtPos, 485, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect2));
        this.txtSelect2.setOrigin(1,0.5);
        this.underline2 = this.regionsGroup.create(this.txtSelect2.x, 500, 'underline');
        this.underline2.displayWidth = this.txtSelect2.width;
        this.underline2.setOrigin(1,0.5);
        this.txtSelect2.yPos = this.txtSelect2.y;
        this.underline2.yPos = this.underline2.y;

        this.txtSelect3 = this.add.text(selectTxtPos, 555, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect3));
        this.txtSelect3.setOrigin(1,0.5);
        this.txtSelect2.setOrigin(1,0.5);
        this.underline3 = this.regionsGroup.create(this.txtSelect3.x, 570, 'underline');
        this.underline3.displayWidth = this.txtSelect3.width;
        this.underline3.setOrigin(1,0.5);
        this.txtSelect3.yPos = this.txtSelect3.y;
        this.underline3.yPos = this.underline3.y;

        this.txtSelect4 = this.add.text(selectTxtPos, 625, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect4));
        this.txtSelect4.setOrigin(1,0.5);
        this.underline4 = this.regionsGroup.create(this.txtSelect4.x, 640, 'underline');
        this.underline4.displayWidth = this.txtSelect4.width;
        this.underline4.setOrigin(1,0.5);
        this.txtSelect4.yPos = this.txtSelect4.y;
        this.underline4.yPos = this.underline4.y;
        // select region 5
        this.txtSelect5 = this.add.text(selectTxtPos, 695, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect5));
        this.txtSelect5.setOrigin(1,0.5);
        this.underline5 = this.regionsGroup.create(this.txtSelect5.x, 710, 'underline');
        this.underline5.displayWidth = this.txtSelect5.width;
        this.underline5.setOrigin(1,0.5);
        this.txtSelect5.yPos = this.txtSelect5.y;
        this.underline5.yPos = this.underline5.y;
        // select region 6
        this.txtSelect6 = this.add.text(selectTxtPos, 765, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect6));
        this.txtSelect6.setOrigin(1,0.5);
        this.underline6 = this.regionsGroup.create(this.txtSelect5.x, 780, 'underline');
        this.underline6.displayWidth = this.txtSelect6.width;
        this.underline6.setOrigin(1,0.5);
        this.txtSelect6.yPos = this.txtSelect6.y;
        this.underline6.yPos = this.underline6.y;
        // select region 7
        this.txtSelect7 = this.add.text(selectTxtPos, 835, labels.select, { fontFamily: "semiBold", fontSize: 30, color: '#000000' }).setInteractive({ useHandCursor: true }).on("pointerdown", () => this.selectCountries(this.txtSelect7));
        this.txtSelect7.setOrigin(1,0.5);
        this.underline7 = this.regionsGroup.create(this.txtSelect7.x, 850, 'underline');
        this.underline7.displayWidth = this.txtSelect7.width;
        this.underline7.setOrigin(1,0.5);
        this.txtSelect7.yPos = this.txtSelect7.y;
        this.underline7.yPos = this.underline7.y;

        // add select text and underlines to the grouup
        this.regionsGroup.add(this.txtSelect1);
        this.regionsGroup.add(this.txtSelect2);
        this.regionsGroup.add(this.txtSelect3);
        this.regionsGroup.add(this.txtSelect4);
        this.regionsGroup.add(this.txtSelect5);
        this.regionsGroup.add(this.txtSelect6);
        this.regionsGroup.add(this.txtSelect7);

        // text sound
        this.txtSound = this.add.text(width/2 - 400, 140, labels.sound, { fontFamily: "bold", fontSize: 36, color: '#009999' });
        this.regionsGroup.add(this.txtSound);
        // toggle sound
        this.buttonSound = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width, 165, 'buttonToggle').setInteractive({ useHandCursor: true});
        this.buttonSound.setFrame(soundButtonFrame);
        
        this.buttonSound.on('pointerup', () => {
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

        // number of countries
        this.txtNumberOfCountries = this.add.text(width/2 - 400, 225, labels.numOfCountries.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 36, color: '#009999' });
        this.numOfCountries = this.add.text(selectTxtPos - this.txtSelect1.width, 220, String(questionsArray.length), { fontFamily: "bold", fontSize: 40, color: '#000000' });
        this.numOfCountries.setOrigin(.5,0);
        // add these to regions group
        this.regionsGroup.add(this.txtNumberOfCountries);
        this.regionsGroup.add(this.numOfCountries);
        // text countries
        this.txtCountries = this.add.text(width/2 - 400, 320, labels.countries.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 36, color: '#009999' });
        this.regionsGroup.add(this.txtCountries);

        // regions text
        this.txtRegion1 = this.add.text(width/2 - 400, 390, labels.region1, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        this.txtRegion2 = this.add.text(width/2 - 400, 460, labels.region2, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        this.txtRegion3 = this.add.text(width/2 - 400, 530, labels.region3, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        this.txtRegion4 = this.add.text(width/2 - 400, 600, labels.region4, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        this.txtRegion5 = this.add.text(width/2 - 400, 670, labels.region5, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        this.txtRegion6 = this.add.text(width/2 - 400, 740, labels.region6, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        this.txtRegion7 = this.add.text(width/2 - 400, 810, labels.region7, { fontFamily: "semiBold", fontSize: 34, color: '#000000' });
        // y pos is needed for scrolling
        this.txtRegion1.yPos = this.txtRegion1.y;
        this.txtRegion2.yPos = this.txtRegion2.y;
        this.txtRegion3.yPos = this.txtRegion3.y;
        this.txtRegion4.yPos = this.txtRegion4.y;
        this.txtRegion5.yPos = this.txtRegion5.y;
        this.txtRegion6.yPos = this.txtRegion6.y;
        this.txtRegion7.yPos = this.txtRegion7.y;
        // add regions text to the group
        this.regionsGroup.add(this.txtRegion1);
        this.regionsGroup.add(this.txtRegion2);
        this.regionsGroup.add(this.txtRegion3);
        this.regionsGroup.add(this.txtRegion4);
        this.regionsGroup.add(this.txtRegion5);
        this.regionsGroup.add(this.txtRegion6);
        this.regionsGroup.add(this.txtRegion7);

        // regions toggle buttons...
        
        // button region 1
        this.buttonRegion1 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 415, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion1));
        this.buttonRegion1.setFrame(btnRegion1Frame);
        this.buttonRegion1.currentFrame = btnRegion1Frame;
        // button region 2
        this.buttonRegion2 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 485, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion2));
        this.buttonRegion2.setFrame(btnRegion2Frame);
        this.buttonRegion2.currentFrame = btnRegion2Frame;
        // button region 3
        this.buttonRegion3 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 555, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion3));
        this.buttonRegion3.setFrame(btnRegion3Frame);
        this.buttonRegion3.currentFrame = btnRegion3Frame;
        // button region 3
        this.buttonRegion4 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 625, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion4));
        this.buttonRegion4.setFrame(btnRegion4Frame);
        this.buttonRegion4.currentFrame = btnRegion4Frame;
        // button region 5
        this.buttonRegion5 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 695, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion5));
        this.buttonRegion5.setFrame(btnRegion5Frame);
        this.buttonRegion5.currentFrame = btnRegion5Frame;
        // button region 6
        this.buttonRegion6 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 765, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion6));
        this.buttonRegion6.setFrame(btnRegion6Frame);
        this.buttonRegion6.currentFrame = btnRegion6Frame;
        // button region 7
        this.buttonRegion7 = this.regionsGroup.create(selectTxtPos - this.txtSelect1.width - 65, 835, 'buttonToggle').setInteractive({ useHandCursor: true}).on("pointerdown", () => this.toggleRegions(this.buttonRegion7));
        this.buttonRegion7.setFrame(btnRegion5Frame);
        this.buttonRegion7.currentFrame = btnRegion7Frame;

        // y pos is needed for scrolling
        this.buttonRegion1.yPos = this.buttonRegion1.y;
        this.buttonRegion2.yPos = this.buttonRegion2.y;
        this.buttonRegion3.yPos = this.buttonRegion3.y;
        this.buttonRegion4.yPos = this.buttonRegion4.y;
        this.buttonRegion5.yPos = this.buttonRegion5.y;
        this.buttonRegion6.yPos = this.buttonRegion6.y;
        this.buttonRegion7.yPos = this.buttonRegion7.y;

        // use delay to avoid lag when "options" button is clicked
       let timer = this.time.delayedCall(300, () => {
        this.gamestarted = true;
        // different regions ...
        // region 1 group
        this.region1Group = this.add.group();
        this.txtGroup1 = this.add.text(this.txtSound.x, 110, labels.region1.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
        this.region1Group.add(this.txtGroup1);
        // make new array and sort items alphabetically
        this.region1Array = region1Array.slice();
        this.region1Array.sort(Intl.Collator(collator).compare);
        this.yPos = 175;
        this.region1Array.forEach(function (country) {
            // write text
            this.writeText(this.txtSound.x, this.yPos, country, this.region1Group);
            // get index
            let index = questionsArrayStatic.indexOf(country);
            // create a button for each country
            this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region1Group);
            this.yPos += 60;
        }, this);
        // the group is invisible by default
        this.region1Group.toggleVisible();

        // region 2 group
        this.region2Group = this.add.group();
        this.txtGroup2 = this.add.text(this.txtSound.x, 110, labels.region2.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
        this.region2Group.add(this.txtGroup2);

        // make new array and sort items alphabetically
        this.region2Array = region2Array.slice();
        this.region2Array.sort(Intl.Collator(collator).compare);

        this.yPos = 175;
        this.region2Array.forEach(function (country) {

            // write text
            this.writeText(this.txtSound.x, this.yPos, country, this.region2Group);
            // get index
            let index = questionsArrayStatic.indexOf(country);
            // create a button for each country
            this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region2Group);

            this.yPos += 60;
        }, this);
        // the group is invisible by default
        this.region2Group.toggleVisible();

       // region 3 group
       this.region3Group = this.add.group();
        
       this.txtGroup3 = this.add.text(this.txtSound.x, 110, labels.region3.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
       this.region3Group.add(this.txtGroup3);

       // make new array and sort items alphabetically
       this.region3Array = region3Array.slice();
       this.region3Array.sort(Intl.Collator(collator).compare);

       this.yPos = 175;
       this.region3Array.forEach(function (country) {

           // write text
           this.writeText(this.txtSound.x, this.yPos, country, this.region3Group);
           // get index
           let index = questionsArrayStatic.indexOf(country);
           // create a button for each country
           this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region3Group);

           this.yPos += 60;
       }, this);
       // the group is invisible by default
       this.region3Group.toggleVisible();

       // region 4 group
       this.region4Group = this.add.group();
        
       this.txtGroup4 = this.add.text(this.txtSound.x, 110, labels.region4.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
       this.region4Group.add(this.txtGroup4);

       // make new array and sort items alphabetically
       this.region4Array = region4Array.slice();
       this.region4Array.sort(Intl.Collator(collator).compare);

       this.yPos = 175;
       this.region4Array.forEach(function (country) {

           // write text
           this.writeText(this.txtSound.x, this.yPos, country, this.region4Group);
           // get index
           let index = questionsArrayStatic.indexOf(country);
           // create a button for each country
           this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region4Group);

           this.yPos += 60;
       }, this);
       // the group is invisible by default
       this.region4Group.toggleVisible();

       // region 5 group
       this.region5Group = this.add.group();
       this.txtGroup5 = this.add.text(this.txtSound.x, 110, labels.region5.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
       this.region5Group.add(this.txtGroup5);
       // make new array and sort items alphabetically
       this.region5Array = region5Array.slice();
       this.region5Array.sort(Intl.Collator(collator).compare);

       this.yPos = 175;
       this.region5Array.forEach(function (country) {
           // write text
           this.writeText(this.txtSound.x, this.yPos, country, this.region5Group);
           // get index
           let index = questionsArrayStatic.indexOf(country);
           // create a button for each country
           this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region5Group);

           this.yPos += 60;
       }, this);
       // the group is invisible by default
       this.region5Group.toggleVisible();

        // region 6 group
        this.region6Group = this.add.group();
        this.txtGroup6 = this.add.text(this.txtSound.x, 110, labels.region6.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
        this.region6Group.add(this.txtGroup6);
        // make new array and sort items alphabetically
        this.region6Array = region6Array.slice();
        this.region6Array.sort(Intl.Collator(collator).compare);

        this.yPos = 175;
        this.region6Array.forEach(function (country) {
            // write text
            this.writeText(this.txtSound.x, this.yPos, country, this.region6Group);
            // get index
            let index = questionsArrayStatic.indexOf(country);
            // create a button for each country
            this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region6Group);
            this.yPos += 60;
        }, this);
        // the group is invisible by default
        this.region6Group.toggleVisible();

        // region 7 group
        this.region7Group = this.add.group();
        this.txtGroup7 = this.add.text(this.txtSound.x, 110, labels.region7.toLocaleUpperCase(), { fontFamily: "bold", fontSize: 32, color: '#009999' });
        this.region7Group.add(this.txtGroup7);
        // make new array and sort items alphabetically
        this.region7Array = region7Array.slice();
        this.region7Array.sort(Intl.Collator(collator).compare);
        this.yPos = 175;
        this.region7Array.forEach(function (country) {
            // write text
            this.writeText(this.txtSound.x, this.yPos, country, this.region7Group);
            // get index
            let index = questionsArrayStatic.indexOf(country);
            // create a button for each country
            this.addButton(this.buttonSound.x, this.yPos + 17, index, this.region7Group);
            this.yPos += 60;
        }, this);
        // the group is invisible by default
        this.region7Group.toggleVisible();

        // mouse wheel plugin
        if (this.sys.game.device.os.desktop) {
            var mouseWheelToUpDown = this.plugins.get('rexmousewheeltoupdownplugin').add(this);
            
            this.cursorKeys = mouseWheelToUpDown.createCursorKeys();
        }

        // scroller plugin
        let topBound = -630;
        let bottomBound = 0;

        this.scroller = this.plugins.get('rexscrollerplugin').add(this.bgWhite, {
            bounds: [
                bottomBound,
                topBound
            ],
            value: 0,   // start value

            slidingDeceleration: 4000,
            backDeceleration: 4000,
            enable: true,
            orientation: 'vertical',

            valuechangeCallback: (newValue) => {

                // scroll all regions and select buttons
                if (regionsVisible) {
                    this.regionsGroup.getChildren().forEach((txt) => {
                        this.swipeScrolling(txt, newValue);
                    });
                }

                // scroll region 5
                if (this.region5Visible === true) {
                    this.region5Group.getChildren().forEach((txt) => {
                        this.swipeScrolling(txt, newValue);
                    });
                }
                // scroll region 3
                else if (this.region3Visible === true) {
                    this.region3Group.getChildren().forEach((txt) => {
                        this.swipeScrolling(txt, newValue);
                    });
                }
                // scroll region 4
                else if (this.region4Visible === true) {
                    this.region4Group.getChildren().forEach((txt) => {
                        this.swipeScrolling(txt, newValue);
                    });
                }
                // scroll region 6
                else if (this.region6Visible === true) {
                    this.region6Group.getChildren().forEach((txt) => {
                        this.swipeScrolling(txt, newValue);
                    });
                }
                // scroll region 2
                else if (this.region2Visible === true) {
                    this.region2Group.getChildren().forEach((txt) => {
                        this.swipeScrolling(txt, newValue);
                    });
                }
            }
        });
       }, this);

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

    update(){
        
        // mouse wheel scrolling
        if (this.sys.game.device.os.desktop && this.gamestarted === true) {
            // scroll up
            if (this.cursorKeys.down.isDown === true) {
                // scroll all regions and select buttons
                if (regionsVisible) {
                    this.regionsGroup.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "up");
                    });
                }

                if (this.region5Visible === true) {
                    this.region5Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "up");
                    });
                }
                else if (this.region4Visible === true) {
                    this.region4Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "up");
                    });
                }
                else if (this.region3Visible === true) {
                    this.region3Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "up");
                    });
                }
                else if (this.region6Visible === true) {
                    this.region6Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "up");
                    });
                }
            } // scroll down

            else if (this.cursorKeys.up.isDown === true) {
                // scroll all regions and select buttons
                if (regionsVisible) {
                    this.regionsGroup.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "down");
                    });
                }

                if (this.region5Visible === true) {
                    this.region5Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "down");
                    });
                }
                else if (this.region4Visible === true) {
                    this.region4Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "down");
                    });
                }
                else if (this.region3Visible === true) {
                    this.region3Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "down");
                    });
                }
                else if (this.region6Visible === true) {
                    this.region6Group.getChildren().forEach((txt) => {
                        this.mouseWheelScrolling(txt, "down");
                    });
                }
            }
        }
    }

    swipeScrolling (txtField, scrollValue) {

        // when scrolling all regions, select txt
        if (regionsVisible) {

            if (txtField.yPos != null) {
                txtField.y = scrollValue + txtField.yPos;
                if (txtField.y < 350) {
                    txtField.setVisible(false);
                }
                else {
                    txtField.setVisible(true);
                }
            }
        }
        else {  // scrolling one region only

            if (txtField.yPos != null) {
                txtField.y = scrollValue + txtField.yPos;
                if (txtField.y < 145) {
                    txtField.setVisible(false);
                }
                else {
                    txtField.setVisible(true);
                }
            }
        }
    }

    mouseWheelScrolling(txt, direction) {

        // when scrolling all regions, select txt
        if (regionsVisible) {
            if (direction === "down") {
                if (txt.yPos != null && txt.y < txt.yPos) {
                    txt.y += 40;
                    if (txt.y < 350) {
                        txt.setVisible(false);
                    }
                    else {
                        txt.setVisible(true);
                    }
                }
                else if (txt.y > txt.yPos) {
                    txt.y = txt.yPos;
                }
            }
            else {
                if (txt.yPos != null && txt.y > (txt.yPos - 630)) {
                    txt.y -= 40;
                    if (txt.y < 350) {
                        txt.setVisible(false);
                    }
                    else {
                        txt.setVisible(true);
                    }
                }
            }
        }
        else {
            if (direction === "down") {
                if (txt.yPos != null && txt.y < txt.yPos) {
                    txt.y += 40;
                    if (txt.y < 150) {
                        txt.setVisible(false);
                    }
                    else {
                        txt.setVisible(true);
                    }
                }
                else if (txt.y > txt.yPos) {
                    txt.y = txt.yPos;
                }
            }
            else {
                if (txt.yPos != null && txt.y > (txt.yPos - 630)) {
                    txt.y -= 40;
                    if (txt.y < 150) {
                        txt.setVisible(false);
                    }
                    else {
                        txt.setVisible(true);
                    }
                }
            }
        }
    }

    writeText(xPos, yPos, thisText, group) {
        let countryText = this.add.text(xPos, yPos, thisText, { fontFamily: "bold", fontSize: 27, color: '#000000' });
        countryText.xPos = xPos;
        countryText.yPos = yPos;
        countryText.isText = true;
        group.add(countryText);
        this.textArray.push(countryText);
    }

    addButton(xPos, yPos, number, btnGroup) {
        let toggleBtn = this.add.sprite(xPos, yPos, 'buttonToggle').setInteractive({ useHandCursor: true });
        // save ypos needed for scrolling
        toggleBtn.xPos = xPos;
        toggleBtn.yPos = yPos;
        toggleBtn.isButton = true;
        
        toggleBtn.on("pointerup", () => {
            
            this.toggleCountries(toggleBtn);
        });
        btnGroup.add(toggleBtn);

        toggleBtn.number = number;
        toggleBtn.name = questionsArrayStatic[number];

        toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number];
        toggleBtn.setFrame(toggleBtn.currentFrame);
    }

    toggleCountries(btn) {

        // remove this country
        if (btn.currentFrame === 0) {
            for(let i = 0; i < questionsArray.length; i++) {
                if (btn.name === questionsArray[i]) {
                    questionsArray.splice(i,1);
                }
            }
        }
        else    // add this country to the array
        {
            for(let i = 0; i < questionsArray.length; i++) {
                if (questionsArray.includes(btn.name) === false)
                {
                    questionsArray.push(btn.name);
                }
            }
            // make sure it runs at least once
            if (questionsArray.length === 0) {
                if (questionsArray.includes(btn.name) === false)
                {
                    questionsArray.push(btn.name);
                }
            }
        }

        // switch frame of the current button
        btn.currentFrame = (btn.currentFrame == 0) ? 1 : 0;
        btn.setFrame(btn.currentFrame);
        // update array that contains frames for all toggle buttons
        toggleButtonsFrames[btn.number] = btn.currentFrame;

        // update number of countries
        this.numOfCountries.text = questionsArray.length.toString()
    }

    goBack() {
        if (regionsVisible === true) {
            if (questionsArray.length >= 5) {
                this.scene.start("menu");
            }
            else {
                this.txtSelectAtleast.setVisible(true);
            }
        }
        else {
            regionsVisible = true;
            this.regionsGroup.children.each((obj) => {
                if (obj.yPos != null && obj.y > 350) {
                    obj.setVisible(true);
                }
                else if (obj.yPos != null && obj.y <= 350) {
                    obj.setVisible(false);
                }
                else {
                    obj.setVisible(true);
                }
              }, this);

            this.region1Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);
            this.region2Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);
            this.region3Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);
            this.region4Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);
            this.region5Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);
            this.region6Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);
            this.region7Group.getChildren().forEach(function(obj){
                obj.setVisible(false);
            },this);

            this.region1Visible = false;
            this.region2Visible = false;
            this.region3Visible = false;
            this.region4Visible = false;
            this.region5Visible = false;
            this.region6Visible = false;
            this.region7Visible = false;
        }
    }

    toggleRegions(btn) {

        // toggle regions
        if (btn === this.buttonRegion1) {
            // toggle button is on/off
            btnRegion1Frame = btnRegion1Frame === 0 ? 1 : 0;

            // exclude region 1
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region1Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region1Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region1Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 1
            {
                for (let j = 0; j < region1Array.length; j++) {
                    if (questionsArray.includes(region1Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region1Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region1Array[j]);
                    }
                }
            }
        }
        else if (btn === this.buttonRegion2) {
            // toggle button is on/off
            btnRegion2Frame = btnRegion2Frame === 0 ? 1 : 0;

            // exclude region 2
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region2Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region2Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region2Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 2
            {
                for (let j = 0; j < region2Array.length; j++) {
                    if (questionsArray.includes(region2Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region2Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region2Array[j]);
                    }
                }
            }
        }
        else if (btn === this.buttonRegion3) {
            // toggle button is on/off
            btnRegion3Frame = btnRegion3Frame === 0 ? 1 : 0;

            // exclude region 3
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region3Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region3Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region3Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 3
            {
                for (let j = 0; j < region3Array.length; j++) {
                    if (questionsArray.includes(region3Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region3Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region3Array[j]);
                    }
                }
            }
        }
        else if (btn === this.buttonRegion4) {
            // toggle button is on/off
            btnRegion4Frame = btnRegion4Frame === 0 ? 1 : 0;

            // exclude region 4
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region4Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region4Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region4Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 2
            {
                for (let j = 0; j < region4Array.length; j++) {
                    if (questionsArray.includes(region4Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region4Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region4Array[j]);
                    }
                }
            }
        }
        else if (btn === this.buttonRegion5) {
            // toggle button is on/off
            btnRegion5Frame = btnRegion5Frame === 0 ? 1 : 0;            
            // exclude region 5
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region5Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region5Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region5Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 5
            {
                for (let j = 0; j < region5Array.length; j++) {
                    if (questionsArray.includes(region5Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region5Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region5Array[j]);
                    }
                }
            }
        }
        else if (btn === this.buttonRegion6) {
            // toggle button is on/off
            btnRegion6Frame = btnRegion6Frame === 0 ? 1 : 0;            
            // exclude region 6
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region6Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region6Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region6Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 6
            {
                for (let j = 0; j < region6Array.length; j++) {
                    if (questionsArray.includes(region6Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region6Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region6Array[j]);
                    }
                }
            }
        }
        else if (btn === this.buttonRegion7) {
            // toggle button is on/off
            btnRegion7Frame = btnRegion7Frame === 0 ? 1 : 0;            
            // exclude region 7
            if (btn.currentFrame === 0) {
                for (let j = 0; j < region7Array.length; j++) {
                    for (let i = 0; i < questionsArray.length; i++) {
                        if (questionsArray[i] === region7Array[j]) {
                            // toggle buttons off
                            let index = questionsArrayStatic.indexOf(region7Array[j]);
                            toggleButtonsFrames[index] = 1;
                            // remove these countries
                            questionsArray.splice(i, 1);
                        }
                    }
                }
            } else // include region 7
            {
                for (let j = 0; j < region7Array.length; j++) {
                    if (questionsArray.includes(region7Array[j]) == false) {
                        let index = questionsArrayStatic.indexOf(region7Array[j]);
                            toggleButtonsFrames[index] = 0;
                        // add these frames
                        questionsArray.push(region7Array[j]);
                    }
                }
            }
        }

        // switch button (on-off)
        if (btn.currentFrame === 0) {
            btn.setFrame(1);
        }
        else {
            btn.setFrame(0);
        }
        btn.currentFrame = btn.currentFrame === 0 ? 1 : 0;

        // update number of countries
        this.numOfCountries.text = String(questionsArray.length);

        // show/hide select at least 5
        if (questionsArray.length >= 5) {
            this.txtSelectAtleast.setVisible(false);
            this.buttonBack.setVisible(true);
            this.txtBack.setVisible(true);
        }
        else {
            this.txtSelectAtleast.setVisible(true);
            this.buttonBack.setVisible(false);
            this.txtBack.setVisible(false);
        }
    }

    // display certain regions
    selectCountries(btn) {

        // hide regions group
        this.regionsGroup.children.each((obj) => {
            obj.setVisible(false);
          }, this);
        regionsVisible = false;
        // hide 'select at least'
        this.txtSelectAtleast.setVisible(false);
        // button back should be visible
        this.buttonBack.setVisible(true);
        this.txtBack.setVisible(true);

        if (btn === this.txtSelect1) {
            // this group is visible now
            this.region1Group.toggleVisible();
            this.region1Visible = true;

            // switch each toggle button in this region
            this.region1Group.getChildren().forEach(function(toggleBtn){
                // only toggle buttons, no other objects from this group
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);

            // hide countries if needed 
            this.region1Group.getChildren().forEach((txt) => {
                if (txt.y < 145) {
                    txt.setVisible(false);
                }
                else {
                    txt.setVisible(true);
                }
            });
            // make the name of the region visible
            this.txtGroup1.setVisible(true);

        }
        else if (btn === this.txtSelect2) {
            // this group is visible now
            this.region2Group.toggleVisible();
            this.region2Visible = true;

            // switch each toggle button in this region
            this.region2Group.getChildren().forEach(function(toggleBtn){
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);
        }
        else if (btn === this.txtSelect3) {
            // this group is visible now
            this.region3Group.toggleVisible();
            this.region3Visible = true;

            // switch each toggle button in this region
            this.region3Group.getChildren().forEach(function(toggleBtn){
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);      
        }
        else if (btn === this.txtSelect4) {
            // this group is visible now
            this.region4Group.toggleVisible();
            this.region4Visible = true;

            // switch each toggle button in this region
            this.region4Group.getChildren().forEach(function(toggleBtn){
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);

            // hide countries if needed 
            this.region4Group.getChildren().forEach((txt) => {
                if (txt.y < 145) {
                    txt.setVisible(false);
                }
                else {
                    txt.setVisible(true);
                }
            });
            // make the name of the region visible
            this.txtGroup4.setVisible(true);
        }
        else if (btn === this.txtSelect5) {
            // this group is visible now
            this.region5Group.toggleVisible();
            this.region5Visible = true;

            // switch each toggle button in this region
            this.region5Group.getChildren().forEach(function(toggleBtn){
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);
        }
        else if (btn === this.txtSelect6) {
            // this group is visible now
            this.region6Group.toggleVisible();
            this.region6Visible = true;

            // switch each toggle button in this region
            this.region6Group.getChildren().forEach(function(toggleBtn){
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);
        }
        else if (btn === this.txtSelect7) {
            // this group is visible now
            this.region7Group.toggleVisible();
            this.region7Visible = true;

            // switch each toggle button in this region
            this.region7Group.getChildren().forEach(function(toggleBtn){
                if (toggleBtn.number != null){
                    toggleBtn.currentFrame = toggleButtonsFrames[toggleBtn.number]
                    toggleBtn.setFrame(toggleBtn.currentFrame);
                }
            },this);
        }
    }

    setPositions() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        selectTxtPos = width/2 + 520;

        this.bg.setPosition(width/2, height/2);
        this.bgWhite.setPosition(width/2, height/2);
        this.bgWhite.displayHeight = height;
        this.txtOptions.setPosition((width/2 + 550) - 30, 25);
        this.optionsIcon.setPosition((width/2 + 550) - (40 + this.txtOptions.width), 12);
        this.txtSelectAtleast.setPosition(width/2 - 70, 20);
        this.buttonBack.setPosition((width/2 - 505), 40);
        this.txtBack.setPosition((width/2 - 480), 17);

        this.txtSound.setPosition(width/2 - 400, 140);
        this.buttonSound.setPosition(selectTxtPos - this.txtSelect1.width - 65, 155);
        this.txtNumberOfCountries.setPosition(width/2 - 400, 225);
        this.numOfCountries.setPosition(selectTxtPos - this.txtSelect1.width - 65, 220);
        this.txtCountries.setPosition(width/2 - 400, 320);
        this.txtRegion1.setPosition(width/2 - 400, 390);
        this.txtRegion2.setPosition(width/2 - 400, 460);
        this.txtRegion3.setPosition(width/2 - 400, 530);
        this.txtRegion4.setPosition(width/2 - 400, 600);
        this.txtRegion5.setPosition(width/2 - 400, 670);
        this.txtRegion6.setPosition(width/2 - 400, 740);
        this.txtRegion7.setPosition(width/2 - 400, 810);

        this.txtSelect1.setPosition(selectTxtPos, 415);
        this.txtSelect2.setPosition(selectTxtPos, 485);
        this.txtSelect3.setPosition(selectTxtPos, 555);
        this.txtSelect4.setPosition(selectTxtPos, 625);
        this.txtSelect5.setPosition(selectTxtPos, 695);
        this.txtSelect6.setPosition(selectTxtPos, 765);
        this.txtSelect7.setPosition(selectTxtPos, 835);
        this.underline1.setPosition(this.txtSelect1.x, 430);
        this.underline2.setPosition(this.txtSelect1.x, 500);
        this.underline3.setPosition(this.txtSelect1.x, 570);
        this.underline4.setPosition(this.txtSelect1.x, 640);
        this.underline5.setPosition(this.txtSelect1.x, 710);
        this.underline6.setPosition(this.txtSelect1.x, 780);
        this.underline7.setPosition(this.txtSelect1.x, 850);

        this.buttonRegion1.setPosition(selectTxtPos - this.txtSelect1.width - 65, 415);
        this.buttonRegion2.setPosition(selectTxtPos - this.txtSelect1.width - 65, 485);
        this.buttonRegion3.setPosition(selectTxtPos - this.txtSelect1.width - 65, 555);
        this.buttonRegion4.setPosition(selectTxtPos - this.txtSelect1.width - 65, 625);
        this.buttonRegion5.setPosition(selectTxtPos - this.txtSelect1.width - 65, 695);
        this.buttonRegion6.setPosition(selectTxtPos - this.txtSelect1.width - 65, 765);
        this.buttonRegion7.setPosition(selectTxtPos - this.txtSelect1.width - 65, 835);
    }
}
