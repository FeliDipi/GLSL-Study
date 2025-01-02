precision mediump float;

void main(void) {
    vec2 uv = gl_FragCoord.xy / vec2(800.0, 600.0);

    gl_FragColor = vec4(uv.x, uv.y, 0.0, 1.0);
}