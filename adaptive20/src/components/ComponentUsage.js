import * as React from "react";
import AdaptiveCardView from 'reactxp-adaptivecards/';
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

class ComponentUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      componentDictionary: [
        {
          url: "https://adaptivecards.io/components/article",
          template: `{
            "url": "https://adaptivecards.io/components/article",
            "layout": {
              "default": [
                {
                  "type": "Image",
                  "url": "{{og_image[0]}}",
                  "size": "auto"
                },
                {
                  "type": "TextBlock",
                  "text": "{{headline}}",
                  "wrap": true,
                  "maxLines": 1,
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "{{description}}",
                  "wrap": true,
                  "maxLines": 2,
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_site_name[0]}}",
                  "wrap": false,
                  "isSubtle": true,
                  "size": "small"
                }
              ]
            }
          }`
        },
        {
          url: "https://adaptivecards.io/components/address",
          template: `{
            "url": "https://adaptivecards.io/components/address",
            "layout": {
              "default": [
                {
                  "type": "TextBlock",
                  "text": "{{telephone}} · {{address.streetAddress}} \\n{{address.addressLocality}}, {{address.addressRegion}} {{address.postalCode}}",
                  "wrap": true,
                  "maxLines": 2,
                  "spacing": "none",
                  "isSubtle": true
                }
              ],
              "compact": [
                {
                  "type": "TextBlock",
                  "text": "{{telephone}} · {{address.addressLocality}}, {{address.addressRegion}}",
                  "wrap": true,
                  "maxLines": 2,
                  "spacing": "none",
                  "isSubtle": true
                }
              ],
              "phone": [
                {
                  "type": "TextBlock",
                  "text": "{{telephone}}",
                  "spacing": "none",
                  "isSubtle": true
                }
              ]
            }
          }`
        },
        {
          url: "https://adaptivecards.io/components/restaurant",
          template: `{
            "url": "http://adaptivecards.io/components/restaurant",
            "layout": {
              "default": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "size": "auto",
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
                          "text": "{{name}}",
                          "weight": "bolder",
                          "size": "medium"
                        },
                        {
                          "type": "TextBlock",
                          "text": "$fn_starize({{aggregateRating.ratingValue}}) {{aggregateRating.reviewCount}} reviews",
                          "isSubtle": true
                        },
                        {
                          "type": "TextBlock",
                          "text": "Price range: {{priceRange}}",
                          "spacing": "none"
                        },
                        {
                          "type": "Data",
                          "data": {
                            "telephone": "{{telephone}}",
                            "address": "{{address}}"
                          },
                          "template": "https://adaptivecards.io/components/address",
                          "layout": "default"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "ActionSet",
                  "actions": [
                    {
                      "type": "Action.OpenUrl",
                      "url": "{{og_url[0]}}",
                      "title": "Website"
                    },
                    {
                      "type": "Action.OpenUrl",
                      "url": "https://www.bing.com/maps",
                      "title": "Direction"
                    }
                  ]
                }
              ],
              "hero": [
                {
                  "type": "Image",
                  "url": "{{image}}",
                  "size": "auto"
                },
                {
                  "type": "TextBlock",
                  "text": "{{name}}",
                  "weight": "bolder",
                  "size": "large"
                },
                {
                  "type": "ColumnSet",
                  "spacing": "none",
                  "columns": [
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "$fn_starize({{aggregateRating.ratingValue}}) stars, {{aggregateRating.reviewCount}} reviews",
                          "isSubtle": true
                        }
                      ]
                    },
                    {
                      "type": "Column",
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "Price range: {{priceRange}}",
                          "spacing": "none"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "Data",
                  "data": {
                    "telephone": "{{telephone}}",
                    "address": "{{address}}"
                  },
                  "template": "https://adaptivecards.io/components/address",
                  "layout": "default"
                }
              ],
              "compact": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "size": "auto",
                      "width": 1,
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
                      "width": 3,
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "{{name}}",
                          "weight": "bolder",
                          "size": "medium"
                        },
                        {
                          "type": "ColumnSet",
                          "spacing": "none",
                          "columns": [
                            {
                              "type": "Column",
                              "items": [
                                {
                                  "type": "TextBlock",
                                  "text": "$fn_starize({{aggregateRating.ratingValue}}), {{aggregateRating.reviewCount}} reviews",
                                  "isSubtle": true
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "TextBlock",
                          "text": "Price range: {{priceRange}}",
                          "spacing": "none"
                        }
                      ]
                    }
                  ]
                }
              ],
              "new": [
                {
                  "type": "Container",
                  "image": {
                    "type": "Image",
                    "url": "{{image}}",
                    "size": "auto",
                    "placement": "left"
                  },
                  "items": [
                    {
                      "type": "TextBlock",
                      "text": "{{name}}",
                      "weight": "bolder",
                      "size": "medium"
                    },
                    {
                      "type": "TextBlock",
                      "text": "$fn_starize({{aggregateRating.ratingValue}}) {{aggregateRating.reviewCount}} reviews",
                      "isSubtle": true
                    },
                    {
                      "type": "TextBlock",
                      "text": "Price range: {{priceRange}}",
                      "spacing": "none"
                    },
                    {
                      "type": "Data",
                      "data": {
                        "telephone": "{{telephone}}",
                        "address": "{{address}}"
                      },
                      "template": "https://adaptivecards.io/components/address",
                      "layout": "default"
                    }
                  ],
                  "actions": [
                    {
                      "type": "Action.OpenUrl",
                      "url": "{{og_url[0]}}",
                      "title": "Website"
                    }
                  ]
                },
                {
                  "type": "ActionSet",
                  "actions": [
                    {
                      "type": "Action.OpenUrl",
                      "url": "https://www.bing.com/maps",
                      "title": "Direction"
                    }
                  ]
                }
              ]
            }
          }`
        },
        {
          url: "https://adaptivecards.io/components/restaurantList",
          template: `{
            "url": "https://adaptivecards.io/components/restaurantList",
            "layout": {
              "default": {
                "{{#each restaurants}}": {
                  "type": "Data",
                  "data": "{{this}}",
                  "template": "https://adaptivecards.io/components/restaurant",
                  "layout": "compact"
                }
              }
            }
          }`
        },
        {
          url: "https://adaptivecards.io/components/video",
          template: `{
            "url": "https://adaptivecards.io/components/video",
            "layout": {
              "default": [
                {
                  "type": "Image",
                  "url": "{{og_image[0]}}",
                  "size": "auto"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_title[0]}}",
                  "wrap": true,
                  "maxLines": 1,
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_description[0]}}",
                  "wrap": true,
                  "maxLines": 2,
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_site_name[0]}}",
                  "wrap": false,
                  "isSubtle": true,
                  "size": "small"
                }
              ]
            }
          }`
        },
        {
          url: "https://adaptivecards.io/components/hotel",
          template: `{
            "url": "https://adaptivecards.io/components/hotel",
            "layout": {
              "default": [
                {
                  "type": "ColumnSet",
                  "columns": [
                    {
                      "type": "Column",
                      "size": "auto",
                      "width": 1,
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
                      "width": 3,
                      "items": [
                        {
                          "type": "TextBlock",
                          "text": "{{name}}",
                          "weight": "bolder",
                          "size": "medium"
                        },
                        {
                          "type": "ColumnSet",
                          "spacing": "none",
                          "columns": [
                            {
                              "type": "Column",
                              "items": [
                                {
                                  "type": "TextBlock",
                                  "text": "{{aggregateRating.ratingValue}} stars, {{aggregateRating.reviewCount}} reviews",
                                  "isSubtle": true
                                }
                              ]
                            }
                          ]
                        },
                        {
                          "type": "TextBlock",
                          "text": "+14252980374 · 16505 Redmond Way Bldg\\nBldg B, Ste A",
                          "text": "{{address.streetAddress}} \\n{{address.addressLocality}}, {{address.addressRegion}}",
                          "spacing": "none",
                          "isSubtle": true
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
          url: "https://adaptivecards.io/components/default",
          template: `{
            "url": "https://adaptivecards.io/components/default",
            "layout": {
              "default": [
                {
                  "type": "Image",
                  "url": "{{og_image[0]}}",
                  "size": "auto"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_title[0]}}",
                  "wrap": true,
                  "maxLines": 1,
                  "weight": "bolder"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_description[0]}}",
                  "wrap": true,
                  "maxLines": 2,
                  "spacing": "none"
                },
                {
                  "type": "TextBlock",
                  "text": "{{og_site_name[0]}}",
                  "wrap": false,
                  "isSubtle": true,
                  "size": "small"
                }
              ]
            }
          }`
        }
      ],
      activeScenarioKey: 'restaurant',
      scenarios: fromJS({
        restaurant: {
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "TextBlock",
                "text": "Here's the best **Mexican restaraunt** near **Redmond, WA**..."
              },
              {
                "type": "Data",
                "data": "https://www.yelp.com/biz/la-isla-cuisine-redmond-2",
                "template": "https://adaptivecards.io/components/restaurant",
                "layout": "new"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        restaurantList: {
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "TextBlock",
                "text": "These restaurants all have **4 stars** in your area"
              },
              {
                "type": "Container",
                "items": [
                  {
                    "type": "Data",
                    "data": "https://www.yelp.com/biz/la-isla-cuisine-redmond-2",
                    "template": "https://adaptivecards.io/components/restaurant",
                    "layout": "compact"
                  },
                  {
                    "type": "Data",
                    "data": "https://www.yelp.com/biz/pho-hoa-redmond-2",
                    "template": "https://adaptivecards.io/components/restaurant",
                    "layout": "compact"
                  },
                  {
                    "type": "Data",
                    "data": "https://www.yelp.com/biz/kerloo-cellars-seattle",
                    "template": "https://adaptivecards.io/components/restaurant",
                    "layout": "compact"
                  }
                ]
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        restaurantListCompact: {
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "TextBlock",
                "text": "These restaurants all have **4 stars** in your area"
              },
              {
                "type": "Data",
                "data": {
                  "restaurants": [
                    "https://www.yelp.com/biz/la-isla-cuisine-redmond-2",
                    "https://www.yelp.com/biz/pho-hoa-redmond-2",
                    "https://www.yelp.com/biz/kerloo-cellars-seattle"
                  ]
                },
                "template": "https://adaptivecards.io/components/restaurantList"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        article: {
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Data",
                "data": "https://www.vox.com/culture/2017/8/28/16205048/game-of-thrones-season-7-cersei-daenerys-jon-snow",
                "template": "https://adaptivecards.io/components/article",
                "layout": "default"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        video: {
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                  "type": "Data",
                  "data": "https://www.youtube.com/watch?v=7PCkvCPvDXk",
                  "template": "https://adaptivecards.io/components/video",
                  "layout": "default"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        },
        hotel: {
          adaptiveCard: `{
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Data",
                "data": "https://www.orbitz.com/Chicago-Hotels-Hyatt-Regency-McCormick-Place.h84736.Hotel-Information",
                "template": "https://adaptivecards.io/components/hotel",
                "layout": "default"
              }
            ]
          }`,
          hostConfig: HostConfigs.windowsNotifications
        }
      }),
      fnDictionary: {
        starize: function (starCount) {
          return '★'.repeat(starCount);
        }
      }
    };
  }

  selectScenarioKey = (event) => {
    const target = event.target;
    this.setState(({ activeScenarioKey }) => ({ activeScenarioKey: target.value }));
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
          componentDictionary={this.state.componentDictionary}
          fnDictionary={this.state.fnDictionary}
          eventEmitter={{
            onExecuteAction: payload => alert(payload.url)
          }}
          styles={{
            "ac-pushButton": {
              fontWeight: 600,
              paddingTop: 4,
              paddingBottom: 4,
              fontFamily: `"Segoe UI", sans-serif`,
              fontSize: "14px",
              color: "#0078D7",
              border: "1px solid #B2E0FF",
            }
          }}
        />
      </ErrorBoundary>
    ) : (
        <p>Invalid Card</p>
      );

    return (
      <div className="ComponentUsage">
        <div className="w3-row">
          <select value={this.state.activeScenarioKey} onChange={this.selectScenarioKey}>
            {this.state.scenarios.keySeq().map((scenarioKey) => (
              <option key={scenarioKey} value={scenarioKey}>{scenarioKey}</option>
            ))}
          </select>
        </div>
        <div className="w3-row">
          <div className="w3-half ComponentUsage-section">
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
          <div className="w3-half ComponentUsage-section">
            <h2>Live Card preview</h2>
            {liveCardComponent}
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentUsage;
