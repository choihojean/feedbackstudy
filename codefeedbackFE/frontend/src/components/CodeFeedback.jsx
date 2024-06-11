import OpenAI from "openai";

const cfb_system_prompt = "당신은 사용자에게 입력받은 코드를 분석하는 AI입니다.\n당신은 입력받은 코드를 두 가지 방법으로 대답합니다.\n첫 번째, 코드를 보완해서 알려준다.\n두 번째, 코드를 자세히 설명한다."
const summary_system_prompt = "전체적인 내용을 한 문장으로 요약해주세요."
const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    dangerouslyAllowBrowser: true
});

export async function CodeFeedback(prompt, history) {
    let req = '' // 질문
    let res = '' // 대답

    Object.values(history).map((v, k) => {
        req += `유저의 ${k}번째 입력: ${v[0]}\n`
        res += `시스템의 ${k}번째 출력: ${v[1]}\n`
    });
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: cfb_system_prompt + req + res },
        { "role": "user", "content": prompt }],
        model: "gpt-3.5-turbo"
    });
    return completion.choices[0].message.content;
};

export async function Summary(history) {
    let req = '' // 질문
    let res = '' // 대답

    Object.values(history).map((v, k) => {
        req += `유저의 ${k}번째 입력: ${v[0]}\n`
        res += `시스템의 ${k}번째 출력: ${v[1]}\n`
    });
    
    const completion = await openai.chat.completions.create({
        messages: [{ role: "system", content: summary_system_prompt },
        { role: "user", content: req + res }],
        model: "gpt-3.5-turbo"
    });
    return completion.choices[0].message.content;
};