"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTemplate = void 0;
const handlebars_1 = __importDefault(require("handlebars"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const CreateTemplate = (data) => {
    const url = `http://localhost:5173/auth/validate`;
    const templatePath = node_path_1.default.join(process.cwd(), 'src/hbs/email-template.hbs');
    const template = node_fs_1.default.readFileSync(templatePath, 'utf8');
    const formedTemplate = handlebars_1.default.compile(template);
    return formedTemplate({
        first_name: data.first_name,
        token: data.token,
        url
    });
};
exports.CreateTemplate = CreateTemplate;
