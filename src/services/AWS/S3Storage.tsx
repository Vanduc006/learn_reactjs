
const S3Storage = async(key:string, size:string, timeout: string) => {
    const params = new URLSearchParams()
    params.append('key',key)
    params.append('timeout', timeout)
    params.append('size',size)
    const respone = await fetch('https://api.imasis.id.vn/upload/presignedpost?' + params.toString(),{
        method : 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
    const data = respone.json()

    return data
}

export default S3Storage