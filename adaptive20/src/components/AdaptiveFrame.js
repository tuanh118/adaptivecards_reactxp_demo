import * as React from "react";
import "./AdaptiveFrame.css";
import * as ST from "stjs";
import { fromJS } from "immutable";

import * as HostConfigs from "../hostConfigs";
import FramePreview from "./FramePreview";

/** TODO:
 *  - Update the payload to have header, body, actions, and extensions
 *  - Update the hosts' cards to look like the azure devops scenario
 *  - Hide "Generated JSON"
 *  - Host layout edtior to include host config as well
 *    + host layout inside host config
 *  - Add payload list
 */
class AdaptiveFrame extends React.Component {
  // Template for creating a new host
  hostTemplate = fromJS({
    name: 'New Tab Page',
    frame: `{
      "layout": {
        "default": {
          "type": "AdaptiveView",
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
        }
      }
    }`,
    config: HostConfigs.windowsTimeline,
    transformedJson: {}
  });

  constructor(props) {
    super(props);

    this.state = {
      payload: `{
        "type": "AdaptiveCard",
        "version": "2.0",
        "title": "The Housing Crisis Is So Bad, Architects Are Hiding Apartments In Air Ducts",
        "subtitle": "This year the Architecture Foundation, a design advocacy group based in the United Kingdom, invited architects to come up with creative and sustainable housing alternatives for its Antepavilion competition. The winner, the London-based PUP Architects, proposed hiding apartments in plain sight to add",
        "category": "Lifestyle",
        "image": "https://upload.wikimedia.org/wikipedia/commons/0/02/Sea_Otter_%28Enhydra_lutris%29_%2825169790524%29_crop.jpg",
        "attribution": "http://thepixelweb.com/wp-content/uploads/2012/08/Microsoft-new-logo.png"
      }`,
      hosts: fromJS([
        {
          name: 'New Tab Page',
          frame: `{
            "layout": {
              "default": {
                "type": "AdaptiveView",
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
                        "color": "dark",
                        "transform": "uppercase"
                      },
                      {
                        "type": "ActionSet",
                        "actions": [
                          {
                            "type": "Action.OpenUrl",
                            "title": "Open Source",
                            "url": "{{subtitle}}"
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
                      }
                    ]
                  }
                ]
              }
            }
          }`,
          config: HostConfigs.windowsTimeline,
          transformedJson: {}
        },
        {
          name: 'Windows Notification',
          frame: `{
            "layout": {
              "default": {
                "type": "AdaptiveView",
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
              }
            }
          }`,
          config: HostConfigs.windowsNotifications,
          transformedJson: {}
        },
        {
          name: 'Timeline',
          frame: `{
            "layout": {
              "default": {
                "type": "AdaptiveView",
                "body": [
                  {
                    "type": "Container",
                    "items": [
                      {
                        "type": "Image",
                        "url": "{{attribution}}",
                        "horizontalAlignment": "left",
                        "size": "medium"
                      },
                      {
                        "type": "TextBlock",
                        "text": "{{title}}",
                        "size": "large",
                        "weight": "bolder"
                      },
                      {
                        "type": "TextBlock",
                        "text": "{{subtitle}}",
                        "size": "medium"
                      }
                    ]
                  }
                ],
                "backgroundImage": "{{image}}"
              }
            }
          }`,
          config: HostConfigs.cortanaSkills,
          transformedJson: {}
        }
      ]),

      // Defaults to editing Payload
      editingKey: 'Payload'
    };
  }

  componentWillMount() {
    this.updateAllCards();
  }

  componentDidUpdate(prevProps, prevState) {
    const { hosts } = this.state;

    if (hosts.size > prevState.hosts.size) {
      this.updateCard(hosts.size - 1);
    }
  }

  setEditingContent = (editingKey) => () => {
    this.setState({ editingKey });
  }

  handlePayloadChange = (event) => {
    const target = event.target;
    this.setState(
      {
        payload: target.value
      },
      () => this.updateAllCards()
    );
  }

  handleFrameChange = index => (event) => {
    const target = event.target;

    const { hosts } = this.state;
    this.setState(
      {
        hosts: hosts.setIn([index, 'frame'], target.value)
      },
      () => this.updateCard(index)
    );
  }

  updateAllCards = () => {
    this.state.hosts.forEach((_, index) => {
      this.updateCard(index);
    });
  }

  updateCard = index => {
    try {
      const t = ST.select(JSON.parse(this.state.payload))
        .transformWith(JSON.parse(this.state.hosts.getIn([index, 'frame'])).layout.default)
        .root();

      if (t) {
        this.setState(({ hosts, payload }) => ({
          hosts: hosts.setIn(
            [index, 'transformedJson'],
            t
          )
        }));
      }
    } catch (err) {
      console.error(err);
    }
  }

  removeHost = index => () => {
    this.setState(({ hosts }) => ({
      hosts: hosts.delete(index)
    }));

    this.setEditingContent('Payload')();
  }

  addHost = () => {
    this.setState(({ hosts }) => ({
      hosts: hosts.push(this.hostTemplate)
    }));
  }

  render() {
    const { payload, hosts, editingKey } = this.state;

    // Variables corresponding to the editing area    
    const editingHeader = editingKey === 'Payload' ? 'Payload' : `Frame ${hosts.getIn([editingKey, 'name'])}`;
    const editingValue = editingKey === 'Payload' ? payload : hosts.getIn([editingKey, 'frame']);
    const editingOnChange = editingKey === 'Payload' ? this.handlePayloadChange : this.handleFrameChange(editingKey);

    return (
      <div className="AdaptiveFrame">
        <div className="w3-row">
          <div className="w3-third w3-container">
            <button onClick={this.setEditingContent('Payload')} style={{ margin: "2px" }}>Payload</button>
            <button onClick={this.addHost} style={{ margin: "2px" }}>Add Host</button>
            <h2>{editingHeader}</h2>
            <textarea
              value={editingValue}
              onChange={editingOnChange}
              style={{
                overflowY: "scroll",
                maxHeight: "800px"
              }}
            />
          </div>
          <div className="w3-twothird w3-container">
            {hosts.map((host, index) => {
              return (
                <FramePreview
                  name={host.get('name')}
                  key={index}
                  transformedJson={host.get('transformedJson')}
                  hostConfig={host.get('config')}
                  handleSetActive={this.setEditingContent(index)}
                  isInEdit={editingKey === index}
                  handleRemoveHost={this.removeHost(index)}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default AdaptiveFrame;
