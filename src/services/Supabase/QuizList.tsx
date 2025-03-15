
import supabase from "./ConnectSupabase";
const QuizzList =  async(clerkUserId: string, cursor = null):Promise<any[]> => {
    let query = supabase
        .from("quizz")
        .select("*")
        .eq("userid",clerkUserId)
        .order("created_at", {ascending : false})
        .limit(10) 
    if ( cursor ) {
        query =  query.lt("created_at",cursor)
    }
    const { data, error } = await query
    if (error) {
        // console.error("Lỗi khi lấy dữ liệu:", error.message);
        return [];
    }
    
    return data || [];

}
export default QuizzList

export const isHaveQuizz = async(clerkUserId:string):Promise<boolean> => {
    const { count, error } = await supabase
        .from("quizz")
        .select("*", { count: "exact", head: true })
        .eq("userid",clerkUserId)
    if (error) {
        console.error("Lỗi khi kiểm tra quizz:", error);
        return false;
    }    
    return (count ?? 0) > 0
}