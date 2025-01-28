export interface llceFrage{
    qid: number,
    qtyp: string,
    qtxt: string[],
    qanswers: llceAnswers[],
    qcorrect?: string,
    qgiventxt?: string,
    qinfo?: string[]
}
interface llceAnswers{
    txt: string[],
    correct?: boolean,
    gibAntw?: boolean
}