import * as React from "react";
// import { HostConfig, AdaptiveCardView } from 'react-adaptivecards/';
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

class Components extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeScenarioKey: 'localBusiness',
      scenarios: fromJS({
        localBusiness: {
          componentDictionary: [
            {
              url: "https://adaptivecards.io/components/restaurant",
              template: `{
                "url": "https://adaptivecards.io/components/restaurant",
                "layout": {
                  "default": [
                    {
                      "type": "Container",
                      "items": [
                        {
                          "type": "Image",
                          "url": "{{image}}",
                          "size": "stretch",
                          "horizontalAlignment": "center"
                        },
                        {
                          "type": "TextBlock",
                          "text": "{{name}}",
                          "weight": "bolder",
                          "size": "medium"
                        },
                        {
                          "type": "TextBlock",
                          "text": "{{aggregateRating}} Stars",
                          "isSubtle": true
                        },
                        {
                          "type": "TextBlock",
                          "text": "{{description}}"
                        }
                      ]
                    }
                  ],
                  "small": [
                    {
                      "type": "Container",
                      "items": [
                        {
                          "type": "ColumnSet",
                          "columns": [
                            {
                              "type": "Column",
                              "items": [
                                {
                                  "type": "TextBlock",
                                  "text": "{{name}}",
                                  "weight": "bolder",
                                  "size": "medium"
                                },
                                {
                                  "type": "TextBlock",
                                  "text": "{{aggregateRating}} Stars"
                                }
                              ]
                            },
                            {
                              "type": "Column",
                              "items": [
                                {
                                  "type": "Image",
                                  "url": "{{image}}",
                                  "horizontalAlignment": "left"
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }`
            }
          ],
          activeComponentId: 0,
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Data",
                "template": "https://adaptivecards.io/components/restaurant",
                "layout": "small",
                "data": {
                  "@context": "http://schema.org",
                  "@type": "LocalBusiness",
                  "name": "Tartine Bakery",
                  "aggregateRating": 4,
                  "hasMenu": true,
                  "acceptedReservations": true,
                  "image": "https://cdn.vox-cdn.com/thumbor/5R4a20WXPdeL1Zr8spDVkfAp7eg=/0x0:1024x683/920x613/filters:focal(431x261:593x423):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/55810987/eatersea1016_standard_bakery_official.0.0.jpg",
                  "description": "A bakery famous for its handmade organic cookies and fragrant coffee.",
                  "potentialAction": {
                    "@type": "ViewAction",
                    "target": [ "http://www.urbanspoon.com/r/6/92204" ]
                  }
                }
              }
            ],
            "actions": [
              {
                "type": "Action.OpenUrl",
                "title": "Website",
                "url": "http://msn.com"
              },
              {
                "type": "Action.OpenUrl",
                "title": "Directions",
                "url": "http://bing.com/maps"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        receipt: {
          componentDictionary: [
            {
              url: "https://adaptivecards.io/components/receipt",
              template: `{
                "url": "https://adaptivecards.io/components/receipt",
                "layout": {
                  "default": [
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "center",
                      "weight": "bolder",
                      "text": "{{title}}"
                    },
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "center",
                      "size": "small",
                      "text": "{{subtitle}}"
                    },
                    {
                      "type": "FactSet",
                      "facts": {
                        "{{#each purchases}}": {
                          "title": "{{item}}",
                          "value": "\${{price}}"
                        }
                      }
                    },
                    {
                      "type": "FactSet",
                      "facts": [
                        {
                          "type": "Fact",
                          "title": "Tax",
                          "value": "\${{tax}}"
                        },
                        {
                          "type": "Fact",
                          "title": "Total",
                          "value": "\${{total}}"
                        }
                      ]
                    }
                  ]
                }
              }`
            },
            {
              url: "https://adaptivecards.io/components/promos",
              template: `{
                "url": "https://adaptivecards.io/components/promos",
                "layout": {
                  "default": [
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "center",
                      "weight": "bolder",
                      "text": "{{title}}"
                    },
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "center",
                      "size": "small",
                      "text": "{{subtitle}}"
                    },
                    {
                      "type": "FactSet",
                      "facts": {
                        "{{#each promos}}": {
                          "title": "{{name}}",
                          "value": "{{detail}}"
                        }
                      }
                    }
                  ]
                }
              }`
            }
          ],
          activeComponentId: 0,
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Data",
                "template": "https://adaptivecards.io/components/receipt",
                "layout": "list",
                "data": {
                  "@type": "Receipt",
                  "title": "Thanks for shopping with us today!",
                  "subtitle": "Here's a receipt for your records.",
                  "body": "CardElement[]",
                  "actions": "Action[]",
                  "purchases": [
                    {
                      "item": "Eggs",
                      "price": 2.49
                    },
                    {
                      "item": "Bacon",
                      "price": 5.99
                    }
                  ],
                  "tax": 1.8,
                  "total": 7.52
                }
              },
              {
                "type": "Data",
                "template": "https://adaptivecards.io/components/promos",
                "data": {
                  "title": "Promotions next week",
                  "subtitle": "(May 8th)",
                  "promos": [
                    {
                      "name": "Pizza discounts",
                      "detail": "$3 off 2 large pizzas"
                    },
                    {
                      "name": "Organic produce",
                      "detail": "Locally grown tomatoes for $3.99/lb"
                    }
                  ]
                }
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        orderChat: {
          componentDictionary: [
            {
              url: "http://adaptivecards.io/components/business",
              template: `{
                "url": "http://adaptivecards.io/components/business",
                "layout": {
                  "hero": [
                    {
                      "type": "Image",
                      "url": "{{image}}",
                      "size": "stretch",
                      "horizontalAlignment": "center"
                    },
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "left",
                      "weight": "bolder",
                      "size": "large",
                      "text": "{{name}}"
                    },
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "left",
                      "size": "small",
                      "isSubtle": true,
                      "text": "{{rating}} stars"
                    },
                    {
                      "type": "TextBlock",
                      "horizontalAlignment": "left",
                      "text": "{{description}}"
                    }
                  ],
                  "medium": [
                    {
                      "type": "ColumnSet",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "Container",
                              "items": [
                                {
                                  "type": "TextBlock",
                                  "horizontalAlignment": "left",
                                  "weight": "bolder",
                                  "size": "large",
                                  "text": "{{name}}"
                                },
                                {
                                  "type": "TextBlock",
                                  "horizontalAlignment": "left",
                                  "size": "small",
                                  "isSubtle": true,
                                  "text": "{{description}}"
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "Image",
                              "url": "{{image}}",
                              "size": "auto",
                              "horizontalAlignment": "right"
                            }
                          ]
                        }
                      ]
                    }
                  ],
                  "title": [
                    {
                      "type": "ColumnSet",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "text": "{{name}}"
                            }
                          ]
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "isSubtle": true,
                              "size": "small",
                              "text": "{{rating}} stars"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }`
            },
            {
              url: "http://adaptivecards.io/components/item",
              template: `{
                "url": "http://adaptivecards.io/components/item",
                "layout": {
                  "default": [
                    {
                      "type": "ColumnSet",
                      "columns": [
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "Image",
                              "url": "{{image}}",
                              "size": "medium"
                            }
                          ]
                        },
                        {
                          "type": "Column",
                          "items": [
                            {
                              "type": "TextBlock",
                              "horizontalAlignment": "center",
                              "weight": "bolder",
                              "text": "{{name}}"
                            },
                            {
                              "type": "TextBlock",
                              "horizontalAlignment": "center",
                              "size": "small",
                              "text": "\${{price}} / {{unit}}"
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              }`
            }
          ],
          activeComponentId: 0,
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Container",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "Order Summary",
                    "size": "large",
                    "horizontalAlignment": "center"
                  },
                  {
                    "type": "Data",
                    "template": "http://adaptivecards.io/components/business",
                    "layout": "title",
                    "data": {
                      "name": "Tartine Bakery",
                      "rating": 4,
                      "description": "Best bakery in town!",
                      "website": "www.tartine-bakery.com",
                      "image": "https://cdn.vox-cdn.com/thumbor/5R4a20WXPdeL1Zr8spDVkfAp7eg=/0x0:1024x683/920x613/filters:focal(431x261:593x423):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/55810987/eatersea1016_standard_bakery_official.0.0.jpg"
                    }
                  },
                  {
                    "type": "ColumnSet",
                    "columns": [
                      {
                        "type": "Column",
                        "width": 4,
                        "items": [
                          {
                            "type": "Data",
                            "template": "http://adaptivecards.io/components/item",
                            "data": {
                              "name": "Cookies",
                              "price": 0.99,
                              "unit": "each",
                              "image": "https://www.meals.com/imagesrecipes/146208lrg.jpg"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": 1,
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "2"
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": 1,
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "$1.98"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "ColumnSet",
                    "columns": [
                      {
                        "type": "Column",
                        "width": 4,
                        "items": [
                          {
                            "type": "Data",
                            "template": "http://adaptivecards.io/components/item",
                            "data": {
                              "name": "Strawberry Cake",
                              "price": 4.99,
                              "unit": "each",
                              "image": "https://images-gmi-pmc.edge-generalmills.com/cb8f310c-00bc-4aab-aa76-3cb5ff2d9b3b.jpg"
                            }
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": 1,
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "1"
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": 1,
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "$4.99"
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ],
            "actions": [
              {
                "type": "Action.OpenUrl",
                "title": "Pick up",
                "url": "http://www.tartine.com/pick-up"
              },
              {
                "type": "Action.OpenUrl",
                "title": "Deliver",
                "url": "http://www.tartine.com/deliver"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        }
      })
    };
  }

  selectScenarioKey = (event) => {
    const target = event.target;
    this.setState(({ activeScenarioKey }) => ({ activeScenarioKey: target.value }));
  }

  selectComponentKey = (event) => {
    const target = event.target;
    this.setState(({ scenarios, activeScenarioKey }) => ({ scenarios: scenarios.setIn([activeScenarioKey, 'activeComponentId'], parseInt(target.value, 10)) }));
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

  getActiveComponent(scenario) {
    return [
      'componentDictionary',
      scenario.get('activeComponentId'),
      'template'
    ];
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
          componentDictionary={activeScenario.get('componentDictionary').toJS()}
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
            <h2>{'Component Editor '}
              <select value={activeScenario.get('activeComponentId')} onChange={this.selectComponentKey}>
                {activeScenario.get('componentDictionary').map((c, i) => (
                  <option key={c.get('url')} value={i}>{i}</option>
                ))}
              </select>
            </h2>
            <textarea
              value={activeScenario.getIn(this.getActiveComponent(activeScenario))}
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

export default Components;
