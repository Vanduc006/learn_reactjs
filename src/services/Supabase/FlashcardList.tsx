import supabase from "./ConnectSupabase";

const FlashcardList = async(clerkId: string):Promise<string[]> => {
    let query = supabase
        .from("flashcard")
        .select("*")
        .eq("userid",clerkId)
    const { data,error } = await query
    if (error) {
        console.log("can not query flashcard table")
        return []
    }
    return data || []
    // return new Promise<any>((resolve, reject) => {        
    // })
}
export default FlashcardList