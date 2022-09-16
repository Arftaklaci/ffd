"use strict"

class GraphUI extends Phaser.Scene {
    constructor() {
        super({
            key: "graphUI"
        })
    }

    create() {

        width = this.cameras.main.width;
        height = this.cameras.main.height;

       // button back
       this.buttonBack = this.add.image(45, 40, "buttonBack").setInteractive({ useHandCursor: true });
       this.buttonBack.on("pointerup", () => {
           this.scene.stop("graph");
           this.scene.start("menu");
       }, this);
       // text back
       this.txtBack = this.add.text(70, 20, labels.back, { fontFamily: "bold", fontSize: 38, color: '#FFFFFF' }).setInteractive({ useHandCursor: true });
       this.txtBack.on("pointerup", () => {
           this.scene.stop("graph");
           this.scene.start("menu");
       }, this);

        // map text
        this.txtMap = this.add.text(width - 30, 30, labels.map, { fontFamily: "extraBold", fontSize: 44, color: '#FFFFFF' });
        this.txtMap.setOrigin(1,0);

       // map image
       this.mapThumb = this.add.image(width - (40 + this.txtMap.width), 10, 'buttonMapWhite');
       this.mapThumb.setOrigin(1,0);
       this.mapThumb.scaleX = .9;
       this.mapThumb.scaleY = .9;

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

       this.buttonBack.setPosition(45, 40);
       this.txtBack.setPosition(70, 17);
       this.txtMap.setPosition(width - 30, 30);
       this.mapThumb.setPosition(width - (40 + this.txtMap.width), 10);
    }
}
