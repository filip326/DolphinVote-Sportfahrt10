import IUser from './user'

export interface VoteData {
    name: string;
    klasse: string;
    options: VoteOption[];
}

export interface VoteOption {
    option_name: string;
    free_slots: number;
    time: "Mi-Vormittag" | "Mi-Nachmittag" | "Do-Vormittag" | "Do-Nachmittag";
    voters?: IUser[];
}
