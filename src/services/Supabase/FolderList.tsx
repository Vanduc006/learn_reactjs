import supabase from "./ConnectSupabase";

const FolderList = async(userID : string | null):Promise<any[]> => {
    const {data, error} = await supabase
        .from('folderspace')
        .select('*')
        .eq('userid', userID)
        .order("id", { ascending: false })
    if (error) {
        return []
    }
    return data || []
}

export default FolderList

export const newFolder = async(userID : string | undefined,folderName : string,customize : string) => {
    await supabase
    .from('folderspace')
    .insert({
        userid : userID,
        foldername : folderName,
        customize : customize,
    })
}