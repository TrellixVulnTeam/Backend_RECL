import fs from 'fs';
import path from 'path'

const dataPath = path.resolve('../data/products.txt')


class Products{
    
    constructor(){
        this.prod = [];
    }

    save(obj){
        let timestamp = new Date().toLocaleDateString();

        if(!fs.existsSync(dataPath)){
            fs.writeFileSync(dataPath, '')
            let dataFile = fs.readFileSync(dataPath, 'utf-8');
            let newId = dataFile.length + 1;
            this.prod = obj[0];
            let newObj = {...this.prod, timestamp: timestamp, id: newId};
            fs.writeFileSync(dataPath, JSON.stringify([newObj]));
        }else{
            let newDataFile = fs.readFileSync(dataPath, 'utf-8');

            if(newDataFile.length <= 0){
                let dataFile =  fs.readFileSync(dataPath, 'utf-8');
                let newId = dataFile.length + 1;
                this.prod = obj[0];
                let newObj = {...this.prod, timestamp: timestamp, id: newId};
                console.log(newObj)
                fs.writeFileSync(dataPath, JSON.stringify([newObj]));
            }else{
                let dataFile =  JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
                let newId = dataFile.length + 1;
                this.prod = obj;
                let newObj = {...this.prod, timestamp: timestamp, id: newId};
                dataFile.push(newObj);
                fs.writeFileSync(dataPath,JSON.stringify(dataFile));
            }
         }        
    }

    getById(id){
        
        let finalId = parseInt(id) - 1;
        
        let data = JSON.parse(fs.readFileSync(dataPath,'utf-8'));

        if(data[finalId] !== undefined){
            return data[finalId]
        }else if(id === undefined){
            return data
        }else if(data[finalId] == undefined && id > 0){
            return {message:"product does not exist"}
        }
        
    }

    putData(obj,id){
        let newId = id - 1;
        console.log(id)
        console.log(newId)
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        console.log(data)
        if(!data[newId]){
            let error = {"error": "error, does not exist"}
            return error
        }else{
            data[newId] = obj;
            fs.writeFileSync(dataPath,JSON.stringify(data))
            return data
        }

    }

    deleteData(id){
        let newId = id - 1;
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        

        if(data.length < id){
            let error = {error: "El elemento no existe"}
            return error
        }else{
            data.splice(newId,1)
            fs.writeFileSync(dataPath,JSON.stringify(data))
            return data

        }
    }
}

let products = new Products();
export default products;