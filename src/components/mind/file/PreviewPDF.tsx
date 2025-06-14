import { useEffect, useMemo } from "react";

const PreviewPDF = ({ File }: { File: File | string }) => {
  const pdfUrl = useMemo(() => {
    if (typeof File === "string") {
      return File;
    }
    return URL.createObjectURL(File);
  }, [File]);

  useEffect(() => {
    if (typeof File !== "string") {
      return () => {
        URL.revokeObjectURL(pdfUrl);
      };
    }
  }, [pdfUrl, File]);

  return (
    <div>
      <object
        className="rounded-md"
        data={pdfUrl}
        type="application/pdf"
        width="100%"
        height="600px"
      >
        <p>
          Your browser does not support PDFs. <a href={pdfUrl}>View PDF</a>.
        </p>
      </object>
    </div>
  );
};

export default PreviewPDF;
