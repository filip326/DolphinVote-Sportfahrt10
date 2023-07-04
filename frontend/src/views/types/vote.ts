
export type VotingType = "Mi-Vormittag" | "Mi-Nachmittag" | "Do-Vormittag" | "Do-Nachmittag";

export interface VotingResponse {
    voting: VotingType;
    open: boolean;
}

export interface OptionResponse {
    id: string;
    name: string;
}

export type ResultResponse = { [key: string]: string };
