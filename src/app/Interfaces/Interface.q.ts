export interface Query {
    qid: number,
    qtyp: string,
    qtxt: string[],
    qanswers: Answer[],
    qinfo: string[],
    qgiventxt?: string,
    qcorrect?: string,
}
export interface Answer {
    txt: string[],
    correct?: boolean,
    givenans?: boolean
}
