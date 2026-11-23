import type {Earmark} from "../../api/earmark.ts";
import EarmarkStatus from "./EarmarkStatus.tsx";
import {MusicNoteIcon, ReviewIcon, StickyNoteIcon} from "../../../../components/Icon.tsx";
import Indicator from "./Indicator.tsx";
import {MAX_RATING} from "../../constants.ts";

export default function EarmarkIndicators({earmark}: { earmark: Earmark | undefined }) {
    return earmark && <>
        <EarmarkStatus earmark={earmark}/>
        {
            earmark.note && <Indicator icon={StickyNoteIcon} label={earmark.note}/>
        }
        {
            earmark.rating != null &&
            <Indicator icon={MusicNoteIcon} label={`Rating: ${earmark.rating}/${MAX_RATING}`}/>
        }
        {
            earmark.review && <Indicator icon={ReviewIcon} label={"Reviewed"}/>
        }
    </>
}