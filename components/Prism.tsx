import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Prism.css';

type PrismProps = {
  height?: number;
  baseWidth?: number;
  animationType?: 'rotate' | '3drotate' | 'hover';
  glow?: number;
  offset?: { x: number; y: number };
  noise?: number;
  transparent?: boolean;
  scale?: number;
  hueShift?: number;
  colorFrequency?: number;
  timeScale?: number;
};

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform float uHeight;
  uniform float uBaseHalf;
  uniform mat3 uRot;
  uniform int uUseBaseWobble;
  uniform float uGlow;
  uniform vec2 uOffsetPx;
  uniform float uNoise;
  uniform float uSaturation;
  uniform float uScale;
  uniform float uHueShift;
  uniform float uColorFreq;
  uniform float uBloom;
  uniform float uCenterShift;
  uniform float uInvBaseHalf;
  uniform float uInvHeight;
  uniform float uMinAxis;
  uniform float uPxScale;
  uniform float uTimeScale;

  vec4 tanh4(vec4 x) {
    vec4 e2x = exp(2.0 * x);
    return (e2x - 1.0) / (e2x + 1.0);
  }

  float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  float sdOctaAnisoInv(vec3 p) {
    vec3 q = vec3(abs(p.x) * uInvBaseHalf, abs(p.y) * uInvHeight, abs(p.z) * uInvBaseHalf);
    float m = q.x + q.y + q.z - 1.0;
    return m * uMinAxis * 0.5773502691896258;
  }

  float sdPyramidUpInv(vec3 p) {
    float oct = sdOctaAnisoInv(p);
    float halfSpace = -p.y;
    return max(oct, halfSpace);
  }

  mat3 hueRotation(float a) {
    float c = cos(a), s = sin(a);
    mat3 W = mat3(
      0.299, 0.587, 0.114,
      0.299, 0.587, 0.114,
      0.299, 0.587, 0.114
    );
    mat3 U = mat3(
       0.701, -0.587, -0.114,
      -0.299,  0.413, -0.114,
      -0.300, -0.588,  0.886
    );
    mat3 V = mat3(
       0.168, -0.331,  0.500,
       0.328,  0.035, -0.500,
      -0.497,  0.296,  0.201
    );
    return W + U * c + V * s;
  }

  void main() {
    vec2 f = (gl_FragCoord.xy - 0.5 * iResolution.xy - uOffsetPx) * uPxScale;
    float z = 5.0;
    float d = 0.0;
    vec3 p;
    vec4 o = vec4(0.0);
    mat2 wob = mat2(1.0);

    if (uUseBaseWobble == 1) {
      float t = iTime * uTimeScale;
      float c0 = cos(t + 0.0);
      float c1 = cos(t + 33.0);
      float c2 = cos(t + 11.0);
      wob = mat2(c0, c1, c2, c0);
    }

    for (int i = 0; i < 100; i++) {
      p = vec3(f, z);
      p.xz = p.xz * wob;
      p = uRot * p;
      vec3 q = p;
      q.y += uCenterShift;
      d = 0.1 + 0.2 * abs(sdPyramidUpInv(q));
      z -= d;
      o += (sin((p.y + z) * uColorFreq + vec4(0.0, 1.0, 2.0, 3.0)) + 1.0) / d;
    }

    o = tanh4(o * o * (uGlow * uBloom) / 1e5);

    vec3 col = o.rgb;
    float n = rand(gl_FragCoord.xy + vec2(iTime));
    col += (n - 0.5) * uNoise;
    col = clamp(col, 0.0, 1.0);

    float luma = dot(col, vec3(0.2126, 0.7152, 0.0722));
    col = clamp(mix(vec3(luma), col, uSaturation), 0.0, 1.0);

    if (abs(uHueShift) > 0.0001) {
      col = clamp(hueRotation(uHueShift) * col, 0.0, 1.0);
    }

    gl_FragColor = vec4(col, o.a);
  }
`;

const setMat3FromEuler = (yawY: number, pitchX: number, rollZ: number) => {
  const cy = Math.cos(yawY);
  const sy = Math.sin(yawY);
  const cx = Math.cos(pitchX);
  const sx = Math.sin(pitchX);
  const cz = Math.cos(rollZ);
  const sz = Math.sin(rollZ);

  return new THREE.Matrix3().set(
    cy * cz + sy * sx * sz,
    -cy * sz + sy * sx * cz,
    sy * cx,
    cx * sz,
    cx * cz,
    -sx,
    -sy * cz + cy * sx * sz,
    sy * sz + cy * sx * cz,
    cy * cx
  );
};

const Prism = ({
  height = 3.5,
  baseWidth = 5.5,
  animationType = 'rotate',
  glow = 1,
  offset = { x: 0, y: 0 },
  noise = 0.5,
  transparent = true,
  scale = 3.6,
  hueShift = 0,
  colorFrequency = 1,
  timeScale = 0.5,
}: PrismProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new THREE.WebGLRenderer({
      alpha: transparent,
      antialias: false,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.Camera();
    const geometry = new THREE.PlaneGeometry(2, 2);
    const baseHalf = Math.max(0.001, baseWidth) * 0.5;
    const prismHeight = Math.max(0.001, height);

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent,
      depthTest: false,
      depthWrite: false,
      uniforms: {
        iResolution: { value: new THREE.Vector2(1, 1) },
        iTime: { value: 0 },
        uHeight: { value: prismHeight },
        uBaseHalf: { value: baseHalf },
        uUseBaseWobble: { value: animationType === 'rotate' ? 1 : 0 },
        uRot: { value: new THREE.Matrix3() },
        uGlow: { value: Math.max(0, glow) },
        uOffsetPx: { value: new THREE.Vector2(offset.x, offset.y) },
        uNoise: { value: Math.max(0, noise) },
        uSaturation: { value: transparent ? 1.5 : 1 },
        uScale: { value: Math.max(0.001, scale) },
        uHueShift: { value: hueShift },
        uColorFreq: { value: Math.max(0, colorFrequency) },
        uBloom: { value: 1 },
        uCenterShift: { value: prismHeight * 0.25 },
        uInvBaseHalf: { value: 1 / baseHalf },
        uInvHeight: { value: 1 / prismHeight },
        uMinAxis: { value: Math.min(baseHalf, prismHeight) },
        uPxScale: { value: 1 },
        uTimeScale: { value: Math.max(0, timeScale) },
      },
    });

    scene.add(new THREE.Mesh(geometry, material));

    const resize = () => {
      const width = container.clientWidth || 1;
      const heightPx = container.clientHeight || 1;
      renderer.setSize(width, heightPx, false);
      const dpr = renderer.getPixelRatio();
      material.uniforms.iResolution.value.set(width * dpr, heightPx * dpr);
      material.uniforms.uOffsetPx.value.set(offset.x * dpr, offset.y * dpr);
      material.uniforms.uPxScale.value = 1 / ((heightPx * dpr || 1) * 0.1 * Math.max(0.001, scale));
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    const start = performance.now();
    let raf = 0;
    const render = (now: number) => {
      const time = (now - start) * 0.001;
      material.uniforms.iTime.value = time;

      if (animationType === '3drotate') {
        material.uniforms.uRot.value = setMat3FromEuler(time * timeScale * 0.45, Math.sin(time * timeScale) * 0.42, Math.cos(time * timeScale * 0.7) * 0.28);
      } else {
        material.uniforms.uRot.value.identity();
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [
    animationType,
    baseWidth,
    colorFrequency,
    glow,
    height,
    hueShift,
    noise,
    offset.x,
    offset.y,
    scale,
    timeScale,
    transparent,
  ]);

  return <div className="prism-container" ref={containerRef} />;
};

export default Prism;
