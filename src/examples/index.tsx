import { getSolidLogo } from "../pages/common.ts";

export default function Examples() {
  return (
    <view
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <view
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
        }}
      >
        <image
          style={{
            width: 50,
            height: 50,
          }}
          stretch="aspectFit"
          src={getSolidLogo()}
        >
        </image>
        <text
          style={{
            fontSize: 18,
            marginLeft: 8,
          }}
        >
          Solid Desktop Examples
        </text>
      </view>
      <view
        style={{
          backgroundColor: "#efefef",
          borderRadius: 10,
          marginLeft: 16,
          marginRight: 16,
          padding: 10,
        }}
      >
        <text
          style={{
            fontSize: 14,
            color: "#999",
          }}
        >
          Play with the examples to learn how to build macOS apps with Solid and
          NativeScript.
        </text>
      </view>
    </view>
  );
}
