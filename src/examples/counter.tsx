import { createSignal } from "npm:solid-js";

export function Counter() {
  const [count, setCount] = createSignal(0);

  return (
    <view
      style={{
        flexDirection: "row",
        gap: 15,
        alignItems: "center",
      }}
    >
      <button
        onClick={() => setCount(Math.max(count() - 1, 0))}
        style={{
          borderRadius: 5,
          padding: 10,
          fontSize: 20,
        }}
        bezelStyle={NSBezelStyle.TexturedSquare}
      >
        -
      </button>

      <text
        style={{
          fontSize: 24,
        }}
      >
        {count()}
      </text>

      <button
        onClick={() => setCount(count() + 1)}
        style={{
          borderRadius: 5,
          padding: 10,
          fontSize: 20,
        }}
        bezelStyle={NSBezelStyle.TexturedSquare}
      >
        +
      </button>
    </view>
  );
}
