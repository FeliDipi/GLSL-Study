uniform float color_scale;
uniform float color_grad_height;
uniform vec4 top_color;
uniform vec4 bot_color;
uniform float grass_roughness;

varying vec3 vert;
varying float current_wind;

float sclamp(float f, float sc) {
    return clamp(((f - 0.5) * sc) + 0.5, 0.0, 1.0);
}

void main() {
    vec3 albedo = mix(bot_color.rgb, top_color.rgb, (vert.y + color_grad_height) * color_scale);
    float roughness = clamp(1.0 - (sclamp(current_wind, 0.8) * grass_roughness), 0.2, 1.0);

    gl_FragColor = vec4(albedo, 1.0); // Cambiar si necesitas roughness y specular
}
