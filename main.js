import FogWar from './src/fog-war/fog-war'
import VectorLearn from './src/vector-shader-learn'
var GamePlatform = function(){
    let that = {};
    that.createGame = function (canvas, cb) {
        console.log('创建一个游戏' + canvas.width);
        let app = new PIXI.Application(canvas.width, canvas.height, {view: canvas});

        let stage = new PIXI.Container();

        // const ticker = new PIXI.ticker.Ticker();
        // ticker.stop();
        // ticker.add((deltaTime) => {
        //     render.render(stage);
        //     // do something every frame
        //     if (render.update){
        //         render.update(deltaTime);
        //     }
        // });
        // ticker.start();

        app.ticker.add((deltaTime)=>{
            app.renderer.render(stage);
            if (app.update){
                app.update(deltaTime);
            }
        });





        let loader = PIXI.Loader.shared;
        if (!loader.resources.hasOwnProperty('bg')){
            loader.add('bg', './images/bg.jpg');
        }
        loader.load(()=>{
            console.log('load success');
            let image = new PIXI.Sprite.from('./images/bg.jpg');
            // image.scale.set(canvas.height / image.height);
            // stage.addChild(image);
            app.stage.addChild(image);
            if (cb){
                cb();
            }
        });


        const touchStart = function(event){
            console.log('点击');
            let data = event.data.getLocalPosition(stage);
            if (app.touchStart){
                app.touchStart(data);
            }
        };
        const touchMove = function(event){
            console.log('移动');
            let data = event.data.getLocalPosition(stage);
            if (app.touchMove){
                app.touchMove(data);
            }
        };
        const touchEnd = function(event){
            // console.log('点击结束');
            let data = event.data.getLocalPosition(stage);
            if (app.touchEnd){
                app.touchEnd(data);
            }
        };
        app.stage.interactive = true;
        app.stage.on('touchstart',touchStart);
        app.stage.on('pointerdown', touchStart);
        app.stage.on('touchmove', touchMove);
        app.stage.on('pointermove', touchMove);
        app.stage.on('touchend', touchEnd);
        app.stage.on('pointerup', touchEnd);

        app.addChild = function (node) {
            app.stage.addChild(node);
        };

        return app;

    };

    that.createFogGame = function (render) {
        // 创建一个战争迷雾
        let fogGame  = FogWar(render);
        return fogGame;
    };
    that.createVectorShaderLearn = function (render) {
        let game = VectorLearn(render);
        return game;
    };

    return that;
};

window.gamePlatform = GamePlatform();