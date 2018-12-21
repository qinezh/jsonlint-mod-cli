import * as util from "util";
import * as fs from "fs";
const linter = require("jsonlint-mod");
const glob = util.promisify(require('glob'));
const readFile = util.promisify(fs.readFile);

module.exports = class jsonlinter {
    public async lintFile(filePath: string): Promise<void> {
        const content = await readFile(filePath, "utf8");
        linter.parse(content);
    }
    
    public async lintFiles(pattern: string): Promise<void> {
        const matches = await glob(pattern);
        for (const match of matches) {
            await this.lintFile(match);
            console.log(`${match} passed json lint.`);
        }
    }
}