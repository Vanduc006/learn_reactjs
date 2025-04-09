import supabase from "./ConnectSupabase";

const FolderList = async(clearkUserId: string,cursor = null):Promise<any[]> => {
    
    let query = supabase
        .from("folderspace")
        .select("*")
        .eq("userid",clearkUserId)
        .order("created_at", {ascending : false})
        .limit(10)
    if (cursor) {
        query = query.lt("created_at", cursor);
    }
    const { data, error } = await query
    if ( error) {
        console.log("query folder")
        return [];
    }
    return data || [];
}

export default FolderList