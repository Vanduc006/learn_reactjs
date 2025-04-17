import { useRef, useState } from "react"
import supabase from "@/services/Supabase/ConnectSupabase"
import BounceLoader from "react-spinners/BounceLoader"
// import { number } from "zod"


const TestGift = () => {
  const giftRef = useRef<HTMLInputElement>(null)
  const passRef = useRef<HTMLInputElement>(null)
  const [isDone, setIsDone] = useState<boolean | null>(null)
  const [price,setPrice] = useState< number | null>(null)
  const [loadState, setLoadState] = useState(false)
  const [currenPrice,setCurrentPrice] = useState(40)
  const [left,setLeft] = useState(2)
  const handlePurchase = async () => {
    setLoadState(true)
    const giftValue = giftRef.current?.value.trim()
    const passValue = passRef.current?.value.trim()
  
    if (!giftValue || !passValue) {
      setIsDone(false)
      return
    }
  
    const { data, error } = await supabase
      .from("gift")
      .select("*")
      .eq("gift", giftValue)
      .eq("pass", passValue)
      .single()
  
    if (error || !data) {
      setIsDone(false)
      return
    }
  
    // Ép kiểu value sang number và trừ 50
    const currentValue = parseFloat(data.value)
    const newValue = currentValue - currenPrice
    setCurrentPrice(newValue)
    setPrice(newValue)
    if (newValue < 0) {
    //   alert("❌ Not enough value in gift")
      setIsDone(false)
      return
    }
  
    // Cập nhật lại giá trị value
    const { error: updateError } = await supabase
      .from("gift")
      .update({ value: newValue.toString() })
      .eq("id", data.id) // hoặc .eq('gift', giftValue) cũng được
  
    if (updateError) {
      console.error("Update failed:", updateError)
      setIsDone(false)
      setLoadState(false)
      return
    }
  
    setIsDone(true)
    setLoadState(false)
    setLeft(left-1)
  }
  

  return (
    <div className="min-h-screen bg-gray-200 items-center justify-content-center p-5">
      <div>Default price : {currenPrice}$</div>
      <div>
        {left == 0 ? <div>You can't add gift anymore</div> : <div>Your can add {left} gift left </div>}
      </div>
      <div className="flex text-black gap-2">
        <input
          ref={giftRef}
          type="text"
          placeholder="input gift"
          className="p-2 text-black rounded-md"
        />
        <input
          ref={passRef}
          type="text"
          placeholder="input pass"
          className="p-2 text-black rounded-md"
        />
      </div>

      <div
        onClick={handlePurchase}
        className="cursor-pointer bg-gray-500 rounded-xl text-white w-fit p-2 mt-2"
      >
        Purchase
      </div>

      <div>
        {loadState && <div className="text-black flex gap-2 items-center justify-content-center">Checking your gift card 
          <BounceLoader color='#4871f7'
            className='ml-2'
            loading={true}
            size={10}
          ></BounceLoader></div>}
      </div>

      <div className="mt-4">
        {isDone === true && (
          <div className="text-green-500">
            <p>✅ Purchase successful!</p>
            <p>Thank you for your purchase!</p>
            <p>Gift value left {price}</p>
          </div>
        )}
        {isDone === false && (
          <div className="text-red-500">❌ Not valid gift or pass!</div>
        )}
      </div>
    </div>
  )
}

export default TestGift
