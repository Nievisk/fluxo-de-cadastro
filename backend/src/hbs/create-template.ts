import hbs from "handlebars"
import fs from "node:fs"
import path from "node:path"

type DataType = {
    first_name: string
    token: string
}

export const CreateTemplate = (data: DataType) => {
    const url = `http://localhost:5173/auth/validate`

    const templatePath = path.join(process.cwd(), 'src/hbs/email-template.hbs')
    const template = fs.readFileSync(templatePath, 'utf8')
    const formedTemplate = hbs.compile(template)
    return formedTemplate({
        first_name: data.first_name,
        token: data.token,
        url
    })
}