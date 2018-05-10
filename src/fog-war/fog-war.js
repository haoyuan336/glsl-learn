const FogWar = function (app) {
    let that = {};
    let _app = app;



    // 接入shader
    // let image = new PIXI.Sprite.from('./images/bg.jpg');
    // _app.addChild(image);

    let shaderCode = "" +
        "uniform vec2 mouse;" +
        "uniform vec2 resolution;" +
        "uniform float time;" +
        "uniform sampler2D uSampler2;" +
        "void main(){" +
        "vec2 p = (gl_FragCoord.xy - mouse.xy)/min(resolution.x, resolution.y);" +
        "" +
        "gl_FragColor = texture2D(uSampler2, vUvs);" +
        "}";

    const unifroms = {
        resolution: {
            x: 0,
            y: 0
        },
        mouse: {
            x: 0,
            y: 0
        },
        time: 0,
        uSampler2:PIXI.Texture.from('./images/bg.jpg')
    };

    let shader = new PIXI.Shader.from("", shaderCode, unifroms);
    app.addChild(shader);
    // image.filters = [shader];
    // let resolution = shader.uniforms.resolution;
    // resolution[0] = app.view.width;
    // resolution[1] = app.view.height;

    // shader.uniforms.resoltuion = {
    //     x: app.view.width,
    //     y: app.view.height
    // };


    _app.touchStart = function (data) {
        console.log('touch start = ' + JSON.stringify(data));
    };

    _app.touchMove = function (data) {
        // let mouse = shader.uniforms.mouse;
        // mouse[0] = data.x;
        // mouse[1] = app.view.height - data.y;
        shader.uniforms.mouse = [data.x, app.view.height - data.y];
    };
    _app.touchEnd = function (data) {
    };
    _app.update = function (dt) {

        shader.uniforms.time += dt;

    };
    return that;
};
export default FogWar;