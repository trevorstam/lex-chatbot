import Request from 'request-promise';

//-----------------------------------------------------
//--LAMBDA FUNCTION
//-----------------------------------------------------

const dispatcher = async (event) => {
  let response = {
    sessionAttributes: event.sessionAttributes,
    dialogAction: {
      type: 'Close',
      fulfillmentState: '',
      message: {
        'contentType': 'PlainText',
        'content': ''
      }
    }
  };
  switch(event.currentIntent.name){
    case 'AboutIntent':
      response.dialogAction.fulfillmentState = 'Fulfilled';
      response.dialogAction.message.content = 'Created by Trevor Stam';
      break;
    case 'LatLngIntent':
      break;
    default:
      response.dialogAction.fulfillmentState = 'Failed';
      response.dialogAction.message.content = 'Please rephrase';
      break;
  }
  return response;
}

exports.handler = (event) => {
  return dispatcher(event);
}
