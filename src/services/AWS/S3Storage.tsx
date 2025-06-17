interface Storage {
    spaceid : string,
    key : string,
    size : string,
    timeout : string,
}

const S3Storage = async(spaceID : string ,key:string, size:string, timeout: string) => {
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
    try {
        const newStorage : Storage = {
            spaceid : spaceID,
            key : key,
            size : size,
            timeout : timeout,
        }

        const respone = await fetch('https://api.imasis.id.vn/upload/presignedpost',{
            method : 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(newStorage)
        })

        const data = await respone.json()
        return data
    } catch (error) {
        console.log(error)
        return []
    }
}

export default S3Storage