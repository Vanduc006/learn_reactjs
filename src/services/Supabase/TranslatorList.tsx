import supabase from "./ConnectSupabase";
// import { useUser } from "@clerk/clerk-react";

const TranslatorList = async (userID : string ,spaceID: string,cursor = null): Promise<any[]> => {
    // const {user} = useUser()
    let query = supabase
        .from('translator')
        .select('*')
        .eq('userid',userID)
        .eq('spaceid', spaceID)
        .order("created_at", { ascending: false })
        // .order("id", { ascending: false })
        .limit(10)
    if ( cursor ) {
        query = query.lt("created_at", cursor);
    }
    const { data, error } = await query

    if (error) {
        console.error("Lỗi khi lấy dữ liệu:", error.message);
        return [];
    }

    return data || [];
}

export default TranslatorList;

export const TranslatorNew = async (userID: any,listImages: any,LLMsRespone: any):Promise<any[]> => {

    let query = supabase
        .from('translator')
        .insert({userid : userID,photos_prompt_url :listImages,api_respone_content :LLMsRespone})
    const { data,error } =  await query
    if (error) {
        console.log("new translator error",error)
    }
    return data || [];
  
}

export const isHaveTranslator = async(spaceID:string):Promise<boolean> => {
    const { count, error } = await supabase
        .from("translator")
        .select("*", { count: "exact", head: true })
        .eq("spaceid",spaceID)
    if (error) {
        console.error("Lỗi khi kiểm tra chat:", error);
        return false;
    }    
    return (count ?? 0) > 0
}

// import { useEffect, useState, useRef } from "react";
// import supabase from "./ConnectSupabase";

// const TranslatorList = ({ user }) => {
//   const [chatSession, setChatSession] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [hasMore, setHasMore] = useState(true);
//   const lastItemRef = useRef(null);
//   let lastCreatedAt = null;

//   useEffect(() => {
//     if (user) {
//       fetchData(user.id);
//     } else {
//       console.log("User not exists");
//     }
//   }, [user]);

//   async function fetchData(clerkUserId) {
//     if (!hasMore) return;
//     setLoading(true);

//     let query = supabase
//       .from("translator")
//       .select("*")
//       .eq("userid", clerkUserId)
//       .order("created_at", { ascending: false })
//       .limit(20);

//     if (lastCreatedAt) {
//       query = query.lt("created_at", lastCreatedAt);
//     }

//     const { data: newData, error } = await query;

//     if (error) {
//       console.error("Lỗi khi lấy dữ liệu:", error.message);
//       setLoading(false);
//       return;
//     }

//     if (newData.length < 20) {
//       setHasMore(false);
//     }

//     if (newData.length > 0) {
//       lastCreatedAt = newData[newData.length - 1].created_at;
//       setChatSession((prev) => [...prev, ...newData]);
//     }

//     setLoading(false);
//   }

//   useEffect(() => {
//     if (!hasMore || !lastItemRef.current) return;

//     const observer = new IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting) {
//           fetchData(user.id);
//         }
//       },
//       { threshold: 1 }
//     );

//     observer.observe(lastItemRef.current);
//     return () => observer.disconnect();
//   }, [hasMore, user]);

//   return (
//     <div>
//       {chatSession.map((item, index) => (
//         <div key={item.id} ref={index === chatSession.length - 1 ? lastItemRef : null}>
//           <p>{item.translated_text}</p>
//         </div>
//       ))}
//       {loading && <p>Loading more...</p>}
//     </div>
//   );
// };

// export default TranslatorList;
