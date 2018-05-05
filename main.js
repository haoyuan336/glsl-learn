import FogWar from './src/fog-war/fog-war'
var GamePlatform = function(){
    let that = {};
    that.createGame = function (canvas, cb) {
        console.log('创建一个游戏' + canvas.width);
        let render = new PIXI.WebGLRenderer(canvas.width, canvas.height, {view: canvas});

        let stage = new PIXI.Container();

        const ticker = new PIXI.ticker.Ticker();
        ticker.stop();
        ticker.add((deltaTime) => {
            render.render(stage);
            // do something every frame
            if (render.update){
                render.update(deltaTime);
            }
        });
        ticker.start();



        let loader = new PIXI.loaders.Loader();
        if (!loader.resources.hasOwnProperty('bg')){
            loader.add('bg', './images/bg.jpg');
        }
        loader.load(()=>{
            console.log('load success');
            let image = new PIXI.Sprite(loader.resources['bg'].texture);
            image.scale.set(canvas.height / image.height);
            stage.addChild(image);
            if (cb){
                cb();
            }
        });


        const touchStart = function(event){
            console.log('点击');
            let data = event.data.getLocalPosition(stage);
            if (render.touchStart){
                render.touchStart(data);
            }
        };
        const touchMove = function(event){
            // console.log('移动');
            let data = event.data.getLocalPosition(stage);
            if (render.touchMove){
                render.touchMove(data);
            }
        };
        const touchEnd = function(event){
            // console.log('点击结束');
            let data = event.data.getLocalPosition(stage);
            if (render.touchEnd){
                render.touchEnd(data);
            }
        };
        stage.interactive = true;
        stage.on('touchstart',touchStart);
        stage.on('pointerstart', touchStart);
        stage.on('touchmove', touchMove);
        stage.on('pointermove', touchMove);
        stage.on('touchend', touchEnd);
        stage.on('pointerend', touchEnd);

        render.addChild = function (node) {
            stage.addChild(node);
        };

        return render;

    };

    that.createFogGame = function (render) {
        //创建一个战争迷雾
        let fogGame  = FogWar(render);
        return fogGame;
    };

    return that;
};

window.gamePlatform = GamePlatform();