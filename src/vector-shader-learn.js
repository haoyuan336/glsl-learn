const Game = function (render) {
    console.log('创建一个 顶点着色器的游戏')
    let that = {};
    let _render = render;
    var geometry = new PIXI.Geometry()
        .addAttribute('aVertexPosition', [-100, -50, 100, -50, 0, 100])
    var shader = new PIXI.Shader.from(`

    precision mediump float;
    attribute vec2 aVertexPosition;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    void main() {
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);
    }`,

        `precision mediump float;

    void main() {
        gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
    }

`);
    var triangle = new PIXI.RawMesh(geometry, shader);

    triangle.position.set(400, 300);

    _render.addChild(triangle);
    let image = new PIXI.Sprite.fromImage('./images/bg.jpg');

    render.addChild(image);





    image.filters = [shader];



    _render.update = function (dt) {
    };

    return that;
};
export default Game;