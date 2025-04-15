import { useEffect, useMemo } from "react";

const PreviewAudio = ({File}: {File: any}) => {
    const audioUrl = useMemo(() => URL.createObjectURL(File), [File]);

  useEffect(() => {
    return () => {
      URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);
  
  return (
    <div>
      <audio src={audioUrl} controls className="w-full h-[40px] rounded-md bg-white" />
    </div>
  )
}

export default PreviewAudio