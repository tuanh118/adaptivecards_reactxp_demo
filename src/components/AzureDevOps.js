import * as React from "react";
import { fromJS } from "immutable";
import * as ST from "stjs";
import AdaptiveCardView from 'reactxp-adaptivecards';

// import './App.css';

/** TODO
 *  - Organize cards
 */

class AzureDevOps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      azureData: fromJS([
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
            "a_image": "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg",
            "a_category": "Animal",
            "a_attribution": "http://thepixelweb.com/wp-content/uploads/2012/08/Microsoft-new-logo.png"
          }`
        }
      ]),
      selectedAzureDataIndex: 1,
      transformTemplates: fromJS([
        {
          title: 'Identity',
          fn: x => x
        },
        {
          title: 'Reduction',
          fn: ({ title, subtitle, image }) => ({ title, subtitle, image })
        },
        {
          title: 'Schema.Org',
          fn: ({
            a_title,
            a_subtitle,
            a_image,
            a_category,
            a_attribution
          }) => ({
            title: a_title,
            subtitle: a_subtitle,
            image: a_image,
            category: a_category,
            attribution: a_attribution
          })
        }
      ]),
      selectedTransformTemplateIndex: 2,
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
                    "type": "ColumnSet",
                    "columns": [
                      {
                        "type": "Column",
                        "items": [
                          {
                            "type": "TextBlock",
                            "text": "{{title}}",
                            "size": "large",
                            "weight": "bolder",
                            "color": "dark"
                          }
                        ]
                      },
                      {
                        "type": "Column",
                        "width": 30,
                        "items": [
                          {
                            "type": "Image",
                            "url": "{{image}}",
                            "size": "medium",
                            "horizontalAlignment": "right"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{subtitle}}",
                    "size": "medium",
                    "color": "dark"
                  },
                  {
                    "type": "Image",
                    "url": "{{attribution}}",
                    "horizontalAlignment": "left",
                    "size": "medium"
                  },
                  {
                    "type": "ActionSet",
                    "actions": [
                      {
                        "type": "Action.Submit",
                        "title": "Submit",
                        "data": {
                          "imageUrl": "{{image}}"
                        }
                      },
                      {
                        "type": "Action.OpenUrl",
                        "title": "Source",
                        "url": "{{subtitle}}"
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
          title: 'Cortana',
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
                    "url": "{{image}}",
                    "size": "stretch"
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{category}}",
                    "size": "small",
                    "color": "dark"
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{title}}",
                    "size": "large",
                    "weight": "bolder",
                    "color": "dark"
                  },
                  {
                    "type": "TextBlock",
                    "text": "{{subtitle}}",
                    "size": "medium",
                    "color": "dark"
                  },
                  {
                    "type": "Image",
                    "url": "{{attribution}}",
                    "horizontalAlignment": "left",
                    "size": "medium"
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
              "lineColor": "#FF999999"
            },
            "fontSizes": {
              "small": 13,
              "default": 15,
              "medium": 18,
              "large": 20,
              "extraLarge": 24
            },
            "fontWeights": {
              "lighter": 200,
              "default": 400,
              "bolder": 600
            },
            "imageSizes": {
              "small": 40,
              "medium": 68,
              "large": 320
            },
            "containerStyles": {
              "default": {
                "foregroundColors": {
                  "default": {
                    "default": "#FFFFFFFF",
                    "subtle": "#99FFFFFF"
                  },
                  "dark": {
                    "default": "#FF999999",
                    "subtle": "#99999999"
                  },
                  "light": {
                    "default": "#FFFFFFFF",
                    "subtle": "#99FFFFFF"
                  },
                  "accent": {
                    "default": "#FF2E89FC",
                    "subtle": "#CC2E89FC"
                  },
                  "good": {
                    "default": "#CC00FF00",
                    "subtle": "#9900FF00"
                  },
                  "warning": {
                    "default": "#CCFF9800",
                    "subtle": "#99FF9800"
                  },
                  "attention": {
                    "default": "#CCFF0000",
                    "subtle": "#99FF0000"
                  }
                },
                "backgroundColor": "#000000"
              },
              "emphasis": {
                "foregroundColors": {
                  "default": {
                    "default": "#FFFFFFFF",
                    "subtle": "#99FFFFFF"
                  },
                  "dark": {
                    "default": "#FF999999",
                    "subtle": "#99999999"
                  },
                  "light": {
                    "default": "#FFFFFFFF",
                    "subtle": "#99FFFFFF"
                  },
                  "accent": {
                    "default": "#FF2E89FC",
                    "subtle": "#CC2E89FC"
                  },
                  "good": {
                    "default": "#CC00FF00",
                    "subtle": "#9900FF00"
                  },
                  "warning": {
                    "default": "#CCFF9800",
                    "subtle": "#99FF9800"
                  },
                  "attention": {
                    "default": "#CCFF0000",
                    "subtle": "#99FF0000"
                  }
                },
                "backgroundColor": "#33FFFFFF"
              }
            },
            "actions": {
              "maxActions": 5,
              "spacing": "Default",
              "buttonSpacing": 5,
              "showCard": {
                "actionMode": "Inline",
                "inlineTopMargin": 20,
                "style": "emphasis"
              },
              "preExpandSingleShowCardAction": false,
              "actionsOrientation": "Horizontal",
              "actionAlignment": "Stretch"
            },
            "adaptiveCard": {
              "allowCustomStyle": false
            },
            "imageSet": {
              "imageSize": "Small",
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
              "spacing": 12
            }
          }
        }
      ])
    };
  }

  onAzureDataChange = (index) => (event) => {
    const { azureData } = this.state;
    this.setState({
      azureData: azureData.setIn([index, 'content'], event.target.value)
    });
  }

  onAzureDataClick = (index) => () => {
    this.setState({
      selectedAzureDataIndex: index
    });
  }

  onTransformTemplateClick = (index) => () => {
    this.setState({
      selectedTransformTemplateIndex: index
    });
  }

  generateCards = (finalData) =>
    this.state.hosts.map(h => ST.select(finalData)
      .transformWith(JSON.parse(h.get('layout')))
      .root()).toJS()

  render() {
    const {
      azureData, selectedAzureDataIndex,
      transformTemplates, selectedTransformTemplateIndex,
      hosts
    } = this.state;

    const currentAzureData = JSON.parse(azureData.getIn([selectedAzureDataIndex, 'content']));
    const currentTransformTemplate = transformTemplates.getIn([selectedTransformTemplateIndex, 'fn']);

    const finalData = currentTransformTemplate(currentAzureData);

    const finalCards = this.generateCards(finalData);

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
            {azureData.map((d, i) => (
              <li
                key={d.get('title')}
              >
                <button onClick={this.onAzureDataClick(i)}>
                  {d.get('title')}
                </button>
              </li>
            ))}
          </ul>
          <textarea
            value={JSON.stringify(currentAzureData, null, 2)}
            onChange={this.onAzureDataChange(selectedAzureDataIndex)}
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
            {transformTemplates.map((t, i) => (
              <li
                key={t.get('title')}
              >
                <button onClick={this.onTransformTemplateClick(i)}>
                  {t.get('title')}
                </button>
              </li>
            ))}
          </ul>
          <textarea
            value={currentTransformTemplate.toString()}
            readOnly={true}
            style={{
              overflowY: "scroll",
              maxHeight: "300px"
            }}
          />
          <textarea
            value={JSON.stringify(finalData, null, 2)}
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
            >
              <AdaptiveCardView
                adaptiveCard={card}
                hostConfigs={hosts.getIn([i, 'config']).toJS()}
                maxWidth={250}
                imagePrefetchingEnabled={true}
                key={i}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default AzureDevOps;
