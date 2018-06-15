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
            "data": {
              "entities": [
                {
                  "name": "Microsoft",
                  "category": "Company",
                  "imageUrl": "http://thepixelweb.com/wp-content/uploads/2012/08/Microsoft-new-logo.png",
                  "url": "https://microsoft.com"
                },
                {
                  "name": "Sea Otter",
                  "category": "Animal",
                  "imageUrl": "https://seaotters.com/wp-content/uploads/2012/03/628x353-otter-cu-yawn.jpg",
                  "url": "https://en.wikipedia.org/wiki/Sea_otter"
                }
              ]
            },
            "body": [
              {
                "type": "HostedCard",
                "data": "{{entities[0]}}",
                "card": "adaptivecards.io/cards?id=test"
              },
              { 
                "type": "HostedCard",
                "data": "{{entities[1]}}",
                "card": "adaptivecards.io/cards?id=test"
              }
            ]
          }`,
          cardDictionary: {
            'adaptivecards.io/cards?id=test': `{
              "type": "AdaptiveCard",
              "version": "1.0",
              "speak": "This is {{name}}",
              "fallbackText": "This is {{name}}",
              "header": {
                "title": "{{name}}",
                "image": "{{imageUrl}}"
              },
              "actions": [
                {
                  "type": "Action.OpenUrl",
                  "title": "Go to {{name}}",
                  "url": "{{url}}"
                }
              ],
              "body": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "URL: {{url}}"
                        }
                      ]
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock", 
                          "text": "{{category}}",
                          "weight": "bold"
                        }
                      ]
                    }
                  ]
                }
              ]
            }`
          }
        }
      }),
      hosts: [
        {
          title: 'Normal',
          config: HostConfigs.windowsNotifications,
          layout: `{
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
        },
        {
          title: 'List Item',
          config: HostConfigs.windowsNotifications,
          layout: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "Image",
                        "url": "{{header.image}}",
                        "size": "medium"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{header.title}}",
                        "weight": "bolder",
                        "color": "dark"
                      }
                    ]
                  }
                ]
              }
            ]
          }`
        }
      ]
    };
  }

  selectScenarioKey = (event) => {
    const target = event.target;
    this.setState({ activeScenarioKey: target.value });
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

  /* Generate all cards corresponding to each host */
  generateCards = (scenario) => {
    const cardPayload = tryParseJson(scenario.get('adaptiveCard'));

    return cardPayload ? this.state.hosts.map(host => (
      <div className="w3-third" style={{ padding: 2 }}>
        <ErrorBoundary>
          <AdaptiveCardView
            adaptiveCard={cardPayload}
            hostConfig={host.config}
            hostLayout={tryParseJson(host.layout)}
            componentDictionary={scenario.get('cardDictionary').toJS()}
            maxWidth={300}
          />
        </ErrorBoundary>
      </div>
    )) : (<p>Invalid Card Payloada</p>)
  }

  render() {
    const activeScenario = this.state.scenarios.get(this.state.activeScenarioKey);
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
          <div className="w3-quarter Components-section">
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
          <div className="w3-threequarter Components-section">
            <h2>Live Card preview</h2>
            {this.generateCards(activeScenario)}
          </div>
        </div>
      </div>
    );
  }
}

export default HostedAdaptiveCards;
