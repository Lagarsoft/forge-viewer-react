import React from "react";

export interface ForgeViewerProps {
  label: string;
}

const ForgeViewer = (props: ForgeViewerProps) => {
  return <button>{props.label}</button>;
};

export default ForgeViewer;