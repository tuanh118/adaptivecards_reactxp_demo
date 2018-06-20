import * as React from "react";
import "./App.css";

import AdaptiveFrame from './components/AdaptiveFrame';
import Components from './components/Components';
import ComponentUsage from './components/ComponentUsage';
import DevDataBinding from './components/DevDataBinding';
import AzureDevOps from './components/AzureDevOps';
import HostedAdaptiveCards from './components/HostedAdaptiveCards';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      scenarioId: 1
    };
  }

  selectScenarioId = (event) => {
    this.setState({ scenarioId: parseInt(event.target.value, 10) });
  }

  getScenarioFrame = () => {
    switch (this.state.scenarioId) {
      case (1):
        return <AdaptiveFrame />;
      case (2):
        return <Components />;
      case (3):
        return <ComponentUsage />;
      case (4):
        return <DevDataBinding />;
      case (5):
        return <AzureDevOps />;
      case (6):
        return <HostedAdaptiveCards />;
      default:
        return <div>Invalid scenario</div>;
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            <img
              src="http://adaptivecards.io/content/adaptive-card-200.png"
              className="App-logo"
              alt="logo"
            />
            {' Adaptive Cards 2.0 '}
            <select value={this.state.scenarioId} onChange={this.selectScenarioId}>
              <option value={1}>AdaptiveFrame</option>
              <option value={2}>Components</option>
              <option value={3}>Component Usage</option>
              <option value={4}>Developer Data Binding</option>
              <option value={5}>Azure DevOps</option>
              <option value={6}>Hosted Adaptive Cards</option>
            </select>
          </h1>
        </header>
        <div className="w3-row">
          {this.getScenarioFrame()}
        </div>
      </div>
    );
  }
}

export default App;
