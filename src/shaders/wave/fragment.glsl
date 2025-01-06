precision mediump float;

varying vec3 vPosition;

uniform float u_time;

void main(void) {

    float center = length(vPosition.xz);
    float value = sin(center * 6.28 - u_time) * 0.5 + 0.5;

    vec4 color = mix(vec4(1.0, 0.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0), value);

    gl_FragColor = color;

}