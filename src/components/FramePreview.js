import * as React from "react";

import AdaptiveCardView from "reactxp-adaptivecards";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentWillReceiveProps() {
    this.setState({ hasError: false });
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // console.error(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <p>Unable to render card</p>;
    }
    return this.props.children;
  }
}

export default class FramePreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isGeneratedJsonHidden: true
    };
  }

  toggleGeneratedJsonHidden = () => {
    this.setState(({ isGeneratedJsonHidden }) => ({
      isGeneratedJsonHidden: !isGeneratedJsonHidden
    }));
  }

  render() {
    const { isGeneratedJsonHidden } = this.state;
    const { name, transformedJson, hostConfig, handleSetActive, isInEdit, handleRemoveHost } = this.props;

    return (
      <div
        className="w3-third"
        style={{
          border: `5px solid ${isInEdit ? 'green' : 'gray'}`,
          padding: "8px",
          margin: "1px"
        }}
      >
        <a href="">
          <h1 onClick={handleSetActive}>{name}</h1>
        </a>
        <button onClick={handleRemoveHost}>Remove</button>
        <ErrorBoundary>
          <AdaptiveCardView
            adaptiveCard={transformedJson}
            hostConfig={hostConfig}
          />
        </ErrorBoundary>
        <div className="w3-container">
          <h2 onClick={this.toggleGeneratedJsonHidden}>{`Generated JSON ${isGeneratedJsonHidden ? '+' : '-'}`}</h2>
          <pre style={{ textAlign: "left" }} hidden={isGeneratedJsonHidden}>
            {JSON.stringify(transformedJson, null, 2)}
          </pre>
        </div>
      </div>
    );
  }
}
