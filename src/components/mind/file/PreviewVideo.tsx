
import { useEffect, useMemo } from "react";

const PreviewVideo = ({File} : {File:any}) => {
    const videoUrl = useMemo(() => URL.createObjectURL(File), [File]);

    useEffect(() => {
      return () => {
        URL.revokeObjectURL(videoUrl);
      };
    }, [videoUrl]);
  return (
    <div>
      <video src={videoUrl} controls className="w-full h-auto rounded-md" />
    </div>
  )
}

export default PreviewVideo