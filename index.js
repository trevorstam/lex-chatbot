import Request from "request-promise";
require('dotenv').config();

//-----------------------------------------------------
//--LAMBDA FUNCTION
//-----------------------------------------------------

const dispatcher = async (event) => {
  let response = {
    sessionAttributes: event.sessionAttributes,
    dialogAction: {
      type: "Close",
      fulfillmentState: "",
      message: {
        "contentType": "PlainText",
        "content": ""
      }
    }
  };
  switch(event.currentIntent.name){
    case "AboutIntent":
      response.dialogAction.fulfillmentState = "Fulfilled";
      response.dialogAction.message.content = "Created by Trevor Stam";
      break;
    case "LatLngIntent":
      let slots = event.currentIntent.slots;
      let result = await Request(
        "https://reverse.geocoder.api.here.com/6.2/reversegeocode.json",{
          qs: {
            "app_id": process.env.APP_ID,
            "app_code": process.env.APP_CODE,
            "mode":"retrieveAddresses",
            "prox": `${slots.Latitude}, ${slots.Longitude}`
          },
          json: true
        }   
      );
      response.dialogAction.fulfillmentState = "Fulfilled",
      response.dialogAction.message.content = result.Response.View[0].Result[0].Location.Address.Label;
      break;
    default:
      response.dialogAction.fulfillmentState = "Failed";
      response.dialogAction.message.content = "Please rephrase";
      break;
  }
  return response;
}

exports.handler = (event) => {
  return dispatcher(event);
}
