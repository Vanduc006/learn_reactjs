// import supabase from "./ConnectSupabase";

// const FileList = async (spaceID: string,cursor = null): Promise<any[]> => {
//     let query = supabase
//         .from('file')
//         .select('*')
//         .eq('spaceid', spaceID)
//         .order("created_at", { ascending: false })
//         // .order("id", { ascending: false })
//         .limit(10)
//     if ( cursor ) {
//         query = query.lt("created_at", cursor);
//     }
//     const { data, error } = await query

//     if (error) {
//         console.error("Lỗi khi lấy dữ liệu:", error.message);
//         return [];
//     }

//     return data || [];
// }

// export default FileList;


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