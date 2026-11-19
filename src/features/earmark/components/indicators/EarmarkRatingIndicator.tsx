import type {Earmark} from "../../api/earmark.ts";
import Indicator from "./Indicator.tsx";
import {MusicNoteIcon} from "../../../../components/Icon.tsx";
import {MAX_RATING} from "../../constants.ts";

export default function EarmarkRatingIndicator({earmark}: { earmark: Earmark }) {
    if (earmark.rating === null) {
        return null;
    }

    return <Indicator icon={MusicNoteIcon} label={`Rating: ${earmark.rating}/${MAX_RATING}`}/>;
}