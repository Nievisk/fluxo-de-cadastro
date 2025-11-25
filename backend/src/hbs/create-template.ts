import hbs from "handlebars"
import fs from "node:fs"
import path from "node:path"

type DataType = {
    first_name: string
    token: string
}

export const CreateTemplate = (data: DataType) => {
    const templatePath = path.join(process.cwd(), 'src/hbs/email-template.ts')
    const template = fs.readFileSync(templatePath)
    const formedTemplate = hbs.compile(template)
    return formedTemplate(data)
}