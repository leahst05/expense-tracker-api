const displayObjArr = (obj,res,next) =>{
    if(obj){
        const objArr = Object.values(obj);
        let data;
        const newObjArr = []
        objArr.forEach((arr)=>{
            const id = arr.id;
            data = {id, ...arr}
            newObjArr.push(data)
    })
    res.send(newObjArr);
    }else{
        const err = new Error('No item has been found')
        err.status = 404
        next(err);
    }
}

module.exports = displayObjArr;
