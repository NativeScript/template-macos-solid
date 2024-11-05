import { Component } from "npm:solid-js";

interface SnippetProps {
  component(): JSX.Element;
}

const ContentView: Component<Partial<SnippetProps>> = (props) => {
  return (
    <view
      style={{
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {props.component?.()}
    </view>
  );
};

export default ContentView;
