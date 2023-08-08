"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var bottleneck_1 = __importDefault(require("bottleneck"));
var cheerio_1 = require("cheerio");
var express_1 = require("express");
var express_async_handler_1 = __importDefault(require("express-async-handler"));
var uuid_1 = require("uuid");
var router = (0, express_1.Router)();
var limiter = new bottleneck_1.default({
    maxConcurrent: 1,
    minTime: 5000,
});
router.get("/:searchTerm", (0, express_async_handler_1.default)(function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var searchTerm, url, response, html, $_1, audiobooks_1, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                searchTerm = req.params.searchTerm;
                console.log(searchTerm);
                url = "http://audiobookbay.is/?s=".concat(searchTerm, "&cat=undefined%2Cundefined");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, limiter.schedule(function () { return axios_1.default.get(url); })];
            case 2:
                response = _a.sent();
                html = response.data;
                $_1 = (0, cheerio_1.load)(html);
                console.log($_1);
                audiobooks_1 = [];
                $_1("div.post").each(function (index, element) {
                    var titleElement = $_1(element);
                    var title = titleElement.find("div.postTitle h2").text().trim();
                    var link = url + titleElement.find("a").attr("href");
                    var img = titleElement.find("img").attr("src");
                    var id = (0, uuid_1.v4)();
                    link = link.replace(/^.*?\/abss\//, "https://audiobookbay.is/abss/");
                    audiobooks_1.push({ title: title, link: link, img: img, id: id });
                });
                res.json(audiobooks_1);
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                console.log("Error:", error_1);
                res.status(500).json({ error: "Internal Server Error" });
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); }));
exports.default = router;
