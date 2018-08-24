"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PixiFps = /** @class */ (function (_super) {
    __extends(PixiFps, _super);
    function PixiFps(fontSize, textColor) {
        if (fontSize === void 0) { fontSize = 30; }
        if (textColor === void 0) { textColor = 0xff0000; }
        var _this = _super.call(this) || this;
        _this.timeValues = [];
        _this.lastTime = new Date().getTime();
        _this.fpsTextField = new PIXI.Text("", { fontSize: fontSize, fontStyle: "Arial", fill: textColor });
        _this.fpsTicker = new PIXI.ticker.Ticker();
        _this.fpsTicker.add(_this.measureFPS.bind(_this));
        _this.fpsTicker.start();
        _this.addChild(_this.fpsTextField);
        return _this;
    }
    PixiFps.prototype.measureFPS = function () {
        var currentTime = new Date().getTime();
        this.timeValues.push(1000 / (currentTime - this.lastTime));
        if (this.timeValues.length === 30) {
            var total = 0;
            for (var i = 0; i < 30; i++) {
                total += this.timeValues[i];
            }
            this.fpsTextField.text = (total / 30).toFixed(2);
            this.timeValues.length = 0;
        }
        this.lastTime = currentTime;
    };
    return PixiFps;
}(PIXI.Container));
exports.PixiFps = PixiFps;
