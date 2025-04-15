const streamFile = async(formData : FormData):Promise<any> => {
    formData.append('upload_preset', 'user-upload-mind');
    try {
        const respone = await fetch('https://api.cloudinary.com/v1_1/dkgluft3l/auto/upload', {
            method : "POST",
            body : formData,
        })
        const data = await respone.json()
        return data
    } catch (error) {
        return error
    }
}
export default streamFile