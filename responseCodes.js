module.exports = {
  success: (data) => {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  },
  error: (message) => {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: message }),
    };
  },
  notFound: (message) => {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: message }),
    };
  },
  badRequest: (message) => {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: message }),
    };
  },
};
