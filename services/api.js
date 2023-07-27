const apiService = require("./api");
const moment = require("moment");



exports.response = (res, err, result) => {
  if (err) {
    res.status(500).send(err);
  } else {
    res.status(200).send(result);
  }
};


exports.getUsersBasedOnRole = (data, callback) => {
  try {
    executeQuery.queryForAll(sqlQueryMap["getUserRoleId"], [data.params.rolename],
      (err, result) => {
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      }
    );
  } catch (error) {
    console.log("getUsersBasedOnRole Exception", error);
  }
}

