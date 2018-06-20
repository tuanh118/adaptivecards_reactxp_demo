import * as React from "react";
import { fromJS } from "immutable";
import * as ST from "stjs";
import AdaptiveCardView from 'reactxp-adaptivecards';

import * as HostConfigs from '../hostConfigs';

/** Features
 *  - 1st column: list of data sources. Click to show text box. Able to create new one and edit
 *  - 2nd column: list of template URLs. Click to show template JSON. Able to create new one and edit
 *    + templates.adaptivecards.io/restaurants
 *    + adaptivecards.azure.com/templates/deployment
 *  - 3rd column: card UIs with names and click to show host layout
 */

/** TODO
 *  - Add a host similar to FB messenger
 */

/** Data Flow: {Raw Data} -{Template}-> {Card Payload} -{Host Config}-> {Card UI Element} */

const rawDataDefault = '';
const templateDefault = '';

function tryParseJson(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

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
      isRawDataEditorHidden: true,

      templates: fromJS([
        {
          title: "templates.adaptivecards.io/restaurants",
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
          title: "templates.adaptivecards.io/articles",
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
          title: 'adaptivecards.azure.com/templates/deployment',
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
      isTemplateEditorHidden: true,

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
                    "text": "{{#? header.subtitle}}",
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
                          "url": "{{#? extensions.attribution.imageUrl}}",
                          "horizontalAlignment": "left",
                          "size": "medium"
                        },
                        {
                          "type": "TextBlock",
                          "text": "{{#? extensions.attribution.name}}"
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
          config: HostConfigs.windowsNotifications,
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
          config: HostConfigs.windowsNotifications,
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
          config: HostConfigs.windowsNotifications,
        },
        {
          title: 'Background Image',
          layout: `{
            "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
            "type": "AdaptiveCard",
            "version": "1.0",
            "backgroundImage": "{{header.image}}",
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
                    "text": "{{#? header.subtitle}}",
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
                          "url": "{{#? extensions.attribution.imageUrl}}",
                          "horizontalAlignment": "left",
                          "size": "medium"
                        },
                        {
                          "type": "TextBlock",
                          "text": "{{#? extensions.attribution.name}}"
                        }
                      ]
                    }, {
                      "{{#else}}": []
                    }]
                  }
                ]
              }
            ]
          }`,
          config: HostConfigs.windowsTimeline,
        }
      ]),
      selectedHostIndex: 0,
      isHostEditorHidden: true,
    };
  }

  /** Raw Data helper functions */
  selectRawData = (index) => () => {
    this.setState({
      selectedRawDataIndex: index
    });
  }

  toggleRawDataEditor = () => {
    this.setState(({ isRawDataEditorHidden }) => ({
      isRawDataEditorHidden: !isRawDataEditorHidden
    }));
  }

  createNewRawData = () => {
    const currentSize = this.state.rawData.size;

    this.setState(({ rawData }) => ({
      rawData: rawData.push(fromJS({
        title: `Raw Data ${currentSize}`,
        content: rawDataDefault
      })),
      selectedRawDataIndex: currentSize
    }));
  }

  onRawDataChange = (index) => (event) => {
    const { rawData } = this.state;
    this.setState({
      rawData: rawData.setIn([index, 'content'], event.target.value)
    });
  }

  /** Template helper functions */
  selectTemplate = (index) => () => {
    this.setState({
      selectedTemplateIndex: index
    });
  }

  toggleTemplateEditor = () => {
    this.setState(({ isTemplateEditorHidden }) => ({
      isTemplateEditorHidden: !isTemplateEditorHidden
    }));
  }

  createNewTemplate = () => {
    const currentSize = this.state.templates.size;

    this.setState(({ templates }) => ({
      templates: templates.push(fromJS({
        title: `Template ${currentSize}`,
        content: templateDefault
      })),
      selectedTemplateIndex: currentSize
    }));
  }

  onTemplateChange = (index) => (event) => {
    const { templates } = this.state;
    this.setState({
      templates: templates.setIn([index, 'content'], event.target.value)
    });
  }

  toggleHostEditor = () => {
    this.setState(({ isHostEditorHidden }) => ({
      isHostEditorHidden: !isHostEditorHidden
    }));
  }

  /* Generate cards corresponding to all hosts */
  generateCards = (payload) => {
    return this.state.hosts.map(h => ST.select(payload)
      .transformWith(JSON.parse(h.get('layout')))
      .root()).toJS();
  }

  render() {
    const {
      rawData, selectedRawDataIndex, isRawDataEditorHidden,
      templates, selectedTemplateIndex, isTemplateEditorHidden,
      hosts, selectedHostIndex, isHostEditorHidden,
    } = this.state;

    const currentRawData = tryParseJson(rawData.getIn([selectedRawDataIndex, 'content']));
    const currentTemplate = tryParseJson(templates.getIn([selectedTemplateIndex, 'content']));

    const payload = (currentRawData && currentTemplate) ? ST.select(currentRawData).transformWith(currentTemplate).root() : null;

    const finalCards = payload ? this.generateCards(payload) : null;

    return (
      <div className="w3-row">
        <div
          className="w3-quarter w3-container"
          style={{
            overflowY: "scroll",
            height: "900px"
          }}
        >
          <h2>Raw Data Sources</h2>
          <ul>
            {rawData.map((d, i) => (
              <li
                key={d.get('title')}
              >
                <button
                  onClick={this.selectRawData(i)}
                  style={{
                    backgroundColor: selectedRawDataIndex === i ? 'lime' : null
                  }}
                >
                  {d.get('title')}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={this.createNewRawData}>
            +
          </button>
          <button onClick={this.toggleRawDataEditor}>
            {isRawDataEditorHidden ? 'Open' : 'Close'}
          </button>
          <textarea
            value={rawData.getIn([selectedRawDataIndex, 'content'])}
            onChange={this.onRawDataChange(selectedRawDataIndex)}
            style={{
              overflowY: "scroll",
              borderWidth: "2px",
              borderColor: currentRawData ? "green" : "red",
            }}
            hidden={isRawDataEditorHidden}
          />
        </div>
        <div
          className="w3-quarter w3-container"
          style={{
            overflowY: "scroll",
            // height: "900px"
          }}
        >
          <h2>Templates</h2>
          <ul>
            {templates.map((t, i) => (
              <li
                key={t.get('title')}
              >
                <button
                  onClick={this.selectTemplate(i)}
                  style={{
                    backgroundColor: selectedTemplateIndex === i ? 'aqua' : null
                  }}
                >
                  {t.get('title')}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={this.createNewTemplate}>
            +
          </button>
          <button onClick={this.toggleTemplateEditor}>
            {isTemplateEditorHidden ? 'Open' : 'Close'}
          </button>
          <textarea
            value={templates.getIn([selectedTemplateIndex, 'content'])}
            onChange={this.onTemplateChange(selectedTemplateIndex)}
            style={{
              overflowY: "scroll",
              borderWidth: "2px",
              borderColor: currentTemplate ? "green" : "red",
              // maxHeight: "780px"
            }}
            hidden={isTemplateEditorHidden}
          />
          {/* <textarea
            value={JSON.stringify(payload, null, 2)}
            readOnly={true}
            style={{
              overflowY: "scroll",
              maxHeight: "300px"
            }}
          /> */}
        </div>
        <div
          className="w3-quarter w3-container"
          style={{
            overflowY: "scroll",
            maxHeight: "811px"
          }}
          hidden={isHostEditorHidden}
        >
          <textarea
            value={hosts.getIn([selectedHostIndex, 'layout'])}
            readOnly={true}
            style={{
              overflowY: "scroll",
              maxHeight: "800px"
            }}
          />
        </div>
        <div
          className={`w3-${isHostEditorHidden ? 'half' : 'quarter'} w3-container`}
          style={{
            overflowY: "scroll",
            maxHeight: "811px"
          }}
        >
          <h2>Cards</h2>
          <button onClick={this.toggleHostEditor}>
            {isHostEditorHidden ? 'Open Host Layout' : 'Close Host Layout'}
          </button>
          {finalCards ? finalCards.map((card, i) => (
            <div
              className="w3-half"
              style={{
                display: "inline-block",
                padding: 2
              }}
              key={i}
            >
              <h3>{hosts.getIn([i, 'title'])}</h3>
              <AdaptiveCardView
                adaptiveCard={card}
                hostConfigs={hosts.getIn([i, 'config']).toJS()}
                maxWidth={300}
                imagePrefetchingEnabled={true}
              />
            </div>
          )) : 'Unable to generate cards'}
        </div>
      </div>
    );
  }
}

export default AzureDevOps;
