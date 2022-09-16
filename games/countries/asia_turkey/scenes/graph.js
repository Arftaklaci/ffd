"use strict"

class Graph extends Phaser.Scene {
    constructor() {
        super({
            key: "graph"
        })
    }

    create() {

        width = this.cameras.main.width;
        height = this.cameras.main.height;

        let gameplay = this.scene.get("gameplay");
        gameplay.displayProvinces(this);

        let timer = this.time.delayedCall(100, () => {
            // show labels
            this.showLabels();
        },this);

        // user interface
        this.ui = this.scene.get("graphUI");
        // launch user interface 
        this.scene.launch("graphUI");
        this.scene.moveAbove("graph", "graphUI");

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

        // enable drag and pinch to zoom
        var dragScale = this.plugins.get('rexpinchplugin').add(this);
        dragScale.on('drag1', dragScale => {
                var drag1Vector = dragScale.drag1Vector;
                camera.scrollX -= drag1Vector.x / camera.zoom;
                camera.scrollY -= drag1Vector.y / camera.zoom;
        }).on('pinch', dragScale => {
            var scaleFactor = dragScale.scaleFactor;
            
            // camera zoom
            camera.zoom *= scaleFactor;
        }, this);

        // mouse wheel
        if (this.sys.game.device.os.desktop) {
            var mouseWheelToUpDown = this.plugins.get('rexmousewheeltoupdownplugin').add(this);
            this.cursorKeys = mouseWheelToUpDown.createCursorKeys();
        }

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
    
    update() {
        // mouse wheel zoom in/out
        if (this.sys.game.device.os.desktop) {
            if (this.cursorKeys.up.isDown) {
                camera.zoom *= 1.1;
            } else if (this.cursorKeys.down.isDown) {
                
                camera.zoom *= 0.9;
            }
        }
        camera.setZoom(Phaser.Math.Clamp(camera.zoom, this.minZoom, this.maxZoom));
    }

    showLabels(country) {

        // get countries (sprites) array from the container
        this.countriesArray = this.provincesContainer.getAll();

        for (let i = 0; i < this.countriesArray.length; i++) {

            // get countries one by one
            let country = this.countriesArray[i];

            // find any white space in country name
            if (/\s/.test(country.name)) {

                // use another label
                if (country.name === countriesLabels.mariElRepublic) {
                    country.name = labels.mariElRepublic2;
                }
                else if (country.name === countriesLabels.northOssetiaAlaniaRepublic) {
                    country.name = labels.northOssetiaAlaniaRepublic2;
                }
                else {
                    // replace white space with a line break (first white space)
                    if (country.name === countriesLabels.nizhnyNovgorodOblast || country.name === countriesLabels.sevastopolDisputedArea) {
                        country.name = country.name.replace(/\s/, "\n");
                    }
                    else {
                        // g above says to replace it multiple times if needed
                        country.name = country.name.replace(/\s/g, "\n");
                    }
                }
            }
            // write country name
            country.txt = this.add.text(country.x, country.y, country.name, { fontFamily: "bold", fontSize: 14, align: "center", color: '#000000' });
            country.txt.setOrigin(.5,.5);
            this.provincesContainer.add(country.txt);

            if (country.labelX != null) {
                country.txt.x = country.labelX;
                country.txt.y = country.labelY;
            }

            // create a line if needed
            if (country.hasLine) {
                 let line;
                if (country.name === countriesLabels.moscow) {
                    line = this.add.image(country.lineX, country.lineY, "lineMoscow");
                    line.setOrigin(0,0);
                    line.setScale(-.8,-.8);
                    line.angle = -45;
                    this.provincesContainer.add(line);
                }
                else if (country.x === this.sevastopolDisputedArea.x || country.x === this.saintPetersburg.x) {
                    line = this.add.image(country.lineX, country.lineY, "lineSevastopol");
                    line.setScale(.7,.7);
                    line.setOrigin(0.5,1);
                    this.provincesContainer.add(line);
                }
                else if (country.x === this.karachayCherkessRepublic.x || country.x === this.kabardinoBalkarRepublic.x || country.x === this.northOssetiaAlaniaRepublic.x || country.x === this.ingushetiaRepublic.x || country.x === this.chechenRepublic.x) {
                    line = this.add.image(country.lineX, country.lineY, "lineNorthOsetia");
                    line.setOrigin(1,0.5);
                    line.setScale(.6,.6);
                    this.provincesContainer.add(line);

                    // ingushetia
                    if (country.x === this.ingushetiaRepublic.x) {
                        line.angle = -15;
                    }
                    /*else if (country.x === this.chechenRepublic.x) {
                        line.setScale(-.6,-.6);
                    }*/
                }
                this.provincesContainer.add(line);
            }

            // create white rectangles

            // moscow
            if (country.name === countriesLabels.moscow || country.name === countriesLabels.karachayCherkessRepublic || country.name === countriesLabels.kabardinoBalkarRepublic || country.name === countriesLabels.northOssetiaAlaniaRepublic || country.name === countriesLabels.ingushetiaRepublic) {
                country.rect = this.add.sprite(country.txt.x, country.txt.y, "rectangle");
                country.rect.displayWidth = country.txt.width + 1;
                country.rect.displayHeight = country.txt.height;
                // set different origin for these rectangles
                country.rect.setOrigin(1,0.5);
                country.txt.setOrigin(1,0.5);
                country.txt.x -= 1;
                this.provincesContainer.add(country.rect);
            }
            else {
                // same rectangles for all other countries
                country.rect = this.add.sprite(country.txt.x, country.txt.y, "rectangle");
                country.rect.displayWidth = country.txt.width + 1;
                country.rect.displayHeight = country.txt.height;
                this.provincesContainer.add(country.rect);
            }

            // bring to top text field
            this.provincesContainer.bringToTop(country.txt);
        }
    }

    setPositions() {
        width = this.cameras.main.width;
        height = this.cameras.main.height;
    }
}
