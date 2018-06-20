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

/** Features:
 * - AdaptiveCard.Template adds knownLayouts so template authors can toggle between layouts using Container isVisible
 * - HostConfig adds knownLayouts to describe different layouts (expanded/collapsed). Using isVisible binding to toggle elements based on current layout
 * - Bind from different data sources
 *   + from "card" (with header, body, actions, extensions)
 *   + from "hostConfig"
 *   + from "viewState" as a prop (type string, only used to toggle host's viewState)
 *     . Change "layout" in host layout to "viewState"
 */

/** TODO:
 * - Action.ToggleViewState
 * - Add host layout, knownViewStates, and default viewState into normal host config
 * - HostConfig adds knownExtensions, for card author to auto-support on a plain-host
 *   + AdaptiveCard.Template can bind to HostConfig.knownExtensions to provide a default rendering
 */
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
                  "url": "https://microsoft.com",
                  "attribution": {
                    "name": "MSFT"
                  }
                },
                {
                  "name": "Sea Otter",
                  "category": "Animal",
                  "imageUrl": "https://seaotters.com/wp-content/uploads/2012/03/628x353-otter-cu-yawn.jpg",
                  "url": "https://en.wikipedia.org/wiki/Sea_otter",
                  "attribution": {
                    "name": "Animal Planet"
                  }
                }
              ]
            },
            "body": [
              {
                "type": "HostedCard",
                "data": "{{entities[0]}}",
                "templateUrl": "adaptivecards.io/templates?id=test"
              },
              { 
                "type": "HostedCard",
                "data": "{{entities[1]}}",
                "layout": "compact",
                "templateUrl": "adaptivecards.io/templates?id=test"
              }
            ]
          }`,
          templateDictionary: {
            'adaptivecards.io/templates?id=test': `{
              "type": "AdaptiveCard",
              "version": "1.0",
              "speak": "This is {{name}}",
              "fallbackText": "This is {{name}}",
              "knownLayouts": ["default", "compact"],
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
                  "isVisible": ["default"],
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "Default URL: {{url}}"
                        }
                      ]
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "Default {{category}}",
                          "weight": "bold"
                        }
                      ]
                    }
                  ]
                },
                {
                  "isVisible": ["compact"],
                  "type": "Container",
                  "items": [
                    {
                      "type": "TextBlock",
                      "text": "Compact URL: {{url}}"
                    },
                    {
                      "type": "TextBlock",
                      "text": "Compact {{category}}",
                      "weight": "bold"
                    }
                  ]
                },
                {
                  "type": "TextBlock",
                  "text": "Everywhere URL: {{url}}"
                }
              ],
              "extensions": {
                "attribution": "{{attribution}}",
                "unsupported": "Should not show"
              }
            }`
          }
        }
      }),
      hosts: [
        {
          title: 'Notifications',
          config: HostConfigs.windowsNotifications,
          viewState: 'expanded',
          layout: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "knownExtensions": ["attribution"],
            "knownViewStates": ["collapsed", "expanded"],
            "body": [
              {
                "type": "Container",
                "isVisible": ["expanded"],
                "items": [
                  {
                    "type": "Image",
                    "url": "{{card.header.image}}",
                    "size": "auto"
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{card.header.title}}",
                    "size": "large",
                    "weight": "bolder",
                    "color": "dark"
                  },
                  {
                    "type": "TextBlock",
                    "text": [{
                      "{{#if 'subtitle' in this.card.header}}": "{{card.header.subtitle}}"
                    }, {
                      "{{#else}}": null
                    }],
                    "size": "medium",
                    "color": "dark"
                  },
                  {
                    "type": "Container",
                    "items": "{{card.body}}"
                  },
                  {
                    "type": "Image",
                    "url": [{
                      "{{#if 'attribution' in this.card.header}}": "{{card.header.attribution}}"
                    }, {
                      "{{#else}}": null
                    }],
                    "horizontalAlignment": "left",
                    "size": "medium"
                  },
                  {
                    "type": "TextBlock",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{card.extensions.unsupported}}",
                        "size": "small"
                      }
                    ]
                  },
                  {
                    "type": "ActionSet",
                    "actions": "{{card.actions}}"
                  }
                ]
              },
              {
                "type": "ColumnSet",
                "isVisible": ["collapsed"],
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "Image",
                        "url": "{{card.header.image}}",
                        "size": "medium"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{card.header.title}}",
                        "weight": "bolder",
                        "color": "dark"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{card.extensions.attribution.name}}",
                        "size": "small"
                      }
                    ]
                  }
                ]
              }
            ]
          }`
        },
        {
          title: 'Timeline',
          config: HostConfigs.windowsTimeline,
          viewState: 'collapsed',
          layout: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "knownViewStates": ["collapsed"],
            "body": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "Image",
                        "url": "{{card.header.image}}",
                        "size": "medium"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{card.header.title}}",
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
      <div className="w3-half" style={{ padding: 2 }} key={host.title}>
        <ErrorBoundary>
          <AdaptiveCardView
            adaptiveCard={cardPayload}
            hostConfig={host.config}
            hostLayout={host.layout}
            viewState={host.viewState}
            templateDictionary={scenario.get('templateDictionary').toJS()}
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
