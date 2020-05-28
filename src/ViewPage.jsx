import React from "react";
import { useSpring, animated } from "react-spring";
import clamp from "lodash/clamp";
import { useGesture } from "react-with-gesture";
import "./App.css";

function Pull() {
  const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
  const bind = useGesture(({ down, delta, velocity }) => {
    velocity = clamp(velocity, 1, 8);
    set({
      xy: down ? delta : [0, 0],
      config: { mass: velocity, tension: 120 * velocity, friction: 10 },
    });
  });
  return (
    <div className='Pull'>
      <animated.div
        {...bind()}
        style={{
          transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`),
        }}
      />
      <svg>
        <filter id='goo'>
          <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='30' />
          <feColorMatrix
            in='blur'
            values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 30 -7'
          />
        </filter>
      </svg>
    </div>
  );
}

export default Pull;
