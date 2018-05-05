const FogWar = function (render) {
    let that = {};
    let _render = render;
    _render.update = function (dt) {
    };



    // 接入shader
    let image = new PIXI.Sprite.fromImage('./images/bg.jpg');
    _render.addChild(image);

    let shaderCode = "" +
        "uniform vec2 mouse;" +
        "uniform vec2 resolution;" +
        "void main(){" +
        "vec2 p = (gl_FragCoord.xy - mouse.xy)/min(resolution.x, resolution.y);" +
        "gl_FragColor=vec4(0.0,0.0,0.0,1.0 * length(p));" +
        "}";

    let shader = new PIXI.Filter("", shaderCode);
    image.filters = [shader];
    let resolution = shader.uniforms.resolution;
    resolution[0] = render.view.width;
    resolution[1] = render.view.height;
    shader.uniforms.resoltuion = resolution;

    _render.touchStart = function (data) {
        // console.log('touch start = ' + JSON.stringify(data));
    };

    _render.touchMove = function (data) {
        // console.log('touch move = ' + JSON.stringify(data));
        let mouse = shader.uniforms.mouse;
        mouse[0] = data.x;
        mouse[1] = render.view.height - data.y;
        shader.uniforms.mouse = mouse;
    };
    _render.touchEnd = function (data) {
        // console.log('touch end = ' + JSON.stringify(data));
    };

    return that;
};
export default FogWar;