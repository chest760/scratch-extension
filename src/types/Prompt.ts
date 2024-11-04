export type Complexity = {
    program_vocabulary:  string
    program_length:  string
    estimated_program_lengt: string
    volume: string
    difficulty: string
    effort: string
    halstead_difficulty: string
}


export type Quiz = {
    quiz_description: string
    character: string
    rule: string
}

export type PromptResult = {
    success: boolean
    complexity: Complexity
    quiz: Quiz
} 

export type Result = {
    result: PromptResult
}