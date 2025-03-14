import supabase from "./ConnectSupabase";

const FlashcardList = async(clerkUserId: string, cursor = null):Promise<any[]> => {
    let query = supabase
        .from("flashcard")
        .select("*")
        .eq("userid",clerkUserId)
        .order("created_at", {ascending : false})
        .limit(10)
    if (cursor) {
        query = query.lt("created_at", cursor);
    }    
    const { data, error } = await query
    if ( error) {
        console.log("query flashcard fail")
        return [];
    }
    return data || [];
}
export default FlashcardList