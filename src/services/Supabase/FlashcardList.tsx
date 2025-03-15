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

export const isHaveFlashcard = async(clerkUserId:string):Promise<boolean> => {
    const { count, error } = await supabase
        .from("flashcard")
        .select("*", { count: "exact", head: true })
        .eq("userid",clerkUserId)
    if (error) {
        console.error("Lỗi khi kiểm tra flashcard:", error);
        return false;
    }    
    return (count ?? 0) > 0
}