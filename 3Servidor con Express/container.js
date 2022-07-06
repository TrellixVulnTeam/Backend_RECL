const fs = require('fs');
const checkInArray = (id, array) => { return (array.filter(e => e.id === id).length > 0) ? true : false };

class Container {

    constructor(filepath) {
        this.path = filepath;
        this.count = null;
    }

    async create() {

        try {
            await fs.writeFile(`${this.path}`, "");
            console.log(`\nSuccessfully created file`);
        } catch (error) {
            console.log(`Failed to create archive ${err}`);
        }
    }


    async save(obj) {
        try {
            let actualProducts = await this.getAll();
            if (actualProducts.length === 0)
                actualProducts = [];
            let data = {
                ...obj,
                id: this.count++
            };
            actualProducts.push(data);
            let modifyProducts = JSON.stringify(actualProducts, null, 2);
            await fs.writeFile(`${this.path}`, modifyProducts);
            this.count++;
            console.log(`Object successfully added`);

        } catch (err) {
            console.log(`Failed to save product, ${err}`);
        }
    }

    async getById(id) {
        const data = await fs.readFile(`${this.path}`, 'utf-8')
            .catch((err) => console.error('Failure to read file', err));

        let array = JSON.parse(data);
        const element = array.filter(item => item.id === id);
        return element ? JSON.stringify(element[0]) : null;
    }


    async getAll() {
        const data = await fs.readFile(`${this.path}`, 'utf-8')
            .catch((err) => console.error(`Failure to read file, ${err}`));
        const products = JSON.parse(data);
        this.count = (products.length); 
        return products;
    }

    async deleteById(id) {
        const data = await this.getAll();

        if (checkInArray(id, data)) {

            const productsFiltered = data.filter((prd) => prd.id !== (id));
            await fs.writeFile(this.file, JSON.stringify(productsFiltered, null, 2));
            return console.log(`The product ${id} was successfully removed`);
        }

        return console.log(`Product ${id} could not be found. Enter a new ID`);
    }

    async deleteAll() {
        try {
            await fs.writeFile(`${this.path}`, '[]');
            console.log(`File successfully emptied`);
            return;
        } catch (err) {
            console.log(`Error while emptying file, ${err}`);
        }
    }

    async deleteFile() {

        try {
            await fs.unlink(`${this.path}`);

        } catch (err) {
            console.log(`error while deleting, ${err}`);
        }
    }
}


module.exports = Container;