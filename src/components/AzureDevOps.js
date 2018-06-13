import * as React from "react";
import { fromJS } from "immutable";
import * as ST from "stjs";
import AdaptiveCardView from 'reactxp-adaptivecards';

/** TODO
 *  - Create real use cases for articles, videos, and restaurants
 *  - Organize cards
 */

class AzureDevOps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: fromJS([
        {
          title: 'Basic',
          content: `{
            "title": "Publish Adaptive Card schema",
            "subtitle": "Now that we have defined the main rules and features of the format, we need to produce a schema and publish it to GitHub. The schema will be the starting point of our reference documentation.",
            "image": "https://pbs.twimg.com/profile_images/3647943215/d7f12830b3c17a5a9e4afcc370e3a37e_400x400.jpeg"
          }`
        },
        {
          title: 'Schema.Org',
          content: `{
            "a_title": "Sea Otter",
            "a_subtitle": "What a wonderful creature!",
            "a_url": "https://adaptivecards.io",
            "a_image": "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg",
            "a_category": "Animal",
            "a_attribution": "http://thepixelweb.com/wp-content/uploads/2012/08/Microsoft-new-logo.png",
            "images": [
              {
                "description": "Otter",
                "url": "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg"
              },
              {
                "description": "MS",
                "url": "http://thepixelweb.com/wp-content/uploads/2012/08/Microsoft-new-logo.png"
              }
            ]
          }`
        }
      ]),
      selectedRawDataIndex: 1,
      templates: fromJS([
        {
          title: 'Identity',
          content: `{
            "header": {
              "title": "{{a_title}}",
              "subtitle": "{{a_subtitle}}",
              "attribution": "{{a_attribution}}",
              "image": "{{a_image}}"
            },
            "body": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{images[0].description}}"
                      },
                      {
                        "type": "Image",
                        "url": "{{images[0].url}}"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{images[1].description}}"
                      },
                      {
                        "type": "Image",
                        "url": "{{images[1].url}}"
                      }
                    ]
                  }
                ]
              }
            ],
            "actions": [
              {
                "type": "Action.OpenUrl",
                "title": "Source",
                "url": "{{a_url}}"
              }
            ]
          }`
        }
      ]),
      selectedTemplateIndex: 0,
      hosts: fromJS([
        {
          title: 'Timeline',
          layout: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "body": [
              {
                "type": "Container",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "{{header.title}}",
                    "size": "large",
                    "weight": "bolder",
                    "color": "dark"
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{header.subtitle}}",
                    "size": "medium",
                    "color": "dark"
                  },
                  {
                    "type": "Container",
                    "items": "{{body}}"
                  },
                  {
                    "type": "Image",
                    "url": "{{header.attribution}}",
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
          }`,
          config: {
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
        },
        {
          title: 'Small',
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
                        "horizontalAlignment": "left",
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
                        "size": "large",
                        "weight": "bolder",
                        "color": "dark"
                      },
                      {
                        "type": "TextBlock",
                        "text": "{{header.subtitle}}",
                        "size": "medium",
                        "color": "dark",
                        "maxLines": 1
                      }
                    ]
                  }
                ]
              }
            ]
          }`,
          config: {
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
        },
        {
          title: 'Line Item',
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
                        "horizontalAlignment": "left",
                        "size": "small"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{header.title}}",
                        "size": "large",
                        "weight": "bolder",
                        "color": "dark"
                      }
                    ]
                  }
                ]
              }
            ]
          }`,
          config: {
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
      ])
    };
  }

  onRawDataChange = (index) => (event) => {
    const { rawData } = this.state;
    this.setState({
      rawData: rawData.setIn([index, 'content'], event.target.value)
    });
  }

  onRawDataClick = (index) => () => {
    this.setState({
      selectedRawDataIndex: index
    });
  }

  onTemplateClick = (index) => () => {
    this.setState({
      selectedTemplateIndex: index
    });
  }

  generateCards = (payload) =>
    this.state.hosts.map(h => ST.select(payload)
      .transformWith(JSON.parse(h.get('layout')))
      .root()).toJS()

  render() {
    const {
      rawData, selectedRawDataIndex,
      templates, selectedTemplateIndex,
      hosts
    } = this.state;

    const currentRawData = JSON.parse(rawData.getIn([selectedRawDataIndex, 'content']));
    const currentTemplate = JSON.parse(templates.getIn([selectedTemplateIndex, 'content']));

    const payload = ST.select(currentRawData).transformWith(currentTemplate).root();

    const finalCards = this.generateCards(payload);

    return (
      <div className="w3-row">
        <div
          className="w3-quarter w3-container"
          style={{
            overflowY: "scroll",
            maxHeight: "811px"
          }}
        >
          <h2>Azure Data</h2>
          <ul>
            {rawData.map((d, i) => (
              <li
                key={d.get('title')}
              >
                <button onClick={this.onRawDataClick(i)}>
                  {d.get('title')}
                </button>
              </li>
            ))}
          </ul>
          <textarea
            value={JSON.stringify(currentRawData, null, 2)}
            onChange={this.onRawDataChange(selectedRawDataIndex)}
            style={{
              overflowY: "scroll"
            }}
          />
        </div>
        <div
          className="w3-quarter w3-container"
          style={{
            overflowY: "scroll",
            maxHeight: "811px"
          }}
        >
          <h2>Templates</h2>
          <ul>
            {templates.map((t, i) => (
              <li
                key={t.get('title')}
              >
                <button onClick={this.onTemplateClick(i)}>
                  {t.get('title')}
                </button>
              </li>
            ))}
          </ul>
          <textarea
            value={JSON.stringify(currentTemplate, null, 2)}
            readOnly={true}
            style={{
              overflowY: "scroll",
              maxHeight: "300px"
            }}
          />
          <textarea
            value={JSON.stringify(payload, null, 2)}
            readOnly={true}
            style={{
              overflowY: "scroll",
              maxHeight: "300px"
            }}
          />
        </div>
        <div
          className="w3-half w3-container"
          style={{
            overflowY: "scroll",
            maxHeight: "811px"
          }}
        >
          <h2>Cards</h2>
          {finalCards.map((card, i) => (
            <div
              style={{
                display: "inline-block",
                padding: 8
              }}
              key={i}
            >
              <AdaptiveCardView
                adaptiveCard={card}
                hostConfigs={hosts.getIn([i, 'config']).toJS()}
                maxWidth={250}
                imagePrefetchingEnabled={true}
              />
              {/* <textarea
                value={JSON.stringify(card, null, 2)}
                readOnly={true}
                style={{
                  overflowY: "scroll",
                  maxHeight: "800px"
                }}
              /> */}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AzureDevOps;
