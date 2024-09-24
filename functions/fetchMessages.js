const dynamoDb = require("../dynamoClient.js");
const response = require("../responseCodes.js");

module.exports.fetchMessages = async () => {
  const params = {
    TableName: "Shui",
  };

  try {
    const result = await dynamoDb.scan(params).promise();
    if (!result.Items || result.Items.length === 0) {
      return response.notFound({ message: "No messages found." });
    }

    return response.success({ message: result.Items });
  } catch (error) {
    console.error(error);
    return response.error({
      message: "An error occured while retrieving messages",
    });
  }
};
