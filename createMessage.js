const dynamoDb = require("./dynamoClient.js");
const response = require("./responseCodes.js");
const { v4: uuidv4 } = require("uuid");
const id = uuidv4();
const timeAndDate = new Date();

module.exports.createMessage = async (event) => {
  const { username, text } = JSON.parse(event.body);
  const params = {
    TableName: "Shui",
    Item: {
      shuiId: id,
      username: username,
      text: text,
      timeStamp: timeAndDate.toISOString(),
    },
  };

  try {
    await dynamoDb.put(params).promise();
    return response.success({ message: "Message created successfully" });
  } catch (error) {
    console.error(error);
    return response.error("Failed to create message");
  }
};
