class Loading extends Phaser.Scene
{    
    constructor()
    {
        super({
            
            key   : 'loading',
            pack  : 
            {
                files : 
                [
                    // pre-preload these images
                    { type: 'image', key: 'preloader1', url: '/games/countries/asia_turkey/img/preloader1.png' },
                    { type: 'image', key: 'preloader2', url: '/games/countries/asia_turkey/img/preloader2.png' },
                    { type: 'image', key: 'btnPlay', url: '/games/countries/asia_turkey/img/btnPlay.png' },
                ] 
            }
        })
    }
    
    setPreloadSprite (sprite) 
    {
		this.preloadSprite = { sprite: sprite, width: sprite.width, height: sprite.height }
		sprite.visible = true
		this.load.on('progress', this.onProgress, this);
	}
	
	onProgress (value) {
		if (this.preloadSprite) {
            let w = Math.floor(this.preloadSprite.width * value);
			this.preloadSprite.sprite.frame.width = w;
            this.preloadSprite.sprite.frame.cutWidth = w;
            this.preloadSprite.sprite.frame.updateUVs();
            this.setPositions();
		}
    }
    
    preload(){
        // load custom fonts (extra bold loaded in index.html)
        this.font1 = this.add.text(0, 0, 'custom font', {
            fontFamily: "regular", fontSize: 16, color: '#000000'
        });
        this.font1.setVisible(false);
        this.font3 = this.add.text(0, 0, 'custom font', {
            fontFamily: "semiBold", fontSize: 16, color: '#000000'
        });
        this.font3.setVisible(false);
        this.font2 = this.add.text(0, 0, 'custom font', {
            fontFamily: "bold", fontSize: 16, color: '#000000'
        });
        this.font2.setVisible(false);

        // init width and height
        width = this.cameras.main.width;
        height = this.cameras.main.height;
        // display loading bar
		this.preloader1 = this.add.sprite(width/2, height/2 + 140, "preloader1");
		this.preloader2 = this.add.sprite(width/2, height/2 + 140, "preloader2");
        this.setPreloadSprite(this.preloader2);
        // play button
        this.btnPlay = this.add.image(width/2, height/2 + 140, "btnPlay");
        this.btnPlay.setVisible(false);
        // display text
        this.txtWebsite = this.add.text(width/2, height/2 - 150, labels.website, { fontFamily: "extraBold", fontSize: 60, color: '#000000' });
        this.txtTitle = this.add.text(width/2, height/2 - 80, labels.title, { fontFamily: "extraBold", fontSize: 58, color: '#FFFFFF' });
        this.txtTitle.setOrigin(0.5, 0.5);
        this.txtWebsite.setOrigin(0.5, 0.5);
        // animation
        this.load.spritesheet('sheep', '/games/countries/asia_turkey/img/sheep.png', { frameWidth: 300, frameHeight: 221 });
        // provinces
        this.load.atlas("texture", "/games/countries/asia_turkey/img/texture.png", "/games/countries/asia_turkey/img/texture.json");

        // buttons
        this.load.spritesheet('button', '/games/countries/asia_turkey/img/button.png', {frameWidth: 420, frameHeight: 62});
        this.load.image('btnPlay', '/games/countries/asia_turkey/img/btnPlay.png');
        this.load.image('buttonBack', '/games/countries/asia_turkey/img/buttonBack.png');
        this.load.image('buttonBackBlack', '/games/countries/asia_turkey/img/buttonBackBlack.png');
        this.load.image('buttonStart', '/games/countries/asia_turkey/img/buttonStart.png');
        this.load.image('buttonMap', '/games/countries/asia_turkey/img/buttonMap.png');
        this.load.image('buttonMapWhite', '/games/countries/asia_turkey/img/buttonMapWhite.png');
        this.load.image('buttonOptions', '/games/countries/asia_turkey/img/buttonOptions.png');
        this.load.spritesheet('buttonToggle', '/games/countries/asia_turkey/img/buttonToggle.png', {frameWidth: 89, frameHeight: 52 });
        // images
		this.load.spritesheet('bgQuestion', '/games/countries/asia_turkey/img/bgQuestion.png', { frameWidth: 500, frameHeight: 65 });
		this.load.image('bgWhite', '/games/countries/asia_turkey/img/bgWhite.jpg');
		this.load.image('rectangle', '/games/countries/asia_turkey/img/rectangle.jpg');
		this.load.image('map', '/games/countries/asia_turkey/img/map.png');
		this.load.image('circle', '/games/countries/asia_turkey/img/circle.png');
		this.load.image('circleGreen', '/games/countries/asia_turkey/img/circleGreen.png');
		this.load.image('circleYellow', '/games/countries/asia_turkey/img/circleYellow.png');
		this.load.image('circleRed', '/games/countries/asia_turkey/img/circleRed.png');
		this.load.image('underline', '/games/countries/asia_turkey/img/underline.png');
        // plugins
        this.url = '/phaser/plugins/pinchplugin.min.js';
        this.url2 = '/phaser/plugins/mousewheelplugin.min.js';
        this.url3 = '/phaser/plugins/rexscrollerplugin.min.js';
        this.load.plugin('rexpinchplugin', this.url, true);
        this.load.plugin('rexmousewheeltoupdownplugin', this.url2, true);
        this.load.plugin('rexscrollerplugin', this.url3, true);
        // external sounds
		this.load.audio('wrongSound', ['/phaser/audio/wrongSound.mp3', '/phaser/audio/wrongSound.ogg']);
		this.load.audio('correctSound', ['/phaser/audio/correctSound.mp3', '/phaser/audio/correctSound.ogg']);
        this.load.audio('gameOverSound', ['/phaser/audio/gameOverSound.mp3', '/phaser/audio/gameOverSound.mp3']);
    }
    
    create() {    

        // play button
        this.btnPlay.setVisible(true);
        this.btnPlay.setInteractive({useHandCursor: true})
        this.btnPlay.on("pointerup", () => { 
            this.scene.start("menu");
        }, this);

        // remove preloader
        this.preloader1.destroy();
        this.preloader2.destroy();
        
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
        this.preloader1.setPosition(width/2, height/2 + 170);
        this.preloader2.setPosition(width/2, height/2 + 170);
        this.btnPlay.setPosition(width/2, height/2 + 170);
        this.txtTitle.setPosition(width/2, height/2 - 80);
        this.txtWebsite.setPosition(width/2, height/2 - 150);
    }
}