import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";

function StarField() {
  const ref = useRef();
  const count = 1200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    ref.current.rotation.y = state.clock.elapsedTime * 0.012;
    ref.current.rotation.x = state.clock.elapsedTime * 0.006;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#4f9eff"
        size={0.022}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.35}
      />
    </Points>
  );
}

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 8], fov: 55 }}
      style={{ position: "absolute", inset: 0 }}
      gl={{ antialias: true, alpha: true }}
    >
      <StarField />
    </Canvas>
  );
}
