interface ResIUser {
    name: string;
    class: string;
}
export interface VoteData {
    name: string;
    klasse: string;
    options: VoteOption[];
}
export interface VoteOption {
    option_name: string;
    free_slots: number;
    time: "Mi-Vormittag" | "Mi-Nachmittag" | "Do-Vormittag" | "Do-Nachmittag";
    voters?: ResIUser[];
}
interface SmallVoteData {
    name: string;
    time: "Mi-Vormittag" | "Mi-Nachmittag" | "Do-Vormittag" | "Do-Nachmittag";
}
export interface ResData {
    name: string;
    klasse: string;
    timeframe: string;
    yourvotes: SmallVoteData[];
    options: VoteData[];
    buttons: {
        [key: number]: {
            loading: boolean;
            success?: boolean;
        } | undefined;
    };
}
export {};