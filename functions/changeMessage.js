const dynamoDb = require("../dynamoClient.js");
const response = require("../responseCodes.js");

module.exports.changeMessage = async (event) => {
  const { shuiId, newText } = JSON.parse(event.body);
  console.log(`Your id: ${shuiId} and this is what newText is: ${newText}`);

  const params = {
    TableName: "Shui-border",
    Key: {
      shuiId: shuiId,
    },
    UpdateExpression: "set #text = :newText",
    ExpressionAttributeValues: {
      ":newText": newText,
    },
    ExpressionAttributeNames: {
      "#text": "text",
    },
    ReturnValues: "UPDATED_NEW",
  };

  try {
    console.log(`Your id: ${shuiId} and this is what newText is: ${newText}`);
    const result = await dynamoDb.update(params).promise();
    return response.success({
      message: "Message updated successfully",
      data: result.Attributes,
    });
  } catch (error) {
    console.error(error);
    return response.error({
      message: "An error occured while updating message",
    });
  }
};
