import { useEffect, useState } from "react";

interface StreamingTextProps {
    apiUrl: string;
    trigger: boolean;
}

const StreamingText: React.FC<StreamingTextProps> = ({ apiUrl, trigger }) => {
    const [displayedContent, setDisplayedContent] = useState<string[]>([]);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        if (trigger && !hasStarted) {
            setHasStarted(true);
            fetch(apiUrl)
                .then((res) => res.text())
                .then((data) => {
                    const elements = data.split(/(?=<h2|<h3|<p|<li>)/g);
                    showTextProgressively(elements);
                })
                .catch((error) => console.error("Error fetching HTML:", error));
        }
    }, [trigger, apiUrl]);

    const showTextProgressively = (elements: string[]) => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < elements.length) {
                setDisplayedContent((prev) => [...prev, elements[index]]);

                const delay = elements[index].startsWith("<h2") || elements[index].startsWith("<h3") ? 1000 : 300;
                index++;

                setTimeout(() => {
                    if (index >= elements.length) clearInterval(interval);
                }, delay);
            } else {
                clearInterval(interval);
            }
        }, 300);
    };

    return <div dangerouslySetInnerHTML={{ __html: displayedContent.join("") }} />;
};

export default StreamingText;
