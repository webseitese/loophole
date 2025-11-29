// ATS Score Calculator
export interface ATSScoreBreakdown {
    score: number;
    breakdown: {
        keywordMatch: number;
        formatQuality: number;
        quantifiedAchievements: number;
        appropriateLength: number;
        actionVerbs: number;
    };
}

export function calculateATSScore(cvData: any, jobDescription: string): ATSScoreBreakdown {
    let keywordMatch = 0;
    let formatQuality = 0;
    let quantifiedAchievements = 0;
    let appropriateLength = 0;
    let actionVerbs = 0;

    // 1. Keyword Matching (40 points)
    const jdKeywords = extractKeywords(jobDescription);
    const cvText = JSON.stringify(cvData).toLowerCase();
    const matchedKeywords = jdKeywords.filter(kw =>
        cvText.includes(kw.toLowerCase())
    );
    keywordMatch = Math.round((matchedKeywords.length / Math.max(jdKeywords.length, 1)) * 40);

    // 2. Format Quality (20 points)
    if (cvData.experience && cvData.experience.length > 0) formatQuality += 5;
    if (cvData.education && cvData.education.length > 0) formatQuality += 5;
    if (cvData.skills && Object.keys(cvData.skills).length > 0) formatQuality += 5;
    if (cvData.personal?.email && cvData.personal?.phone) formatQuality += 5;

    // 3. Quantified Achievements (20 points)
    const allBullets = cvData.experience?.flatMap((exp: any) => exp.bullets || []) || [];
    if (allBullets.length > 0) {
        const quantifiedBullets = allBullets.filter((bullet: string) => /\d+[%$kKmM]?/.test(bullet));
        quantifiedAchievements = Math.round((quantifiedBullets.length / allBullets.length) * 20);
    }

    // 4. Appropriate Length (10 points)
    const wordCount = cvText.split(/\s+/).length;
    if (wordCount >= 300 && wordCount <= 800) {
        appropriateLength = 10;
    } else if (wordCount > 800 && wordCount <= 1000) {
        appropriateLength = 5;
    }

    // 5. Action Verbs (10 points)
    const actionVerbsList = [
        'led', 'managed', 'developed', 'created', 'improved', 'increased',
        'reduced', 'implemented', 'designed', 'built', 'launched', 'optimized',
        'achieved', 'delivered', 'established', 'generated', 'spearheaded',
        'coordinated', 'executed', 'streamlined', 'enhanced', 'drove'
    ];
    const hasActionVerbs = allBullets.some((bullet: string) =>
        actionVerbsList.some(verb => bullet.toLowerCase().includes(verb))
    );
    if (hasActionVerbs) actionVerbs = 10;

    const totalScore = keywordMatch + formatQuality + quantifiedAchievements + appropriateLength + actionVerbs;

    return {
        score: Math.min(100, totalScore),
        breakdown: {
            keywordMatch,
            formatQuality,
            quantifiedAchievements,
            appropriateLength,
            actionVerbs
        }
    };
}

export function extractKeywords(text: string): string[] {
    // Common stop words to exclude
    const stopWords = new Set([
        'the', 'a', 'an', 'and', 'or', 'but', 'in', 'with', 'to', 'for',
        'of', 'at', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'be',
        'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will',
        'would', 'should', 'could', 'may', 'might', 'can', 'this', 'that',
        'these', 'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they',
        'their', 'our', 'your', 'its', 'who', 'what', 'when', 'where', 'why',
        'how', 'all', 'each', 'every', 'both', 'few', 'more', 'most', 'other',
        'some', 'such', 'no', 'nor', 'not', 'only', 'own', 'same', 'so',
        'than', 'too', 'very', 'just', 'about', 'into', 'through', 'during',
        'before', 'after', 'above', 'below', 'between', 'under', 'again',
        'further', 'then', 'once'
    ]);

    // Split text into words and clean
    const words = text.toLowerCase()
        .replace(/[^a-z0-9\s]/g, ' ')
        .split(/\s+/)
        .filter(word => word.length > 3 && !stopWords.has(word));

    // Count frequency
    const frequency: { [key: string]: number } = {};
    words.forEach(word => {
        frequency[word] = (frequency[word] || 0) + 1;
    });

    // Sort by frequency and return top 20
    return Object.entries(frequency)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 20)
        .map(([word]) => word);
}
