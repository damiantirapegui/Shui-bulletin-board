const dynamoDb = require("../dynamoClient.js");
const response = require("../responseCodes.js");

module.exports.fetchMessageByUser = async (event) => {
  const { username } = event.pathParameters;

  const params = {
    TableName: "Shui-border",
    IndexName: "username-index",
    KeyConditionExpression: "#username = :username",
    ExpressionAttributeNames: {
      "#username": "username",
    },
    ExpressionAttributeValues: {
      ":username": username,
    },
  };
  console.log("Querying for username:", username);

  try {
    const result = await dynamoDb.query(params).promise();
    return response.success({
      message: "Messages fetched successfully",
      data: result.Items,
    });
  } catch (error) {
    console.error(error);
    return response.error({
      message: "An error occurred while fetching messages",
      error: error.message,
    });
  }
};
