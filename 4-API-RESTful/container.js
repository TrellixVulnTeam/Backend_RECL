
fs = require('fs');

class Container {

    constructor(file) {
        this.file = file;
        this.format = 'utf-8';
    }


    read() {
        let container_file = fs.readFileSync(this.file, this.format);
        container_file = JSON.parse(container_file);
        return container_file;
    }

    save(products) {


        let container_file = fs.readFileSync(this.file, this.format);
        let array_product = "";

        if (container_file != "") {
            array_product = JSON.parse(container_file);
        } else {
            array_product = [];
        }
        array_product.push(products);
        let array_product_JSON = JSON.stringify(array_product);
        fs.writeFile(this.file, array_product_JSON, (error, container) => {
            if (error) {
                console.error(error);
            } else {
                console.log('Se guardó información en el archivo');
            }
        });

    }

    getProduct(id) {
        let container_file = fs.readFileSync(this.file, this.format);
        let array_product = "";

        if (container_file != "") {
            array_product = JSON.parse(container_file);
        } else {
            array_product = [];
        }
        const find = array_product.find(element => element.id = id);
        return JSON.stringify(find);
    }

}


module.exports = Container;