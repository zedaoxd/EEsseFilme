import { Genre } from "./genre"

export type Movie = {
    id: 1,
    originTitle: string,
    nationalTitle: string,
    image: string,
    releaseDate: Date,
    synopsis: string,
    parentalRating: number,
    mainActors: string,
    averageRating: number,
    movieTrailer: string,
    imageByte: number[],
    comments: [],
    genres: Genre[]
}