precision mediump float;

varying float v_elevation_x;

uniform vec3 u_color_a;
uniform vec3 u_color_b;
uniform float u_color_offset;
uniform float u_color_mult;

void main(void) {
    float colorMix = (u_color_offset + v_elevation_x) * u_color_mult;

    vec3 colorC = mix(u_color_a, u_color_b, colorMix);

    gl_FragColor = vec4(colorC, 1.0);
}