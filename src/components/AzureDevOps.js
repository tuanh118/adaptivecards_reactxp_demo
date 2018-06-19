import * as React from "react";
import { fromJS } from "immutable";
import * as ST from "stjs";
import AdaptiveCardView from 'reactxp-adaptivecards';

/** TODO
 *  - 1st column: list of data sources. Click to show text box. Able to create new one and edit
 *  - 2nd column: list of template URLs. Click to show template JSON. Able to create new one and edit
 *    + templates.adaptivecards.io/restaurants
 *    + adaptivecards.azure.com/templates/deployment
 *  - 3rd column: card UIs with names and click to show host layout
 *  - Add timeline host with image as background
 *  - Add a host similar to FB messenger
 *  - Handle empty/missing/null data (#?)
 */

/** Data Flow: {Raw Data} -{Template}-> {Card Payload} -{Host Config}-> {Card UI Element} */
class AzureDevOps extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rawData: fromJS([
        {
          title: 'La Isla Cuisine',
          content: `{
            "metatags": {
              "application-name": [
                "Yelp"
              ]
            },
            "microdata": {
              "Restaurant": [
                {
                  "@context": "http://schema.org/",
                  "@type": "Restaurant",
                  "aggregateRating": {
                    "@context": "http://schema.org/",
                    "@type": "AggregateRating",
                    "ratingValue": "4.0",
                    "reviewCount": "445"
                  },
                  "image": "https://s3-media2.fl.yelpcdn.com/bphoto/K8cqFzbsaHwLPjOBLZpaCQ/ls.jpg",
                  "priceRange": "$11-30",
                  "name": "La Isla Cuisine",
                  "address": {
                    "@context": "http://schema.org/",
                    "@type": "PostalAddress",
                    "streetAddress": "16505 Redmond WayBldg B, Ste A",
                    "addressLocality": "Redmond",
                    "addressRegion": "WA",
                    "postalCode": "98052",
                    "addressCountry": "US"
                  },
                  "telephone": "(425) 298-0374"
                }
              ]
            }
          }`
        },
        {
          title: 'Game of Thrones Article',
          content: `{
            "jsonld": {
              "NewsArticle": [
                {
                  "@context": "http://schema.org",
                  "@type": "NewsArticle",
                  "mainEntityOfPage": "https://www.vox.com/culture/2017/8/28/16205048/game-of-thrones-season-7-cersei-daenerys-jon-snow",
                  "headline": "Game of Thrones season 7: each character&#39;s strategy, ranked by political science",
                  "description": "There’s a clear best player — and a clear worst.",
                  "datePublished": "2017-08-28T13:00:02-04:00",
                  "dateModified": "2017-08-28T13:00:02-04:00",
                  "image": [
                    {
                      "@type": "ImageObject",
                      "url": "https://cdn.vox-cdn.com/thumbor/pcKdsdK9lB9NOUjkKbmljJ3yZJU=/0x0:800x450/1400x1400/filters:focal(327x91:455x219):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/56397893/gotqueencersei.0.jpg",
                      "width": 1400,
                      "height": 1400
                    }
                  ],
                  "author": {
                    "@type": "Person",
                    "name": "Zack Beauchamp"
                  },
                  "publisher": {
                    "@type": "Organization",
                    "logo": {
                      "@type": "ImageObject",
                      "url": "https://www.vox.com/v/vox/images/logos/google_amp.png",
                      "width": 600,
                      "height": 60
                    },
                    "name": "Vox"
                  }
                }
              ]
            }
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
      selectedRawDataIndex: 0,

      templates: fromJS([
        {
          "title": "Restaurants",
          content: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "header": {
              "title": "{{microdata.Restaurant[0].name}}",
              "image": "{{microdata.Restaurant[0].image}}"
            },
            "body": [
              {
                "type": "Container",
                "items": [
                  {
                    "type": "TextBlock",
                    "text": "{{microdata.Restaurant[0].aggregateRating.ratingValue}} stars, {{microdata.Restaurant[0].aggregateRating.reviewCount}} reviews",
                    "isSubtle": true
                  },
                  {
                    "type": "TextBlock",
                    "text": "Price range: {{microdata.Restaurant[0].priceRange}}",
                    "spacing": "none"
                  }
                ]
              },
              {
                "type": "TextBlock",
                "text": "{{microdata.Restaurant[0].telephone}} · {{microdata.Restaurant[0].address.streetAddress}} \\n{{microdata.Restaurant[0].address.addressLocality}}, {{microdata.Restaurant[0].address.addressRegion}} {{microdata.Restaurant[0].address.postalCode}}",
                "wrap": true,
                "maxLines": 2,
                "spacing": "none",
                "isSubtle": true
              }
            ],
            "extensions": {
              "attribution": {
                "name": "{{metatags['application-name'][0]}}"
              }
            }
          }`
        },
        {
          "title": "Article",
          content: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "header": {
              "title": "{{jsonld.NewsArticle[0].headline}}",
              "subtitle": "{{jsonld.NewsArticle[0].description}}",
              "image": "{{jsonld.NewsArticle[0].image[0].url}}"
            },
            "actions": [
              {
                "type": "Action.OpenUrl",
                "title": "Go to Source",
                "url": "{{jsonld.NewsArticle[0].mainEntityOfPage}}"
              }
            ],
            "extensions": {
              "attribution": {
                "imageUrl": "{{jsonld.NewsArticle[0].publisher.logo.url}}"
              }
            }
          }`
        },
        {
          title: 'Example',
          content: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "header": {
              "title": "{{a_title}}",
              "subtitle": "{{a_subtitle}}",
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
            ],
            "extensions": {
              "attribution": {
                "imageUrl": "{{a_attribution}}"
              }
            }
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
                    "type": "Container",
                    "items": [{
                      "{{#if 'attribution' in this.extensions}}": [
                        {
                          "type": "Image",
                          "url": [{
                            "{{#if 'imageUrl' in this.extensions.attribution}}": "{{extensions.attribution.imageUrl}}"
                          }, {
                            "{{#else}}": null
                          }],
                          "horizontalAlignment": "left",
                          "size": "medium"
                        },
                        {
                          "type": "TextBlock",
                          "text": [{
                            "{{#if 'name' in this.extensions.attribution}}": "{{extensions.attribution.name}}"
                          }, {
                            "{{#else}}": null
                          }]
                        }
                      ]
                    }, {
                      "{{#else}}": []
                    }]
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
                        "color": "dark",
                        "wrap": true,
                        "maxLines": 2
                      },
                      "{{body[0]}}"
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

  selectRawData = (index) => () => {
    this.setState({
      selectedRawDataIndex: index
    });
  }

  selectTemplate = (index) => () => {
    this.setState({
      selectedTemplateIndex: index
    });
  }

  /* Generate cards corresponding to all hosts */
  generateCards = (payload) =>
    this.state.hosts.map(h => ST.select(payload)
      .transformWith(JSON.parse(h.get('layout')))
      .root()).toJS()

  render() {
    const {
      rawData, selectedRawDataIndex,
      templates, selectedTemplateIndex,
      hosts,
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
                <button onClick={this.selectRawData(i)}>
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
                <button onClick={this.selectTemplate(i)}>
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
              className="w3-half"
              style={{
                display: "inline-block",
                padding: 2
              }}
              key={i}
            >
              <AdaptiveCardView
                adaptiveCard={card}
                hostConfigs={hosts.getIn([i, 'config']).toJS()}
                maxWidth={300}
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
