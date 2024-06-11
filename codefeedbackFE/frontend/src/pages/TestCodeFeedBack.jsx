import React, {useEffect, useState} from 'react';
import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

function TestCodeFeedBack() {

    const [questionType, setQuestionType] = useState("질문");
    const [content, setContent] = useState("");
    const [assistant, setAssistant] = useState(null);
    const [thread, setThread] = useState(null);
    const [message, setMessage] = useState(null);
    const [run, setRun] = useState(null);

    useEffect(() => {
        createAssistantAndThread();
    }, []);

    useEffect(() => {
        createRun();
    }, [message]);

    useEffect(() => {
        const createListAndShowMessages = async () => {
            console.log("createListAndShowMessages");
            if (run && run.status) {
                if (run.status === 'completed') {
                    const messages = await openai.beta.threads.messages.list(
                        run.thread_id
                    );
                    console.log("==message==");
                    console.log(messages);
                    console.log("==message==");
                    for (const message of messages.data.reverse()) {
                        console.log(`${message.role} > ${message.content[0].text.value}`);
                    }
                } else {
                    console.log(run.status);
                }
            }

        }
        createListAndShowMessages();

    }, [run]);

    const createAssistantAndThread = async () => {
        console.log("createAssistantAndThread");
        const newAssistant = await openai.beta.assistants.create({
            name: "Code Assistant",
            instructions: "너는 프로그래밍에 대한 조언을 해주는 사람이야. 코드를 읽고 어떤 코드인지 자세히 설명해줘.",
            tools: [{ type: "code_interpreter" }],
            model: "gpt-3.5-turbo"
        });
        const newThread = await openai.beta.threads.create();
        setAssistant(newAssistant);
        setThread(newThread);
        if (thread) {
            console.log(thread);
        }
    }

    const createMessage = async () => {
        console.log("createMessage");
        if (thread) {
            const newMessage = await openai.beta.threads.messages.create(
                thread.id,
                {
                    role: "user",
                    content: content
                }
            );
            setMessage(newMessage);
        } else {
            console.log('스레드 생성 중...');
        }

    }

    const createRun = async () => {
        console.log("createRun");

        if (message) {

            const newRun = await openai.beta.threads.runs.createAndPoll(
                thread.id,
                {
                    assistant_id: assistant.id
                }
            );
            setRun(newRun);



        } else {
            console.log("메시지 생성 중...");
        }

    }
    const handleSubmit = () => {
        createMessage();
    }

    return (
        <div>

            <textarea id="question" name="question" rows="10" cols="100" value={content} onChange={(e)=>setContent(e.target.value)}/>
            <button onClick={handleSubmit}>전송</button>


        </div>
    );
}

export default TestCodeFeedBack;
