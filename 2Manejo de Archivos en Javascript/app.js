import { Container } from './container.js';

const myContainer = new Container('./products.txt');

const newProduct = {
    title: "prod1",
    price: 100.05,
    thumbnail: "https://ibb.co/TPWQRS7",
    "id": 1
};


async function executionTest() {
    try {
        await myContainer.getAll();
        await myContainer.getById(2)
            .then((result) => { console.log(result) });
        await myContainer.deleteById("1");
        await myContainer.save(newProduct);
        await myContainer.deleteAll();
        await myContainer.create();
        await myContainer.deleteAll()
        await myContainer.deleteFile();

    } catch (err) {
        console.log('Error in process', err);
    }
}



executionTest();