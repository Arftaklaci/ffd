"use strict"

class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: "menu"
        })
    }

    create() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        // map
        this.bg = this.add.image(width/2, height/2, "map");
        this.bg.scaleX = .9;
        this.bg.scaleY = .9;
        // circle
        this.circle = this.add.image(width/2, height/2, "circle");
        // title
        this.txtTitle = this.add.text(width/2, height/2 - 210, labels.titleTwo, {fontFamily: "extraBold", fontSize: 58, align: "center", color: "0x000000"});
        this.txtTitle.setOrigin(0.5,0.5);
       // buttons
       this.buttonPlay = this.add.image(width/2 - 65, height/2 - 32, 'buttonStart').setInteractive({useHandCursor: true});
       this.buttonPlay.on("pointerup", () => {
           this.scene.start("gameplay");
       }, this);
       this.buttonOptions = this.add.image(width/2 - 65, height/2 + 83, 'buttonOptions').setInteractive({useHandCursor: true});
       this.buttonOptions.on("pointerup", () => {
           this.scene.start("options");
       }, this);
       this.buttonMap = this.add.image(width/2 - 65, height/2 + 200, 'buttonMap').setInteractive({useHandCursor: true});
       this.buttonMap.on("pointerup", () => {
           this.scene.start("graph");
       }, this);

       // text buttons
       this.txtPlay = this.add.text(width/2 + 15, height/2 - 34, labels.play, {fontFamily: "bold", fontSize: 40, color: "0x000000"}).setInteractive({useHandCursor: true});
       this.txtPlay.on("pointerup", () => {
           this.scene.start("gameplay");
       }, this);
       this.txtPlay.setOrigin(0,0.5);
       this.txtOptions = this.add.text(width/2 + 15, height/2 + 81, labels.options, {fontFamily: "bold", fontSize: 40, color: "0x000000"}).setInteractive({useHandCursor: true});
       this.txtOptions.on("pointerup", () => {
           this.scene.start("options");
       }, this);
       this.txtOptions.setOrigin(0,0.5);
       this.txtMap = this.add.text(width/2 + 15, height/2 + 198, labels.map, {fontFamily: "bold", fontSize: 40, color: "0x000000"}).setInteractive({useHandCursor: true});
       this.txtMap.on("pointerup", () => {
           this.scene.start("graph");
       }, this);
       this.txtMap.setOrigin(0,0.5);

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

    setPositions() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        this.bg.setPosition(width/2, height/2);
        this.circle.setPosition(width/2, height/2);
        this.txtTitle.setPosition(width/2, height/2 - 210);
        this.buttonPlay.setPosition(width/2 - 60, height/2 - 47);
        this.buttonOptions.setPosition(width/2 - 60, height/2 + 83);
        this.buttonMap.setPosition(width/2 - 60, height/2 + 215);
        this.txtPlay.setPosition(width/2 + 10, height/2 - 49);
        this.txtOptions.setPosition(width/2 + 10, height/2 + 81);
        this.txtMap.setPosition(width/2 + 10, height/2 + 213);
    }
}
