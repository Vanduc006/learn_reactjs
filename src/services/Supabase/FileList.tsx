import supabase from "./ConnectSupabase";

const FileList = async (spaceID: string): Promise<any[]> => {
    const {data, error} = await supabase
        .from('file')
        .select('*')
        .eq('spaceid', spaceID)
        .order("id", { ascending: false })
    if (error) {
        return []
    }
    return data || []

}

export default FileList;


// export const FileNew = async(spaceID : string, key : string, status? : string,type? : string):Promise<any[]> => {
//     if (!status) {
//         status = "pending"
//     }
//     const { data, error } = await supabase
//     .from('file')
//     .insert({ 
//         spaceid: spaceID, 
//         status: status,
//         type: type,
//         key: key
//     })
//     if (error) {
//         console.log("Create new file fail")
//         return []
//     }
//     return data || []
// }