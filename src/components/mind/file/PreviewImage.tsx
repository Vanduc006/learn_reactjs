import { useEffect, useMemo } from "react";

const PreviewImage = ({File}: {File: any}) => {
    const imageUrl = useMemo(() => URL.createObjectURL(File), [File]);
    useEffect(() => {
        return () => {
            URL.revokeObjectURL(imageUrl);
        };
    }, [imageUrl]);
  return (
    <div className="">
        <img src={imageUrl} alt={File.name} className="rounded-md" />
    </div>
  )
}

export default PreviewImage