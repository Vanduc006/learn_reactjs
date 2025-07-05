// interface Storage {
//     // file : File,
//     userID : string,
//     collectionName : string,
//     spaceid : string,
//     key : string,
//     size : string,
//     timeout : string,
// }

interface Embedding {
    userID : string | undefined,
    collectionName : string,
    spaceID : string,
    fileID : string,
    originalName : string,
    // size : string,
    // timeout : string,
}
const S3Storage = async(
    file : File,
    userID : string | undefined,
    collectionName : string,
    spaceID : string ,
    key:string, 
    originalName : string,
    // size:string, 
    // timeout = null
) => {
    // const params = new URLSearchParams()
    // params.append('key',key)
    // params.append('timeout', timeout)
    // params.append('size',size)
    // const respone = await fetch('https://api.imasis.id.vn/upload/presignedpost?' + params.toString(),{
    //     method : 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     },
    // })
    // const data = respone.json()

    // return data
    // try {
    //     const newStorage : Storage = {
    //         spaceid : spaceID,
    //         key : key,
    //         size : size,
    //         timeout : timeout,
    //     }

    //     const respone = await fetch('https://api.imasis.id.vn/upload/presignedpost',{
    //         method : 'POST',
    //         headers : {
    //             'Content-Type': 'application/json'
    //         },
    //         body : JSON.stringify(newStorage)
    //     })

    //     const data = await respone.json()
    //     return data
    // } catch (error) {
    //     console.log(error)
    //     return []
    // }
    try {
        const formData = new FormData
        formData.append('file',file)
        const newEmbeddingObject : Embedding = {
            userID : userID,
            collectionName : collectionName,
            spaceID : spaceID,
            fileID : key,
            originalName : originalName,
            // size : size,
        }

        formData.append('data',JSON.stringify(newEmbeddingObject))
        const respone = await fetch(import.meta.env.VITE_WEBSERVICE_URL + '/upload',{
            method : 'POST',
            body : formData
        })

        const data = await respone.json()
        return data


    } catch (error) {
        console.log('Call upload route fail')
        return
    }
}

export default S3Storage