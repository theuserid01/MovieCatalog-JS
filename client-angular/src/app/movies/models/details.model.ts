export class DetailsModel {
    constructor(
        public _id: string,
        public countries: string,
        public genres: string,
        public imageUrl: string,
        public languages: string,
        public productionYear: number,
        public synopsis: string,
        public title: string
    ) { }
}
