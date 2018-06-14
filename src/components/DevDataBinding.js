import * as React from "react";
import AdaptiveCardView from 'reactxp-adaptivecards/';
// import { fromJS } from 'immutable';

import * as HostConfigs from '../hostConfigs';
import { ErrorBoundary } from './FramePreview';
import "./Components.css";

class ComponentUsage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardPayload: `{
        "$schema": "http://adaptivecards.io/schemas/adaptive-card.json",
        "$sampleData": {
          "symbol": "MSFT",
          "company": "Microsoft Corp",
          "price": "92.02",
          "difference": {
            "direction": "up",
            "directionSymbol": "▲",
            "amount": "0.20",
            "color": "good",
            "pct": "0.36%"
          },
          "date": "February 6, 4:00 PM EST",
          "stages": [
            {
              "title": "Open",
              "value": "90.02"
            },
            {
              "title": "High",
              "value": "93.41"
            },
            {
              "title": "Low",
              "value": "89.95"
            }
          ]
        },
        "type": "AdaptiveCard",
        "version": "1.0",
        "speak": "{{company}} stock is trading at $ {{price}} a share, which is {{direction}} {{pct}}",
        "body": [
          {
            "type": "Container",
            "items": [
              {
                "type": "TextBlock",
                "text": "{{company}} (NASDAQ: {{symbol}})",
                "size": "medium",
                "isSubtle": true
              },
              {
                "type": "TextBlock",
                "text": "{{date}}",
                "isSubtle": true
              }
            ]
          },
          {
            "type": "Container",
            "spacing": "none",
            "items": [
              {
                "type": "ColumnSet",
                "columns": [
                  {
                    "type": "Column",
                    "width": "stretch",
                    "items": [
                      {
                        "type": "TextBlock",
                        "text": "{{price}}",
                        "size": "extraLarge"
                      },
                      {
                        "type": "TextBlock",
                        "text": "{{difference.directionSymbol}} {{difference.amount}} ({{difference.pct}})",
                        "size": "small",
                        "color": "{{difference.color}}",
                        "spacing": "none"
                      }
                    ]
                  },
                  {
                    "type": "Column",
                    "width": "auto",
                    "items": [
                      {
                        "type": "FactSet",
                        "facts": {
                          "{{#each stages}}": {
                            "title": "{{title}}",
                            "value": "{{value}}"
                          }
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }`
    };
  }

  onAdaptiveCardChange = (event) => {
    this.setState({ cardPayload: event.target.value });
  }

  render() {
    const payload = JSON.parse(this.state.cardPayload);

    return (
      <div className="Components">
        <div className="w3-row">
          <div className="w3-half Components-section">
            <h2>Adaptive Card Editor</h2>
            <textarea
              value={JSON.stringify(payload, null, 4)}
              onChange={this.onAdaptiveCardChange}
              style={{
                overflowY: "scroll",
                maxHeight: "800px"
              }}
            />
          </div>
          <div className="w3-half Components-section">
            <h2>Live Card preview</h2>
            <ErrorBoundary>
              <AdaptiveCardView
                adaptiveCard={payload}
                hostConfig={HostConfigs.windowsNotifications}
                maxWidth={300}
                imagePrefetchingEnabled={true}
              />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    );
  }
}

export default ComponentUsage;
