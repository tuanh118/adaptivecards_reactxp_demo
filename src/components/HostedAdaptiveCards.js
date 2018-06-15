import * as React from "react";
import AdaptiveCardView from 'reactxp-adaptivecards';
import { fromJS } from 'immutable';

import * as HostConfigs from '../hostConfigs';
import { ErrorBoundary } from './FramePreview';
import "./Components.css";

function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return undefined;
  }
}

class HostedAdaptiveCards extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScenarioKey: 'localBusiness',
      scenarios: fromJS({
        localBusiness: {
          adaptiveCard: `{ 
            "type": "AdaptiveCard", 
            "version": "1.0", 
            "body": [
              { 
                "type": "HostedCard",
                "card": {
                  "type": "AdaptiveCard",
                  "version": "1.0",
                  "speak": "This business is Microsoft",
                  "fallbackText": "This business is Microsoft",
                  "header": {
                    "title": "Microsoft",
                    "image": "https://microsoft.com/logo.png"
                  },
                  "actions": [
                    {
                      "type": "Action.OpenUrl",
                      "title": "Website",
                      "url": "https://microsoft.com"
                    }
                  ],
                  "body": [
                    {
                      "type": "Image",
                      "url": "https://microsoft.com/logo.png"
                    },
                    {
                      "type": "TextBlock", 
                      "text": "Microsoft" 
                    }
                  ]
                }
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications,
          hostLayout: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Container",
                "items": [
                  {
                    "type": "Image",
                    "url": "{{header.image}}",
                    "size": "auto"
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{header.title}}",
                    "size": "large",
                    "weight": "bolder",
                    "color": "dark"
                  },
                  {
                    "type": "TextBlock",
                    "text": [{
                      "{{#if 'subtitle' in this.header}}": "{{header.subtitle}}"
                    }, {
                      "{{#else}}": null
                    }],
                    "size": "medium",
                    "color": "dark"
                  },
                  {
                    "type": "Container",
                    "items": "{{body}}"
                  },
                  {
                    "type": "Image",
                    "url": [{
                      "{{#if 'attribution' in this.header}}": "{{header.attribution}}"
                    }, {
                      "{{#else}}": null
                    }],
                    "horizontalAlignment": "left",
                    "size": "medium"
                  },
                  {
                    "type": "ActionSet",
                    "actions": "{{actions}}"
                  }
                ]
              }
            ]
          }`
        }
      })
    };
  }

  selectScenarioKey = (event) => {
    const target = event.target;
    this.setState(({ activeScenarioKey }) => ({ activeScenarioKey: target.value }));
  }

  onComponentChange = (event) => {
    const target = event.target;
    this.setState(({ scenarios, activeScenarioKey }) => ({
      scenarios: scenarios.update(activeScenarioKey, s => s.setIn(this.getActiveComponent(s), target.value))
    }));
  }

  onAdaptiveCardChange = (event) => {
    const target = event.target;
    this.setState(({ scenarios, activeScenarioKey }) => ({
      scenarios: scenarios.setIn([activeScenarioKey, 'adaptiveCard'], target.value)
    }));
  }

  render() {
    const activeScenario = this.state.scenarios.get(this.state.activeScenarioKey);

    // Handle invalid Card JSON
    const cardJson = tryParseJson(activeScenario.get('adaptiveCard'));
    const liveCardComponent = cardJson ? (
      <ErrorBoundary>
        <AdaptiveCardView
          adaptiveCard={cardJson}
          hostConfig={activeScenario.get('hostConfig')}
          hostLayout={tryParseJson(activeScenario.get('hostLayout'))}
        />
      </ErrorBoundary>
    ) : (
        <p>Invalid Card</p>
      );

    return (
      <div className="Components">
        <div className="w3-row">
          <select value={this.state.activeScenarioKey} onChange={this.selectScenarioKey}>
            {this.state.scenarios.keySeq().map((scenarioKey) => (
              <option key={scenarioKey} value={scenarioKey}>{scenarioKey}</option>
            ))}
          </select>
        </div>
        <div className="w3-row">
          <div className="w3-third Components-section">
            <h2>{'Component Editor '}</h2>
            <textarea
              value={activeScenario.get('adaptiveCard')}
              onChange={this.onComponentChange}
              style={{
                overflowY: "scroll",
                maxHeight: "800px"
              }}
            />
          </div>
          <div className="w3-third Components-section">
            <h2>Adaptive Card Editor</h2>
            <textarea
              value={activeScenario.get('adaptiveCard')}
              onChange={this.onAdaptiveCardChange}
              style={{
                overflowY: "scroll",
                maxHeight: "800px"
              }}
            />
          </div>
          <div className="w3-third Components-section">
            <h2>Live Card preview</h2>
            {liveCardComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default HostedAdaptiveCards;
