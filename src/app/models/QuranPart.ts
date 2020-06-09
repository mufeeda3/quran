export class QuranWords {
    public Name: string;
}

export class QuranVerse {
    public Name: string;
    public Words: QuranWords[];
    public Hidden: boolean;
}

export class QuranPage {
    public Name: string;
    public Verses: QuranVerse[];
}

export class QuranPart {
    public Pages: QuranPage[];
    public Name: string;
}