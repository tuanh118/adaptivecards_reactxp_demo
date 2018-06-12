import React, { Component } from 'react';
// import AdaptiveCardView, { CustomButtonStyles, CustomTextStyles, CustomViewStyles, Types as ACT } from 'reactxp-adaptivecards';
import AdaptiveCardView from 'reactxp-adaptivecards';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  state = {
    componentDictionary: [
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
      }
    ],
    fnDictionary: {
      starize: function (starCount: number) {
        return '★'.repeat(starCount);
      }
    },
    hostConfig: {
      "choiceSetInputValueSeparator": ",",
      "supportsInteractivity": true,
      "fontFamily": "Segoe UI",
      "spacing": {
        "small": 3,
        "default": 8,
        "medium": 20,
        "large": 30,
        "extraLarge": 40,
        "padding": 10
      },
      "separator": {
        "lineThickness": 1,
        "lineColor": "#EEEEEE"
      },
      "fontSizes": {
        "small": 12,
        "default": 14,
        "medium": 17,
        "large": 21,
        "extraLarge": 26
      },
      "fontWeights": {
        "lighter": 200,
        "default": 400,
        "bolder": 600
      },
      "imageSizes": {
        "small": 40,
        "medium": 80,
        "large": 160
      },
      "containerStyles": {
        "default": {
          "foregroundColors": {
            "default": {
              "default": "#333333",
              "subtle": "#EE333333"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#66000000"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#33000000"
            },
            "accent": {
              "default": "#2E89FC",
              "subtle": "#882E89FC"
            },
            "good": {
              "default": "#54a254",
              "subtle": "#DD54a254"
            },
            "warning": {
              "default": "#c3ab23",
              "subtle": "#DDc3ab23"
            },
            "attention": {
              "default": "#FF0000",
              "subtle": "#DDFF0000"
            }
          },
          "backgroundColor": "#FFFFFF"
        },
        "emphasis": {
          "foregroundColors": {
            "default": {
              "default": "#333333",
              "subtle": "#EE333333"
            },
            "dark": {
              "default": "#000000",
              "subtle": "#66000000"
            },
            "light": {
              "default": "#FFFFFF",
              "subtle": "#33000000"
            },
            "accent": {
              "default": "#2E89FC",
              "subtle": "#882E89FC"
            },
            "good": {
              "default": "#54a254",
              "subtle": "#DD54a254"
            },
            "warning": {
              "default": "#c3ab23",
              "subtle": "#DDc3ab23"
            },
            "attention": {
              "default": "#FF0000",
              "subtle": "#DDFF0000"
            }
          },
          "backgroundColor": "#08000000"
        }
      },
      "actions": {
        "maxActions": 5,
        "spacing": "Default",
        "buttonSpacing": 10,
        "showCard": {
          "actionMode": "Inline",
          "inlineTopMargin": 16,
          "style": "emphasis"
        },
        "preExpandSingleShowCardAction": false,
        "actionsOrientation": "Horizontal",
        "actionAlignment": "Left"
      },
      "adaptiveCard": {
        "allowCustomStyle": false
      },
      "imageSet": {
        "imageSize": "Medium",
        "maxImageHeight": 100
      },
      "factSet": {
        "title": {
          "size": "Default",
          "color": "Default",
          "isSubtle": false,
          "weight": "Bolder",
          "warp": true
        },
        "value": {
          "size": "Default",
          "color": "Default",
          "isSubtle": false,
          "weight": "Default",
          "warp": true
        },
        "spacing": 10
      }
    }
  }

  render() {
    const card = {
      "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
      "type": "AdaptiveCard",
      "version": "1.0",
      "body": [
        {
          "type": "Data",
          "data": "https://www.yelp.com/biz/la-isla-cuisine-redmond-2",
          "template": "https://adaptivecards.io/components/restaurant",
          "layout": "default"
        }
      ]
    };

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to ReactXP</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <AdaptiveCardView
          adaptiveCard={card}
          hostConfigs={this.state.hostConfig}
          componentDictionary={this.state.componentDictionary}
          fnDictionary={this.state.fnDictionary}
          maxWidth={300}
        /*width={ this.state.width }
        maxWidth={ this.props.renderOptions.cardMaxWidth }
        maxHeight={ this.props.renderOptions.cardMaxHeight }
        aspectRatio={ this.props.renderOptions.fixedAspectRatio }
        customButtonStyles={ this._customButtonStyles }
        customTextStyles={ this._customTextStyles }
        customViewStyles={ this._customViewStyles }
        eventEmitter={ this._eventEmitter }
        onExecuteAction={ this._onExecuteAction }*/
        />
      </div>
    );
  }
}

export default App;
