import {MovieItem} from "./MovieItem";
import {Dates} from "./Dates";

export interface MovieResult {
    dates: Dates
    page: number
    results: MovieItem[]
    total_pages: number
    total_results: number
}
