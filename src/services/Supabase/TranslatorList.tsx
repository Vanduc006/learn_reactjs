import supabase from "./ConnectSupabase";

const TranslatorList = async (clerkUserId: string): Promise<any[]> => {
    const { data, error } = await supabase
        .from('translator')
        .select('*')
        .eq('userid', clerkUserId)
        .order("created_at", { ascending: false })
        .limit(20);

    if (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
        return [];
    }

    return data || [];
}

export default TranslatorList;
