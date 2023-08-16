"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.breakLines = void 0;
const wrap_ansi_1 = __importDefault(require("wrap-ansi"));
/**
 * Force line returns at specific width. This function is ANSI code friendly and it'll
 * ignore invisible codes during width calculation.
 * @param {string} content
 * @param {number} width
 * @return {string}
 */
const breakLines = (content, width) => content
    .split('\n')
    .flatMap((line) => (0, wrap_ansi_1.default)(line, width, { trim: false, hard: true })
    .split('\n')
    .map((line) => line.trimEnd()))
    .join('\n');
exports.breakLines = breakLines;
