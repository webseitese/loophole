import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export async function parseResumeWithAI(extractedText: string): Promise<any> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are a resume parser. Extract structured information from resume text and return only valid JSON. Never include markdown formatting."
                },
                {
                    role: "user",
                    content: `Parse this resume text into JSON structure:\n\nResume text:\n${extractedText}\n\nReturn JSON object with this exact structure:\n{\n  "personal": {"name": "", "email": "", "phone": "", "location": "", "linkedin": "", "website": ""},\n  "professionalSummary": "",\n  "experience": [{"company": "", "title": "", "startDate": "", "endDate": "", "location": "", "bullets": []}],\n  "education": [{"institution": "", "degree": "", "field": "", "graduationDate": "", "gpa": ""}],\n  "skills": {"technical": [], "languages": [], "certifications": []}\n}`
                }
            ],
            temperature: 0.3,
            response_format: { type: "json_object" }
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('No response from OpenAI');

        return JSON.parse(content);
    } catch (error) {
        console.error('Error parsing resume with AI:', error);
        throw new Error('Failed to parse resume');
    }
}

export async function optimizeResumeWithAI(
    masterCV: any,
    jobDescription: string,
    companyName?: string,
    roleTitle?: string
): Promise<{ optimizedCV: any; improvementsMade: string[]; keywordsAdded: string[] }> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert resume optimizer with 15 years of experience. Your specialty is optimizing resumes to pass ATS systems and impress hiring managers. Follow these rules strictly:\n\n1. NEVER fabricate or invent experience, skills, or achievements\n2. ONLY rephrase and reorganize existing content from the candidate's resume\n3. Keep all dates, company names, and facts 100% accurate\n4. Naturally integrate keywords from the job description\n5. Quantify achievements with metrics when possible (percentages, numbers, dollar amounts)\n6. Use strong action verbs to start bullet points\n7. Prioritize and reorder content by relevance to the target role\n8. Maintain professional tone appropriate to the industry\n9. Keep resume content equivalent to 1-2 pages\n10. Return only valid JSON, no markdown formatting"
                },
                {
                    role: "user",
                    content: `Optimize this resume for the following job:\n\nCURRENT RESUME:\n${JSON.stringify(masterCV, null, 2)}\n\nTARGET JOB DESCRIPTION:\n${jobDescription}\n\nCOMPANY: ${companyName || 'Not specified'}\nROLE: ${roleTitle || 'Not specified'}\n\nINSTRUCTIONS:\n1. Analyze the job description and identify:\n   - Required technical skills\n   - Required soft skills\n   - Key responsibilities\n   - Important keywords and phrases\n   - Years of experience required\n   - Education requirements\n\n2. Optimize the resume by:\n   - Reordering experience bullets to prioritize most relevant to this role\n   - Adding relevant keywords from job description naturally into existing bullets\n   - Quantifying achievements where possible (add numbers, percentages, metrics)\n   - Tailoring the professional summary to this specific role and company\n   - Emphasizing experience and skills that match job requirements\n   - Using strong action verbs (led, managed, developed, improved, etc.)\n   - Matching the language style and tone of the job description\n\n3. For the professional summary:\n   - Write 2-3 sentences specifically tailored to this role\n   - Mention the target role title\n   - Highlight 2-3 most relevant qualifications\n   - Show alignment with company's needs\n\n4. Document all improvements made\n\n5. List keywords that were added from the job description\n\nRETURN THIS EXACT JSON STRUCTURE:\n{\n  "optimizedCV": {\n    "personal": { same as input },\n    "professionalSummary": "tailored 2-3 sentence summary",\n    "experience": [\n      {\n        "company": "same as input",\n        "title": "same as input",\n        "startDate": "same as input",\n        "endDate": "same as input",\n        "location": "same as input",\n        "bullets": ["optimized bullet 1", "optimized bullet 2", ...]\n      }\n    ],\n    "education": [ same as input ],\n    "skills": {\n      "technical": ["reordered by relevance to job"],\n      "languages": [ same as input ],\n      "certifications": [ same as input ]\n    }\n  },\n  "improvementsMade": [\n    "Specific improvement 1",\n    "Specific improvement 2",\n    "..."\n  ],\n  "keywordsAdded": ["keyword1", "keyword2", "..."]\n}`
                }
            ],
            temperature: 0.4,
            response_format: { type: "json_object" },
            max_tokens: 4000
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('No response from OpenAI');

        return JSON.parse(content);
    } catch (error) {
        console.error('Error optimizing resume with AI:', error);
        throw new Error('Failed to optimize resume');
    }
}

export async function generateCoverLetters(
    optimizedCV: any,
    jobDescription: string,
    companyName?: string,
    roleTitle?: string
): Promise<{ professional: string; enthusiastic: string; creative: string }> {
    try {
        const response = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                {
                    role: "system",
                    content: "You are an expert cover letter writer. You write compelling, personalized cover letters that get interviews. Your letters are professional, show genuine enthusiasm, and clearly connect the candidate's experience to the role requirements."
                },
                {
                    role: "user",
                    content: `Write 3 cover letter variants for this job application:\n\nCANDIDATE'S OPTIMIZED RESUME:\n${JSON.stringify(optimizedCV, null, 2)}\n\nJOB DESCRIPTION:\n${jobDescription}\n\nCOMPANY: ${companyName || 'Not specified'}\nROLE: ${roleTitle || 'Not specified'}\n\nWrite 3 different variants:\n\n1. PROFESSIONAL: Formal, emphasizes experience and qualifications, traditional structure\n2. ENTHUSIASTIC: Shows genuine excitement about the role, warmer and more personal tone while remaining professional\n3. CREATIVE: Starts with a compelling story or unique angle, demonstrates personality\n\nEach letter must:\n- Be 250-350 words\n- Have 3-4 paragraphs\n- Opening paragraph: Hook that grabs attention and states interest in role\n- Body paragraphs: Connect candidate's specific experiences and achievements to job requirements\n- Closing paragraph: Clear call to action, express enthusiasm, thank them\n- Reference specific details from the job description\n- Avoid generic phrases\n\nRETURN THIS JSON:\n{\n  "professional": "full professional letter text",\n  "enthusiastic": "full enthusiastic letter text",\n  "creative": "full creative letter text"\n}`
                }
            ],
            temperature: 0.6,
            response_format: { type: "json_object" },
            max_tokens: 2000
        });

        const content = response.choices[0]?.message?.content;
        if (!content) throw new Error('No response from OpenAI');

        return JSON.parse(content);
    } catch (error) {
        console.error('Error generating cover letters:', error);
        throw new Error('Failed to generate cover letters');
    }
}
