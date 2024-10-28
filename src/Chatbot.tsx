import React, { useEffect } from 'react';

const ChatBot: React.FC = () => {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = "//code.tidio.co/hu0tdpdmpaweio5jbrcivzqygrq9qcbf.js"; 
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return null; 
};

export default ChatBot;
