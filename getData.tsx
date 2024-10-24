exports.handler = async function(event,context) {
    const data = require('./db.json'); 
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  };
  