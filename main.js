window.onload = function () {
    //加载游戏
    // let shaderCode = document.getElementById('shader').innerHTML;
    let shaderCode =
        "uniform vec2 mouse;" +
        "uniform vec2 resolution;" +
        "void main(){" +
        "vec2 p = ( mouse.xy - gl_FragCoord.xy)/min(resolution.x, resolution.y);" +
        "vec3 bcol = vec3(0.8, 0.6, 0.7) * (1.0 - 0.7 * length(p));"+
        "gl_FragColor = vec4(0.0,0.0,0.0, smoothstep(0.0, 1.0, length(p)));" +
        "}";

    let width = window.innerWidth;
    let height = window.innerHeight;
    let render = new PIXI.WebGLRenderer(width, height);
    document.body.appendChild(render.view);
    let stage = new PIXI.Container();
    let _filter = undefined;
    let _image = undefined;
    PIXI.loader.add('bg', 'images/bg.jpg').load((loader, resources)=>{
        let bg = new PIXI.Sprite.fromImage('images/bg.jpg');
        stage.addChild(bg);
        _image = new PIXI.Sprite.fromImage('images/bg.jpg');
        stage.addChild(_image);
        _filter = new PIXI.Filter('', shaderCode);
        _image.filters = [_filter];
        let resolution = _filter.uniforms.resolution;
        resolution[0] = _image.width;
        resolution[1] = _image.height;
        _filter.uniforms.resolution = resolution;
        render.view.width = _image.width;
        render.view.height = _image.height;
        _image.interactive = true;
        _image.on('touchstart', ()=>{
            console.log('touch start');
        });
        _image.on('touchmove', touchmove);
        _image.on('pointermove', touchmove);

    });
    const touchmove = function (event) {
        console.log(' touche move');
        let data = event.data.getLocalPosition(_image);
        // console.log('data = ' + JSON.stringify(data));
        let mouse = _filter.uniforms.mouse;
        mouse[0] = data.x;
        mouse[1] = _image.height -data.y;
        _filter.uniforms.mouse = mouse;
    };


    let count = 0;
    const animate = function () {
        count += 0.01;
        if (_filter){
            // _filter.uniforms.time = count;
            // let resolution = _filter.uniforms.resolution;
            // resolution[0] = _image.width;
            // resolution[1] = _image.height;
            // _filter.uniforms.resolution = resolution;
        }
        render.render(stage);
        requestAnimationFrame(animate)
    };
    animate();
};