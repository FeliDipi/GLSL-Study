uniform float sway;
uniform float sway_;
uniform float sway_pow;
uniform float sway_time_scale;
uniform vec3 sway_dir;
uniform sampler2D sway_noise; // Asume un ruido adecuado cargado como textura
uniform vec3 grass_scale;
uniform float sway_noise_sampeling_scale;
uniform float time;

varying float current_wind;
varying vec3 vert;

float sclamp(float f, float sc) {
    return clamp(((f - 0.5) * sc) + 0.5, 0.0, 1.0);
}

void main() {
    vec3 scaled_vertex = position * grass_scale;
    vert = scaled_vertex;

    vec4 sway_dir_local = vec4(sway_dir, 0.0);
    vec3 world_vertex = (modelMatrix * vec4(scaled_vertex, 1.0)).xyz;

    current_wind = texture2D(sway_noise, normalize(sway_dir.xz) * (-time * sway_time_scale) + world_vertex.xz * sway_noise_sampeling_scale).x;

    vec3 sway_effect = normalize(sway_dir_local.xyz) * sway * scaled_vertex.y * sclamp(current_wind, 1.5);
    scaled_vertex += sway_effect;
    scaled_vertex.y -= sway_ * abs(pow(scaled_vertex.x, sway_pow));

    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(scaled_vertex, 1.0);
}
