const VERSION = "1.0.0",
  UNDEFINED = "undefined",
  ERROR_MESSAGES = {
    Forbidden: "접근 권한이 없습니다.",
    "Bad Request": "잘못된 접근입니다.",
    timeout: "처리 대기 시간을 초가하였습니다. 잠시 후 다시 시도하여 주십시오.",
    parsererror: "데이터 파싱 중에 오류가 발생하였습니다.",
    "Bad credentials": "아이디 또는 비밀번호를 잘못 입력하셨습니다.",
  },
  STRING = "string",
  STATUS_ERROR_MESSAGES = {
    "0": "오프라인 상태입니다.",
    "404": "요청하신 웹 페이지를 찾을 수 없습니다.",
    "405": "웹 사이트에서 페이지를 표시할 수 없습니다.",
    "406": "이 웹 페이지 형식을 읽을 수 없습니다.",
    "408":
      "서버에서 웹 페이지를 표시하는 데 시간이 너무 오래 걸리거나 같은 페이지를 요청하는 사용자가 너무 많습니다. 나중에 다시 시도하여 주십시오.",
    "409":
      "서버에서 웹 페이지를 표시하는 데 시간이 너무 오래 걸리거나 같은 페이지를 요청하는 사용자가 너무 많습니다. 나중에 다시 시도하여 주십시오.",
    "500": "오류가 발생하였습니다.",
    "503": "서비스 이용이 지연되고 있습니다. 잠시 후 다시 시도하여 주십시오.",
    "403": "접근 권한이 없습니다. 권한이 필요한 경우 관리자에게 문의하십시오.",
  };

//const $ = require("jquery");
//const kendo = require("@progress/kendo-ui");
import * as $ from "jquery";
import * as kendo from "@progress/kendo-ui";

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const UserModel = {
  id: "userId",
  fields: {
    userId: { type: "number", defaultValue: 0 },
    username: { type: "string", defaultValue: "" },
    name: { type: "string", defaultValue: "" },
    nameVisible: { type: "boolean", defaultValue: false },
    firstName: { type: "string", defaultValue: "" },
    lastName: { type: "string", defaultValue: "" },
    email: { type: "string", defaultValue: "" },
    emailVisible: { type: "boolean", defaultValue: false },
    anonymous: { type: "boolean", defaultValue: true },
    enabled: { type: "boolean", defaultValue: false },
    creationDate: { type: "date" },
    modifiedDate: { type: "date" },
    status: { type: "string", defaultValue: "NONE" },
    properties: { type: "object", defaultValue: {} },
    roles: { type: "object", defaultValue: [] },
  },
  formattedCreationDate: function () {
    return kendo.toString(this.get("creationDate"), "g");
  },
  formattedModifiedDate: function () {
    return kendo.toString(this.get("modifiedDate"), "g");
  },
  hasRole: function (role) {
    if (typeof this.roles != "undefined" && $.inArray(role, this.roles) >= 0)
      return true;
    else return false;
  },
  copy: function (target) {
    target.userId = this.get("userId");
    target.set("username", this.get("username"));
    target.set("name", this.get("name"));
    target.set("email", this.get("email"));
    target.set("status", this.get("status"));
    if (this.get("creationDate") != null)
      target.set("creationDate", this.get("creationDate"));
    if (this.get("modifiedDate") != null)
      target.set("modifiedDate", this.get("modifiedDate"));
    target.set("enabled", this.get("enabled"));
    target.set("external", this.get("external"));
    target.set("nameVisible", this.get("nameVisible"));
    target.set("emailVisible", this.get("emailVisible"));
    target.set("anonymous", this.get("anonymous"));
    if (typeof this.get("roles") === "object")
      target.set("roles", this.get("roles"));
    if (typeof this.get("properties") === "object")
      target.set("properties", this.get("properties"));
  },
};

const ImageLinkModel = {
  id: "imageId",
  fields: {
    imageId: { type: "number", defaultValue: 0 },
    linkId: { type: "string", defaultValue: null },
    publicShared: { type: "boolean", defaultValue: false },
    filename: { type: "string", defaultValue: null },
  },
};
const SharedLinkModel = {
  id: "linkId",
  fields: {
    objectType: { type: "number", defaultValue: 0 },
    objectId: { type: "number", defaultValue: 0 },
    linkId: { type: "string", defaultValue: null },
    publicShared: { type: "boolean", defaultValue: false },
  },
};
const AttachmentModel = {
  id: "attachmentId",
  fields: {
    attachmentId: { type: "number", defaultValue: 0 },
    objectType: { type: "number", defaultValue: 0 },
    objectId: { type: "number", defaultValue: 0 },
    name: { type: "string", defaultValue: "" },
    contentType: { type: "string", defaultValue: "" },
    downloadCount: { type: "number", defaultValue: 0 },
    size: { type: "number", defaultValue: 0 },
    user: { type: "object", defaultValue: {} },
    properties: { type: "object", defaultValue: {} },
    sharedLink: { type: "object", defaultValue: {} },
    creationDate: { type: "date" },
    modifiedDate: { type: "date" },
  },
  copy: function (target) {
    target.attachmentId = this.get("attachmentId");
    target.set("objectType", this.get("objectType"));
    target.set("objectId", this.get("objectId"));
    target.set("name", this.get("name"));
    target.set("contentType", this.get("contentType"));
    target.set("size", this.get("size"));
    target.set("downloadCount", this.get("downloadCount"));
    target.set("modifiedDate", this.get("modifiedDate"));
    target.set("creationDate", this.get("creationDate"));
    if (typeof this.get("user") === "object")
      target.set("user", this.get("user"));
    if (typeof this.get("properties") === "object")
      target.set("properties", this.get("properties"));
    if (typeof this.get("sharedLink") === "object")
      target.set("sharedLink", this.get("sharedLink"));
  },
  formattedSize: function () {
    return kendo.toString(this.get("size"), "##,###");
  },
  formattedCreationDate: function () {
    return kendo.toString(this.get("creationDate"), "g");
  },
  formattedModifiedDate: function () {
    return kendo.toString(this.get("modifiedDate"), "g");
  },
};

const ImageModel = {
  id: "imageId",
  fields: {
    imageId: { type: "number", defaultValue: 0 },
    objectType: { type: "number", defaultValue: 0 },
    objectId: { type: "number", defaultValue: 0 },
    name: { type: "string", defaultValue: "" },
    contentType: { type: "string", defaultValue: "" },
    size: { type: "number", defaultValue: 0 },
    thumbnailContentType: { type: "string", defaultValue: "" },
    thumbnailSize: { type: "number", defaultValue: 0 },
    user: { type: "object", defaultValue: {} },
    imageLink: {
      type: "object",
      defaultValue: {},
    },
    tags: { type: "string", defaultValue: "" },
    properties: { type: "object", defaultValue: {} },
    creationDate: { type: "date" },
    modifiedDate: { type: "date" },
  },
  copy: function (target) {
    target.imageId = this.get("imageId");
    target.set("objectType", this.get("objectType"));
    target.set("objectId", this.get("objectId"));
    target.set("name", this.get("name"));
    target.set("contentType", this.get("contentType"));
    target.set("size", this.get("size"));
    target.set("thumbnailContentType", this.get("thumbnailContentType"));
    target.set("thumbnailSize", this.get("thumbnailSize"));
    target.set("modifiedDate", this.get("modifiedDate"));
    target.set("creationDate", this.get("creationDate"));
    target.set("tags", this.get("tags"));
    if (typeof this.get("user") === "object")
      target.set("user", this.get("user"));
    if (typeof this.get("properties") === "object")
      target.set("properties", this.get("properties"));
    if (typeof this.get("imageLink") === "object")
      target.set("imageLink", this.get("imageLink"));
  },
  formattedSize: function () {
    return kendo.toString(this.get("size"), "##,###");
  },
  formattedCreationDate: function () {
    return kendo.toString(this.get("creationDate"), "g");
  },
  formattedModifiedDate: function () {
    return kendo.toString(this.get("modifiedDate"), "g");
  },
};

export const studio = {
  VERSION,
  services: {
    getApiUrl: function (url) {
      return `${API_ROOT_URL}` + url;
    },
    accounts: {
      state: initialState,
      logout,
      loginSuccess,
      authHeader,
      getCurrentUser,
      getUserAvatarUrl,
    },
  },
  data: {
    model: {
      Role: {
        id: "roleId",
        fields: {
          roleId: {
            type: "number",
            defaultValue: 0,
            editable: false,
            validation: { min: 0, required: true },
          },
          name: { type: "string", defaultValue: null },
          description: { type: "string", defaultValue: null },
          creationDate: { type: "date", editable: false },
          modifiedDate: { type: "date", editable: false },
        },
      },
      User: UserModel,
      Image: ImageModel,
      ImageLink: ImageLinkModel,
      Attachment: AttachmentModel,
    },
  },
  ui: {
    defined,
    notify,
    handleAjaxError,
    handleAxiosError,
    getImageUrl,
    getAttachmentUrl,
    getImageAsBase64,
    format: {
      date: getFormattedDate,
      number: getFormattedNumber,
      byte: getFormattedByteSize,
    },
  },
};

function getFormattedByteSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes == 0) return "n/a";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i == 0) return bytes + " " + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

function getFormattedNumber(num, format) {
  format = format || "###,##";
  if (typeof num == "string") return kendo.toString(new Number(num), format);
  return kendo.toString(num, format);
}

function getFormattedDate(date, format) {
  format = format || "g";
  if (typeof date == "string") return kendo.toString(new Date(date), format);
  return kendo.toString(date, format);
}

function authHeader() {
  // return authorization header with jwt token
  let _user = JSON.parse(localStorage.getItem("user"));
  if (_user && _user.jwtToken) {
    return { Authorization: "Bearer " + _user.jwtToken };
  } else {
    return {};
  }
}

function isUserLoggedIn() {
  let _user = JSON.parse(localStorage.getItem("user"));
  if (_user) {
    console.log("is_user_logged_in" + !_user.anonymous);
    return !_user.anonymous;
  }
  return false;
}

function getUserAvatarUrl(username) {
  const _user = getCurrentUser();
  if (_user == null) return "@/assets/images/no-avatar.png";
  else username = username || _user.username;
  return `${API_ROOT_URL}/download/avatar/` + username;
}

function getCurrentUser() {
  if (typeof initialState.user != "undefined") return initialState.user.user;
  return null;
}

const DEFAULT_DOWNLOAD_OPTIONS = {
  deafultImage: "/images/no-image.jpg",
  thumbnail: false,
  width: 150,
  height: 150,
};

function getImageUrlAsBase64(image, options) {
  let url = getImageUrl(image, options);
  return getImageAsBase64(url);
}

function isFunction(functionToCheck) {
  return (
    functionToCheck && {}.toString.call(functionToCheck) === "[object Function]"
  );
}

// ES6 : code for retry but it effect entire code ... 
import axiosRetry from 'axios-retry';
axiosRetry(axios, { retries: 3, retryDelay: (retryCount) => {
  return retryCount * 500;
}});

async function getImageAsBase64(url, handler) { 
  const headers = {};
  Object.assign(headers, studio.services.accounts.authHeader());
  const data = await axios
    .get(url, { headers: headers, responseType: "arraybuffer" })
    .then((response) => {
      let b64encoded = Buffer.from(response.data, "binary").toString("base64");
      var prefix = "data:" + response.headers["content-type"] + ";base64,";
      if (isFunction(handler)) handler(prefix + b64encoded);
      return prefix + b64encoded ;
    });
}

function getImageUrl(image, options) {
  options = options || {};
  var settings = $.extend(true, {}, DEFAULT_DOWNLOAD_OPTIONS, options);
  if (image.imageId > 0) {
    var _imageUrl =
      `${API_ROOT_URL}/download/images/` + image.imageId + "/" + image.name;
    if (settings.thumbnail) {
      _imageUrl =
        _imageUrl +
        "?thumbnail=true&height=" +
        settings.height +
        "&width=" +
        settings.width +
        "&time=" +
        kendo.guid();
    } else {
      _imageUrl = _imageUrl + "?time=" + kendo.guid();
    }
    return encodeURI(_imageUrl);
  }
  return settings.deafultImage;
}

function getAttachmentUrl(attachment, options) {
  options = options || {};
  var settings = $.extend(true, {}, DEFAULT_DOWNLOAD_OPTIONS, options);
  if (attachment.attachmentId > 0) {
    var _attachmentUrl =
      `${API_ROOT_URL}/download/files/` +
      attachment.attachmentId +
      "/" +
      attachment.name;
    if (settings.thumbnail) {
      _attachmentUrl =
        _attachmentUrl +
        "?thumbnail=true&height=" +
        settings.height +
        "&width=" +
        settings.width +
        "&time=" +
        kendo.guid();
    } else {
      _attachmentUrl = _attachmentUrl + "?time=" + kendo.guid();
    }
    return encodeURI(_attachmentUrl);
  }
  return settings.deafultImage;
}

const DEFAULT_AUTHENTICATE_OPTIONS = {
  refresh: false,
  url: `${API_ROOT_URL}/data/users/me.json`,
};

function getUser(options) {
  options = options || {};
  var settings = $.extend(true, {}, DEFAULT_AUTHENTICATE_OPTIONS, options);
  logout();
  return axios({ url: settings.url, method: "post" })
    .then(handleResponse)
    .then((user) => {
      localStorage.setItem("user", JSON.stringify(user));
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
  initialState = { status: { loggedIn: false }, user: null };
}

function loginSuccess(state, data) {
  if (data.jwtToken) {
    // store user details and jwt token in local storage to keep user logged in between page refreshe
    localStorage.setItem("user", JSON.stringify(data));
  }
  state.loggedIn = true;
  state.user = data;
}

function handleResponse(response) {
  if (typeof response.data !== UNDEFINED) {
    const data = response.data;
    if (typeof data.error !== UNDEFINED) {
      const error = data.error;
      return Promise.reject(error);
    }
    return data;
  } else {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if (response.status === 401) {
          // auto logout if 401 response returned from api
          logout();
          location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }
}

function defined(x) {
  return typeof x != UNDEFINED;
}

function handleAxiosError(error) {
  var message = "";
  if (error.response) {
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답했습니다.
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    if (
      error.response.status == 0 ||
      error.response.status == 404 ||
      error.response.status == 503 ||
      error.response.status == 403
    ) {
      message = STATUS_ERROR_MESSAGES[error.response.status];
    } else if (
      error.response.status == 500 ||
      error.response.status == 400 ||
      error.response.status == 401
    ) {
      if (defined(error.response.data)) {
        message = error.response.data.error.message;
        if (message == null) {
          var exceptionClass = error.response.data.error.exception;
          if (exceptionClass.endsWith("UnAuthorizedException")) {
            message = STATUS_ERROR_MESSAGES[403];
          } else {
            message = STATUS_ERROR_MESSAGES[500];
          }
        }
      }
    }
  } else if (error.request) {
    // 요청이 이루어 졌으나 응답을 받지 못했습니다.
    // `error.request`는 브라우저의 XMLHttpRequest 인스턴스 또는
    // Node.js의 http.ClientRequest 인스턴스입니다.
    console.log(error.request);
  } else {
    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생했습니다.
    console.log("Error", error.message);
  }
  notify(null, message, "error");
}

function handleAjaxError(xhr) {
  var message = "";
  if (typeof xhr === STRING) {
    message = xhr;
  } else {
    var $xhr = xhr;
    if ($xhr.xhr) {
      $xhr = $xhr.xhr;
    }
    if (
      $xhr.status == 0 ||
      $xhr.status == 404 ||
      $xhr.status == 503 ||
      $xhr.status == 403
    ) {
      message = STATUS_ERROR_MESSAGES[$xhr.status];
    } else if ($xhr.status == 500 || $xhr.status == 400) {
      if (defined($xhr.responseJSON)) {
        message = $xhr.responseJSON.error.message;
        if (message == null) {
          var exceptionClass = $xhr.responseJSON.error.exception;
          if (exceptionClass.endsWith("UnAuthorizedException")) {
            message = STATUS_ERROR_MESSAGES[403];
          } else {
            message = STATUS_ERROR_MESSAGES[500];
          }
        }
      } else {
        message = STATUS_ERROR_MESSAGES[$xhr.status];
        if ($xhr.responseText) {
        }
        if (!defined(message) && $xhr.statusText == "Bad Request") {
          message = ERROR_MESSAGES[$xhr.statusText];
        }
      }
    } else if (
      $xhr.errorThrown == "Forbidden" ||
      $xhr.errorThrown == "timeout" ||
      $xhr.errorThrown == "parsererror"
    ) {
      message = ERROR_MESSAGES[$xhr.errorThrown];
    } else {
      if ($xhr.responseText) {
        var obj = eval("(" + $xhr.responseText + ")");
        if (obj != null && obj.error.exceptionMessage) {
          if (obj.error.exceptionMessage == "Bad credentials") {
            message = ERROR_MESSAGES["Bad credentials"];
          }
        }
      } else {
        message = STATUS_ERROR_MESSAGES[500];
      }
    }
  }
  if ($("#notification").length == 0) {
    $("body").append('<span id="notification" style="display:none;"></span>');
  }
  var renderTo = $("#notification");
  var notificationWidget = renderTo
    .kendoNotification({
      position: {
        top: 20,
        right: 20,
      },
    })
    .data("kendoNotification");
  console.log(notificationWidget);
  notificationWidget.show(message, "error");
}

function notify(renderTo, message, type) {
  type = type || "error";
  if (renderTo == null || renderTo.length == 0) {
    $("body").append('<span id="notification" style="display:none;"></span>');
    renderTo = $("#notification");
  }
  var notificationWidget = renderTo
    .kendoNotification({
      position: {
        top: 20,
        right: 20,
      },
    })
    .data("kendoNotification");
  notificationWidget.show(message, type);
}