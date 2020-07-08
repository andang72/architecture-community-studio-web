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

// Pace init

const user = JSON.parse(localStorage.getItem("user"));
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null };

const RoleModel = {
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
};

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
    external: { type: "boolean", defaultValue: false },
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
    user: { type: "object", defaultValue: { userId: 0 } },
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
    user: { type: "object", defaultValue: { userId: 0 } },
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

const AlbumModel = {
  id: "albumId", // the identifier of the model
  fields: {
    albumId: { type: "number", editable: false, defaultValue: 0 },
    name: { type: "string", editable: true },
    description: { type: "string", editable: true, defaultValue: "" },
    collaborate: { type: "boolean", editable: true, defaultValue: "" },
    shared: { type: "boolean", editable: true, defaultValue: false },
    properties: { type: "object", defaultValue: {} },
    user: { type: "object", defaultValue: { userId: 0 } },
    modifiedDate: { type: "date" },
    creationDate: { type: "date" },
  },
  copy: function (target) {
    target.albumId = this.get("albumId");
    target.set("name", this.get("name"));
    target.set("description", this.get("description"));
    target.set("collaborate", this.get("collaborate"));
    target.set("shared", this.get("shared"));
    if (typeof this.get("properties") === "object")
      target.set("properties", this.get("properties"));
    if (typeof this.get("user") === "object")
      target.set("user", this.get("user"));
    target.set("creationDate", this.get("creationDate"));
    target.set("modifiedDate", this.get("modifiedDate"));
  },
};

const PageModel = {
  id: "pageId",
  fields: {
    objectType: { type: "number", defaultValue: -1 },
    objectId: { type: "number", defaultValue: -1 },
    pageId: { type: "number", defaultValue: 0 },
    name: { type: "string", defaultValue: "" },
    versionId: { type: "number", defaultValue: 0 },
    pageState: { type: "string", defaultValue: "INCOMPLETE" },
    commentCount: { type: "number", defaultValue: 0 },
    viewCount: { type: "number", defaultValue: 0 },
    summary: { type: "string", defaultValue: "" },
    tagsString: { type: "string", defaultValue: "" },
    title: { type: "string", defaultValue: "" },
    template: { type: "string", defaultValue: "" },
    pattern: { type: "string", defaultValue: "" },
    script: { type: "string", defaultValue: "" },
    secured: { type: "boolean", defaultValue: false },
    properties: { type: "object", defaultValue: {} },
    bodyText: { type: "string", defaultValue: "" },
    bodyContent: {
      type: "object",
      defaultValue: {
        bodyId: 0,
        bodyText: "",
        bodyType: "FREEMARKER",
        pageId: 0,
      },
    },
    user: { type: "object", defaultValue: { userId: 0 } },
    creationDate: { type: "date" },
    modifiedDate: { type: "date" },
  },
  copy: function (target) {
    target.pageId = this.get("pageId");
    target.set("objectType", this.get("objectType"));
    target.set("objectId", this.get("objectId"));
    target.set("name", this.get("name"));
    target.set("versionId", this.get("versionId"));
    target.set("pageState", this.get("pageState"));
    target.set("commentCount", this.get("commentCount"));
    target.set("viewCount", this.get("viewCount"));
    target.set("summary", this.get("summary"));
    target.set("tagsString", this.get("tagsString"));
    target.set("title", this.get("title"));
    target.set("template", this.get("template"));
    target.set("pattern", this.get("pattern"));
    target.set("script", this.get("script"));
    target.set("secured", this.get("secured"));
    target.set("bodyText", this.get("bodyText"));
    target.set("modifiedDate", this.get("modifiedDate"));
    target.set("creationDate", this.get("creationDate"));
    if (typeof this.get("properties") === "object")
      target.set("properties", this.get("properties"));
    if (typeof this.get("user") === "object")
      target.set("user", this.get("user"));
    if (typeof this.get("bodyContent") === "object")
      target.set("bodyContent", this.get("bodyContent"));
  },
};

const BodyContentModel = {
  id: "bodyId",
  fields: {
    bodyId: { type: "number", defaultValue: -1 },
    bodyText: { type: "string", defaultValue: "" },
    bodyType: { type: "string", defaultValue: "FREEMARKER" },
    pageId: { type: "number", defaultValue: 0 },
  },
};

const ApiModel = {
  id: "apiId",
  fields: {
    apiId: { type: "number", defaultValue: -1 },
    objectType: { type: "number", defaultValue: -1 },
    objectId: { type: "number", defaultValue: -1 },
    title: { type: "string", defaultValue: null },
    name: { type: "string", defaultValue: null },
    version: { type: "string", defaultValue: null },
    description: { type: "string", defaultValue: null },
    contentType: { type: "string", defaultValue: null },
    scriptSource: { type: "string", defaultValue: null },
    pattern: { type: "string", defaultValue: null },
    creator: { type: "object", defaultValue: {} },
    properties: { type: "object", defaultValue: {} },
    secured: { type: "boolean", defaultValue: false },
    enabled: { type: "boolean", defaultValue: false },
    creationDate: { type: "date" },
    modifiedDate: { type: "date" },
  },
  copy: function (target) {
    target.apiId = this.get("apiId");
    target.set("objectType", this.get("objectType"));
    target.set("objectId", this.get("objectId"));
    target.set("title", this.get("title"));
    target.set("name", this.get("name"));
    target.set("version", this.get("version"));
    target.set("description", this.get("description"));
    target.set("contentType", this.get("contentType"));
    target.set("scriptSource", this.get("scriptSource"));
    target.set("pattern", this.get("pattern"));
    target.set("secured", this.get("secured"));
    target.set("enabled", this.get("enabled"));
    target.set("modifiedDate", this.get("modifiedDate"));
    target.set("creationDate", this.get("creationDate"));
    if (typeof this.get("creator") === "object")
      target.set("creator", this.get("creator"));
    if (typeof this.get("properties") === "object")
      target.set("properties", this.get("properties"));
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
      verify: verifyToken,
    },
  },
  data: {
    model: {
      Role: RoleModel,
      User: UserModel,
      Image: ImageModel,
      ImageLink: ImageLinkModel,
      Album: AlbumModel,
      Attachment: AttachmentModel,
      BodyContent: BodyContentModel,
      Page: PageModel,
      Api: ApiModel,
    },
  },
  ui: {
    defined,
    isFunction,
    sleep,
    notify,
    handleAjaxError,
    handleAxiosError,
    headerWithAuth,
    getImageUrl,
    getAttachmentUrl,
    setSecureImage,
    setImageAsBase64,
    getImageAsBase64,
    loadAceEditor,
    propertyGrid: createPropertyGrid,
    aceEditor: createAceEditor,
    dropzone: createDropzone,
    masonry: createMasonry,
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

const DEFAULT_JSON_HEADER = {
  Accept: "application/json",
  "Content-Type": "application/json",
};

function headerWithAuth(headers) {
  headers = headers || DEFAULT_JSON_HEADER;
  Object.assign(headers, authHeader());
  return headers;
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
  return `${API_ROOT_URL}/download/avatar/${username}`;
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
/** 
import axiosRetry from "axios-retry";
axiosRetry(axios, {
  retries: 3,
  retryDelay: (retryCount) => {
    return retryCount * 500;
  },
});
*/

function setSecureImage(elemment, delay, callback) {
  var delay = delay || 1000;
  let url = elemment.attr("secure-image");
  setImageAsBase64(
    url,
    function (data) {
      elemment.attr("src", data);
      elemment.parent().removeClass("is-loading");
      if (isFunction(callback)) callback();
    },
    function () {
      let maxRetry = 3,
        retry = 0;
      if (defined(elemment.data("max-retry"))) {
        maxRetry = elemment.data("max-retry");
      }
      if (defined(elemment.data("retry"))) {
        retry = elemment.data("retry");
      }
      if (retry < maxRetry) {
        elemment.data("retry", retry + 1);
        sleep(delay);
        console.log("retry " + retry + " for " + url);
        setSecureImage(elemment);
      } else {
        elemment.parent().removeClass("is-loading");
      }
    }
  );
}

async function setImageAsBase64(url, successHandler, errorHandler) {
  const headers = {};
  Object.assign(headers, studio.services.accounts.authHeader());
  axios
    .get(url, { headers: headers, responseType: "arraybuffer" })
    .then((response) => {
      var mineType = response.headers["content-type"].toLowerCase();
      var b64encoded = Buffer.from(response.data, "binary").toString("base64");
      var prefix = "data:" + mineType + ";base64,";
      if (isFunction(successHandler)) successHandler(prefix + b64encoded);
    })
    .then((error) => {
      if (isFunction(errorHandler)) errorHandler();
    });
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getImageAsBase64(url) {
  const headers = {};
  Object.assign(headers, studio.services.accounts.authHeader());
  const data = await axios
    .get(url, { headers: headers, responseType: "arraybuffer" })
    .then((response) => {
      var mineType = response.headers["content-type"].toLowerCase();
      var b64encoded = Buffer.from(response.data, "binary").toString("base64");
      var prefix = "data:" + mineType + ";base64,";
      return prefix + b64encoded;
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

function verifyToken(options) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };
  Object.assign(headers, studio.services.accounts.authHeader());
  options = options || {};
  if (!defined(options.url)) {
    options.url = `${API_ROOT_URL}/data/accounts/jwt/verify`;
  }
  axios
    .get(options.url, { headers: headers })
    .then((response) => {
      const data = response.data;
      console.log(data);
    })
    .catch(function (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const data = error.response.data;
        if (error.response.status == 401 && data.anonymous) {
          notify(null, "The authentication token has expired.", "error");
          logout();
        }
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log(error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Error", error.message);
      }
      console.log(error.config);
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

const DEFAULT_ACE_OPTIONS = {
  mode: "ace/mode/html",
  theme: "ace/theme/chrome",
  warp: false,
  editable: true,
};

function createDialog(renderTo, options) {
  options = options || {};
  if (renderTo == null || renderTo.length == 0) {
    var guid = kendo.guid();
    $("body").append('<span id="' + guid + '"></span>');
    renderTo = $("'#" + guid + "'");
  }
}

function createAceEditor(renderTo, options) {
  renderTo = renderTo || $("#editor");
  options = options || {};
  var settings = $.extend(true, {}, DEFAULT_ACE_OPTIONS, options);
  if (renderTo.contents().length == 0) {
    var editor = ace.edit(renderTo.attr("id"));
    editor.getSession().setMode(settings.mode);
    editor.setTheme(settings.theme);
    editor.getSession().setUseWrapMode(settings.warp);
    editor.setReadOnly(!settings.editable);
  }
  return ace.edit(renderTo.attr("id"));
}

function createPropertyGrid(renderTo, type, objectId) {
  renderTo = renderTo || $("#property-grid");
  if (!renderTo.data("kendoGrid")) {
    var grid = renderTo
      .kendoGrid({
        dataSource: [],
        height: 300,
        sortable: true,
        filterable: false,
        pageable: false,
        editable: "inline",
        columns: [
          {
            field: "name",
            title: "Name",
            width: 250,
            validation: { required: true },
          },
          { field: "value", title: "Value", validation: { required: true } },
          { command: ["destroy"], title: "&nbsp;", width: "250px" },
        ],
        toolbar: kendo.template(
          '<a href="\\#"class="btn u-btn-outline-lightgray g-mr-5 k-grid-add"><span class="k-icon k-i-plus"></span>Add Property</a><a href="\\#"class="btn u-btn-outline-lightgray g-mr-5 k-grid-save-changes"><span class="k-icon k-i-check"></span> Save</a><a href="\\#"class="btn u-btn-outline-lightgray g-mr-5 k-grid-cancel-changes"><span class="k-icon k-i-cancel"></span> Cancle</a><a class="pull-right hs-admin-reload u-link-v5 g-font-size-20 g-color-gray-light-v3 g-color-secondary--hover g-mt-7 g-mr-5" data-kind="properties" data-action="refresh"></a>'
        ),
        save: function () {},
      })
      .data("kendoGrid");
    renderTo.on(
      "click",
      "a[data-kind=properties],a[data-action=refresh]",
      function (e) {
        var $this = $(this);
        grid.dataSource.read();
      }
    );
  }
  if (type == "users") {
    renderTo.data("kendoGrid").setDataSource(
      new kendo.data.DataSource({
        transport: {
          read: {
            url: `${API_ROOT_URL}/data/secure/mgmt/security/${type}/${objectId}/properties/list.json`,
            type: "post",
            contentType: "application/json",
          },
          create: {
            url: `${API_ROOT_URL}/data/secure/mgmt/security/${type}/${objectId}/properties/update.json`,
            type: "post",
            contentType: "application/json",
          },
          update: {
            url: `${API_ROOT_URL}/data/secure/mgmt/security/${type}/${objectId}/properties/update.json`,
            type: "post",
            contentType: "application/json",
          },
          destroy: {
            url: `${API_ROOT_URL}/data/secure/mgmt/security/${type}/${objectId}/properties/delete.json`,
            type: "post",
            contentType: "application/json",
          },
          parameterMap: function (options, operation) {
            if (operation !== "read" && options.models) {
              return JSON.stringify(options.models);
            }
            return JSON.stringify(options);
          },
        },
        batch: true,
        schema: {
          model: {
            id: "name",
            fields: {
              name: { type: "string", defaultValue: "" },
              value: { type: "string", defaultValue: "" },
            },
          },
        },
      })
    );
  } else {
    renderTo.data("kendoGrid").setDataSource(
      new kendo.data.DataSource({
        transport: {
          read: {
            url: `${API_ROOT_URL}/data/secure/mgmt/${type}/${objectId}/properties/list.json`,
            type: "post",
            contentType: "application/json",
          },
          create: {
            url: `${API_ROOT_URL}/data/secure/mgmt/${type}/${objectId}/properties/update.json`,
            type: "post",
            contentType: "application/json",
          },
          update: {
            url: `${API_ROOT_URL}/data/secure/mgmt/${type}/${objectId}/properties/update.json`,
            type: "post",
            contentType: "application/json",
          },
          destroy: {
            url: `${API_ROOT_URL}/data/secure/mgmt/${type}/${objectId}/properties/delete.json`,
            type: "post",
            contentType: "application/json",
          },
          parameterMap: function (options, operation) {
            if (operation !== "read" && options.models) {
              return JSON.stringify(options.models);
            }
            return JSON.stringify(options);
          },
        },
        batch: true,
        schema: {
          model: {
            id: "name",
            fields: {
              name: { type: "string", defaultValue: "" },
              value: { type: "string", defaultValue: "" },
            },
          },
        },
      })
    );
  }
}

function loadAceEditor() {
  return import(
    /* webpackChunkName: "ace" */ "ace-builds/src-noconflict/ace"
  ).then(() => {
    return import(
      /* webpackChunkName: "ace" */ "ace-builds/webpack-resolver.js"
    );
  });
}

import Dropzone from "dropzone";

function createDropzone(renderTo, options) {
  var myDropzone = new Dropzone(renderTo, options);
  return myDropzone;
}


import Masonry from "masonry-layout"; 
import jQueryBridget from "jquery-bridget";  

// make Masonry a jQuery plugin
jQueryBridget( 'masonry', Masonry, $ );


const DEFAULT_MASONRY_OPTIONS = {
  itemSelector: '.masonry-item',
  columnWidth: '.masonry-sizer',
 
  // columnWidth: '.masonry-sizer',
  percentPosition: true
};

function createMasonry(renderTo, options) {
  options = options || {};
  var settings = $.extend(true, {}, DEFAULT_MASONRY_OPTIONS, options);
  renderTo.masonry(settings);
  //return new Masonry(renderTo, settings);
}
