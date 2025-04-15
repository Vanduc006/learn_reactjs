import { useEffect, useMemo } from "react";

const PreviewPDF = ({File} : {File:any}) => {
  const pdfUrl = useMemo(() => URL.createObjectURL(File), [File]);
  useEffect(() => {
    return () => {
      URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);
  return (
    <div>
      <object className="rounded-md" data={pdfUrl} type="application/pdf" width="100%" height="600px">
          <p>Your browser does not support PDFs. <a href={pdfUrl}>View PDF</a>.</p>
      </object>
    </div>
  )
}

export default PreviewPDF