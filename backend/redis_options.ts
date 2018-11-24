import client from './redis_con'

const set_session = (key:any,value:any,type?:string,ex?:number) => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            if(typeof type !== 'undefined' && typeof ex !== 'undefined'){
                client.set(key,value,type,ex,(err,replies) => {
                    resolve(replies)
                })
            } else {
                client.set(key,value,(err,replies) => {
                    resolve(replies)
                })
            }
        },0.1)
    })
}

const get_session = (key:any) => {
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            key = (typeof key !== 'undefined') ? key:null
            if(typeof key !== 'undefined'){
                client.get(key,(err,replies) => {
                    resolve(replies)
                })  
            } else {
                reject("key error !!!")
            }    
        },0.1)
    })
}

export default set_session; get_session