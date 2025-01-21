precision mediump float;

varying vec3 vNormal;
varying vec3 vPosition;
varying vec2 vUv;

uniform vec3 uLightPosition;

void main(void) {

    vec3 lightDirection = normalize(uLightPosition - vPosition);
    vec3 viewDirection = normalize(-vPosition);
    vec3 reflectDirection = reflect(-lightDirection, vNormal);

    vec2 uv = vUv;

    uv.x = fract(uv.x * 40.0);
    uv.x = smoothstep(0.75, 0.75, uv.x);

    vec3 color = mix(vec3(0.0, 0.0, 0.25), vec3(0.564, 0.275, 0.894), uv.x);
    vec3 specularColor = vec3(0.048171, 0.9131, 0.158961);
    vec3 fresnelColor = vec3(1.0, 0.0, 0.796);

    float fresnelTerm = (1.0 + min(dot(vPosition / 3.0, normalize(vNormal)), 0.0));

    float specularTerm = pow(max(dot(viewDirection, reflectDirection), 0.0), 1.0);

    vec3 specular = vec3(1.0, 1.0, 1.0) * specularTerm * specularColor * uv.x;
    vec3 fresnel = vec3(1.0, 1.0, 1.0) * fresnelTerm * fresnelColor;

    vec3 finalColor = fresnel + specular + color;

    gl_FragColor = vec4(finalColor, 1.0);
}
