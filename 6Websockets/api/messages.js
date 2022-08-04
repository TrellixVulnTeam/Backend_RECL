const { promises: fs } = require('fs')

class Messages {
    constructor(route) {
        this.route = route
    }

    async getAll() {
        try {
            const all = await fs.readFile(this.route, 'utf-8')
            return JSON.parse(all) 
        } catch (error) {
            return []
        }
    }

    async getById(id) {
        try {
            const all = await this.getAll()
            const search = all.find(res => res.id === id)
            return search || { error: `message not found` }
        } catch (error) {
            throw new Error(`search failed: ${error}`)
        }
    }

    async save(object) {
        const all = await this.getAll()
        const nId = all.length == 0 ? 1 : all[all.length-1].id + 1
        const save = { ...object, id: nId}
        all.push(save)

        try {
            await fs.writeFile(this.route, JSON.stringify(all, null, 2))
            return save
        } catch (error) {
            throw new Error(`saving error: ${error}`)
        }
    }
}

module.exports = Messages