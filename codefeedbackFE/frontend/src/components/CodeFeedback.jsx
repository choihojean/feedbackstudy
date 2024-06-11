import OpenAI from "openai";

const cfb_system_prompt = "당신은 사용자에게 입력받은 코드를 분석하는 AI입니다.\n당신은 입력받은 코드에 대해서 대답합니다.";
const summary_system_prompt = "전체적인 내용을 한 문장으로 요약해주세요.";
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function CodeFeedback(prompt, history, option) {
    let system_option = "";
    let req = ''; // 질문
    let res = ''; // 대답

    if(option == "question")
        system_option = "\n입력받은 코드에 오류가 있는지에 대해 대답해주고, 보완할 점이 있다면 코드를 보완해서 알려주세요.";
    else if(option == "explanation")
        system_option = "\n입력받은 코드에 대해서 자세히 설명해주세요.";

    Object.values(history).map((v, k) => {
        req += `유저의 ${k}번째 입력: ${v[0]}\n`;
        res += `시스템의 ${k}번째 출력: ${v[1]}\n`;
    });
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: cfb_system_prompt + system_option + req + res },
        { "role": "user", "content": prompt }],
        model: "gpt-3.5-turbo"
    });
    return completion.choices[0].message.content;
};

export async function Summary(history) {
    let req = ''; // 질문
    let res = ''; // 대답

    Object.values(history).map((v, k) => {
        req += `유저의 ${k}번째 입력: ${v[0]}\n`;
        res += `시스템의 ${k}번째 출력: ${v[1]}\n`;
    });
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: summary_system_prompt },
        { role: "user", content: req + res }],
        model: "gpt-3.5-turbo"
    });
    return completion.choices[0].message.content;
};