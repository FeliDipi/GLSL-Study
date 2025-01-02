precision mediump float;

varying float v_elevation_x;

uniform float u_time;
uniform float u_frec_y;
uniform float u_amp_y;

void main() {
    vec4 modelPosition = vec4(position, 1.0);

    float elevationY = sin(modelPosition.y * u_frec_y + u_time) * u_amp_y;

    modelPosition.z += (elevationY + u_amp_y);

    gl_Position = projectionMatrix * modelViewMatrix * modelPosition;

    v_elevation_x = modelPosition.z;
}
