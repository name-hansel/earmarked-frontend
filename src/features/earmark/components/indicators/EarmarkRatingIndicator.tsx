import type {Earmark} from "../../api/earmark.ts";
import Indicator from "./Indicator.tsx";
import {MusicNoteIcon} from "../../../../components/Icon.tsx";

export default function EarmarkRatingIndicator({earmark}: { earmark: Earmark }) {
    if (earmark.rating === null) {
        return null;
    }

    return <Indicator icon={MusicNoteIcon} label="Has a rating"/>;
}